import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Diagnostico = {
  id?: string;
  email: string;
  visitors: number;
  conversionRate: number;
  ticket: number;
  annualLoss: number;
  created_at?: string;
  whatsapp_sent?: boolean;
};
