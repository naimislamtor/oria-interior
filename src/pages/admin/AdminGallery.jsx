import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, RefreshCw, Image, Sparkles, Layers, Search } from 'lucide-react'
import axiosInstance from '../../api/axiosInstance'
import { useAdminAuth } from '../../context/AdminAuthContext'

const emptyForm = {
  title: '',
  beforeImage: '',
  afterImage: '',
  category: 'Residential',
  description: '',
}

function AdminGallery() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const { token } = useAdminAuth()

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get('/api/gallery')
      setItems(res.data.data || [])
    } catch (err) {
      console.error('Fetch gallery items error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const openAddModal = () => {
    setForm(emptyForm)
    setEditingId(null)
    setError('')
    setModalOpen(true)
  }

  const openEditModal = (item) => {
    setForm({
      title: item.title || '',
      beforeImage: item.beforeImage || '',
      afterImage: item.afterImage || '',
      category: item.category || 'Residential',
      description: item.description || '',
    })
    setEditingId(item._id)
    setError('')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setForm(emptyForm)
    setEditingId(null)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.beforeImage.trim() || !form.afterImage.trim()) {
      setError('শিরোনাম, Before ছবির লিংক এবং After ছবির লিংক পূরণ করা বাধ্যতামূলক।')
      return
    }

    setSaving(true)
    setError('')

    const payload = {
      title: form.title.trim(),
      beforeImage: form.beforeImage.trim(),
      afterImage: form.afterImage.trim(),
      category: form.category || 'Residential',
      description: form.description.trim(),
    }

    try {
      const headers = { Authorization: `Bearer ${token}` }
      if (editingId) {
        await axiosInstance.put(`/api/gallery/${editingId}`, payload, { headers })
        setSuccessMsg('গ্যালারি ট্রান্সফরমেশন সফলভাবে আপডেট করা হয়েছে!')
      } else {
        await axiosInstance.post('/api/gallery', payload, { headers })
        setSuccessMsg('নতুন গ্যালারি ট্রান্সফরমেশন যুক্ত করা হয়েছে!')
      }

      closeModal()
      fetchItems()
      setTimeout(() => setSuccessMsg(''), 4000)
    } catch (err) {
      console.error('Save gallery error:', err)
      setError(err.response?.data?.message || 'সংরক্ষণে সমস্যা হয়েছে। আবার চেষ্টা করুন।')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই Before & After প্রজেক্টটি মুছে ফেলতে চান?')) return

    try {
      const headers = { Authorization: `Bearer ${token}` }
      await axiosInstance.delete(`/api/gallery/${id}`, { headers })
      setSuccessMsg('প্রজেক্টটি মুছে ফেলা হয়েছে!')
      fetchItems()
      setTimeout(() => setSuccessMsg(''), 4000)
    } catch (err) {
      console.error('Delete error:', err)
      alert('মুছে ফেলতে সমস্যা হয়েছে।')
    }
  }

  const filteredItems = items.filter((item) => {
    const q = searchTerm.toLowerCase()
    return (
      item.title?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 p-6 rounded-2xl border border-amber-500/20">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Layers className="w-7 h-7 text-amber-400" /> Before & After গ্যালারি ম্যানেজমেন্ট
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            এখানে আপনার কাজের "Before" (আগের ছবি) এবং "After" (পরের ছবি) যুক্ত করুন। এগুলো সরাসরি ওয়েবসাইটের ট্রান্সফরমেশন গ্যালারি এবং হোম পেজে দেখা যাবে।
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-sm shadow-lg transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-5 h-5" /> নতুন ট্রান্সফরমেশন যুক্ত করুন
        </button>
      </div>

      {/* Success Alert */}
      {successMsg && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-medium">
          {successMsg}
        </motion.div>
      )}

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="শিরোনাম বা ক্যাটাগরি দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500"
          />
        </div>

        <button
          onClick={fetchItems}
          className="inline-flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> রিফ্রেশ
        </button>
      </div>

      {/* Gallery Items Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-amber-400 mb-2" />
          গ্যালারি লোড হচ্ছে...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400 space-y-3">
          <Image className="w-12 h-12 mx-auto text-slate-500 opacity-60" />
          <p className="text-base font-semibold">কোনো গ্যালারি ট্রান্সফরমেশন যুক্ত করা হয়নি</p>
          <p className="text-xs text-slate-500">নতুন ছবির জুড়ি যোগ করতে উপরের "নতুন ট্রান্সফরমেশন যুক্ত করুন" বাটনে ক্লিক করুন।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                    {item.category || 'Residential'}
                  </span>
                  <h3 className="font-bold text-slate-100 text-base mt-1 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 text-slate-400 hover:text-amber-300 hover:bg-slate-800 rounded-lg transition"
                    title="সম্পাদনা করুন"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Side-by-Side Image Preview */}
              <div className="p-4 grid grid-cols-2 gap-3">
                {/* Before Image */}
                <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 group">
                  <img
                    src={item.beforeImage}
                    alt="Before"
                    className="w-full h-44 object-cover"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/400x300?text=Before+Image+Error'
                    }}
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-rose-600/90 text-white text-[10px] font-bold shadow-md">
                    BEFORE
                  </span>
                </div>

                {/* After Image */}
                <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 group">
                  <img
                    src={item.afterImage}
                    alt="After"
                    className="w-full h-44 object-cover"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/400x300?text=After+Image+Error'
                    }}
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-emerald-600/90 text-white text-[10px] font-bold shadow-md">
                    AFTER
                  </span>
                </div>
              </div>

              {item.description && (
                <div className="px-4 pb-4">
                  <p className="text-xs text-slate-400 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800">
                    {item.description}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl space-y-4 text-slate-100 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  {editingId ? 'ট্রান্সফরমেশন সম্পাদনা করুন' : 'নতুন Before & After ট্রান্সফরমেশন যুক্ত করুন'}
                </h3>
                <button onClick={closeModal} className="p-1 text-slate-400 hover:text-white rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    প্রজেক্টের শিরোনাম (Title) <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="যেমন: আধুনিক ড্রয়িং রুম ও ডাইনিং মেকওভার"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Before ছবির লিংক (Before Image URL) <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.beforeImage}
                      onChange={(e) => setForm({ ...form, beforeImage: e.target.value })}
                      placeholder="যেমন: /images/before.jpeg বা ইমেজ লিংক"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      After ছবির লিংক (After Image URL) <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.afterImage}
                      onChange={(e) => setForm({ ...form, afterImage: e.target.value })}
                      placeholder="যেমন: /images/after.jpeg বা ইমেজ লিংক"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Live Preview in Modal */}
                {(form.beforeImage || form.afterImage) && (
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <p className="text-[11px] font-semibold text-slate-400">লাইভ প্রিভিউ (Preview):</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative rounded border border-slate-800 overflow-hidden h-24 bg-slate-900">
                        {form.beforeImage ? (
                          <img src={form.beforeImage} alt="Before Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full text-[10px] text-slate-500">Before Image</div>
                        )}
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-rose-600 text-[9px] text-white font-bold rounded">BEFORE</span>
                      </div>
                      <div className="relative rounded border border-slate-800 overflow-hidden h-24 bg-slate-900">
                        {form.afterImage ? (
                          <img src={form.afterImage} alt="After Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full text-[10px] text-slate-500">After Image</div>
                        )}
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-emerald-600 text-[9px] text-white font-bold rounded">AFTER</span>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    ক্যাটাগরি (Category)
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="Residential">Residential (বাসা / অ্যাপার্টমেন্ট)</option>
                    <option value="Commercial">Commercial (বাণিজ্যিক)</option>
                    <option value="Office">Office (অফিস ডেকোরেশন)</option>
                    <option value="Restaurant">Restaurant (রেস্টুরেন্ট)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    সংক্ষিপ্ত বিবরণ (বিবরণ - ঐচ্ছিক)
                  </label>
                  <textarea
                    rows={2}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="প্রজেক্ট সম্পর্কে ছোট কোনো বিবরণ থাকলে লিখুন..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-xs rounded-xl shadow-lg disabled:opacity-50 cursor-pointer"
                  >
                    {saving ? 'সংরক্ষণ হচ্ছে...' : editingId ? 'হালনাগাদ করুন' : 'সংরক্ষণ করুন'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminGallery
