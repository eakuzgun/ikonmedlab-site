// Ürünler Listesi Sayfası - Collapsible Alt Kategoriler

import { getAllCategories } from '@/lib/db/categories'
import { getAllSubcategories } from '@/lib/db/subcategories'
import { getAllProducts, getProductsByCategory, getProductsBySubcategory } from '@/lib/db/products'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 3600

export default async function ProductsPage({ searchParams }: any) {
  const categorySlug = searchParams?.category || ''
  const subcategorySlug = searchParams?.subcategory || ''

  const categories = await getAllCategories()
  const allSubcategories = await getAllSubcategories()

  // Ürünleri filtrele
  let products
  if (subcategorySlug && categorySlug) {
    products = await getProductsBySubcategory(categorySlug, subcategorySlug)
  } else if (categorySlug) {
    products = await getProductsByCategory(categorySlug)
  } else {
    products = await getAllProducts()
  }

  const currentCategory = categorySlug
    ? categories.find(cat => cat.slug === categorySlug)
    : null

  const currentSubcategory = subcategorySlug
    ? allSubcategories.find(sub => sub.slug === subcategorySlug)
    : null

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>
            {currentSubcategory 
              ? currentSubcategory.name 
              : currentCategory 
                ? currentCategory.name 
                : 'Ürünlerimiz'}
          </h1>
          <p>
            {currentSubcategory?.description || 
             currentCategory?.description || 
             'Kaliteli tıbbi cihazlar ve laboratuvar ekipmanları'}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-page">
        <div className="container">
          <div className="products-container">
            {/* Sidebar Filters */}
            <aside className="filters-sidebar">
              <div className="filter-group">
                <h3>Kategoriler</h3>
                <div className="filter-options">
                  {categories.map((category) => {
                    const categorySubcategories = allSubcategories.filter(
                      sub => sub.category_id === category.id
                    )
                    const isActive = categorySlug === category.slug
                    const hasSubcategories = categorySubcategories.length > 0

                    return (
                      <div key={category.id} style={{ marginBottom: '0.5rem' }}>
                        <div className="filter-option">
                          <Link 
                            href={`/products?category=${category.slug}`}
                            style={{ 
                              fontWeight: isActive ? '600' : '500',
                              color: isActive ? 'var(--primary-color)' : 'inherit',
                              display: 'block',
                              padding: '0.5rem 0'
                            }}
                          >
                            {category.name}
                          </Link>
                        </div>

                        {isActive && hasSubcategories && (
                          <div style={{ 
                            paddingLeft: '1.5rem',
                            borderLeft: '2px solid var(--border-color)',
                            marginLeft: '0.5rem',
                            marginTop: '0.25rem'
                          }}>
                            {categorySubcategories.map((subcategory) => (
                              <div key={subcategory.id} className="filter-option">
                                <Link 
                                  href={`/products?category=${category.slug}&subcategory=${subcategory.slug}`}
                                  style={{ 
                                    fontWeight: subcategorySlug === subcategory.slug ? '600' : '400',
                                    color: subcategorySlug === subcategory.slug ? 'var(--primary-color)' : 'var(--text-light)',
                                    fontSize: '0.9rem',
                                    display: 'block',
                                    padding: '0.4rem 0',
                                    transition: 'color 0.2s ease'
                                  }}
                                >
                                  {subcategory.name}
                                </Link>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="products-grid">
              {products.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0' }}>
                  <p style={{ fontSize: '1.25rem', color: 'var(--text-light)' }}>
                    Bu kategoride henüz ürün bulunmamaktadır.
                  </p>
                </div>
              ) : (
                products.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-image">
                      {product.main_image ? (
                        <Image
                          src={product.main_image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 280px"
                          style={{ objectFit: 'contain' }}
                          priority={false}
                        />
                      ) : (
                        <div className="product-placeholder">
                          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
                            <polyline points="17 2 12 7 7 2"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="product-info">
                      <span className="product-category">
                        {product.subcategory?.name || product.category?.name || 'Genel'}
                      </span>
                      <h3>{product.name}</h3>
                      <p>{product.short_description}</p>
                      <Link href={`/products/${product.slug}`} className="btn btn-primary">
                        İncele
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// Metadata for SEO
export async function generateMetadata({ searchParams }: any) {
  const categorySlug = searchParams?.category
  const subcategorySlug = searchParams?.subcategory

  if (subcategorySlug) {
    const allSubcategories = await getAllSubcategories()
    const subcategory = allSubcategories.find(sub => sub.slug === subcategorySlug)
    return {
      title: `${subcategory?.name || 'Ürünler'} - İkonmedlab`,
      description: subcategory?.description || 'Tıbbi cihazlar ve laboratuvar ekipmanları',
    }
  }

  if (categorySlug) {
    const categories = await getAllCategories()
    const category = categories.find(cat => cat.slug === categorySlug)
    return {
      title: `${category?.name || 'Ürünler'} - İkonmedlab`,
      description: category?.description || 'Tıbbi cihazlar ve laboratuvar ekipmanları',
    }
  }

  return {
    title: 'Ürünler - ikonmedlab',
    description: 'Kaliteli tıbbi cihazlar ve laboratuvar ekipmanları',
  }
}
