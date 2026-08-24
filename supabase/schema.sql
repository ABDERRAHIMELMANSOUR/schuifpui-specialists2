-- ---------------------------------------------------------------------------
-- Reviewtabel voor schuifpuiservicenederland.nl
--
-- Draai dit bestand één keer in Supabase → SQL Editor → New query → Run.
-- Daarna kunnen bezoekers via het reviewformulier reviews insturen en ziet
-- iedere bezoeker ze, zonder dat er een nieuwe versie van de site nodig is.
--
-- Uitgangspunten:
--  * Anonieme bezoekers mogen alleen INSERTEN en alleen goedgekeurde reviews
--    LEZEN. Wijzigen en verwijderen kan uitsluitend vanuit het Supabase-
--    dashboard (service role).
--  * De bezoeker kan `status` niet zelf meesturen: die kolom is niet aan de
--    anon-rol gegeven en valt dus altijd terug op de standaardwaarde.
--  * Lengtes en de score worden in de database afgedwongen, niet alleen in de
--    browser. Een aangepaste client komt er dus niet langs.
-- ---------------------------------------------------------------------------

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(btrim(name)) between 2 and 100),
  city text not null check (char_length(btrim(city)) between 2 and 80),
  rating smallint not null check (rating between 1 and 5),
  body text not null check (char_length(btrim(body)) between 10 and 1000),
  service text not null check (char_length(btrim(service)) between 2 and 100),
  -- Standaard 'approved': een ingestuurde review is direct voor iedereen
  -- zichtbaar. Wil je eerst zelf meelezen, zie "Modereren" onderaan.
  status text not null default 'approved'
    check (status in ('pending', 'approved', 'rejected'))
);

comment on table public.reviews is
  'Door bezoekers ingestuurde beoordelingen. Alleen status = approved is publiek zichtbaar.';

-- Snel de publieke lijst kunnen ophalen (nieuwste eerst).
create index if not exists reviews_status_created_at_idx
  on public.reviews (status, created_at desc);

-- --- Rechten ---------------------------------------------------------------
alter table public.reviews enable row level security;

revoke all on public.reviews from anon, authenticated;
grant select on public.reviews to anon, authenticated;
-- Bewust zonder `status` en `id`: die mag de bezoeker niet zelf bepalen.
grant insert (name, city, rating, body, service) on public.reviews to anon, authenticated;

drop policy if exists "Publiek leest goedgekeurde reviews" on public.reviews;
create policy "Publiek leest goedgekeurde reviews"
  on public.reviews
  for select
  to anon, authenticated
  using (status = 'approved');

drop policy if exists "Iedereen mag een review insturen" on public.reviews;
create policy "Iedereen mag een review insturen"
  on public.reviews
  for insert
  to anon, authenticated
  with check (true);

-- ---------------------------------------------------------------------------
-- Modereren (optioneel)
--
-- Wil je reviews eerst zelf lezen voordat ze op de site komen? Draai dan:
--
--   alter table public.reviews alter column status set default 'pending';
--
-- Nieuwe reviews staan dan in het dashboard onder status 'pending' en
-- verschijnen pas op de site zodra jij ze op 'approved' zet. Er is géén
-- aanpassing in de code of een nieuwe deploy voor nodig.
--
-- Een enkele review offline halen kan altijd:
--
--   update public.reviews set status = 'rejected' where id = '...';
-- ---------------------------------------------------------------------------
