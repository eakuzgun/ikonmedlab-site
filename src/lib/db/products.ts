// Product related database functions

import { createSimpleServerClient } from '@/lib/supabase/simple-server'
import { Product, ProductWithRelations } from '@/lib/supabase/types'

export async function getAllProducts(): Promise<ProductWithRelations[]> {
  const supabase = createSimpleServerClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      subcategory:subcategories(*)
    `)
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function getProductsByCategory(categorySlug: string): Promise<ProductWithRelations[]> {
  const supabase = createSimpleServerClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories!inner(*),
      subcategory:subcategories(*)
    `)
    .eq('is_active', true)
    .eq('category.slug', categorySlug)
    .eq('category.is_active', true)
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data || []
}

export async function getProductsBySubcategory(
  categorySlug: string, 
  subcategorySlug: string
): Promise<ProductWithRelations[]> {
  const supabase = createSimpleServerClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories!inner(*),
      subcategory:subcategories!inner(*)
    `)
    .eq('is_active', true)
    .eq('category.slug', categorySlug)
    .eq('subcategory.slug', subcategorySlug)
    .eq('category.is_active', true)
    .eq('subcategory.is_active', true)
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data || []
}

export async function getProductBySlug(slug: string): Promise<ProductWithRelations | null> {
  const supabase = createSimpleServerClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      subcategory:subcategories(*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  
  if (error) return null
  return data
}

export async function getFeaturedProducts(limit: number = 6): Promise<ProductWithRelations[]> {
  const supabase = createSimpleServerClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      subcategory:subcategories(*)
    `)
    .eq('is_active', true)
    .eq('featured', true)
    .order('display_order', { ascending: true })
    .limit(limit)
  
  if (error) throw error
  return data || []
}

export async function getRelatedProducts(
  productId: string, 
  subcategoryId: string, 
  limit: number = 3
): Promise<ProductWithRelations[]> {
  const supabase = createSimpleServerClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      subcategory:subcategories(*)
    `)
    .eq('is_active', true)
    .eq('subcategory_id', subcategoryId)
    .neq('id', productId)
    .order('display_order', { ascending: true })
    .limit(limit)
  
  if (error) throw error
  return data || []
}