import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const beforeAfterData = [
  {
    id: 1,
    title: 'Living Room Transformation',
    category: 'Residential',
    before: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=700',
    after: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=700',
  },
  {
    id: 2,
    title: 'Bedroom Makeover',
    category: 'Residential',
    before: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=700',
    after: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=700',
  },
  {
    id: 3,
    title: 'Office Redesign',
    category: 'Office',
    before: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=700',
    after: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=700',
  },
  {
    id: 4,
    title: 'Restaurant Renovation',
    category: 'Restaurant',
    before: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=700',
    after: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=700',
  },
]

const categories = ['All', 'Residential', 'Office', 'Restaurant']

function BeforeAfterCard({ item }) {
  const [showAfter, setShowAfter] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="premium-card overflow-hidden"
      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
    >
      {/* Image Toggle */}
      <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setShowAfter(!showAfter)}>
        <AnimatePresence mode="wait">
          <motion.img
            key={showAfter ? 'after' : 'before'}
            src={showAfter ? item.after : item.before}
            alt={showAfter ? 'After' : 'Before'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 flex items-end justify-between p-4">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={
              showAfter
                ? { backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }
                : { backgroundColor: '#ef4444', color: '#fff' }
            }
          >
            {showAfter ? 'AFTER' : 'BEFORE'}
          </span>
          <span className="text-xs bg-black/60 text-white px-3 py-1 rounded-full">
            Click to toggle
          </span>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex border-t" style={{ borderColor: 'var(--border-color)' }}>
        <button
          onClick={() => setShowAfter(false)}
          className="flex-1 py-3 text-sm font-semibold transition"
          style={
            !showAfter
              ? { backgroundColor: '#ef4444', color: '#fff' }
              : { backgroundColor: 'transparent', color: 'var(--text-muted)' }
          }
        >
          Before
        </button>
        <button
          onClick={() => setShowAfter(true)}
          className="flex-1 py-3 text-sm font-semibold transition"
          style={
            showAfter
              ? { backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }
              : { backgroundColor: 'transparent', color: 'var(--text-muted)' }
          }
        >
          After
        </button>
      </div>

      <div className="p-5">
        <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>{item.category}</span>
        <h3 className="font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
      </div>
    </motion.div>
  )
}

function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? beforeAfterData
    : beforeAfterData.filter((p) => p.category === activeCategory)

  return (
    <div style={{ backgroundColor: 'var(--bg-section)' }}>
      {/* Header */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600"
            alt="Gallery"
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
            Transformations
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Before & <span style={{ color: 'var(--accent)' }}>After Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto opacity-75 text-lg"
          >
            Click on any card to toggle between before and after — see the dramatic difference our designs make.
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-16 z-30 py-4 border-b shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
              style={
                activeCategory === cat
                  ? { backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }
                  : { backgroundColor: 'var(--bg-section)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filtered.map((item) => (
              <BeforeAfterCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: 'var(--accent)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--bg-primary)' }}>
            Want This Kind of Transformation?
          </h2>
          <p className="mb-8 opacity-80" style={{ color: 'var(--bg-primary)' }}>
            Book a free consultation and start your journey today.
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

export default Gallery