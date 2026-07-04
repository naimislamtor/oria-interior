import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

const faqs = [
  {
    category: 'General',
    questions: [
      { q: 'What services does Orio Interior offer?', a: 'We offer a full range of interior design services including residential, commercial, office, and restaurant interiors, as well as custom furniture design and 3D visualization.' },
      { q: 'How do I get started with Orio Interior?', a: 'Simply book a free consultation through our website or contact us via phone/WhatsApp. Our team will discuss your vision, budget, and timeline.' },
      { q: 'Do you work outside of Dhaka?', a: 'Yes! We work across Bangladesh including Chittagong, Sylhet, and other major cities. Contact us to discuss your location.' },
    ],
  },
  {
    category: 'Pricing',
    questions: [
      { q: 'How much does an interior design project cost?', a: 'Project costs vary depending on scope, size, and materials. We provide detailed quotations after an initial consultation — ensuring complete transparency with no hidden costs.' },
      { q: 'Is the initial consultation free?', a: 'Yes, our first consultation is completely free. We believe in understanding your needs before any commitment.' },
      { q: 'Do you offer flexible payment options?', a: 'Yes, we offer phased payment plans for larger projects. Details are discussed and agreed upon during the consultation stage.' },
    ],
  },
  {
    category: 'Process',
    questions: [
      { q: 'How long does a typical interior design project take?', a: 'Timelines depend on project size. A single room can take 2-4 weeks, while a full home or commercial space may take 2-4 months. We always set clear timelines upfront.' },
      { q: 'Will I see the design before construction begins?', a: 'Absolutely! We provide detailed 3D visualizations and design presentations before any work begins, so you can approve every detail first.' },
      { q: 'Can I make changes during the project?', a: 'Minor adjustments are part of our process. Significant scope changes may affect cost and timeline, which we discuss transparently.' },
    ],
  },
  {
    category: 'Services',
    questions: [
      { q: 'Do you handle procurement and furniture sourcing?', a: 'Yes! We manage the entire process including sourcing furniture, materials, and decor — ensuring quality and value for money.' },
      { q: 'Do you offer 3D visualization for all projects?', a: '3D visualization is available for all project types and is highly recommended for new builds and major renovations.' },
      { q: 'Can you work with my existing furniture?', a: 'Absolutely. We can design around your existing pieces or advise on what to keep, update, or replace to achieve your desired look.' },
    ],
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="border-b last:border-0 cursor-pointer"
      style={{ borderColor: 'var(--border-color)' }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-5 gap-4">
        <h3 className="font-medium text-base leading-snug" style={{ color: 'var(--text-primary)' }}>{q}</h3>
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition"
          style={{ backgroundColor: open ? 'var(--accent)' : 'color-mix(in srgb, var(--accent) 10%, transparent)' }}>
          {open
            ? <Minus size={16} style={{ color: 'var(--bg-primary)' }} />
            : <Plus size={16} style={{ color: 'var(--accent)' }} />
          }
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FAQ() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...faqs.map((f) => f.category)]

  const filtered = faqs
    .map((section) => ({
      ...section,
      questions: section.questions.filter(
        (q) =>
          (activeCategory === 'All' || section.category === activeCategory) &&
          (q.q.toLowerCase().includes(search.toLowerCase()) ||
            q.a.toLowerCase().includes(search.toLowerCase()))
      ),
    }))
    .filter((section) => section.questions.length > 0)

  return (
    <div style={{ backgroundColor: 'var(--bg-section)' }}>
      {/* Header */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1600" alt="FAQ" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
            FAQ
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span style={{ color: 'var(--accent)' }}>Questions</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="opacity-75 mb-8">
            Find answers to the most common questions about our services and process.
          </motion.p>
          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative max-w-lg mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg text-sm outline-none"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--text-on-dark)' }}
            />
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 border-b" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        <div className="max-w-3xl mx-auto px-4 flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium transition"
              style={{
                backgroundColor: activeCategory === cat ? 'var(--accent)' : 'transparent',
                color: activeCategory === cat ? 'var(--bg-primary)' : 'var(--text-secondary)',
                border: `1px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border-color)'}`,
              }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        {filtered.length === 0 ? (
          <p className="text-center py-20" style={{ color: 'var(--text-muted)' }}>No questions found.</p>
        ) : (
          <div className="space-y-10">
            {filtered.map((section) => (
              <motion.div key={section.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                <h2 className="text-lg font-bold mb-4 pb-2 border-b" style={{ color: 'var(--accent)', borderColor: 'var(--border-color)' }}>
                  {section.category}
                </h2>
                <div className="premium-card px-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  {section.questions.map((item) => (
                    <FAQItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: 'var(--accent)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'var(--bg-primary)' }}>
            Still Have Questions?
          </h2>
          <p className="mb-6 opacity-80" style={{ color: 'var(--bg-primary)' }}>
            Our team is happy to help. Reach out and we'll get back to you promptly.
          </p>
          <Link to="/contact" className="btn-animated inline-flex items-center gap-2 px-7 py-3 rounded font-semibold"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}>
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}

export default FAQ