import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl));

if (!supabaseConfigured) {
  console.warn(
    "Supabase isn't configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in a " +
      ".env file (local dev) or your host's environment variables (Netlify: Site configuration " +
      "> Environment variables), then redeploy."
  );
}

// Only construct the real client when config looks valid — createClient() throws
// on an empty/invalid URL, which would otherwise crash the whole app before React
// can render anything, producing a blank page with no visible error.
export const supabase = supabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;
