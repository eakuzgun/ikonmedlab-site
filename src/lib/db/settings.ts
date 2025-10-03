// Site settings

import { createSimpleServerClient } from '@/lib/supabase/simple-server'

export async function getSiteSetting(key: string): Promise<any> {
  const supabase = createSimpleServerClient()
  
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .single()
  
  if (error) return null
  return data?.value
}

export async function getContactInfo() {
  return await getSiteSetting('contact_info')
}

export async function getSocialMedia() {
  return await getSiteSetting('social_media')
}

export async function getBusinessHours() {
  return await getSiteSetting('business_hours')
}