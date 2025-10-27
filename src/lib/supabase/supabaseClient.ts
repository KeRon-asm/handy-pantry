// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// These come from your Supabase project settings → API
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
