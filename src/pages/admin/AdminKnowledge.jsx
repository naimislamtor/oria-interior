import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, RefreshCw, Bot, Sparkles, Tag, HelpCircle, Search } from 'lucide-react'
import axiosInstance from '../../api/axiosInstance'
import { useAdminAuth } from '../../context/AdminAuthContext'

const emptyForm = {
  question: '',
  keywords: '',
  answer: '',
  category: 'General',
}

function AdminKnowledge() {
  const [rules, setRules] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const { token } = useAdminAuth()

  const fetchRules = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get('/api/knowledge')
      setRules(res.data.data || [])
    } catch (err) {
      console.error('Fetch knowledge rules error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRules()
  }, [])

  const openAddModal = () => {
    setForm(emptyForm)
    setEditingId(null)
    setError('')
    setModalOpen(true)
  }

  const openEditModal = (rule) => {
    setForm({
      question: rule.question || '',
      keywords: Array.isArray(rule.keywords) ? rule.keywords.join(', ') : rule.keywords || '',
      answer: rule.answer || '',
      category: rule.category || 'General',
    })
    setEditingId(rule._id)
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
    if (!form.question.trim() || !form.answer.trim() || !form.keywords.trim()) {
      setError('প্রশ্ন/বিষয়, কীওয়ার্ড এবং উত্তর পূরণ করা বাধ্যতামূলক।')
      return
    }

    setSaving(true)
    setError('')

    const payload = {
      question: form.question.trim(),
      keywords: form.keywords,
      answer: form.answer.trim(),
      category: form.category || 'General',
    }

    try {
      const headers = { Authorization: `Bearer ${token}` }
      if (editingId) {
        await axiosInstance.put(`/api/knowledge/${editingId}`, payload, { headers })
        setSuccessMsg('তথ্য সফলভাবে আপডেট করা হয়েছে!')
      } else {
        await axiosInstance.post('/api/knowledge', payload, { headers })
        setSuccessMsg('নতুন তথ্য সফলভাবে যুক্ত করা হয়েছে!')
      }

      closeModal()
      fetchRules()
      setTimeout(() => setSuccessMsg(''), 4000)
    } catch (err) {
      console.error('Save knowledge rule error:', err)
      setError(err.response?.data?.message || 'সংরক্ষণে সমস্যা হয়েছে। আবার চেষ্টা করুন।')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই তথ্যটি মুছে ফেলতে চান?')) return

    try {
      const headers = { Authorization: `Bearer ${token}` }
      await axiosInstance.delete(`/api/knowledge/${id}`, { headers })
      setSuccessMsg('তথ্য মুছে ফেলা হয়েছে!')
      fetchRules()
      setTimeout(() => setSuccessMsg(''), 4000)
    } catch (err) {
      console.error('Delete error:', err)
      alert('মুছে ফেলতে সমস্যা হয়েছে।')
    }
  }

  const filteredRules = rules.filter((r) => {
    const q = searchTerm.toLowerCase()
    const matchQuestion = r.question?.toLowerCase().includes(q)
    const matchAnswer = r.answer?.toLowerCase().includes(q)
    const matchKeywords = Array.isArray(r.keywords)
      ? r.keywords.some((k) => k.toLowerCase().includes(q))
      : false
    return matchQuestion || matchAnswer || matchKeywords
  })

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 p-6 rounded-2xl border border-amber-500/20">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Bot className="w-7 h-7 text-amber-400" /> AI তথ্য ও জ্ঞান ভাণ্ডার (AI Knowledge Base)
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            এখানে আপনি কলাম আকারে যেকোনো নতুন তথ্য, প্রশ্নের উত্তর বা লিংক যুক্ত করে রাখতে পারবেন। গ্রাহক প্রশ্ন করলে AI প্রথমে এখান থেকে পড়া তথ্য মিলিয়ে সরাসরি উত্তর দেবে।
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-sm shadow-lg transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-5 h-5" /> নতুন তথ্য যুক্ত করুন
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
            placeholder="বিষয়, কীওয়ার্ড বা উত্তর লিখে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500"
          />
        </div>

        <button
          onClick={fetchRules}
          className="inline-flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> রিফ্রেশ
        </button>
      </div>

      {/* Rules Grid / List */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-amber-400 mb-2" />
          তথ্য লোড হচ্ছে...
        </div>
      ) : filteredRules.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400 space-y-3">
          <HelpCircle className="w-12 h-12 mx-auto text-slate-500 opacity-60" />
          <p className="text-base font-semibold">কোনো কাস্টম তথ্য পাওয়া যায়নি</p>
          <p className="text-xs text-slate-500">উপরের "নতুন তথ্য যুক্ত করুন" বাটনে ক্লিক করে AI এর জন্য নতুন তথ্য লিখুন।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRules.map((rule) => (
            <motion.div
              key={rule._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 p-5 rounded-2xl space-y-3 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {rule.category || 'General'}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(rule)}
                      className="p-1.5 text-slate-400 hover:text-amber-300 hover:bg-slate-800 rounded-lg transition"
                      title="সম্পাদনা করুন"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(rule._id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  {rule.question}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 whitespace-pre-wrap">
                  {rule.answer}
                </p>
              </div>

              {/* Keywords Tag List */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center gap-1.5 flex-wrap">
                <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {Array.isArray(rule.keywords) &&
                  rule.keywords.map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-medium">
                      {kw}
                    </span>
                  ))}
              </div>
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
              className="w-full max-w-xl bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl space-y-4 text-slate-100"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  {editingId ? 'তথ্য সম্পাদনা করুন' : 'নতুন AI তথ্য যুক্ত করুন'}
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
                    প্রশ্ন বা বিষয় (Question / Subject) <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.question}
                    onChange={(e) => setForm({ ...form, question: e.target.value })}
                    placeholder="যেমন: নতুন ঈদ ডিসকাউন্ট অফার"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    ট্রিগার কীওয়ার্ডসমূহ (Keywords - কমা দিয়ে আলাদা করুন) <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.keywords}
                    onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                    placeholder="যেমন: অফার, ডিসকাウント, ছাড়, discount, offer"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    গ্রাহক চ্যাটে এই শব্দগুলো লিখলে AI এই কাস্টম উত্তরটি প্রদান করবে।
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    ক্যাটাগরি (Category)
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="General">General (সাধারণ)</option>
                    <option value="Company">Company (কোম্পানি পরিচিতি)</option>
                    <option value="Offer">Offer (ডিসকাউন্ট ও অফার)</option>
                    <option value="Services">Services (সেবা সমূহ)</option>
                    <option value="Pricing">Pricing (মূল্য ও খরচ)</option>
                    <option value="Contact">Contact (যোগাযোগ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    AI এর জন্য সঠিক উত্তর বা লিংক (Answer / Information) <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={form.answer}
                    onChange={(e) => setForm({ ...form, answer: e.target.value })}
                    placeholder="যেমন: আমাদের নতুন ঈদ ডিসকাউন্ট অফারে পাচ্ছেন ফ্ল্যাট ইন্টেরিয়রে ১০% বিশেষ ছাড়! ফ্রি কনসালটেশন বুক করতে ভিজিট করুন: https://oriainteriorbd.com/consultation"
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

export default AdminKnowledge
