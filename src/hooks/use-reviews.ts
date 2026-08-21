import { useCallback, useEffect, useMemo, useState } from "react";
import { reviews as staticReviews, type Review } from "@/content/reviews";

/**
 * Beoordelingen die bezoekers zelf via de modal achterlaten.
 *
 * De site heeft geen backend, dus een ingestuurde review wordt opgeslagen in
 * `localStorage` van de bezoeker. Daardoor verschijnt hij direct in de lijst op
 * /beoordelingen en tellen het gemiddelde en het aantal meteen mee, zonder dat
 * er een deploy nodig is.
 *
 * Belangrijk: deze reviews staan alléén in de browser van die ene bezoeker.
 * Ze gaan daarom bewust NIET mee in de JSON-LD (`src/lib/schema.ts`), die blijft
 * gebaseerd op de gecontroleerde reviews in `src/content/reviews.ts`. Googlebot
 * heeft een lege localStorage en ziet dus precies dezelfde beoordelingen als de
 * `aggregateRating` in de structured data — anders zou de markup niet
 * overeenkomen met de zichtbare inhoud.
 */
export type StoredReview = Review & {
  id: string;
  /** Onderscheidt lokaal ingestuurde reviews van de gecontroleerde lijst. */
  source: "user";
};

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

/** Slaat een nieuwe review op en meldt de wijziging aan alle luisterende componenten. */
export const addStoredReview = (input: Omit<Review, "date">): StoredReview => {
  const review: StoredReview = {
    ...input,
    text: input.text.slice(0, MAX_TEXT),
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    date: new Date().toISOString().slice(0, 10),
    id: newId(),
    source: "user",
  };
  writeStoredReviews([review, ...readStoredReviews()]);
  return review;
};

export const removeStoredReview = (id: string) => {
  writeStoredReviews(readStoredReviews().filter((review) => review.id !== id));
};

const average = (list: { rating: number }[]) =>
  list.length === 0
    ? 0
    : Math.round((list.reduce((sum, r) => sum + r.rating, 0) / list.length) * 10) / 10;

/**
 * Geeft de samengevoegde lijst (gecontroleerde + eigen reviews) plus het
 * bijgewerkte gemiddelde en aantal.
 *
 * Bij de eerste render worden bewust alleen de statische reviews teruggegeven:
 * de HTML is geprerenderd en moet identiek zijn aan wat React op de client
 * rendert. Direct na het mounten komen de opgeslagen reviews erbij.
 */
export const useReviews = () => {
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

  const all = useMemo<(Review | StoredReview)[]>(
    () => [...userReviews, ...staticReviews],
    [userReviews],
  );

  const remove = useCallback((id: string) => removeStoredReview(id), []);

  return {
    /** Eigen reviews eerst, daarna de gecontroleerde lijst. */
    reviews: all,
    userReviews,
    reviewCount: all.length,
    averageRating: average(all),
    removeReview: remove,
  };
};

/** Type guard voor gebruik in de UI (bv. om een label te tonen). */
export const isUserReview = (review: Review | StoredReview): review is StoredReview =>
  (review as StoredReview).source === "user";
