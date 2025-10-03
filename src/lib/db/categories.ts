// Category related database functions

import { createSimpleServerClient } from '@/lib/supabase/simple-server'
import { Category } from '@/lib/supabase/types'

export async function getAllCategories(): Promise<Category[]> {
const supabase = createSimpleServerClient()
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data || []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
const supabase = createSimpleServerClient()
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  
  if (error) return null
  return data
}