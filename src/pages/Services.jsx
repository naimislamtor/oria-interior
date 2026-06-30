import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { servicesData } from '../data/servicesData'

function Services() {
  return (
    <div style={{ backgroundColor: 'var(--bg-section)' }}>
      {/* Page Header */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=1600"
            alt="Our Services"
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-semibold uppercase tracking-wider text-sm mb-3"
            style={{ color: 'var(--accent)' }}
          >
            What We Offer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our <span style={{ color: 'var(--accent)' }}>Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto opacity-75 text-lg"
          >
            From residential homes to commercial spaces — explore the full range
            of design services we offer to bring your vision to life.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="premium-card block group"
                  style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                >
                  <div className="overflow-hidden h-56">
                    <img
                      src={service.heroImg}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 -mt-12 relative z-10 border-4"
                      style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--bg-card)' }}
                    >
                      <Icon className="text-white" size={22} />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {service.shortDesc}
                    </p>
                    <span
                      className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
                      style={{ color: 'var(--accent)' }}
                    >
                      Learn More <ArrowRight size={16} className="icon-slide" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: 'var(--accent)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--bg-primary)' }}>
            Not Sure Which Service You Need?
          </h2>
          <p className="mb-8 max-w-xl mx-auto opacity-80" style={{ color: 'var(--bg-primary)' }}>
            Book a free consultation and let our experts guide you to the right solution.
          </p>
          <Link
            to="/consultation"
            className="btn-animated inline-flex items-center gap-2 px-7 py-3 rounded font-semibold"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
          >
            Book Free Consultation <ArrowRight size={18} className="icon-slide" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Services