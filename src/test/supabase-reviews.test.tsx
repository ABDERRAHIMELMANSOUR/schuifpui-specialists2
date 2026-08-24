import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ReviewDialog from "@/components/ReviewDialog";
import Beoordelingen from "@/pages/Beoordelingen";
import { resetPublishedReviews, useReviews } from "@/hooks/use-reviews";
import { fetchReviews, insertReview, isSupabaseConfigured } from "@/lib/supabase";
import { reviews as staticReviews } from "@/content/reviews";

/**
 * Tests voor de Supabase-koppeling. De HTTP-laag wordt gemockt: wij testen dat
 * de juiste aanroepen worden gedaan, dat het antwoord goed wordt verwerkt en
 * dat een storing netjes terugvalt op lokale opslag.
 */
const SUPABASE_URL = "https://test-project.supabase.co";
const ANON_KEY = "test-anon-key";

const row = (overrides: Record<string, unknown> = {}) => ({
  id: "11111111-1111-1111-1111-111111111111",
  created_at: "2026-08-20T10:00:00.000Z",
  name: "Ingestuurd Door Bezoeker",
  city: "Groningen",
  rating: 5,
  body: "Deze review komt uit de database en is voor iedereen zichtbaar.",
  service: "Schuifpui Reparatie",
  ...overrides,
});

const jsonResponse = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  window.localStorage.clear();
  resetPublishedReviews();
  vi.stubEnv("VITE_SUPABASE_URL", SUPABASE_URL);
  vi.stubEnv("VITE_SUPABASE_ANON_KEY", ANON_KEY);
  vi.stubGlobal("open", vi.fn(() => ({}) as Window));
  fetchMock = vi.fn(async () => jsonResponse([row()]));
  vi.stubGlobal("fetch", fetchMock);
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("supabase client", () => {
  it("herkent of de koppeling is ingesteld", () => {
    expect(isSupabaseConfigured()).toBe(true);
    vi.stubEnv("VITE_SUPABASE_URL", "");
    expect(isSupabaseConfigured()).toBe(false);
  });

  it("haalt reviews op met de anon-key en op datum aflopend", async () => {
    const rows = await fetchReviews();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toContain(`${SUPABASE_URL}/rest/v1/reviews`);
    expect(url).toContain("order=created_at.desc");
    expect(init.headers.apikey).toBe(ANON_KEY);
    expect(rows).toHaveLength(1);
    expect(rows[0].name).toBe("Ingestuurd Door Bezoeker");
  });

  it("negeert rijen die niet de verwachte vorm hebben", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse([row(), { id: "kapot" }]));
    expect(await fetchReviews()).toHaveLength(1);
  });

  it("stuurt geen status mee bij het insturen (die bepaalt de database)", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse([row()], 201));

    await insertReview({
      name: "Nieuw",
      city: "Tiel",
      rating: 4,
      body: "Een nette reparatie van de schuifpui.",
      service: "Schuifpui Reparatie",
    });

    const [, init] = fetchMock.mock.calls[0];
    expect(init.method).toBe("POST");
    const sent = JSON.parse(init.body);
    expect(sent).not.toHaveProperty("status");
    expect(sent).not.toHaveProperty("id");
    expect(sent.rating).toBe(4);
  });

  it("geeft null terug als de nieuwe review nog niet goedgekeurd is", async () => {
    // Staat moderatie aan, dan schermt de leespolicy de nieuwe rij af en
    // krijgen wij een lege lijst terug.
    fetchMock.mockResolvedValueOnce(jsonResponse([], 201));
    const result = await insertReview({
      name: "Nieuw",
      city: "Tiel",
      rating: 5,
      body: "Wordt eerst gelezen door de eigenaar.",
      service: "Schuifpui Reparatie",
    });
    expect(result).toBeNull();
  });

  it("werpt een leesbare fout bij een afgewezen aanvraag", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({ message: "new row violates row-level security policy" }, 401),
    );
    await expect(fetchReviews()).rejects.toThrow(/401.*row-level security/);
  });
});

describe("useReviews met Supabase", () => {
  it("toont reviews uit de database naast de gecontroleerde reviews", async () => {
    const { result } = renderHook(() => useReviews());

    await waitFor(() => expect(result.current.reviewCount).toBe(staticReviews.length + 1));
    expect(result.current.publishedReviews[0].name).toBe("Ingestuurd Door Bezoeker");
  });

  it("haalt de lijst één keer op, ook bij meerdere gebruikers van de hook", async () => {
    const { result } = renderHook(() => {
      useReviews();
      useReviews();
      return useReviews();
    });

    await waitFor(() => expect(result.current.publishedReviews).toHaveLength(1));
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("valt terug op lokale opslag als de database onbereikbaar is", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    fetchMock.mockRejectedValue(new Error("network down"));

    const { result } = renderHook(() => useReviews());
    let outcome = "";
    await act(async () => {
      outcome = await result.current.submitReview({
        name: "Offline Klant",
        city: "Tiel",
        rating: 5,
        text: "Ook zonder verbinding raken wij deze review niet kwijt.",
        service: "Schuifpui Reparatie",
      });
    });

    expect(outcome).toBe("stored-locally");
    expect(result.current.userReviews).toHaveLength(1);
  });

  it("meldt dat een review op goedkeuring wacht", async () => {
    const { result } = renderHook(() => useReviews());
    await waitFor(() => expect(result.current.publishedReviews).toHaveLength(1));
    fetchMock.mockResolvedValueOnce(jsonResponse([], 201));

    let outcome = "";
    await act(async () => {
      outcome = await result.current.submitReview({
        name: "Wacht Even",
        city: "Tiel",
        rating: 5,
        text: "Deze review moet eerst gelezen worden.",
        service: "Schuifpui Reparatie",
      });
    });

    expect(outcome).toBe("awaiting-approval");
    expect(result.current.userReviews[0].awaitingApproval).toBe(true);
  });
});

describe("reviewflow van begin tot eind", () => {
  it("plaatst de review, opent Google en bevestigt met de juiste tekst", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ReviewDialog />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: /schrijf een review/i }));
    await user.type(screen.getByLabelText(/naam/i), "Nieuwe Klant");
    await user.type(screen.getByLabelText(/woonplaats/i), "Groningen");
    await user.type(screen.getByLabelText(/uw ervaring/i), "Snel en netjes gerepareerd.");

    fetchMock.mockResolvedValueOnce(jsonResponse([row({ name: "Nieuwe Klant" })], 201));
    await user.click(screen.getByRole("button", { name: /review versturen/i }));

    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining("http"),
      "_blank",
      "noopener,noreferrer",
    );
    expect(
      await screen.findByText("Bedankt! Je review staat nu op onze site."),
    ).toBeInTheDocument();
    expect(screen.getByText(/ook op Google te plaatsen/i)).toBeInTheDocument();
    // De review staat in de database, dus niet ook nog eens lokaal.
    expect(window.localStorage.getItem("ssn-reviews-v1")).toBeNull();
  });

  it("laat een ingestuurde review meteen zien op /beoordelingen", async () => {
    render(
      <MemoryRouter initialEntries={["/beoordelingen"]}>
        <Beoordelingen />
      </MemoryRouter>,
    );

    expect(
      await screen.findByText(/Deze review komt uit de database/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: new RegExp(`Alle ${staticReviews.length + 1} beoordelingen`),
      }),
    ).toBeInTheDocument();
  });
});
