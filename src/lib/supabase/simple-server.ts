// src/lib/supabase/simple-server.ts
import { createClient } from '@supabase/supabase-js'

export function createSimpleServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false
      }
    }
  )
}