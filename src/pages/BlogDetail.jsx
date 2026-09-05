import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, Tag, ArrowLeft, RefreshCw } from 'lucide-react'
import axiosInstance, { BASE_URL } from '../api/axiosInstance'

const slugify = (text) => {
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

function BlogDetail() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchBlog = async () => {
    setLoading(true)
    setError(false)
    try {
      // 1. Try direct API lookup by slug or id
      const res = await axiosInstance.get(`/api/blog/${id}`)
      if (res.data && res.data.data) {
        setBlog(res.data.data)
        return
      }
    } catch (err) {
      console.warn('Direct lookup failed, trying fallback list lookup:', err)
      // 2. Smart fallback if direct lookup returned 500 (e.g. backend expecting Mongo ID)
      try {
        const allRes = await axiosInstance.get('/api/blog')
        const allBlogs = allRes.data?.data || []
        const decodedId = decodeURIComponent(id)
        const found = allBlogs.find(
          (b) =>
            b.slug === id ||
            b._id === id ||
            b.slug === decodedId ||
            slugify(b.title) === id ||
            slugify(b.title) === decodedId
        )
        if (found) {
          setBlog(found)
          return
        }
      } catch (fallbackErr) {
        console.error('Fallback lookup error:', fallbackErr)
      }
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlog()
  }, [id])

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center" style={{ color: 'var(--text-secondary)' }}>
        <p className="animate-pulse">Loading article...</p>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>Blog post not found.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={fetchBlog}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
          >
            <RefreshCw size={14} /> Retry
          </button>
          <Link to="/blog" className="inline-flex items-center gap-1 font-semibold text-xs py-2 px-3" style={{ color: 'var(--accent)' }}>
            ← Back to Blog
          </Link>
        </div>
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

          <div className="rounded-xl overflow-hidden mb-8 shadow-md">
            <img src={getImageUrl(blog.image)} alt={blog.title} className="w-full h-auto object-cover" />
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