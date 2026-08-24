/**
 * Minimale Supabase-client voor de reviewtabel.
 *
 * Supabase stelt elke tabel beschikbaar via PostgREST, een gewone REST-API.
 * Voor de twee dingen die wij nodig hebben — een review insturen en de
 * goedgekeurde reviews ophalen — is `fetch` genoeg. Daarmee blijft de
 * JavaScript-bundle klein; `@supabase/supabase-js` neemt ook realtime, auth en
 * storage mee die wij niet gebruiken.
 *
 * Zonder ingevulde omgevingsvariabelen doet dit bestand niets en valt het
 * reviewformulier terug op opslag in de browser zelf (zie use-reviews.ts).
 * De tabel en de bijbehorende rechten staan in supabase/schema.sql.
 */

/** Maximaal aantal reviews dat wij in één keer ophalen. */
const FETCH_LIMIT = 100;

/**
 * Leest de omgevingsvariabelen bij elke aanroep in plaats van één keer bij het
 * laden van de module. Dat scheelt niets in productie (Vite vult de waarden bij
 * het bouwen in) maar maakt het wel testbaar.
 */
const config = () => ({
  url: (import.meta.env.VITE_SUPABASE_URL ?? "").trim().replace(/\/+$/, ""),
  key: (import.meta.env.VITE_SUPABASE_ANON_KEY ?? "").trim(),
});

/** Is de koppeling ingesteld? Zo niet, dan slaan we alles lokaal op. */
export const isSupabaseConfigured = (): boolean => {
  const { url, key } = config();
  return url.length > 0 && key.length > 0;
};

/** Rij zoals hij in de database staat. */
export type ReviewRow = {
  id: string;
  created_at: string;
  name: string;
  city: string;
  rating: number;
  body: string;
  service: string;
};

export type NewReview = {
  name: string;
  city: string;
  rating: number;
  body: string;
  service: string;
};

const headers = (): HeadersInit => {
  const { key } = config();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
};

const restUrl = (query: string) => `${config().url}/rest/v1/${query}`;

/** Leest de foutmelding van PostgREST uit, voor een bruikbare logregel. */
const errorFrom = async (response: Response): Promise<Error> => {
  let detail = "";
  try {
    const payload = await response.json();
    detail = payload?.message ?? payload?.hint ?? "";
  } catch {
    // Geen JSON-body; de statuscode zegt genoeg.
  }
  return new Error(`Supabase ${response.status}${detail ? `: ${detail}` : ""}`);
};

const isReviewRow = (value: unknown): value is ReviewRow => {
  if (typeof value !== "object" || value === null) return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === "string" &&
    typeof row.created_at === "string" &&
    typeof row.name === "string" &&
    typeof row.city === "string" &&
    typeof row.body === "string" &&
    typeof row.service === "string" &&
    typeof row.rating === "number"
  );
};

/**
 * Haalt de goedgekeurde reviews op, nieuwste eerst.
 *
 * De RLS-policy filtert zelf al op `status = 'approved'`; wij vragen die kolom
 * niet eens op. Een bezoeker kan dus nooit reviews zien die nog beoordeeld
 * moeten worden of afgekeurd zijn.
 */
export const fetchReviews = async (signal?: AbortSignal): Promise<ReviewRow[]> => {
  if (!isSupabaseConfigured()) return [];

  const response = await fetch(
    restUrl(
      `reviews?select=id,created_at,name,city,rating,body,service&order=created_at.desc&limit=${FETCH_LIMIT}`,
    ),
    { headers: headers(), signal },
  );

  if (!response.ok) throw await errorFrom(response);

  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) return [];
  return payload.filter(isReviewRow);
};

/**
 * Slaat een nieuwe review op.
 *
 * `status` sturen wij bewust niet mee: die kolom is niet aan de anon-rol
 * gegeven, dus de database bepaalt zelf of een review direct zichtbaar is of
 * eerst gemodereerd moet worden.
 *
 * De teruggegeven rij loopt ook langs de leespolicy. Staat moderatie aan, dan
 * is de zojuist ingestuurde review nog niet goedgekeurd en krijgen wij niets
 * terug. Dat is geen fout: `null` betekent "opgeslagen, nog niet publiek".
 */
export const insertReview = async (review: NewReview): Promise<ReviewRow | null> => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is niet geconfigureerd");
  }

  const response = await fetch(restUrl("reviews"), {
    method: "POST",
    headers: { ...headers(), Prefer: "return=representation" },
    body: JSON.stringify({
      name: review.name,
      city: review.city,
      rating: review.rating,
      body: review.body,
      service: review.service,
    }),
  });

  if (!response.ok) throw await errorFrom(response);

  // 201 zonder body komt voor als de leespolicy de nieuwe rij afschermt.
  if (response.status === 204) return null;

  const payload: unknown = await response.json().catch(() => null);
  const row = Array.isArray(payload) ? payload[0] : payload;
  return isReviewRow(row) ? row : null;
};
