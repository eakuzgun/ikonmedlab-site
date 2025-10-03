// Contact form submission

import { createClient } from '@/lib/supabase/client'
import { ContactSubmission } from '@/lib/supabase/types'

export async function submitContactForm(data: ContactSubmission) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('contact_submissions')
    .insert([data])
  
  if (error) throw error
  return { success: true }
}