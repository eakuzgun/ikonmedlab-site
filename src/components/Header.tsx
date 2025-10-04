'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { FaWhatsapp } from "react-icons/fa"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [subcategories, setSubcategories] = useState<any[]>([])
  const pathname = usePathname()

  useEffect(() => {
    // Alt kategorileri client-side'da çek
    fetch('/api/subcategories')
      .then(res => res.json())
      .then(data => setSubcategories(data))
      .catch(err => console.error('Subcategories fetch error:', err))
  }, [])

  // Kapat: rota değiştiğinde mobil menüyü kapat
  useEffect(() => {
    // Eğer mobil menü açıksa ve pathname değiştiyse kapat
    if (mobileMenuOpen) setMobileMenuOpen(false)
  }, [pathname])

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname?.startsWith(path)
  }

  // Cihaz grubu alt kategorileri
  const cihazSubcategories = subcategories.filter(sub => 
    sub.category?.slug === 'cihaz'
  )

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link href="/" className="logo">
            {/* Logo varsa göster, yoksa text göster */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* Logo - public/logo.png dosyası varsa gösterilir */}
              <div style={{ position: 'relative', width: '185px', height: '38px' }}>
                <Image 
                  src="/logo.png" 
                  alt="İkonmedlab Logo" 
                  fill
                  sizes="(max-width: 768px) 150px, (max-width: 1200px) 200px, 250px"
                  style={{ objectFit: 'contain' }}
                  priority
                  onError={(e) => {
                    // Logo yoksa gizle
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              {/* Text Logo - Her zaman gösterilir */}
              {/* <div>
                <h1>İKONMEDLAB</h1>
                <span className="logo-subtitle">Tıbbi Sistemler</span>
              </div> */}
            </div>
          </Link>
          
          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <li>
              <Link 
                href="/" 
                className={isActive('/') && !pathname?.includes('products') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className={isActive('/about') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Hakkımızda
              </Link>
            </li>
            <li className="dropdown">
              <Link 
                href="/products" 
                className={isActive('/products') ? 'active' : ''}
              >
                Ürünler
              </Link>              
            </li>
            <li>
                <a 
                    href="https://wa.me/905310264266" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="whatsapp-button"
                >
                    <FaWhatsapp className="whatsapp-icon" />
                    Hızlı İletişim
                </a>
            </li>
          </ul>

          <button 
            className="mobile-menu-toggle" 
            aria-label="Menüyü Aç"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span style={{
              transform: mobileMenuOpen ? 'rotate(45deg) translateY(8px)' : 'none'
            }}></span>
            <span style={{
              opacity: mobileMenuOpen ? '0' : '1'
            }}></span>
            <span style={{
              transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none'
            }}></span>
          </button>
        </nav>
      </div>
    </header>
  )
}