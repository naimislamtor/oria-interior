import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, Wrench, Paintbrush, Zap, Droplets, Grid3x3,
  Sofa, AirVent, Home, CheckCircle2, Clock, Shield, ThumbsUp
} from 'lucide-react'

const maintenanceServices = [
  {
    icon: Paintbrush,
    title: 'Painting & Wall Finishing',
    desc: 'Interior and exterior painting, wall texture, putty work, and premium finish coatings for a fresh new look.',
    features: ['Interior & Exterior Painting', 'Wall Texture & Design', 'Putty & Primer Work', 'Waterproof Coating'],
  },
  {
    icon: Droplets,
    title: 'Plumbing Repair',
    desc: 'Expert plumbing solutions including leak fixing, pipe replacement, bathroom fittings and drainage repairs.',
    features: ['Leak Detection & Fixing', 'Pipe Replacement', 'Bathroom Fitting', 'Drainage Repair'],
  },
  {
    icon: Zap,
    title: 'Electrical Work',
    desc: 'Safe and certified electrical services including wiring, switch installation, lighting and panel upgrades.',
    features: ['Wiring & Rewiring', 'Switch & Socket Install', 'Lighting Setup', 'Panel Upgrades'],
  },
  {
    icon: Grid3x3,
    title: 'False Ceiling Repair',
    desc: 'Professional false ceiling installation, repair and finishing for a premium interior look.',
    features: ['Gypsum Board Ceiling', 'POP Ceiling Repair', 'LED Cove Lighting', 'Crack & Water Damage Fix'],
  },
  {
    icon: Home,
    title: 'Flooring Repair & Replacement',
    desc: 'Complete flooring solutions including tile fixing, wooden floor repair, marble polishing and vinyl installation.',
    features: ['Tile Fixing & Grouting', 'Marble Polishing', 'Wooden Floor Repair', 'Vinyl & Laminate Install'],
  },
  {
    icon: Sofa,
    title: 'Furniture Repair & Polish',
    desc: 'Restore your furniture to its original glory with professional repair, polish and upholstery services.',
    features: ['Wood Repair & Polish', 'Upholstery Work', 'Hinge & Lock Fixing', 'Custom Refinishing'],
  },
  {
    icon: AirVent,
    title: 'AC Installation & Service',
    desc: 'AC installation, servicing, gas refilling and repair by certified technicians.',
    features: ['AC Installation', 'Deep Cleaning Service', 'Gas Refilling', 'Repair & Troubleshoot'],
  },
  {
    icon: Wrench,
    title: 'General Home Maintenance',
    desc: 'All-round home maintenance package covering door, window, hardware fixes and seasonal upkeep.',
    features: ['Door & Window Repair', 'Hardware Fixing', 'Seasonal Checkup', 'Emergency Repairs'],
  },
]

const whyUs = [
  { icon: Shield, title: 'Certified Professionals', desc: 'All our technicians are trained, verified and experienced.' },
  { icon: Clock, title: 'On-Time Service', desc: 'We respect your time and always arrive on schedule.' },
  { icon: ThumbsUp, title: 'Quality Guaranteed', desc: '100% satisfaction guarantee on all repair and maintenance work.' },
  { icon: CheckCircle2, title: 'Transparent Pricing', desc: 'No hidden charges — clear quotes before work begins.' },
]

function Maintenance() {
  return (
    <div style={{ backgroundColor: 'var(--bg-section)' }}>
      {/* Hero */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=1600"
            alt="Maintenance Services"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--bg-primary) 30%, transparent)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)' }}
            >
              <Wrench size={14} style={{ color: 'var(--accent)' }} />
              <span>Professional Maintenance Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 max-w-2xl leading-tight">
              Maintenance & <span style={{ color: 'var(--accent)' }}>Repair Services</span>
            </h1>
            <p className="opacity-75 text-lg max-w-xl mb-8">
              Keep your home and office in perfect condition with our professional
              maintenance and repair services — fast, reliable, and affordable.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/appointment"
                className="btn-animated inline-flex items-center gap-2 px-7 py-3 rounded font-semibold"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
              >
                Book a Service <ArrowRight size={18} className="icon-slide" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded font-semibold border transition hover:opacity-80"
                style={{ borderColor: 'rgba(255,255,255,0.3)' }}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section style={{ backgroundColor: 'var(--accent)' }}>
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { number: '500+', label: 'Jobs Completed' },
            { number: '24h', label: 'Response Time' },
            { number: '8+', label: 'Service Types' },
            { number: '100%', label: 'Satisfaction Rate' },
          ].map((stat) => (
            <div key={stat.label}>
              <h3 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--bg-primary)' }}>{stat.number}</h3>
              <p className="text-sm font-medium opacity-75" style={{ color: 'var(--bg-primary)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
            What We Fix
          </p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Our Maintenance Services
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {maintenanceServices.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="premium-card p-6 group"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)' }}
                >
                  <Icon size={22} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{service.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{service.desc}</p>
                <ul className="space-y-1.5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <CheckCircle2 size={13} style={{ color: 'var(--accent)' }} className="flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              The Orio Maintenance Difference
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="premium-card text-center p-6"
                  style={{ backgroundColor: 'var(--bg-section)', border: '1px solid var(--border-color)' }}
                >
                  <div
                    className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)' }}
                  >
                    <Icon size={24} style={{ color: 'var(--accent)' }} />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
            Simple Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
            How to Book a Service
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 mx-20" style={{ backgroundColor: 'var(--border-color)' }} />
          {[
            { step: '01', title: 'Choose Service', desc: 'Select the maintenance service you need.' },
            { step: '02', title: 'Book Appointment', desc: 'Pick your preferred date and time slot.' },
            { step: '03', title: 'We Confirm', desc: 'Our team confirms within 2 hours.' },
            { step: '04', title: 'Job Done!', desc: 'Technician arrives and completes the work.' },
          ].map((p, idx) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className="relative text-center"
            >
              <div
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-5 relative z-10 text-xl font-bold"
                style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--accent)' }}
              >
                {p.step}
              </div>
              <h3 className="text-lg font-bold mt-1 mb-2" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: 'var(--accent)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--bg-primary)' }}>
            Need a Repair or Maintenance Service?
          </h2>
          <p className="mb-8 max-w-xl mx-auto opacity-80" style={{ color: 'var(--bg-primary)' }}>
            Book an appointment today and our team will be at your doorstep.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/appointment"
              className="btn-animated inline-flex items-center gap-2 px-7 py-3 rounded font-semibold"
              style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
            >
              Book Appointment <ArrowRight size={18} className="icon-slide" />
            </Link>
            <a
              href="https://wa.me/8801983890650"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-animated inline-flex items-center gap-2 px-7 py-3 rounded font-semibold bg-green-500 text-white"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Maintenance