import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'

const blogs = [
  {
    id: 1,
    title: '10 Modern Interior Design Trends to Watch in 2026',
    category: 'Design Tips',
    date: 'Jun 15, 2026',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1618219944342-824e40a13285?q=80&w=700',
    excerpt: 'From biophilic design to maximalist luxury, here are the top interior design trends shaping homes and offices in 2026.',
  },
  {
    id: 2,
    title: 'How to Choose the Perfect Color Palette for Your Home',
    category: 'Color & Styling',
    date: 'Jun 02, 2026',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?q=80&w=700',
    excerpt: 'Color sets the mood for every space. Learn how professional designers choose the right palette for any room.',
  },
  {
    id: 3,
    title: 'Small Space, Big Style: Smart Interior Tips for Apartments',
    category: 'Design Tips',
    date: 'May 20, 2026',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=700',
    excerpt: 'Living in a compact space doesn\'t mean compromising on style. Discover clever design hacks that make small rooms feel bigger.',
  },
  {
    id: 4,
    title: 'The Power of Lighting: Transform Your Space Without Renovation',
    category: 'Lighting',
    date: 'May 10, 2026',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=700',
    excerpt: 'Lighting is the most underestimated design element. Here\'s how the right lighting can completely change the feel of a room.',
  },
  {
    id: 5,
    title: 'Office Interior Design: Boosting Productivity Through Space',
    category: 'Office Design',
    date: 'Apr 28, 2026',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=700',
    excerpt: 'A well-designed office can increase productivity by up to 20%. Learn what makes a workspace truly effective.',
  },
  {
    id: 6,
    title: 'Restaurant Interior: Creating an Atmosphere Customers Love',
    category: 'Restaurant Design',
    date: 'Apr 15, 2026',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=700',
    excerpt: 'The ambiance of your restaurant is just as important as the food. Here\'s how great interior design keeps customers coming back.',
  },
]

const categories = ['All', 'Design Tips', 'Color & Styling', 'Lighting', 'Office Design', 'Restaurant Design']

function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? blogs
    : blogs.filter((b) => b.category === activeCategory)

  const featured = blogs[0]
  const rest = filtered.slice(activeCategory === 'All' ? 1 : 0)

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

      {/* Featured Post */}
      {activeCategory === 'All' && (
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
                src={featured.img}
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
                <span className="flex items-center gap-1"><Calendar size={12} /> {featured.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {featured.readTime}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="premium-card group cursor-pointer overflow-hidden"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
            >
              <div className="overflow-hidden h-52">
                <img
                  src={blog.img}
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
                  <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Blog