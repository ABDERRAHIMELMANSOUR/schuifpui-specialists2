import { useCallback, useEffect, useMemo, useState } from "react";
import { reviews as staticReviews, type Review } from "@/content/reviews";
import {
  fetchReviews,
  insertReview,
  isSupabaseConfigured,
  type ReviewRow,
} from "@/lib/supabase";

/**
 * Beoordelingen van bezoekers.
 *
 * Er zijn drie bronnen, in deze volgorde van betrouwbaarheid:
 *
 *  1. `src/content/reviews.ts` — door ons gecontroleerde reviews. Deze staan
 *     ook in de JSON-LD en zijn dus de basis voor de sterren in Google.
 *  2. Supabase — reviews die bezoekers via het formulier insturen. Iedereen
 *     ziet ze, zonder dat de site opnieuw gebouwd hoeft te worden.
 *  3. `localStorage` — vangnet. Is Supabase niet ingesteld of onbereikbaar,
 *     dan bewaren wij de review in de browser van de bezoeker, zodat zijn
 *     bijdrage niet verloren gaat en hij hem zelf terugziet.
 *
 * Belangrijk: alleen bron 1 gaat mee in de structured data (`src/lib/schema.ts`).
 * Googlebot mag geen `aggregateRating` te zien krijgen die afwijkt van de
 * beoordelingen die in de geprerenderde HTML staan, en ingestuurde reviews zijn
 * bovendien niet door ons geverifieerd. Zie ook SEO.md.
 */
export type StoredReview = Review & {
  id: string;
  /** Onderscheidt lokaal bewaarde reviews van de gecontroleerde lijst. */
  source: "user";
  /** true = wacht op goedkeuring, false = kon Supabase niet bereiken. */
  awaitingApproval?: boolean;
};

/** Review uit Supabase, zichtbaar voor alle bezoekers. */
export type PublishedReview = Review & { id: string; source: "published" };

const STORAGE_KEY = "ssn-reviews-v1";
/** Custom event zodat alle componenten op de pagina direct meebewegen. */
const CHANGE_EVENT = "ssn-reviews-changed";
/** Bovengrens zodat localStorage niet vol kan lopen. */
const MAX_STORED = 25;
const MAX_TEXT = 1000;

const isBrowser = () => typeof window !== "undefined";

/** Accepteert alleen records die er nog uitzien zoals wij ze hebben opgeslagen. */
const isStoredReview = (value: unknown): value is StoredReview => {
  if (typeof value !== "object" || value === null) return false;
  const review = value as Record<string, unknown>;
  return (
    typeof review.id === "string" &&
    typeof review.name === "string" &&
    typeof review.city === "string" &&
    typeof review.text === "string" &&
    typeof review.date === "string" &&
    typeof review.service === "string" &&
    typeof review.rating === "number" &&
    review.rating >= 1 &&
    review.rating <= 5
  );
};

/** Leest de opgeslagen reviews; corrupte of gemanipuleerde data wordt genegeerd. */
export const readStoredReviews = (): StoredReview[] => {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(isStoredReview)
      .slice(0, MAX_STORED)
      .map((review) => ({
        ...review,
        rating: Math.round(review.rating),
        text: review.text.slice(0, MAX_TEXT),
        source: "user" as const,
      }));
  } catch {
    // Privacymodus, vol quotum of onleesbare data: val terug op geen reviews.
    return [];
  }
};

const writeStoredReviews = (list: StoredReview[]) => {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, MAX_STORED)));
  } catch {
    // Opslaan kan mislukken (privacymodus, vol quotum). De review blijft dan
    // wel in de React-state van deze sessie staan; we breken de flow niet af.
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
};

const newId = () => {
  // `crypto.randomUUID` ontbreekt in oudere browsers en in sommige testomgevingen.
  if (isBrowser() && typeof window.crypto?.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `review-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

/** Slaat een review lokaal op en meldt de wijziging aan luisterende componenten. */
export const addStoredReview = (
  input: Omit<Review, "date">,
  options: { awaitingApproval?: boolean } = {},
): StoredReview => {
  const review: StoredReview = {
    ...input,
    text: input.text.slice(0, MAX_TEXT),
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    date: new Date().toISOString().slice(0, 10),
    id: newId(),
    source: "user",
    awaitingApproval: options.awaitingApproval,
  };
  writeStoredReviews([review, ...readStoredReviews()]);
  return review;
};

export const removeStoredReview = (id: string) => {
  writeStoredReviews(readStoredReviews().filter((review) => review.id !== id));
};

/** Zet een databaserij om naar de vorm die de site overal gebruikt. */
const toReview = (row: ReviewRow): PublishedReview => ({
  id: row.id,
  name: row.name,
  city: row.city,
  rating: row.rating,
  text: row.body,
  date: row.created_at.slice(0, 10),
  service: row.service,
  source: "published",
});

const average = (list: { rating: number }[]) =>
  list.length === 0
    ? 0
    : Math.round((list.reduce((sum, r) => sum + r.rating, 0) / list.length) * 10) / 10;

export type AnyReview = Review | StoredReview | PublishedReview;

/** Uitkomst van een inzending, bepaalt welke bevestiging de bezoeker ziet. */
export type SubmitOutcome = "published" | "awaiting-approval" | "stored-locally";

// --- Gedeelde opslag van de ingestuurde reviews -----------------------------
//
// `useReviews` wordt op één pagina meerdere keren gebruikt: in de footer, in de
// reviewsectie en in de modal zelf. Zou elke aanroep zijn eigen lijst en zijn
// eigen fetch hebben, dan haalden wij dezelfde reviews vier keer op én zou een
// review die via de footer wordt ingestuurd niet verschijnen in de lijst op de
// pagina. Daarom staat de lijst op moduleniveau en luisteren alle instanties
// naar dezelfde bron.

let publishedCache: PublishedReview[] = [];
let loadState: "idle" | "loading" | "loaded" = "idle";
const subscribers = new Set<() => void>();

const emit = () => subscribers.forEach((notify) => notify());

/** Haalt de reviews één keer per paginabezoek op. */
const loadPublishedReviews = async () => {
  if (loadState !== "idle" || !isSupabaseConfigured()) return;

  loadState = "loading";
  emit();
  try {
    const rows = await fetchReviews();
    publishedCache = rows.map(toReview);
    loadState = "loaded";
  } catch (error) {
    // De site werkt prima verder met de gecontroleerde reviews; een storing bij
    // Supabase mag de pagina niet stukmaken. `idle` laat een nieuwe poging toe.
    console.error("Reviews ophalen mislukt:", error);
    loadState = "idle";
  }
  emit();
};

const cachePublishedReview = (review: PublishedReview) => {
  publishedCache = [review, ...publishedCache];
  emit();
};

/** Alleen voor tests: zet de gedeelde opslag terug op leeg. */
export const resetPublishedReviews = () => {
  publishedCache = [];
  loadState = "idle";
  emit();
};

/**
 * Geeft de samengevoegde lijst plus het bijgewerkte gemiddelde en aantal, en
 * een `submitReview` om een nieuwe review in te sturen.
 *
 * Bij de eerste render worden bewust alleen de statische reviews teruggegeven:
 * de HTML is geprerenderd en moet identiek zijn aan wat React op de client
 * rendert. Direct na het mounten komen de ingestuurde reviews erbij.
 */
export const useReviews = () => {
  const [published, setPublished] = useState<PublishedReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [userReviews, setUserReviews] = useState<StoredReview[]>([]);

  useEffect(() => {
    const sync = () => setUserReviews(readStoredReviews());
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    // "storage" vuurt in andere tabs van dezelfde site.
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    const sync = () => {
      setPublished(publishedCache);
      setLoading(loadState === "loading");
    };
    subscribers.add(sync);
    sync();
    void loadPublishedReviews();
    return () => {
      subscribers.delete(sync);
    };
  }, []);

  /**
   * Stuurt een review in. Lukt dat bij Supabase, dan is hij meteen voor alle
   * bezoekers zichtbaar; anders bewaren wij hem lokaal zodat hij niet weg is.
   */
  const submitReview = useCallback(
    async (input: Omit<Review, "date">): Promise<SubmitOutcome> => {
      const payload = {
        name: input.name.trim(),
        city: input.city.trim(),
        rating: Math.min(5, Math.max(1, Math.round(input.rating))),
        body: input.text.trim().slice(0, MAX_TEXT),
        service: input.service,
      };

      if (isSupabaseConfigured()) {
        try {
          const row = await insertReview(payload);
          if (row) {
            cachePublishedReview(toReview(row));
            return "published";
          }
          // Opgeslagen, maar nog niet goedgekeurd: laat de bezoeker zijn eigen
          // review wel zien, met de melding dat wij hem nog nakijken.
          addStoredReview(input, { awaitingApproval: true });
          return "awaiting-approval";
        } catch (error) {
          console.error("Review opslaan mislukt:", error);
        }
      }

      addStoredReview(input);
      return "stored-locally";
    },
    [],
  );

  const all = useMemo<AnyReview[]>(
    () => [...userReviews, ...published, ...staticReviews],
    [userReviews, published],
  );

  const remove = useCallback((id: string) => removeStoredReview(id), []);

  return {
    /** Eigen lokale reviews eerst, dan de ingestuurde, dan de gecontroleerde. */
    reviews: all,
    userReviews,
    publishedReviews: published,
    reviewCount: all.length,
    averageRating: average(all),
    loading,
    submitReview,
    removeReview: remove,
  };
};

/** Lokaal bewaarde review van deze bezoeker (nog niet in de database). */
export const isUserReview = (review: AnyReview): review is StoredReview =>
  (review as StoredReview).source === "user";

/** Review uit de database, zichtbaar voor alle bezoekers. */
export const isPublishedReview = (review: AnyReview): review is PublishedReview =>
  (review as PublishedReview).source === "published";
