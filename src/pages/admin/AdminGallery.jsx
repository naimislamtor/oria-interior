import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, RefreshCw, Upload, Search, CloudUpload, CheckCircle2 } from 'lucide-react'
import axiosInstance from '../../api/axiosInstance'

const CATEGORIES = ['Residential', 'Commercial', 'Restaurant', 'Office']
const EMPTY = { title: '', category: 'Residential', description: '' }

const ImageUploadBox = ({ label, file, preview, onChange, required }) => {
  const ref = useRef()
  return (
    <div>
      <label style={{ display:'block', fontWeight:600, fontSize:'0.82rem', marginBottom:'0.4rem', color:'var(--text-secondary)' }}>
        {label} {required && '*'}
      </label>
      <div
        onClick={() => ref.current.click()}
        style={{
          border: '2px dashed', borderColor: preview ? 'var(--accent)' : 'var(--border-color)',
          borderRadius: '10px', height: '140px', cursor: 'pointer', overflow: 'hidden',
          position: 'relative', backgroundColor: 'var(--bg-section)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s'
        }}
      >
        {preview ? (
          <>
            <img src={preview} alt="preview" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{
              position:'absolute', bottom:0, left:0, right:0, padding:'0.3rem',
              background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.3rem'
            }}>
              <CheckCircle2 size={13} color="#4ade80" />
              <span style={{ color:'#fff', fontSize:'0.7rem' }}>{file ? 'নতুন ছবি নির্বাচিত' : 'বিদ্যমান ছবি'}</span>
            </div>
          </>
        ) : (
          <div style={{ textAlign:'center', color:'var(--text-muted)' }}>
            <CloudUpload size={28} style={{ margin:'0 auto 0.5rem' }} />
            <p style={{ fontSize:'0.78rem' }}>ক্লিক করে ছবি আপলোড করুন</p>
            <p style={{ fontSize:'0.7rem', marginTop:'0.2rem' }}>JPG, PNG, WebP (max 10MB)</p>
          </div>
        )}
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={onChange} />
    </div>
  )
}

export default function AdminGallery() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [beforeFile, setBeforeFile] = useState(null)
  const [afterFile, setAfterFile] = useState(null)
  const [beforePreview, setBeforePreview] = useState(null)
  const [afterPreview, setAfterPreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(null)
  const [uploading, setUploading] = useState(false)

  const showToast = (msg, type='success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get('/api/gallery')
      setItems(res.data.data || [])
    } catch { } finally { setLoading(false) }
  }

  useEffect(() => { fetchItems() }, [])

  const openAdd = () => {
    setForm(EMPTY); setEditId(null)
    setBeforeFile(null); setAfterFile(null)
    setBeforePreview(null); setAfterPreview(null)
    setError(''); setModal(true)
  }

  const openEdit = (item) => {
    setForm({ title: item.title, category: item.category, description: item.description || '' })
    setEditId(item._id)
    setBeforeFile(null); setAfterFile(null)
    setBeforePreview(item.beforeImage || null)
    setAfterPreview(item.afterImage || null)
    setError(''); setModal(true)
  }

  const handleFileChange = (type, e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    if (type === 'before') { setBeforeFile(file); setBeforePreview(url) }
    else { setAfterFile(file); setAfterPreview(url) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) { setError('শিরোনাম দেওয়া বাধ্যতামূলক'); return }
    if (!editId && (!beforeFile || !afterFile)) { setError('Before ও After দুটো ছবিই প্রয়োজন'); return }

    setSaving(true); setUploading(true); setError('')
    try {
      const fd = new FormData()
      fd.append('title', form.title)
      fd.append('category', form.category)
      fd.append('description', form.description)
      if (beforeFile) fd.append('beforeImage', beforeFile)
      if (afterFile) fd.append('afterImage', afterFile)

      if (editId) {
        await axiosInstance.put(`/api/gallery/${editId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        showToast('Gallery item আপডেট হয়েছে ✅')
      } else {
        await axiosInstance.post('/api/gallery', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        showToast('নতুন transformation যোগ হয়েছে ✅')
      }
      setModal(false); fetchItems()
    } catch (err) {
      setError(err?.response?.data?.message || 'সংরক্ষণ ব্যর্থ হয়েছে')
    } finally { setSaving(false); setUploading(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('এই item মুছে ফেলবেন? Cloudinary থেকেও মুছে যাবে।')) return
    try {
      await axiosInstance.delete(`/api/gallery/${id}`)
      setItems(p => p.filter(i => i._id !== id))
      showToast('মুছে ফেলা হয়েছে')
    } catch { showToast('মুছতে ব্যর্থ', 'error') }
  }

  const filtered = items.filter(i => i.title?.toLowerCase().includes(search.toLowerCase()) || i.category?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ minHeight:'100vh' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position:'fixed', top:'1.5rem', right:'1.5rem', zIndex:9999,
          padding:'0.8rem 1.4rem', borderRadius:'10px',
          backgroundColor: toast.type==='success' ? 'var(--accent)' : '#ef4444',
          color:'#fff', fontWeight:700, boxShadow:'0 4px 24px rgba(0,0,0,0.2)',
          display:'flex', alignItems:'center', gap:'0.5rem'
        }}>
          <CheckCircle2 size={17} /> {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h1 style={{ fontSize:'1.6rem', fontWeight:700, color:'var(--text-primary)', margin:0 }}>Before & After Gallery</h1>
          <p style={{ color:'var(--text-muted)', fontSize:'0.85rem', margin:'0.2rem 0 0' }}>ছবি Cloudinary-তে save হবে • মোট {items.length}টি</p>
        </div>
        <div style={{ display:'flex', gap:'0.7rem' }}>
          <button onClick={fetchItems} style={{ display:'flex', alignItems:'center', gap:'0.4rem', padding:'0.6rem 1rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-card)', color:'var(--text-secondary)', cursor:'pointer', fontSize:'0.85rem' }}>
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={openAdd} style={{ display:'flex', alignItems:'center', gap:'0.4rem', padding:'0.6rem 1.1rem', borderRadius:'8px', border:'none', background:'var(--accent)', color:'var(--bg-primary)', cursor:'pointer', fontWeight:700, fontSize:'0.85rem' }}>
            <Plus size={15} /> নতুন যোগ করুন
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ position:'relative', marginBottom:'1.5rem', maxWidth:'360px' }}>
        <Search size={15} style={{ position:'absolute', left:'0.85rem', top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)' }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="খুঁজুন..."
          style={{ width:'100%', padding:'0.65rem 1rem 0.65rem 2.4rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-card)', color:'var(--text-primary)', fontSize:'0.88rem', boxSizing:'border-box' }} />
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign:'center', padding:'4rem', color:'var(--text-muted)' }}>লোড হচ্ছে...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign:'center', padding:'4rem', color:'var(--text-muted)' }}>কোনো item নেই</div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'1.2rem' }}>
          {filtered.map(item => (
            <div key={item._id} style={{ background:'var(--bg-card)', border:'1px solid var(--border-color)', borderRadius:'12px', overflow:'hidden' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2px' }}>
                <div style={{ position:'relative' }}>
                  <img src={item.beforeImage} alt="before" style={{ width:'100%', height:'140px', objectFit:'cover', display:'block' }} />
                  <span style={{ position:'absolute', top:'0.4rem', left:'0.4rem', background:'rgba(0,0,0,0.6)', color:'#fff', fontSize:'0.65rem', fontWeight:700, padding:'0.15rem 0.5rem', borderRadius:'4px' }}>BEFORE</span>
                </div>
                <div style={{ position:'relative' }}>
                  <img src={item.afterImage} alt="after" style={{ width:'100%', height:'140px', objectFit:'cover', display:'block' }} />
                  <span style={{ position:'absolute', top:'0.4rem', right:'0.4rem', background:'var(--accent)', color:'var(--bg-primary)', fontSize:'0.65rem', fontWeight:700, padding:'0.15rem 0.5rem', borderRadius:'4px' }}>AFTER</span>
                </div>
              </div>
              <div style={{ padding:'0.9rem 1rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <p style={{ fontWeight:600, fontSize:'0.88rem', color:'var(--text-primary)', margin:0 }}>{item.title}</p>
                  <p style={{ fontSize:'0.75rem', color:'var(--text-muted)', margin:'0.2rem 0 0' }}>{item.category}</p>
                </div>
                <div style={{ display:'flex', gap:'0.4rem' }}>
                  <button onClick={() => openEdit(item)} style={{ padding:'0.4rem 0.7rem', borderRadius:'7px', border:'1px solid var(--border-color)', background:'none', color:'var(--text-secondary)', cursor:'pointer' }}>
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => handleDelete(item._id)} style={{ padding:'0.4rem 0.7rem', borderRadius:'7px', border:'1px solid #ef444440', background:'none', color:'#ef4444', cursor:'pointer' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setModal(false)}
            style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.5)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
            <motion.div initial={{ scale:0.94, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.94, opacity:0 }}
              onClick={e => e.stopPropagation()}
              style={{ background:'var(--bg-card)', borderRadius:'14px', width:'100%', maxWidth:'580px', maxHeight:'90vh', overflowY:'auto', boxShadow:'0 20px 60px rgba(0,0,0,0.3)' }}>

              <div style={{ padding:'1.2rem 1.5rem', borderBottom:'1px solid var(--border-color)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <h3 style={{ margin:0, color:'var(--text-primary)', fontSize:'1.05rem', fontWeight:700 }}>
                  {editId ? 'Gallery Item সম্পাদনা' : 'নতুন Before & After যোগ করুন'}
                </h3>
                <button onClick={() => setModal(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)' }}><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit} style={{ padding:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
                {/* Image uploads */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                  <ImageUploadBox label="Before ছবি" file={beforeFile} preview={beforePreview} onChange={e => handleFileChange('before', e)} required={!editId} />
                  <ImageUploadBox label="After ছবি" file={afterFile} preview={afterPreview} onChange={e => handleFileChange('after', e)} required={!editId} />
                </div>

                <div>
                  <label style={{ display:'block', fontWeight:600, fontSize:'0.82rem', marginBottom:'0.4rem', color:'var(--text-secondary)' }}>শিরোনাম *</label>
                  <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required
                    placeholder="যেমন: মডার্ন লিভিং রুম ট্রান্সফর্মেশন"
                    style={{ width:'100%', padding:'0.7rem 1rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-section)', color:'var(--text-primary)', fontSize:'0.88rem', boxSizing:'border-box' }} />
                </div>

                <div>
                  <label style={{ display:'block', fontWeight:600, fontSize:'0.82rem', marginBottom:'0.4rem', color:'var(--text-secondary)' }}>ক্যাটাগরি</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    style={{ width:'100%', padding:'0.7rem 1rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-section)', color:'var(--text-primary)', fontSize:'0.88rem' }}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display:'block', fontWeight:600, fontSize:'0.82rem', marginBottom:'0.4rem', color:'var(--text-secondary)' }}>বিবরণ</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2}
                    placeholder="প্রজেক্ট সম্পর্কে সংক্ষিপ্ত বিবরণ..."
                    style={{ width:'100%', padding:'0.7rem 1rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-section)', color:'var(--text-primary)', fontSize:'0.88rem', resize:'vertical', boxSizing:'border-box', fontFamily:'inherit' }} />
                </div>

                {error && <p style={{ color:'#ef4444', fontSize:'0.83rem', margin:0 }}>{error}</p>}

                {uploading && (
                  <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', color:'var(--text-muted)', fontSize:'0.83rem' }}>
                    <Upload size={14} style={{ animation:'spin 1s linear infinite' }} />
                    Cloudinary-তে আপলোড হচ্ছে...
                  </div>
                )}

                <div style={{ display:'flex', gap:'0.75rem', justifyContent:'flex-end' }}>
                  <button type="button" onClick={() => setModal(false)} style={{ padding:'0.65rem 1.3rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-section)', color:'var(--text-primary)', cursor:'pointer', fontWeight:600 }}>বাতিল</button>
                  <button type="submit" disabled={saving} style={{ display:'flex', alignItems:'center', gap:'0.4rem', padding:'0.65rem 1.4rem', borderRadius:'8px', border:'none', background:'var(--accent)', color:'var(--bg-primary)', cursor:'pointer', fontWeight:700, opacity: saving ? 0.7 : 1 }}>
                    <CloudUpload size={15} /> {saving ? 'আপলোড হচ্ছে...' : 'সংরক্ষণ করুন'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
