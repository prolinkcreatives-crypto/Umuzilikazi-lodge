import { createClient } from '@supabase/supabase-js';

// Typed via src/vite-env.d.ts. That declaration is a compile-time contract,
// not a runtime guarantee — if .env is missing, Vite leaves these undefined
// at runtime regardless, so the guard below still matters.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase env vars are missing. Copy .env.example to .env and fill in your project URL + anon key. ' +
      'Booking storage and admin login will not work until this is set.',
  );
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');
