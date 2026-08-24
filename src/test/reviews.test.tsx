import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ReviewDialog from "@/components/ReviewDialog";
import Beoordelingen from "@/pages/Beoordelingen";
import {
  addStoredReview,
  readStoredReviews,
  removeStoredReview,
  useReviews,
} from "@/hooks/use-reviews";
import { reviews as staticReviews } from "@/content/reviews";
import { GOOGLE_REVIEW_URL } from "@/lib/site";

/**
 * De klacht van de klant was dat bezoekers nergens een review konden
 * achterlaten. Deze tests borgen dat de knop bestaat, dat het formulier
 * opengaat, dat de review lokaal wordt bewaard, dat Google in een nieuw
 * tabblad opent en dat de bezoeker een duidelijke bevestiging krijgt.
 */
const STORAGE_KEY = "ssn-reviews-v1";

const renderDialog = () =>
  render(
    <MemoryRouter>
      <ReviewDialog />
    </MemoryRouter>,
  );

const fillAndSubmit = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole("button", { name: /schrijf een review/i }));
  await user.type(screen.getByLabelText(/naam/i), "Test Klant");
  await user.type(screen.getByLabelText(/woonplaats/i), "Tiel");
  await user.type(screen.getByLabelText(/uw ervaring/i), "Prima geholpen met de schuifpui.");
  await user.click(screen.getByRole("button", { name: /review versturen/i }));
};

let openSpy: ReturnType<typeof vi.fn>;

beforeEach(() => {
  window.localStorage.clear();
  openSpy = vi.fn(() => ({}) as Window);
  vi.stubGlobal("open", openSpy);
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("review CTA", () => {
  it("toont een knop om een review te schrijven", () => {
    renderDialog();
    expect(screen.getByRole("button", { name: /schrijf een review/i })).toBeInTheDocument();
  });

  it("opent het reviewformulier met alle velden", async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByRole("button", { name: /schrijf een review/i }));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByLabelText(/naam/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/woonplaats/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/welke dienst/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/uw ervaring/i)).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(5);
  });

  it("laat de bezoeker een sterrenscore kiezen", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByRole("button", { name: /schrijf een review/i }));

    const drieSterren = screen.getByRole("radio", { name: /^3 sterren/i });
    await user.click(drieSterren);

    expect(drieSterren).toHaveAttribute("aria-checked", "true");
  });

  it("bewaart de review in localStorage", async () => {
    const user = userEvent.setup();
    renderDialog();
    await fillAndSubmit(user);

    await waitFor(() => expect(readStoredReviews()).toHaveLength(1));
    const [stored] = readStoredReviews();
    expect(stored.name).toBe("Test Klant");
    expect(stored.city).toBe("Tiel");
    expect(stored.rating).toBe(5);
    expect(stored.text).toContain("Prima geholpen");
    expect(stored.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(stored.source).toBe("user");
  });

  it("opent het Google-profiel in een nieuw tabblad", async () => {
    const user = userEvent.setup();
    renderDialog();
    await fillAndSubmit(user);

    expect(openSpy).toHaveBeenCalledWith(GOOGLE_REVIEW_URL, "_blank", "noopener,noreferrer");
  });

  it("toont de bedankboodschap na het versturen", async () => {
    const user = userEvent.setup();
    renderDialog();
    await fillAndSubmit(user);

    await waitFor(() => {
      expect(screen.getByText(/bedankt voor je review/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/ook op Google te plaatsen/i)).toBeInTheDocument();
  });

  it("legt uit dat het tabblad geblokkeerd is als de browser dat doet", async () => {
    vi.stubGlobal("open", vi.fn(() => null));
    const user = userEvent.setup();
    renderDialog();
    await fillAndSubmit(user);

    expect(await screen.findByText(/blokkeerde het nieuwe tabblad/i)).toBeInTheDocument();
  });

  it("biedt de review ook als e-mail aan, zodat wij hem echt ontvangen", async () => {
    const user = userEvent.setup();
    renderDialog();
    await fillAndSubmit(user);

    const mailLink = await screen.findByRole("link", { name: /mailen/i });
    expect(mailLink.getAttribute("href")).toContain("mailto:");
    expect(decodeURIComponent(mailLink.getAttribute("href") ?? "")).toContain("Test Klant");
  });

  it("biedt ook een directe link naar Google", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByRole("button", { name: /schrijf een review/i }));

    const googleLink = screen.getByRole("link", { name: /google/i });
    expect(googleLink).toHaveAttribute("href", GOOGLE_REVIEW_URL);
    expect(googleLink).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});

describe("useReviews", () => {
  it("begint met alleen de gecontroleerde reviews", () => {
    const { result } = renderHook(() => useReviews());
    expect(result.current.reviewCount).toBe(staticReviews.length);
    expect(result.current.userReviews).toHaveLength(0);
  });

  it("voegt een nieuwe review toe en werkt gemiddelde en aantal bij", () => {
    const { result } = renderHook(() => useReviews());
    const before = result.current.averageRating;

    act(() => {
      addStoredReview({
        name: "Nieuwe Klant",
        city: "Tiel",
        rating: 1,
        text: "Test",
        service: "Schuifpui Reparatie",
      });
    });

    expect(result.current.reviewCount).toBe(staticReviews.length + 1);
    expect(result.current.averageRating).toBeLessThan(before);
    // Eigen review staat bovenaan.
    expect(result.current.reviews[0].name).toBe("Nieuwe Klant");
  });

  it("verwijdert een eigen review weer", () => {
    const { result } = renderHook(() => useReviews());
    let id = "";
    act(() => {
      id = addStoredReview({
        name: "Weg Ermee",
        city: "Tiel",
        rating: 5,
        text: "Test",
        service: "Schuifpui Reparatie",
      }).id;
    });
    expect(result.current.reviewCount).toBe(staticReviews.length + 1);

    act(() => removeStoredReview(id));
    expect(result.current.reviewCount).toBe(staticReviews.length);
  });

  it("begrenst de score en de lengte van de tekst", () => {
    const stored = addStoredReview({
      name: "Grens",
      city: "Tiel",
      rating: 99,
      text: "x".repeat(5000),
      service: "Overig",
    });
    expect(stored.rating).toBe(5);
    expect(stored.text).toHaveLength(1000);
  });

  it("negeert onleesbare of gemanipuleerde opslag", () => {
    window.localStorage.setItem(STORAGE_KEY, "{geen json");
    expect(readStoredReviews()).toEqual([]);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([{ name: "Half", rating: "vijf" }]));
    expect(readStoredReviews()).toEqual([]);
  });
});

describe("/beoordelingen", () => {
  it("toont een zojuist ingestuurde review met bijgewerkte telling", async () => {
    addStoredReview({
      name: "Direct Zichtbaar",
      city: "Nijmegen",
      rating: 4,
      text: "Deze review moet meteen in de lijst staan.",
      service: "Schuifpui Onderhoud",
    });

    render(
      <MemoryRouter initialEntries={["/beoordelingen"]}>
        <Beoordelingen />
      </MemoryRouter>,
    );

    expect(
      await screen.findByText(/Deze review moet meteen in de lijst staan/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: new RegExp(`Alle ${staticReviews.length + 1} beoordelingen`) }),
    ).toBeInTheDocument();
    expect(screen.getByText(/alleen op dit apparaat zichtbaar/i)).toBeInTheDocument();
  });
});
