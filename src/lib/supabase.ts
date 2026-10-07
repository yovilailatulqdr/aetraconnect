import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables are the single source of truth for Supabase URL and Anon Key
const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(envUrl) &&
    Boolean(envKey) &&
    envUrl.startsWith('https://') &&
    !envUrl.includes('your-project') &&
    !envKey.includes('your-anon-key')
  );
};

export const getStoredSupabaseCredentials = () => {
  return { url: envUrl, key: envKey };
};

export const getSupabaseConfig = () => {
  return {
    url: envUrl,
    anonKey: envKey ? `${envKey.substring(0, 15)}...${envKey.slice(-6)}` : '',
    isConfigured: isSupabaseConfigured(),
  };
};

// Initialize Supabase Client with persistent Auth session support
export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured() ? envUrl : 'https://placeholder-project.supabase.co',
  isSupabaseConfigured() ? envKey : 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export const getSupabaseClient = (): SupabaseClient => supabase;

export const reloadSupabaseClient = () => supabase;

