// src/app/page.tsx
import { getAllCategories } from '@/lib/db/categories'
import { getFeaturedProducts } from '@/lib/db/products'
import { getAllTestimonials } from '@/lib/db/testimonials'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 3600

export default async function HomePage() {
  const [categories, featuredProducts, testimonials] = await Promise.all([
    getAllCategories(),
    getFeaturedProducts(3),
    getAllTestimonials()
  ])

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h2 className="hero-title">Sağlıkta İnovasyon, Teknolojide Öncü</h2>
            <p className="hero-subtitle">
              Modern tıbbi cihazlar ve laboratuvar ekipmanları ile sağlık hizmetlerinizi en üst seviyeye taşıyoruz
            </p>
            <div className="hero-buttons">
              <Link href="/products" className="btn btn-primary">
                Ürünleri Keşfet
              </Link>
              {/* <Link href="/contact" className="btn btn-secondary">
                Teklif Al
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-intro">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Hakkımızda</span>
            <h2>Güvenilir Medikal Çözümler</h2>
          </div>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <h3>Kaliteli Ürünler</h3>
              <p>Uluslararası standartlara uygun, sertifikalı tıbbi cihazlar</p>
            </div>
            <div className="about-card">
              <div className="about-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3>Hızlı Teslimat</h3>
              <p>Zamanında ve güvenli teslimat garantisi</p>
            </div>
            <div className="about-card">
              <div className="about-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>Uzman Destek</h3>
              <p>7/24 teknik destek ve eğitim hizmetleri</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Ürünler</span>
            <h2>Öne Çıkan Kategoriler</h2>
          </div>
          <div className="product-categories">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <div className="category-image">
                  {category.image_url ? (
                    <Image
                      src={category.image_url}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="category-placeholder">
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                        <line x1="8" y1="21" x2="16" y2="21"/>
                        <line x1="12" y1="17" x2="12" y2="21"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="category-content">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <Link href={`/products?category=${category.slug}`} className="btn-link">
                    İncele →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Referanslar</span>
            <h2>Müşterilerimiz Ne Diyor?</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="stars">{'★'.repeat(testimonial.rating)}</div>
                <p className="testimonial-text">{testimonial.content}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.avatar_url ? (
                      <Image
                        src={testimonial.avatar_url}
                        alt={testimonial.author_name}
                        width={50}
                        height={50}
                        style={{ borderRadius: '50%' }}
                      />
                    ) : (
                      <span>{testimonial.author_initials || testimonial.author_name.substring(0, 2)}</span>
                    )}
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.author_name}</h4>
                    <p>{testimonial.author_title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Projeleriniz İçin Özel Teklif Alın</h2>
            <p>Uzman ekibimiz size en uygun çözümü sunmak için hazır</p>
            <Link href="/contact" className="btn btn-primary">
              Hemen İletişime Geçin
            </Link>
          </div>
        </div>
      </section> */}
    </>
  )
}