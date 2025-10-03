// Contact Form Component (Client Component)

'use client'

import { useState, FormEvent } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: data.message })
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
      } else {
        setSubmitMessage({ type: 'error', text: data.error })
      }
    } catch (error) {
      setSubmitMessage({ 
        type: 'error', 
        text: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-form">
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-dark)' }}>Mesaj Gönderin</h2>
      
      {submitMessage && (
        <div style={{
          padding: '1rem',
          marginBottom: '1.5rem',
          borderRadius: '8px',
          backgroundColor: submitMessage.type === 'success' ? '#d4edda' : '#f8d7da',
          color: submitMessage.type === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${submitMessage.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {submitMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Ad Soyad *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            placeholder="Adınızı ve soyadınızı girin"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-posta *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            placeholder="E-posta adresinizi girin"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Telefon</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            placeholder="Telefon numaranızı girin"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Konu</label>
          <input 
            type="text" 
            id="subject" 
            name="subject" 
            placeholder="Mesajınızın konusu"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Mesajınız *</label>
          <textarea 
            id="message" 
            name="message" 
            required 
            placeholder="Mesajınızı buraya yazın..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary form-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
        </button>
      </form>
    </div>
  )
}