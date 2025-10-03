// Testimonial related database functions

import { createSimpleServerClient } from '@/lib/supabase/simple-server'
import { Testimonial } from '@/lib/supabase/types'

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const supabase = createSimpleServerClient()
  
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}