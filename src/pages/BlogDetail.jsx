import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react'
import axiosInstance, { BASE_URL } from '../api/axiosInstance'

function BlogDetail() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true)
      setError(false)
      try {
        const res = await axiosInstance.get(`/api/blog/${id}`)
        setBlog(res.data.data)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [id])

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center" style={{ color: 'var(--text-secondary)' }}>
        Loading...
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>Blog post not found.</p>
        <Link to="/blog" className="font-semibold" style={{ color: 'var(--accent)' }}>
          ← Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-section)' }}>
      <section className="max-w-3xl mx-auto px-4 py-16">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold mb-8 hover:gap-3 transition-all"
          style={{ color: 'var(--accent)' }}
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold mb-4 px-3 py-1 rounded-full"
            style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
          >
            <Tag size={12} /> {blog.category}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(blog.createdAt)}</span>
            {blog.readTime && <span className="flex items-center gap-1"><Clock size={14} /> {blog.readTime}</span>}
          </div>

          <div className="rounded-xl overflow-hidden mb-8">
            <img src={`${BASE_URL}/uploads/${blog.image}`} alt={blog.title} className="w-full h-auto object-cover" />
          </div>

          <p
            className="text-base leading-relaxed whitespace-pre-line"
            style={{ color: 'var(--text-secondary)' }}
          >
            {blog.content}
          </p>
        </motion.div>
      </section>
    </div>
  )
}

export default BlogDetail