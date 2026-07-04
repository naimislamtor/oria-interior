import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, Upload, X } from 'lucide-react'
import axiosInstance from '../api/axiosInstance'

const services = ['Residential Interior', 'Commercial Interior', 'Office Interior', 'Restaurant Interior', 'Furniture Design', '3D Visualization']
const budgets = ['Under 1 Lakh', '1-3 Lakh', '3-5 Lakh', '5-10 Lakh', '10-20 Lakh', '20 Lakh+']
const sizes = ['Under 500 sqft', '500-1000 sqft', '1000-2000 sqft', '2000-3500 sqft', '3500+ sqft']

function QuoteRequest() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '',
    service: '', projectSize: '', rooms: '', projectAddress: '',
    budget: '', startDate: '', deadline: '',
    description: '', heardFrom: '',
  })
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleFile = (e) => {
    const selected = Array.from(e.target.files).slice(0, 5)
    setFiles(selected)
  }

  const removeFile = (idx) => setFiles(files.filter((_, i) => i !== idx))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = new FormData()
      Object.entries(form).forEach(([k, v]) => data.append(k, v))
      files.forEach((f) => data.append('files', f))
      await axiosInstance.post('/api/quote', data)
      setSuccess(true)
    } catch {
      setError('Something went wrong. Please try again or contact us via WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    backgroundColor: 'var(--bg-section)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
  }

  const labelStyle = { color: 'var(--text-secondary)' }

  return (
    <div style={{ backgroundColor: 'var(--bg-section)' }}>
      {/* Header */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600" alt="Quote" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
            Free Quotation
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">
            Get a <span style={{ color: 'var(--accent)' }}>Free Quote</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="opacity-75 text-lg">
            Fill in your project details and we'll send you a detailed quotation within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        {success ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="premium-card text-center py-16 px-8" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <CheckCircle2 size={64} className="mx-auto mb-4" style={{ color: 'var(--accent)' }} />
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Quote Request Sent!</h2>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              Thank you! Our team will review your project details and send you a detailed quotation within 24 hours.
            </p>
            <button onClick={() => setSuccess(false)} className="btn-animated px-7 py-3 rounded font-semibold"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}>
              Submit Another Request
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">

              {/* Personal Info */}
              <div className="premium-card p-8" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h2 className="text-lg font-bold mb-6 pb-3 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                  <span style={{ color: 'var(--accent)' }}>01.</span> Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { name: 'name', label: 'Full Name *', placeholder: 'Your full name', required: true },
                    { name: 'email', label: 'Email Address *', placeholder: 'your@email.com', type: 'email', required: true },
                    { name: 'phone', label: 'Phone Number *', placeholder: '01XXXXXXXXX', required: true },
                    { name: 'city', label: 'City / Location *', placeholder: 'e.g. Dhaka', required: true },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium mb-2" style={labelStyle}>{field.label}</label>
                      <input name={field.name} type={field.type || 'text'} value={form[field.name]}
                        onChange={handleChange} required={field.required} placeholder={field.placeholder}
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="premium-card p-8" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h2 className="text-lg font-bold mb-6 pb-3 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                  <span style={{ color: 'var(--accent)' }}>02.</span> Project Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={labelStyle}>Service Type *</label>
                    <select name="service" value={form.service} onChange={handleChange} required
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle}>
                      <option value="">Select service</option>
                      {services.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={labelStyle}>Project Size</label>
                    <select name="projectSize" value={form.projectSize} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle}>
                      <option value="">Select size</option>
                      {sizes.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={labelStyle}>Number of Rooms</label>
                    <input name="rooms" type="number" value={form.rooms} onChange={handleChange} placeholder="e.g. 3"
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={labelStyle}>Project Address</label>
                    <input name="projectAddress" value={form.projectAddress} onChange={handleChange} placeholder="Project location"
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                  </div>
                </div>
              </div>

              {/* Budget & Timeline */}
              <div className="premium-card p-8" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h2 className="text-lg font-bold mb-6 pb-3 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                  <span style={{ color: 'var(--accent)' }}>03.</span> Budget & Timeline
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={labelStyle}>Budget Range *</label>
                    <select name="budget" value={form.budget} onChange={handleChange} required
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle}>
                      <option value="">Select budget</option>
                      {budgets.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={labelStyle}>Expected Start Date</label>
                    <input name="startDate" type="date" value={form.startDate} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={labelStyle}>Project Deadline</label>
                    <input name="deadline" type="date" value={form.deadline} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="premium-card p-8" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h2 className="text-lg font-bold mb-6 pb-3 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                  <span style={{ color: 'var(--accent)' }}>04.</span> Additional Information
                </h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={labelStyle}>Project Description *</label>
                    <textarea name="description" value={form.description} onChange={handleChange} required rows={4}
                      placeholder="Describe your project, style preferences, specific requirements..."
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none" style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={labelStyle}>Upload Files (Floor plan, reference images — max 5)</label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:opacity-80 transition"
                      style={{ borderColor: 'var(--border-color)' }}
                      onClick={() => document.getElementById('fileInput').click()}>
                      <Upload size={24} className="mx-auto mb-2" style={{ color: 'var(--accent)' }} />
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Click to upload or drag & drop</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>PNG, JPG, PDF up to 10MB each</p>
                      <input id="fileInput" type="file" multiple accept="image/*,.pdf" onChange={handleFile} className="hidden" />
                    </div>
                    {files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {files.map((f, idx) => (
                          <div key={idx} className="flex items-center justify-between px-3 py-2 rounded-lg text-sm"
                            style={{ backgroundColor: 'var(--bg-section)', border: '1px solid var(--border-color)' }}>
                            <span style={{ color: 'var(--text-primary)' }}>{f.name}</span>
                            <button type="button" onClick={() => removeFile(idx)}>
                              <X size={16} style={{ color: 'var(--text-muted)' }} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={labelStyle}>How did you hear about us?</label>
                    <select name="heardFrom" value={form.heardFrom} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle}>
                      <option value="">Select an option</option>
                      <option>Facebook</option>
                      <option>Instagram</option>
                      <option>Google Search</option>
                      <option>Friend / Referral</option>
                      <option>YouTube</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button type="submit" disabled={loading}
                className="btn-animated w-full flex items-center justify-center gap-2 py-4 rounded-lg font-semibold text-base"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Submitting...' : <><Send size={20} /> Submit Quote Request</>}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}

export default QuoteRequest