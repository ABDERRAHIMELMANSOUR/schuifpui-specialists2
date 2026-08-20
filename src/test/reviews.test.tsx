import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ReviewDialog from "@/components/ReviewDialog";
import { GOOGLE_REVIEW_URL } from "@/lib/site";

/**
 * De klacht van de klant was dat bezoekers nergens een review konden
 * achterlaten. Deze tests borgen dat de knop bestaat, dat het formulier
 * opengaat en dat de bezoeker een duidelijke bevestiging krijgt.
 */
const renderDialog = () =>
  render(
    <MemoryRouter>
      <ReviewDialog />
    </MemoryRouter>,
  );

beforeEach(() => {
  // jsdom kan niet echt navigeren; we vangen de mailto-navigatie af.
  Object.defineProperty(window, "location", {
    writable: true,
    value: { href: "" },
  });
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
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

  it("toont een bevestiging na het versturen", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByRole("button", { name: /schrijf een review/i }));

    await user.type(screen.getByLabelText(/naam/i), "Test Klant");
    await user.type(screen.getByLabelText(/woonplaats/i), "Tiel");
    await user.type(screen.getByLabelText(/uw ervaring/i), "Prima geholpen met de schuifpui.");
    await user.click(screen.getByRole("button", { name: /review versturen/i }));

    await waitFor(() => {
      expect(screen.getByText(/bedankt voor uw beoordeling/i)).toBeInTheDocument();
    });
    // De review is als e-mail klaargezet.
    expect(window.location.href).toContain("mailto:");
    expect(decodeURIComponent(window.location.href)).toContain("Test Klant");
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
