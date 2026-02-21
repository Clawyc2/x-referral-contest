import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dpdcdunyiusdbsinbzlo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwZGNkdW55aXVzZGJzaW5iemxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1NTI4NzEsImV4cCI6MjA1NTEyODg3MX0.xQqr36eR2SXxXyBr_79Rwg_sdaDZXNmPj3jC8Lp5hqA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
