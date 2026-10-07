import { supabase, getSupabaseConfig, getSupabaseClient } from '../lib/supabase';

export { getSupabaseConfig, getSupabaseClient, supabase };

export const saveSupabaseConfig = (_url: string, _anonKey: string) => {
  // Production configuration is driven by VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel
};

export const clearSupabaseConfig = () => {
  // No-op
};
