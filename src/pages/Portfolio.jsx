import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioData, categories } from '../data/portfolioData'

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? portfolioData
    : portfolioData.filter((p) => p.category === activeCategory)

  return (
    <div style={{ backgroundColor: 'var(--bg-section)' }}>
      {/* Header */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600"
            alt="Portfolio"
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
            Our Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Project <span style={{ color: 'var(--accent)' }}>Portfolio</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto opacity-75 text-lg"
          >
            Browse our completed projects across residential, commercial, restaurant, and office spaces.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
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

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="premium-card group overflow-hidden"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
              >
                <div className="overflow-hidden h-60 relative">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <span
                    className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
                  >
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {project.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: 'var(--accent)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--bg-primary)' }}>
            Want a Project Like This?
          </h2>
          <p className="mb-8 opacity-80" style={{ color: 'var(--bg-primary)' }}>
            Let's discuss your dream space today.
          </p>
          <Link
            to="/quote"
            className="btn-animated inline-flex items-center gap-2 px-7 py-3 rounded font-semibold"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
          >
            Get Free Quote <ArrowRight size={18} className="icon-slide" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Portfolio