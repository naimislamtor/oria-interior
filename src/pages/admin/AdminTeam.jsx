import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, X, RefreshCw, UserCheck, Link as LinkIcon } from 'lucide-react'
import axiosInstance from '../../api/axiosInstance'
import { useAdminAuth } from '../../context/AdminAuthContext'

const emptyForm = {
  name: '',
  designation: '',
  imageUrl: '',
  order: 0,
}

function AdminTeam() {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const { token } = useAdminAuth()

  const fetchTeamMembers = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get('/api/team')
      setTeamMembers(res.data.data || [])
    } catch (err) {
      console.error('Fetch team error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const openAddModal = () => {
    setForm(emptyForm)
    setEditingId(null)
    setError('')
    setModalOpen(true)
  }

  const openEditModal = (member) => {
    setForm({
      name: member.name || '',
      designation: member.designation || '',
      imageUrl: member.imageUrl || '',
      order: member.order || 0,
    })
    setEditingId(member._id)
    setError('')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingId(null)
    setForm(emptyForm)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.designation.trim() || !form.imageUrl.trim()) {
      setError('নাম, পদবী (Designation) এবং ছবির URL পূরণ করুন।')
      return
    }

    setSaving(true)
    setError('')
    try {
      const headers = { Authorization: `Bearer ${token}` }

      if (editingId) {
        await axiosInstance.put(`/api/team/${editingId}`, form, { headers })
      } else {
        await axiosInstance.post('/api/team', form, { headers })
      }

      await fetchTeamMembers()
      closeModal()
    } catch (err) {
      console.error('Save team member error:', err)
      setError(err.response?.data?.message || 'টিম সদস্য সেভ করতে সমস্যা হয়েছে।')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই সদস্য মুছে ফেলতে চান?')) return
    try {
      const headers = { Authorization: `Bearer ${token}` }
      await axiosInstance.delete(`/api/team/${id}`, { headers })
      await fetchTeamMembers()
    } catch (err) {
      console.error('Delete team member error:', err)
      alert('সদস্য মুছতে সমস্যা হয়েছে।')
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">টিম মেম্বার ম্যানেজমেন্ট (Team Management)</h1>
          <p className="text-gray-500 text-sm mt-1">আমাদের ডিজাইনের নেপথ্যের কারিগরগণ - সদস্য যোগ ও আপডেট করুন</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchTeamMembers}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> রিফ্রেশ
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition shadow-sm"
            style={{ backgroundColor: '#c9a84c' }}
          >
            <Plus size={18} /> নতুন সদস্য যোগ করুন
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-gray-500 text-sm">টিম মেম্বার লোড হচ্ছে...</p>
        </div>
      ) : teamMembers.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
          <UserCheck size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-gray-800">কোন টিম সদস্য পাওয়া যায়নি</h3>
          <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">
            এখানে যুক্ত করা সদস্যরা About Us পেজে "আমাদের ডিজাইনের নেপথ্যের কারিগরগণ" গ্রিডে প্রদর্শিত হবে।
          </p>
          <button
            onClick={openAddModal}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ backgroundColor: '#c9a84c' }}
          >
            <Plus size={16} /> সদস্য যোগ করুন
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="h-56 bg-gray-100 relative overflow-hidden">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'
                    }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-amber-600 font-medium text-sm mt-0.5">{member.designation}</p>
                </div>
              </div>

              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-400">সিরিয়াল: {member.order || 0}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(member)}
                    className="p-1.5 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded transition"
                    title="সম্পাদনা করুন"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl"
          >
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? 'টিম সদস্য সম্পাদনা করুন' : 'নতুন টিম সদস্য যোগ করুন'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1">
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">সদস্যের নাম (Name) *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="যেমন: মোঃ সাব্বির আহমেদ"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">পদবী (Designation) *</label>
                <input
                  type="text"
                  required
                  value={form.designation}
                  onChange={(e) => setForm({ ...form, designation: e.target.value })}
                  placeholder="যেমন: লিড আর্কিটেক্ট / ৩ডি ডিজাইনার"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ছবির URL (Image URL) *</label>
                <div className="relative">
                  <input
                    type="url"
                    required
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <LinkIcon size={16} className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>

              {form.imageUrl && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">ছবি প্রিভিউ (Preview):</label>
                  <div className="h-40 w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={form.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL'
                      }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">প্রদর্শন ক্রম (Order Number)</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: e.target.value })}
                  placeholder="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium text-white transition disabled:opacity-50"
                  style={{ backgroundColor: '#c9a84c' }}
                >
                  {saving ? 'সেভ হচ্ছে...' : editingId ? 'আপডেট করুন' : 'সদস্য যোগ করুন'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AdminTeam
