import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dpdcdunyiusdbsinbzlo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_xQqr36eR2SXxXyBr_79Rwg_sdaDZXNm';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
