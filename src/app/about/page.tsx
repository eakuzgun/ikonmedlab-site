// src/app/about/page.tsx
// Hakkımızda Sayfası

export const metadata = {
  title: 'Hakkımızda - ikonmedlab',
  description: 'İkonmedlab hakkında detaylı bilgi',
}

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="container">
          <h1>Hakkımızda</h1>
          <p>Sağlık sektörüne değer katan, kaliteli ve güvenilir tıbbi ekipman çözümleri sunuyoruz</p>
        </div>
      </section>

      <section className="about-page">
        <div className="container">
          <div className="mission-vision">
            <div className="mission-card">
              <h2>Misyonumuz</h2>
              <p>
                İkonmedlab olarak, sağlık hizmeti sunan tüm kuruluşlara en kaliteli tıbbi cihazlar ve laboratuvar 
                ekipmanlarını sunmayı misyon edindik. Müşterilerimizin ihtiyaçlarını anlamak, onlara en uygun 
                çözümleri sunmak ve sağlık hizmetlerinin kalitesini artırmaya katkıda bulunmak temel hedefimizdir.
              </p>
              <p>
                Güvenilir, yenilikçi ve müşteri odaklı yaklaşımımızla, sağlık sektöründe fark yaratan bir iş 
                ortağı olmayı hedefliyoruz. Ürünlerimiz ve hizmetlerimizle insan sağlığına değer katıyoruz.
              </p>
            </div>
            <div className="vision-card">
              <h2>Vizyonumuz</h2>
              <p>
                Türkiye'de tıbbi cihaz ve laboratuvar ekipmanları sektöründe önde gelen, güvenilir ve tercih edilen 
                bir marka olmak vizyonumuzdur. Sürekli gelişen teknolojileri takip ederek, müşterilerimize en son 
                yenilikleri sunmayı amaçlıyoruz.
              </p>
              <p>
                Uluslararası standartlara uygun ürünler, profesyonel hizmet anlayışı ve güçlü teknik destek ile 
                sektörde lider konuma ulaşmak ve bu konumu sürdürülebilir kılmak en büyük vizyonumuzdur.
              </p>
            </div>
          </div>

          <div className="product-description" style={{ maxWidth: '900px', margin: '4rem auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Hikayemiz</h2>
            <p>
              İkonmedlab, sağlık sektörüne hizmet etme tutkusuyla kurulmuş, yenilikçi ve dinamik bir firmadır. 
              Yılların deneyimi ve sektör bilgisiyle, hastaneler, klinikler, özel laboratuvarlar ve eğitim 
              kurumlarına kapsamlı çözümler sunmaktayız.
            </p>
            <p>
              Kurulduğumuz günden bu yana, müşteri memnuniyetini ön planda tutarak, kaliteli ürünler ve 
              profesyonel hizmet anlayışıyla büyümeye devam ediyoruz. Çalışma prensiplerimiz, şeffaflık, 
              güvenilirlik ve sürdürülebilir iş ortaklıklarına dayanmaktadır.
            </p>
          </div>

          <div className="values-section">
            <div className="section-header">
              <span className="section-tag">Değerlerimiz</span>
              <h2>Bizi Biz Yapan Değerler</h2>
            </div>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h3>Güvenilirlik</h3>
                <p>Müşterilerimize her zaman en kaliteli ve sertifikalı ürünleri sunuyoruz</p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <h3>Yenilikçilik</h3>
                <p>Sektördeki en son teknolojileri takip ederek yenilikçi çözümler üretiyoruz</p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3>Müşteri Odaklılık</h3>
                <p>Müşterilerimizin ihtiyaçlarını anlamak ve en iyi çözümü sunmak önceliğimiz</p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <h3>Kalite</h3>
                <p>Uluslararası standartlara uygun, CE sertifikalı ürünlerle hizmet veriyoruz</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>İşbirliği Yapmak İster Misiniz?</h2>
            <p>Projeleriniz için en uygun çözümleri birlikte belirleyelim</p>
            <a href="/contact" className="btn btn-primary">İletişime Geçin</a>
          </div>
        </div>
      </section> */}
    </>
  )
}