import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, MessageCircle } from 'lucide-react'
import axiosInstance from '../api/axiosInstance'

const services = ['Residential Interior', 'Commercial Interior', 'Office Interior', 'Restaurant Interior', 'Furniture Design', '3D Visualization', 'Not Sure Yet']
const budgets = ['Under 1 Lakh', '1-3 Lakh', '3-5 Lakh', '5-10 Lakh', '10 Lakh+', 'Not Decided Yet']
const consultationTypes = ['Online Video Call', 'Phone Call', 'In-Person at Studio', 'Site Visit']

function Consultation() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    service: '', budget: '', consultationType: '',
    projectDescription: '', requirements: '', questions: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await axiosInstance.post('/api/consultation', form)
      setSuccess(true)
    } catch {
      setError('Something went wrong. Please try again or contact us via WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = { backgroundColor: 'var(--bg-section)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }
  const labelStyle = { color: 'var(--text-secondary)' }

  return (
    <div style={{ backgroundColor: 'var(--bg-section)' }}>
      {/* Header */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=1600" alt="Consultation" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
            100% Free
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">
            Free <span style={{ color: 'var(--accent)' }}>Consultation</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="opacity-75 text-lg">
            Not sure where to start? Our experts will guide you — completely free of charge.
          </motion.p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { title: '100% Free', desc: 'No charges, no obligations' },
              { title: 'Expert Advice', desc: 'Direct access to our designers' },
              { title: 'Quick Response', desc: 'We respond within 2 hours' },
              { title: 'Your Choice', desc: 'Online, call, or in-person' },
            ].map((item) => (
              <div key={item.title} className="p-4">
                <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--accent)' }}>{item.title}</h3>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        {success ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="premium-card text-center py-16 px-8" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <CheckCircle2 size={64} className="mx-auto mb-4" style={{ color: 'var(--accent)' }} />
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Consultation Requested!</h2>
            <p className="mb-2" style={{ color: 'var(--text-secondary)' }}>
              Thank you! Our design expert will contact you within 2 hours to schedule your free consultation.
            </p>
            <a href="https://wa.me/8801983890650" target="_blank" rel="noopener noreferrer"
              className="mt-6 btn-animated inline-flex items-center gap-2 px-7 py-3 rounded font-semibold bg-green-500 text-white">
              <MessageCircle size={18} /> Chat on WhatsApp Instead
            </a>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="premium-card p-8 space-y-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <h2 className="text-xl font-bold pb-3 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                Tell Us About Yourself
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2" style={labelStyle}>Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={labelStyle}>Phone Number *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} required placeholder="01XXXXXXXXX"
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2" style={labelStyle}>Email Address</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                </div>
              </div>

              <div className="border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
                <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Project Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={labelStyle}>Service Interested In</label>
                    <select name="service" value={form.service} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle}>
                      <option value="">Select service</option>
                      {services.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={labelStyle}>Approximate Budget</label>
                    <select name="budget" value={form.budget} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle}>
                      <option value="">Select budget range</option>
                      {budgets.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
                <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Consultation Preference *</h3>
                <div className="grid grid-cols-2 gap-3">
                  {consultationTypes.map((type) => (
                    <label key={type} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition"
                      style={{ backgroundColor: form.consultationType === type ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'var(--bg-section)', border: `1px solid ${form.consultationType === type ? 'var(--accent)' : 'var(--border-color)'}` }}>
                      <input type="radio" name="consultationType" value={type} checked={form.consultationType === type}
                        onChange={handleChange} required className="accent-[var(--accent)]" />
                      <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6 space-y-5" style={{ borderColor: 'var(--border-color)' }}>
                <div>
                  <label className="block text-sm font-medium mb-2" style={labelStyle}>Describe Your Project *</label>
                  <textarea name="projectDescription" value={form.projectDescription} onChange={handleChange} required rows={3}
                    placeholder="Brief description of your space and what you're looking to achieve..."
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none" style={inputStyle} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={labelStyle}>Specific Requirements</label>
                  <textarea name="requirements" value={form.requirements} onChange={handleChange} rows={3}
                    placeholder="Any specific styles, materials, or features you have in mind..."
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none" style={inputStyle} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={labelStyle}>Questions for Our Team</label>
                  <textarea name="questions" value={form.questions} onChange={handleChange} rows={2}
                    placeholder="Any questions you'd like answered during the consultation..."
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none" style={inputStyle} />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button type="submit" disabled={loading}
                className="btn-animated w-full flex items-center justify-center gap-2 py-4 rounded-lg font-semibold text-base"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Submitting...' : <><Send size={20} /> Request Free Consultation</>}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}

export default Consultation