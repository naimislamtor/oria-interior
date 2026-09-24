import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react'
import axiosInstance from '../api/axiosInstance'

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '01334003388', href: 'tel:01334003388' },
  { icon: MessageCircle, label: 'WhatsApp', value: '01334003388', href: 'https://wa.me/8801334003388' },
  { icon: Mail, label: 'Email', value: 'info@oriainterior.com', href: 'mailto:info@oriainterior.com' },
  { icon: MapPin, label: 'Address', value: 'Dhaka, Bangladesh', href: '#' },
  { icon: Clock, label: 'Working Hours', value: 'Sat–Thu: 9AM – 7PM', href: '#' },
]

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await axiosInstance.post('/api/contact', form)
      setSuccess(true)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      setError('Something went wrong. Please try again or contact us via WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-section)' }}>
      {/* Header */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600" alt="Contact" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
            Get In Touch
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">
            Contact <span style={{ color: 'var(--accent)' }}>Us</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-xl mx-auto opacity-75 text-lg">
            Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-3 gap-10">
        {/* Contact Info */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="md:col-span-1 space-y-4">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Contact Information</h2>
          {contactInfo.map((info) => {
            const Icon = info.icon
            return (
              <a key={info.label} href={info.href} target={info.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer"
                className="premium-card flex items-center gap-4 p-4 group"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)' }}>
                  <Icon size={20} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{info.label}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{info.value}</p>
                </div>
              </a>
            )
          })}

          {/* Map Embed */}
          <div className="rounded-lg overflow-hidden mt-6" style={{ border: '1px solid var(--border-color)' }}>
            <iframe
              title="Oria Interior Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.8204673057!2d90.27923704!3d23.7808875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1234567890"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="md:col-span-2">
          <div className="premium-card p-8" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Send Us a Message</h2>

            {success ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <CheckCircle2 size={56} className="mx-auto mb-4" style={{ color: 'var(--accent)' }} />
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={() => setSuccess(false)} className="mt-6 btn-animated px-6 py-2 rounded font-semibold text-sm"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}>
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name"
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition"
                      style={{ backgroundColor: 'var(--bg-section)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition"
                      style={{ backgroundColor: 'var(--bg-section)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition"
                      style={{ backgroundColor: 'var(--bg-section)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Subject *</label>
                    <select name="subject" value={form.subject} onChange={handleChange} required
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition"
                      style={{ backgroundColor: 'var(--bg-section)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                      <option value="">Select a subject</option>
                      <option>Residential Interior</option>
                      <option>Commercial Interior</option>
                      <option>Office Interior</option>
                      <option>Restaurant Interior</option>
                      <option>Furniture Design</option>
                      <option>3D Visualization</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition resize-none"
                    style={{ backgroundColor: 'var(--bg-section)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button type="submit" disabled={loading}
                  className="btn-animated w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)', opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'Sending...' : <><Send size={18} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-12" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="font-semibold uppercase tracking-wider text-xs mb-3" style={{ color: 'var(--accent)' }}>Prefer Instant Chat?</p>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-on-dark)' }}>Message Us on WhatsApp</h2>
          <a href="https://wa.me/8801334003388" target="_blank" rel="noopener noreferrer"
            className="btn-animated inline-flex items-center gap-3 px-7 py-3 rounded-lg font-semibold bg-green-500 hover:bg-green-600 text-white transition">
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}

export default Contact