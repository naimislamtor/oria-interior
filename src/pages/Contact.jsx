import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react'

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+880 1983890650', href: 'tel:+8801983890650' },
  { icon: Mail, label: 'Email', value: 'info@oriointerior.com', href: 'mailto:info@oriointerior.com' },
  { icon: MapPin, label: 'Address', value: 'Dhaka, Bangladesh', href: '#' },
  { icon: Clock, label: 'Working Hours', value: 'Sat–Thu: 9am – 7pm', href: null },
]

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // TODO: connect to backend API
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-section)' }}>
      {/* Header */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600"
            alt="Contact"
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-semibold uppercase tracking-wider text-sm mb-3"
            style={{ color: 'var(--accent)' }}
          >
            Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Contact <span style={{ color: 'var(--accent)' }}>Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto opacity-75 text-lg"
          >
            Have a project in mind? We'd love to hear about it. Reach out and we'll get back to you shortly.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-3 gap-10">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <div>
            <p className="font-semibold uppercase tracking-wider text-sm mb-2" style={{ color: 'var(--accent)' }}>
              Contact Info
            </p>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Let's Talk
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Whether you have a question about our services, pricing, or just want to say hello — we're here for you.
            </p>
          </div>

          {contactInfo.map((info) => {
            const Icon = info.icon
            return (
              <div
                key={info.label}
                className="premium-card flex items-start gap-4 p-5"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)' }}
                >
                  <Icon size={20} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--text-muted)' }}>
                    {info.label}
                  </p>
                  {info.href && info.href !== '#' ? (
                    <a href={info.href} className="text-sm font-medium hover:underline" style={{ color: 'var(--text-primary)' }}>
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{info.value}</p>
                  )}
                </div>
              </div>
            )
          })}

          {/* WhatsApp Quick Link */}
          <a
            href="https://wa.me/8801983890650"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-animated flex items-center justify-center gap-2 w-full py-3 rounded font-semibold bg-green-500 hover:bg-green-600 text-white transition"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2"
        >
          <div
            className="premium-card p-8"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
          >
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 size={60} style={{ color: 'var(--accent)' }} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Message Sent!
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                  Send Us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { name: 'name', label: 'Full Name', placeholder: 'Your name', type: 'text' },
                      { name: 'email', label: 'Email Address', placeholder: 'your@email.com', type: 'email' },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={form[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          required
                          className="w-full px-4 py-3 rounded-lg text-sm outline-none border transition focus:ring-2"
                          style={{
                            backgroundColor: 'var(--bg-section)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-primary)',
                          }}
                          onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                          onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { name: 'phone', label: 'Phone Number', placeholder: '+880 XXXXXXXXX', type: 'tel' },
                      { name: 'subject', label: 'Subject', placeholder: 'Project inquiry', type: 'text' },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={form[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 rounded-lg text-sm outline-none border transition"
                          style={{
                            backgroundColor: 'var(--bg-section)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-primary)',
                          }}
                          onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                          onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none border transition resize-none"
                      style={{
                        backgroundColor: 'var(--bg-section)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-primary)',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-animated w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
                  >
                    {loading ? 'Sending...' : (
                      <><Send size={18} /> Send Message</>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </section>

      {/* Google Map Placeholder */}
      <section className="h-72 w-full" style={{ backgroundColor: 'var(--bg-primary)', opacity: 0.9 }}>
        <iframe
          title="Orio Interior Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.3756576427!2d90.27923508474576!3d23.780573019643654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1720000000000!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
      </section>
    </div>
  )
}

export default Contact