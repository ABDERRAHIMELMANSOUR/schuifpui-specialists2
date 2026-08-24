/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Supabase project-URL, bv. https://xxxx.supabase.co (zie .env.example). */
  readonly VITE_SUPABASE_URL?: string;
  /** Publieke anon-key van het Supabase-project. Nooit de service_role-key. */
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
