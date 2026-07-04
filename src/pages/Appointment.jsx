import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, Calendar, Clock } from 'lucide-react'
import axiosInstance from '../api/axiosInstance'

const services = ['Residential Interior', 'Commercial Interior', 'Office Interior', 'Restaurant Interior', 'Furniture Design', '3D Visualization', 'General Consultation']
const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']
const meetingTypes = ['In-Person (Studio Visit)', 'Online (Google Meet / Zoom)', 'Phone Call', 'Site Visit']

function Appointment() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    service: '', preferredDate: '', preferredTime: '',
    meetingType: '', message: '',
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
      await axiosInstance.post('/api/appointment', form)
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
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600" alt="Appointment" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
            Schedule a Meeting
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">
            Book an <span style={{ color: 'var(--accent)' }}>Appointment</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="opacity-75 text-lg">
            Schedule a meeting with our design team at your preferred date and time.
          </motion.p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { step: '01', title: 'Fill the Form', desc: 'Enter your details and preferred time slot.' },
              { step: '02', title: 'We Confirm', desc: 'Our team will confirm your appointment within 2 hours.' },
              { step: '03', title: 'Meet & Discuss', desc: 'We discuss your project vision and next steps.' },
            ].map((item) => (
              <div key={item.step} className="p-5">
                <span className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>{item.step}</span>
                <h3 className="font-bold mt-2 mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
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
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Appointment Requested!</h2>
            <p className="mb-2" style={{ color: 'var(--text-secondary)' }}>
              Thank you! We'll confirm your appointment within 2 hours via phone or email.
            </p>
            <button onClick={() => setSuccess(false)} className="mt-6 btn-animated px-7 py-3 rounded font-semibold"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}>
              Book Another Appointment
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="premium-card p-8 space-y-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <h2 className="text-xl font-bold pb-3 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                Appointment Details
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
                  <label className="block text-sm font-medium mb-2" style={labelStyle}>Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2" style={labelStyle}>Service Interested In *</label>
                  <select name="service" value={form.service} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle}>
                    <option value="">Select a service</option>
                    {services.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
                <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Calendar size={18} style={{ color: 'var(--accent)' }} /> Preferred Schedule
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={labelStyle}>Preferred Date *</label>
                    <input name="preferredDate" type="date" value={form.preferredDate} onChange={handleChange} required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={labelStyle}>Preferred Time *</label>
                    <select name="preferredTime" value={form.preferredTime} onChange={handleChange} required
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle}>
                      <option value="">Select time slot</option>
                      {timeSlots.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Meeting Type */}
              <div className="border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
                <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Clock size={18} style={{ color: 'var(--accent)' }} /> Meeting Type *
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {meetingTypes.map((type) => (
                    <label key={type} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition"
                      style={{ backgroundColor: form.meetingType === type ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'var(--bg-section)', border: `1px solid ${form.meetingType === type ? 'var(--accent)' : 'var(--border-color)'}` }}>
                      <input type="radio" name="meetingType" value={type} checked={form.meetingType === type}
                        onChange={handleChange} className="accent-[var(--accent)]" />
                      <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={labelStyle}>Additional Notes (Optional)</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                  placeholder="Any specific topics you'd like to discuss..."
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none" style={inputStyle} />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button type="submit" disabled={loading}
                className="btn-animated w-full flex items-center justify-center gap-2 py-4 rounded-lg font-semibold text-base"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Booking...' : <><Send size={20} /> Book Appointment</>}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}

export default Appointment