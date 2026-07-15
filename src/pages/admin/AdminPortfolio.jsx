import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Upload, Star, RefreshCw } from 'lucide-react'
import axiosInstance from '../../api/axiosInstance'
import { useAdminAuth } from '../../context/AdminAuthContext'

const categories = ['Residential', 'Commercial', 'Restaurant', 'Office']

const emptyForm = {
  title: '', category: 'Residential', location: '', year: '', description: '', featured: false,
}

function AdminPortfolio() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const { token } = useAdminAuth()

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get('/api/portfolio')
      setProjects(res.data.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProjects() }, [])

  const openAddModal = () => {
    setForm(emptyForm)
    setImageFile(null)
    setImagePreview(null)
    setEditingId(null)
    setError('')
    setModalOpen(true)
  }

  const openEditModal = (project) => {
    setForm({
      title: project.title,
      category: project.category,
      location: project.location || '',
      year: project.year || '',
      description: project.description || '',
      featured: project.featured,
    })
    setImagePreview(`http://localhost:5000/uploads/${project.image}`)
    setImageFile(null)
    setEditingId(project._id)
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
      setError('Please upload a project image.')
      return
    }

    setSaving(true)
    try {
      const data = new FormData()
      Object.entries(form).forEach(([k, v]) => data.append(k, v))
      if (imageFile) data.append('image', imageFile)

      const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }

      if (editingId) {
        await axiosInstance.put(`/api/portfolio/${editingId}`, data, { headers })
      } else {
        await axiosInstance.post('/api/portfolio', data, { headers })
      }

      setModalOpen(false)
      fetchProjects()
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    try {
      await axiosInstance.delete(`/api/portfolio/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setProjects((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      alert('Failed to delete project.')
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
          <p className="text-gray-500 text-sm">Manage your project showcase</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchProjects}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 hover:bg-gray-50 transition"
          >
            <RefreshCw size={15} /> Refresh
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition"
            style={{ backgroundColor: '#c9a84c' }}
          >
            <Plus size={15} /> Add Project
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="bg-white rounded-xl p-16 border border-gray-200 text-center text-gray-400">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-xl p-16 border border-gray-200 text-center text-gray-400">
          No projects yet. Click "Add Project" to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div key={project._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={`http://localhost:5000/uploads/${project.image}`}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {project.featured && (
                  <span className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-semibold text-amber-600">
                    <Star size={11} fill="currentColor" /> Featured
                  </span>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                  <button
                    onClick={() => openEditModal(project)}
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-110 transition"
                  >
                    <Pencil size={15} className="text-gray-700" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-110 transition"
                  >
                    <Trash2 size={15} className="text-red-500" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                  {project.category}
                </span>
                <h3 className="font-bold text-gray-900 mt-2 text-sm">{project.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{project.location} {project.year && `• ${project.year}`}</p>
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
              <h2 className="font-bold text-lg text-gray-900">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Project Image *</label>
                <div
                  className="border-2 border-dashed rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition"
                  style={{ borderColor: '#e5e7eb' }}
                  onClick={() => document.getElementById('portfolioImageInput').click()}
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
                <input id="portfolioImageInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Project Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  placeholder="e.g. Modern Living Room"
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
                  <label className="block text-sm font-medium mb-2 text-gray-700">Year</label>
                  <input
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    placeholder="2026"
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none border border-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Location</label>
                <input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="e.g. Gulshan, Dhaka"
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none border border-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  placeholder="Brief description of the project..."
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none border border-gray-200"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Mark as Featured (shows on homepage)</span>
              </label>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 rounded-lg font-semibold text-white transition"
                style={{ backgroundColor: '#c9a84c', opacity: saving ? 0.7 : 1 }}
              >
                {saving ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AdminPortfolio