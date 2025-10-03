// Ürün Detay Sayfası

import { getProductBySlug, getRelatedProducts, getAllProducts } from '@/lib/db/products'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 3600

interface ProductDetailPageProps {
  params: { slug: string | string[] }  // string veya string[] olmalı
  searchParams?: Record<string, string | string[] | undefined>
}

// @ts-ignore
export default async function ProductDetailPage({ params }: any) {
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const relatedProducts = product.category_id
    ? await getRelatedProducts(product.id, product.category_id, 3)
    : []

  return (
    <>
      {/* Product Detail Section */}
      <section className="product-detail">
        <div className="container">
          <div className="product-detail-container">
            {/* Product Gallery */}
            <div className="product-gallery">
              <div className="main-image">
                {product.main_image ? (
                  <Image
                    src={product.main_image}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                ) : (
                  <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
                    <polyline points="17 2 12 7 7 2"/>
                  </svg>
                )}
              </div>
              
              {product.images && product.images.length > 0 && (
                <div className="thumbnail-grid">
                  {product.images.slice(0, 4).map((image, index) => (
                    <div key={index} className="thumbnail">
                      <Image
                        src={image}
                        alt={`${product.name} - ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="product-details-content">
              <h1>{product.name}</h1>
              
              <div className="product-meta">
                <div className="meta-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
                  </svg>
                  <span>{product.category?.name || 'Genel'}</span>
                </div>
                <div className="meta-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                  <span>{product.in_stock ? 'Stokta Var' : 'Stokta Yok'}</span>
                </div>
              </div>

              {product.full_description && (
                <div className="product-description">
                  <h3>Ürün Açıklaması</h3>
                  <div dangerouslySetInnerHTML={{ __html: product.full_description.replace(/\n/g, '<br>') }} />
                </div>
              )}

              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="product-description">
                  <h3>Teknik Özellikler</h3>
                  <table className="specs-table">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <tr key={key}>
                          <th>{key}</th>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {product.features && product.features.length > 0 && (
                <div className="product-description">
                  <h3>Öne Çıkan Özellikler</h3>
                  <ul style={{ lineHeight: 2, color: 'var(--text-light)', marginLeft: '1.5rem' }}>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="product-actions">
                <Link href="/contact" className="btn btn-primary">
                  Teklif Al
                </Link>
                <Link href="/products" className="btn btn-secondary">
                  Tüm Ürünler
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Benzer Ürünler</span>
              <h2>İlginizi Çekebilecek Diğer Ürünler</h2>
            </div>
            <div className="products-grid">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="product-card">
                  <div className="product-image">
                    {relatedProduct.main_image ? (
                      <Image
                        src={relatedProduct.main_image}
                        alt={relatedProduct.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="product-placeholder">
                        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="10"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="product-info">
                    <span className="product-category">{relatedProduct.category?.name}</span>
                    <h3>{relatedProduct.name}</h3>
                    <p>{relatedProduct.short_description}</p>
                    <Link href={`/products/${relatedProduct.slug}`} className="btn btn-primary">
                      İncele
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

// Generate static params for all products (for SSG)
export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((product) => ({ slug: product.slug }))
}

// Metadata for SEO
export async function generateMetadata({ params }: any) {
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const product = await getProductBySlug(slug)

  if (!product) return { title: 'Ürün Bulunamadı - ikonmedlab' }

  return {
    title: `${product.name} - ikonmedlab`,
    description: product.short_description || product.full_description,
  }
}