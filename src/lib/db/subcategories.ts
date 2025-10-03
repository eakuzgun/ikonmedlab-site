// Subcategory related database functions

import { createSimpleServerClient } from '@/lib/supabase/simple-server'
import { Subcategory, SubcategoryWithCategory } from '@/lib/supabase/types'

export async function getAllSubcategories(): Promise<SubcategoryWithCategory[]> {
  const supabase = createSimpleServerClient()
  
  const { data, error } = await supabase
    .from('subcategories')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data || []
}

export async function getSubcategoriesByCategory(categorySlug: string): Promise<Subcategory[]> {
  const supabase = createSimpleServerClient()
  
  const { data, error } = await supabase
    .from('subcategories')
    .select(`
      *,
      category:categories!inner(*)
    `)
    .eq('is_active', true)
    .eq('category.slug', categorySlug)
    .eq('category.is_active', true)
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data || []
}

export async function getSubcategoryBySlug(categorySlug: string, subcategorySlug: string): Promise<SubcategoryWithCategory | null> {
  const supabase = createSimpleServerClient()
  
  const { data, error } = await supabase
    .from('subcategories')
    .select(`
      *,
      category:categories!inner(*)
    `)
    .eq('slug', subcategorySlug)
    .eq('is_active', true)
    .eq('category.slug', categorySlug)
    .eq('category.is_active', true)
    .single()
  
  if (error) return null
  return data
}