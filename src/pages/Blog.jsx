import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, Tag, RefreshCw } from 'lucide-react'
import axiosInstance, { BASE_URL } from '../api/axiosInstance'

const categories = ['All', 'Design Tips', 'Color & Styling', 'Lighting', 'Office Design', 'Restaurant Design']

export const slugify = (text) => {
  if (!text) return ''
  const str = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\p{P}\p{S}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
  return str || 'post'
}

const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath
  return `${BASE_URL}/uploads/${imagePath}`
}

function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchBlogs = async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await axiosInstance.get('/api/blog')
      setBlogs(res.data.data || [])
    } catch (err) {
      console.error('Failed to fetch blogs:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })

  const filtered = activeCategory === 'All' 
    ? blogs
    : blogs.filter((b) => b.category?.toLowerCase() === activeCategory.toLowerCase())

  const featured = activeCategory === 'All' && blogs.length > 0 ? blogs[0] : null
  const rest = activeCategory === 'All' ? filtered.slice(1) : filtered

  return (
    <div style={{ backgroundColor: 'var(--bg-section)' }}>
      {/* Header */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618219944342-824e40a13285?q=80&w=1600"
            alt="Blog"
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
            Our Blog
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Design Tips & <span style={{ color: 'var(--accent)' }}>Ideas</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto opacity-75 text-lg"
          >
            Expert insights, design trends, and inspiration for your next interior project.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
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

      {/* Main Content */}
      <div className="min-h-[400px]">
        {loading ? (
          <div className="text-center py-20" style={{ color: 'var(--text-secondary)' }}>
            <p className="animate-pulse">Loading blog posts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 space-y-4" style={{ color: 'var(--text-secondary)' }}>
            <p className="text-red-400">Failed to load blog posts.</p>
            <button
              onClick={fetchBlogs}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
            >
              <RefreshCw size={16} /> Retry
            </button>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20" style={{ color: 'var(--text-secondary)' }}>
            <p className="text-lg font-medium mb-2">No blog posts published yet.</p>
            <p className="text-sm opacity-75">Check back soon for new design tips and articles!</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && (
              <section className="max-w-7xl mx-auto px-4 pt-16 pb-8">
                <p className="font-semibold uppercase tracking-wider text-sm mb-6" style={{ color: 'var(--accent)' }}>
                  Featured Article
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="premium-card grid md:grid-cols-2 overflow-hidden group rounded-2xl"
                  style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                >
                  <div className="overflow-hidden h-72 md:h-auto">
                    <img
                      src={getImageUrl(featured.image)}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <span
                      className="inline-flex items-center gap-1 text-xs font-semibold mb-4 px-3 py-1 rounded-full w-fit"
                      style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
                    >
                      <Tag size={12} /> {featured.category}
                    </span>
                    <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                      {featured.title}
                    </h2>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs mb-5" style={{ color: 'var(--text-muted)' }}>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(featured.createdAt)}</span>
                      {featured.readTime && <span className="flex items-center gap-1"><Clock size={12} /> {featured.readTime}</span>}
                    </div>
                    <Link
                      to={`/blog/${featured.slug || slugify(featured.title)}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
                      style={{ color: 'var(--accent)' }}
                    >
                      Read Article <ArrowRight size={16} className="icon-slide" />
                    </Link>
                  </div>
                </motion.div>
              </section>
            )}

            {/* Blog Grid */}
            <section className="max-w-7xl mx-auto px-4 py-16">
              {filtered.length === 0 ? (
                <div className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>
                  <p className="text-base font-medium mb-3">No posts found in "{activeCategory}".</p>
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="px-4 py-2 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
                  >
                    View All Posts
                  </button>
                </div>
              ) : rest.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((blog, idx) => (
                    <motion.div
                      key={blog._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                      <Link
                        to={`/blog/${blog.slug || slugify(blog.title)}`}
                        className="premium-card group cursor-pointer overflow-hidden block rounded-xl"
                        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                      >
                        <div className="overflow-hidden h-52">
                          <img
                            src={getImageUrl(blog.image)}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                          />
                        </div>
                        <div className="p-6">
                          <span
                            className="inline-flex items-center gap-1 text-xs font-semibold mb-3 px-3 py-1 rounded-full"
                            style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
                          >
                            <Tag size={11} /> {blog.category}
                          </span>
                          <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--accent)] transition" style={{ color: 'var(--text-primary)' }}>
                            {blog.title}
                          </h3>
                          <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                            {blog.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                            <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(blog.createdAt)}</span>
                            {blog.readTime && <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime}</span>}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : null}
            </section>
          </>
        )}
      </div>
    </div>
  )
}

export default Blog