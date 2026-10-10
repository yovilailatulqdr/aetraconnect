import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables are the single source of truth for Supabase URL and Anon Key
const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(envUrl) &&
    Boolean(envKey) &&
    envUrl.startsWith('https://') &&
    !envUrl.includes('placeholder') &&
    !envUrl.includes('your-project') &&
    !envKey.includes('placeholder') &&
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

let _supabaseClientInstance: SupabaseClient | null = null;

// Initialize Supabase Client with persistent Auth session support
export const getSupabaseClient = (): SupabaseClient => {
  if (!isSupabaseConfigured()) {
    throw new Error(
      'Supabase belum dikonfigurasi. Harap tentukan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di environment variables Vercel/Vite Anda.'
    );
  }

  if (!_supabaseClientInstance) {
    _supabaseClientInstance = createClient(envUrl, envKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  return _supabaseClientInstance;
};

// Safe exported client: if configured returns real client; if unconfigured throws clear error on access
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!isSupabaseConfigured()) {
      throw new Error(
        `Koneksi Supabase tidak aktif (mengakses: ${String(prop)}). Harap isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di environment variables.`
      );
    }
    const realClient = getSupabaseClient();
    const value = (realClient as any)[prop];
    return typeof value === 'function' ? value.bind(realClient) : value;
  },
});

export const reloadSupabaseClient = () => {
  _supabaseClientInstance = null;
  return isSupabaseConfigured() ? getSupabaseClient() : null;
};

