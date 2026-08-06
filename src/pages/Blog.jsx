import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import axiosInstance, { BASE_URL } from '../api/axiosInstance'

const categories = ['All', 'Design Tips', 'Color & Styling', 'Lighting', 'Office Design', 'Restaurant Design']

function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get('/api/blog')
        setBlogs(res.data.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })

  const filtered = activeCategory === 'All'
    ? blogs
    : blogs.filter((b) => b.category === activeCategory)

  const featured = blogs[0]
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

      {!loading && blogs.length === 0 ? (
        <p className="text-center py-20" style={{ color: 'var(--text-secondary)' }}>
          No blog posts yet. Check back soon!
        </p>
      ) : (
        <>
          {/* Featured Post */}
          {activeCategory === 'All' && featured && (
            <section className="max-w-7xl mx-auto px-4 pt-16 pb-8">
              <p className="font-semibold uppercase tracking-wider text-sm mb-6" style={{ color: 'var(--accent)' }}>
                Featured Article
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="premium-card grid md:grid-cols-2 overflow-hidden group"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
              >
                <div className="overflow-hidden h-72 md:h-auto">
                  <img
                    src={`${BASE_URL}/uploads/${featured.image}`}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <Link
                  to={`/blog/${featured._id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
                    style={{ color: 'var(--accent)' }}
                      >
                    Read Article <ArrowRight size={16} className="icon-slide" />
                    </Link>
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
                  <span
                    className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
                    style={{ color: 'var(--accent)' }}
                  >
                    Read Article <ArrowRight size={16} className="icon-slide" />
                  </span>
                </div>
              </motion.div>
            </section>
          )}

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

          {/* Blog Grid */}
          <section className="max-w-7xl mx-auto px-4 py-16">
            {loading ? (
              <p className="text-center" style={{ color: 'var(--text-secondary)' }}>Loading posts...</p>
            ) : (
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
    to={`/blog/${blog._id}`}
    className="premium-card group cursor-pointer overflow-hidden block"
    style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
  ></Link>
                    <div className="overflow-hidden h-52">
                      <img
                        src={`${BASE_URL}/uploads/${blog.image}`}
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
                      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
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
            )}
          </section>
        </>
      )}
    </div>
  )
}

export default Blog