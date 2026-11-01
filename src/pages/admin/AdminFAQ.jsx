import { useState, useEffect, useCallback } from 'react'
import axiosInstance from '../../api/axiosInstance'
import {
  Search, Plus, Edit2, Trash2, X, Save, ChevronDown, Tag,
  MessageSquare, ToggleLeft, ToggleRight, AlertCircle, CheckCircle2, Hash
} from 'lucide-react'

const CATEGORIES = [
  'কোম্পানি পরিচিতি', 'যোগাযোগ', 'সার্ভিস', 'খরচ ও বাজেট',
  'সময় ও প্রক্রিয়া', 'ডিজাইন ও স্টাইল', 'রেসিডেন্শিয়াল', 'অফিস',
  'রেস্টুরেন্ট', '৩D ভিজুয়ালাইজেশন', 'গুণমান ও গ্যারান্টি', 'পোর্টফোলিও',
  'অ্যাপয়েন্টমেন্ট', 'কোটেশন', 'সাধারণ', 'বিশেষ', 'সাপোর্ট', 'ওয়েবসাইট', 'সালাম ও বিবিধ'
]

const EMPTY_FORM = { category: '', keywords: '', answer: '', isActive: true }

export default function AdminFAQ() {
  const [faqs, setFaqs] = useState([])
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  // Modal state
  const [modal, setModal] = useState(null) // 'add' | 'edit' | 'delete'
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchFaqs = useCallback(async () => {
    setLoading(true)
    try {
      const params = {}
      if (search) params.search = search
      if (catFilter) params.category = catFilter
      const res = await axiosInstance.get('/api/faq', { params })
      setFaqs(res.data.data || [])
    } catch {
      showToast('তথ্য লোড হয়নি', 'error')
    } finally {
      setLoading(false)
    }
  }, [search, catFilter])

  useEffect(() => { fetchFaqs() }, [fetchFaqs])

  const openAdd = () => { setForm(EMPTY_FORM); setModal('add') }
  const openEdit = (faq) => {
    setSelected(faq)
    setForm({ category: faq.category, keywords: faq.keywords.join('\n'), answer: faq.answer, isActive: faq.isActive })
    setModal('edit')
  }
  const openDelete = (faq) => { setSelected(faq); setModal('delete') }
  const closeModal = () => { setModal(null); setSelected(null) }

  const handleSave = async () => {
    if (!form.category || !form.keywords.trim() || !form.answer.trim()) {
      showToast('সব ক্ষেত্র পূরণ করুন', 'error'); return
    }
    setSaving(true)
    try {
      const payload = { ...form, keywords: form.keywords }
      if (modal === 'add') {
        await axiosInstance.post('/api/faq', payload)
        showToast('নতুন FAQ যোগ হয়েছে ✅')
      } else {
        await axiosInstance.put(`/api/faq/${selected._id}`, payload)
        showToast('FAQ আপডেট হয়েছে ✅')
      }
      closeModal(); fetchFaqs()
    } catch (e) {
      showToast(e?.response?.data?.message || 'সংরক্ষণ ব্যর্থ', 'error')
    } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setSaving(true)
    try {
      await axiosInstance.delete(`/api/faq/${selected._id}`)
      showToast('FAQ মুছে ফেলা হয়েছে')
      closeModal(); fetchFaqs()
    } catch { showToast('মুছতে ব্যর্থ', 'error') }
    finally { setSaving(false) }
  }

  const toggleActive = async (faq) => {
    try {
      await axiosInstance.put(`/api/faq/${faq._id}`, { isActive: !faq.isActive })
      fetchFaqs()
    } catch { showToast('আপডেট ব্যর্থ', 'error') }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-section)', padding: '2rem' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999,
          padding: '0.85rem 1.4rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.6rem',
          backgroundColor: toast.type === 'success' ? 'var(--accent)' : '#ef4444',
          color: '#fff', fontWeight: 600, boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
          animation: 'slideIn 0.3s ease'
        }}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            FAQ চ্যাটবট ম্যানেজমেন্ট
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '0.3rem 0 0', fontSize: '0.9rem' }}>
            মোট {faqs.length}টি প্রশ্ন-উত্তর সক্রিয় আছে
          </p>
        </div>
        <button onClick={openAdd} style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.7rem 1.4rem', borderRadius: '8px', border: 'none', cursor: 'pointer',
          backgroundColor: 'var(--accent)', color: 'var(--bg-primary)', fontWeight: 700, fontSize: '0.9rem'
        }}>
          <Plus size={18} /> নতুন FAQ যোগ করুন
        </button>
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="FAQ-001 বা কীওয়ার্ড দিয়ে খুঁজুন..."
            style={{
              width: '100%', padding: '0.7rem 1rem 0.7rem 2.4rem', borderRadius: '8px',
              border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)', fontSize: '0.9rem', boxSizing: 'border-box'
            }}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <select
            value={catFilter}
            onChange={e => setCatFilter(e.target.value)}
            style={{
              padding: '0.7rem 2.2rem 0.7rem 1rem', borderRadius: '8px', appearance: 'none',
              border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)', fontSize: '0.9rem', cursor: 'pointer', minWidth: '180px'
            }}
          >
            <option value="">সব ক্যাটাগরি</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown size={14} style={{ position: 'absolute', right: '0.7rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }} />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>লোড হচ্ছে...</div>
      ) : faqs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>কোনো FAQ পাওয়া যায়নি</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map(faq => (
            <div key={faq._id} style={{
              backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)',
              borderRadius: '10px', padding: '1rem 1.2rem',
              display: 'grid', gridTemplateColumns: '90px 130px 1fr auto', gap: '1rem', alignItems: 'start',
              opacity: faq.isActive ? 1 : 0.55
            }}>
              {/* FAQ ID */}
              <div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)',
                  backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                  padding: '0.25rem 0.6rem', borderRadius: '6px'
                }}>
                  <Hash size={11} />{faq.faqId}
                </span>
              </div>

              {/* Category */}
              <div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  fontSize: '0.75rem', color: 'var(--text-muted)',
                  backgroundColor: 'var(--bg-section)', padding: '0.25rem 0.6rem', borderRadius: '6px'
                }}>
                  <Tag size={11} />{faq.category}
                </span>
              </div>

              {/* Keywords + Answer preview */}
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.5rem' }}>
                  {faq.keywords.slice(0, 4).map((kw, i) => (
                    <span key={i} style={{
                      fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: '4px',
                      backgroundColor: 'var(--bg-section)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)'
                    }}>{kw}</span>
                  ))}
                  {faq.keywords.length > 4 && (
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>+{faq.keywords.length - 4}টি আরও</span>
                  )}
                </div>
                <p style={{
                  fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0,
                  overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'
                }}>
                  <MessageSquare size={12} style={{ marginRight: '0.3rem', verticalAlign: 'middle' }} />
                  {faq.answer}
                </p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button onClick={() => toggleActive(faq)} title={faq.isActive ? 'নিষ্ক্রিয় করুন' : 'সক্রিয় করুন'} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.3rem' }}>
                  {faq.isActive
                    ? <ToggleRight size={22} style={{ color: 'var(--accent)' }} />
                    : <ToggleLeft size={22} style={{ color: 'var(--text-muted)' }} />}
                </button>
                <button onClick={() => openEdit(faq)} style={{
                  background: 'none', border: '1px solid var(--border-color)', borderRadius: '6px',
                  padding: '0.35rem 0.6rem', cursor: 'pointer', color: 'var(--text-secondary)'
                }}>
                  <Edit2 size={14} />
                </button>
                <button onClick={() => openDelete(faq)} style={{
                  background: 'none', border: '1px solid #ef444440', borderRadius: '6px',
                  padding: '0.35rem 0.6rem', cursor: 'pointer', color: '#ef4444'
                }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Backdrop */}
      {modal && (
        <div onClick={closeModal} style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            backgroundColor: 'var(--bg-card)', borderRadius: '14px', width: '100%', maxWidth: '600px',
            maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>

            {/* Delete Modal */}
            {modal === 'delete' && (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <Trash2 size={24} color="#ef4444" />
                </div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>FAQ মুছে ফেলবেন?</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  <strong style={{ color: 'var(--accent)' }}>{selected?.faqId}</strong> — এই FAQ মুছে ফেললে আর ফেরত পাওয়া যাবে না।
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                  <button onClick={closeModal} style={{ padding: '0.65rem 1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-section)', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}>
                    বাতিল
                  </button>
                  <button onClick={handleDelete} disabled={saving} style={{ padding: '0.65rem 1.5rem', borderRadius: '8px', border: 'none', backgroundColor: '#ef4444', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>
                    {saving ? 'মুছছি...' : 'হ্যাঁ, মুছুন'}
                  </button>
                </div>
              </div>
            )}

            {/* Add / Edit Modal */}
            {(modal === 'add' || modal === 'edit') && (
              <div>
                <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>
                      {modal === 'add' ? 'নতুন FAQ যোগ করুন' : `FAQ সম্পাদনা — ${selected?.faqId}`}
                    </h3>
                  </div>
                  <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    <X size={20} />
                  </button>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {/* Category */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>ক্যাটাগরি *</label>
                    <div style={{ position: 'relative' }}>
                      <select
                        value={form.category}
                        onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                        style={{
                          width: '100%', padding: '0.7rem 2.2rem 0.7rem 1rem', borderRadius: '8px', appearance: 'none',
                          border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-section)',
                          color: 'var(--text-primary)', fontSize: '0.9rem', cursor: 'pointer', boxSizing: 'border-box'
                        }}
                      >
                        <option value="">-- ক্যাটাগরি বেছে নিন --</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <ChevronDown size={14} style={{ position: 'absolute', right: '0.7rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }} />
                    </div>
                  </div>

                  {/* Keywords */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      কীওয়ার্ড / প্রশ্নের ভিন্নরূপ * <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(প্রতিটি নতুন লাইনে)</span>
                    </label>
                    <textarea
                      value={form.keywords}
                      onChange={e => setForm(f => ({ ...f, keywords: e.target.value }))}
                      placeholder={"দাম কত\nখরচ কত\nprice ki\nkoto taka lagbe"}
                      rows={4}
                      style={{
                        width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', resize: 'vertical',
                        border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-section)',
                        color: 'var(--text-primary)', fontSize: '0.88rem', boxSizing: 'border-box', fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  {/* Answer */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>উত্তর *</label>
                    <textarea
                      value={form.answer}
                      onChange={e => setForm(f => ({ ...f, answer: e.target.value }))}
                      placeholder="ব্যবহারকারী এই উত্তরটি পাবেন..."
                      rows={4}
                      style={{
                        width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', resize: 'vertical',
                        border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-section)',
                        color: 'var(--text-primary)', fontSize: '0.88rem', boxSizing: 'border-box', fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  {/* Active Toggle */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      {form.isActive
                        ? <ToggleRight size={28} style={{ color: 'var(--accent)' }} />
                        : <ToggleLeft size={28} style={{ color: 'var(--text-muted)' }} />}
                    </button>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                      {form.isActive ? 'সক্রিয় — chatbot-এ দেখাবে' : 'নিষ্ক্রিয় — chatbot-এ দেখাবে না'}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button onClick={closeModal} style={{ padding: '0.65rem 1.4rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-section)', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}>
                    বাতিল
                  </button>
                  <button onClick={handleSave} disabled={saving} style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.65rem 1.4rem', borderRadius: '8px', border: 'none',
                    backgroundColor: 'var(--accent)', color: 'var(--bg-primary)', cursor: 'pointer', fontWeight: 700
                  }}>
                    <Save size={16} /> {saving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`@keyframes slideIn { from { opacity:0; transform:translateX(20px) } to { opacity:1; transform:translateX(0) } }`}</style>
    </div>
  )
}
