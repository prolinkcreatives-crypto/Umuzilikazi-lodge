import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

interface AuthState {
  session: Session | null;
  isAuthenticated: boolean;
  initializing: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  init: () => void;
}

/**
 * Real auth via Supabase (Authentication -> Users in your project dashboard).
 * No credentials are hardcoded in this app anymore — create the admin
 * account directly in Supabase. See README for setup steps.
 */
export const useAuthStore = create<AuthState>()((set) => ({
  session: null,
  isAuthenticated: false,
  initializing: true,

  init: () => {
    supabase.auth.getSession().then(({ data }) => {
      set({ session: data.session, isAuthenticated: !!data.session, initializing: false });
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, isAuthenticated: !!session });
    });
  },

  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { ok: false, error: error.message };
    set({ session: data.session, isAuthenticated: !!data.session });
    return { ok: true };
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ session: null, isAuthenticated: false });
  },
}));
