// Campaign related database functions

import { createSimpleServerClient } from '@/lib/supabase/simple-server'
import { Campaign } from '@/lib/supabase/types'

export async function getActiveCampaigns(): Promise<Campaign[]> {
const supabase = createSimpleServerClient()
  
  const now = new Date().toISOString()
  
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('is_active', true)
    .or(`start_date.is.null,start_date.lte.${now}`)
    .or(`end_date.is.null,end_date.gte.${now}`)
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data || []
}