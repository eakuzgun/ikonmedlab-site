// TypeScript types for database

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Subcategory {
  id: string
  category_id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  category_id: string | null
  subcategory_id: string | null
  name: string
  slug: string
  short_description: string | null
  full_description: string | null
  features: string[]
  specifications: Record<string, string>
  images: string[]
  main_image: string | null
  in_stock: boolean
  featured: boolean
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProductWithRelations extends Product {
  category: Category | null
  subcategory: Subcategory | null
}

export interface SubcategoryWithCategory extends Subcategory {
  category: Category | null
}

export interface Testimonial {
  id: string
  author_name: string
  author_title: string | null
  author_initials: string | null
  content: string
  rating: number
  avatar_url: string | null
  display_order: number
  is_active: boolean
  created_at: string
}

export interface ContactSubmission {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

export interface Campaign {
  id: string
  title: string
  description: string | null
  image_url: string | null
  link_url: string | null
  is_active: boolean
  display_order: number
  start_date: string | null
  end_date: string | null
  created_at: string
}

export interface SiteSetting {
  key: string
  value: any
  description: string | null
  updated_at: string
}