import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Upload, RefreshCw } from 'lucide-react'
import axiosInstance, { BASE_URL } from '../../api/axiosInstance'
import { useAdminAuth } from '../../context/AdminAuthContext'

const categories = ['Design Tips', 'Color & Styling', 'Lighting', 'Office Design', 'Restaurant Design']

const emptyForm = {
  title: '', category: 'Design Tips', excerpt: '', content: '', readTime: '',
}

const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath
  return `${BASE_URL}/uploads/${imagePath}`
}

function AdminBlog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const { token } = useAdminAuth()

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get('/api/blog')
      setPosts(res.data.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPosts() }, [])

  const openAddModal = () => {
    setForm(emptyForm)
    setImageFile(null)
    setImagePreview(null)
    setEditingId(null)
    setError('')
    setModalOpen(true)
  }

  const openEditModal = (post) => {
    setForm({
      title: post.title,
      category: post.category,
      excerpt: post.excerpt || '',
      content: post.content || '',
      readTime: post.readTime || '',
    })
    setImagePreview(getImageUrl(post.image))
    setImageFile(null)
    setEditingId(post._id)
    setError('')
    setModalOpen(true)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!editingId && !imageFile) {
      setError('Please upload a cover image.')
      return
    }

    setSaving(true)
    try {
      const data = new FormData()
      Object.entries(form).forEach(([k, v]) => data.append(k, v))
      if (imageFile) data.append('image', imageFile)

      const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }

      if (editingId) {
        await axiosInstance.put(`/api/blog/${editingId}`, data, { headers })
      } else {
        await axiosInstance.post('/api/blog', data, { headers })
      }

      setModalOpen(false)
      fetchPosts()
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    try {
      await axiosInstance.delete(`/api/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setPosts((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      alert('Failed to delete post.')
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-500 text-sm">Manage your blog posts</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchPosts}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 hover:bg-gray-50 transition"
          >
            <RefreshCw size={15} /> Refresh
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition"
            style={{ backgroundColor: '#c9a84c' }}
          >
            <Plus size={15} /> Add Post
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="bg-white rounded-xl p-16 border border-gray-200 text-center text-gray-400">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-xl p-16 border border-gray-200 text-center text-gray-400">
          No blog posts yet. Click "Add Post" to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={getImageUrl(post.image)}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                  <button
                    onClick={() => openEditModal(post)}
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-110 transition"
                  >
                    <Pencil size={15} className="text-gray-700" />
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-110 transition"
                  >
                    <Trash2 size={15} className="text-red-500" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                  {post.category}
                </span>
                <h3 className="font-bold text-gray-900 mt-2 text-sm">{post.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="font-bold text-lg text-gray-900">{editingId ? 'Edit Post' : 'Add New Post'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Cover Image *</label>
                <div
                  className="border-2 border-dashed rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition"
                  style={{ borderColor: '#e5e7eb' }}
                  onClick={() => document.getElementById('blogImageInput').click()}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover" />
                  ) : (
                    <div className="h-40 flex flex-col items-center justify-center text-gray-400">
                      <Upload size={22} className="mb-2" />
                      <span className="text-sm">Click to upload image</span>
                    </div>
                  )}
                </div>
                <input id="blogImageInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Post Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  placeholder="e.g. 10 Modern Interior Trends"
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none border border-gray-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none border border-gray-200"
                  >
                    {categories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Read Time</label>
                  <input
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none border border-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Excerpt *</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  required
                  rows={2}
                  placeholder="Short summary shown on the blog list..."
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none border border-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Full Content *</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  required
                  rows={6}
                  placeholder="Write the full blog post here..."
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none border border-gray-200"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 rounded-lg font-semibold text-white transition"
                style={{ backgroundColor: '#c9a84c', opacity: saving ? 0.7 : 1 }}
              >
                {saving ? 'Saving...' : editingId ? 'Update Post' : 'Add Post'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AdminBlog