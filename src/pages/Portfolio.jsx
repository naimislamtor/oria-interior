import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import axiosInstance, { BASE_URL } from '../api/axiosInstance'
import WatermarkedImage from '../components/WatermarkedImage'

const categories = ['All', 'Residential', 'Commercial', 'Restaurant', 'Office']

const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath
  return `${BASE_URL}/uploads/${imagePath}`
}

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [portfolioData, setPortfolioData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosInstance.get('/api/portfolio')
        setPortfolioData(res.data.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

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
            alt="Projects"
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
            Our Projects
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our <span style={{ color: 'var(--accent)' }}>Projects</span>
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
        {loading ? (
          <p className="text-center" style={{ color: 'var(--text-secondary)' }}>Loading projects...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center" style={{ color: 'var(--text-secondary)' }}>No projects found.</p>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((project) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={`/portfolio/${project.slug || project._id}`}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div
                      className="premium-card group overflow-hidden"
                      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
                    >
                      <div className="overflow-hidden h-60 relative">
                        <WatermarkedImage
                          src={getImageUrl(project.image)}
                          alt={project.title}
                          className="w-full h-full"
                          imgClassName="group-hover:scale-110 transition duration-500"
                        />
                        <span
                          className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full z-20"
                          style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
                        >
                          {project.category}
                        </span>
                        {project.images?.length > 0 && (
                          <span
                            className="absolute bottom-3 left-3 text-xs font-bold px-2 py-1 rounded-full z-20 flex items-center gap-1"
                            style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', backdropFilter: 'blur(8px)' }}
                          >
                            🖼 {project.images.length + 1} ছবি
                          </span>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                          {project.title}
                        </h3>
                        <p className="text-sm mb-4 leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> {project.location}
                          </span>
                          <span className="flex items-center gap-1 font-semibold" style={{ color: 'var(--accent)' }}>
                            বিস্তারিত দেখুন <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: 'var(--accent)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--bg-primary)' }}>
            এরকম একটি Project চান?
          </h2>
          <p className="mb-8 opacity-80" style={{ color: 'var(--bg-primary)' }}>
            আজই আমাদের সাথে কথা বলুন।
          </p>
          <Link
            to="/quote"
            className="btn-animated inline-flex items-center gap-2 px-7 py-3 rounded font-semibold"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
          >
            ফ্রি কোটেশন পান <ArrowRight size={18} className="icon-slide" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Portfolio