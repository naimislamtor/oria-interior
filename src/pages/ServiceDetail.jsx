import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { servicesData } from '../data/servicesData'

function ServiceDetail() {
  const { slug } = useParams()
  const service = servicesData.find((s) => s.slug === slug)

  if (!service) {
    return <Navigate to="/services" replace />
  }

  const Icon = service.icon
  const otherServices = servicesData.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <div style={{ backgroundColor: 'var(--bg-section)' }}>
      {/* Hero */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
      >
        <div className="absolute inset-0">
          <img
            src={service.heroImg}
            alt={service.title}
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm mb-6 opacity-70 hover:opacity-100 transition"
          >
            <ArrowLeft size={16} /> Back to Services
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            <Icon className="text-white" size={28} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl"
          >
            {service.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl opacity-75 text-lg"
          >
            {service.shortDesc}
          </motion.p>
        </div>
      </section>

      {/* Overview + Features */}
      <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
            Overview
          </p>
          <h2 className="text-3xl font-bold mb-5" style={{ color: 'var(--text-primary)' }}>
            How We Approach It
          </h2>
          <p className="leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
            {service.overview}
          </p>
          <Link
            to="/quote"
            className="btn-animated inline-flex items-center gap-2 px-7 py-3 rounded font-semibold"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
          >
            Get a Free Quote <ArrowRight size={18} className="icon-slide" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="premium-card p-8"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
        >
          <h3 className="text-lg font-bold mb-5" style={{ color: 'var(--text-primary)' }}>
            What's Included
          </h3>
          <div className="space-y-4">
            {service.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <CheckCircle2 size={18} style={{ color: 'var(--accent)' }} className="flex-shrink-0" />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Gallery */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
              Gallery
            </p>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {service.title} Showcase
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {service.gallery.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="overflow-hidden rounded-lg group cursor-pointer"
              >
                <img
                  src={img}
                  alt={`${service.title} ${idx + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
            Explore More
          </p>
          <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Other Services
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherServices.map((s) => {
            const OtherIcon = s.icon
            return (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="premium-card block p-6 group"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)' }}
                >
                  <OtherIcon style={{ color: 'var(--accent)' }} size={22} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.shortDesc}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: 'var(--accent)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--bg-primary)' }}>
            Ready to Get Started?
          </h2>
          <p className="mb-8 max-w-xl mx-auto opacity-80" style={{ color: 'var(--bg-primary)' }}>
            Let's discuss your {service.title.toLowerCase()} project today.
          </p>
          <Link
            to="/contact"
            className="btn-animated inline-flex items-center gap-2 px-7 py-3 rounded font-semibold"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
          >
            Contact Us <ArrowRight size={18} className="icon-slide" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetail