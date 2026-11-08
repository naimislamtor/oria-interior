import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Upload, Star, RefreshCw, Images, CloudUpload, CheckCircle2 } from 'lucide-react'
import axiosInstance, { BASE_URL } from '../../api/axiosInstance'

const categories = ['Residential', 'Commercial', 'Restaurant', 'Office']
const EMPTY = { title: '', category: 'Residential', location: '', year: '', area: '', duration: '', client: '', description: '', featured: false, tags: '' }

const getImageUrl = (p) => {
  if (!p) return ''
  if (p.startsWith('http://') || p.startsWith('https://')) return p
  return `${BASE_URL}/uploads/${p}`
}

export default function AdminPortfolio() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)         // add/edit modal
  const [galleryModal, setGalleryModal] = useState(null) // gallery manage modal
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [coverFile, setCoverFile] = useState(null)
  const [coverPreview, setCoverPreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(null)
  // Gallery upload state
  const [galleryFiles, setGalleryFiles] = useState([])
  const [galleryPreviews, setGalleryPreviews] = useState([])
  const [uploadingGallery, setUploadingGallery] = useState(false)
  const coverRef = useRef()
  const galleryRef = useRef()

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get('/api/portfolio')
      setProjects(res.data.data || [])
    } catch { } finally { setLoading(false) }
  }

  useEffect(() => { fetchProjects() }, [])

  const openAdd = () => {
    setForm(EMPTY); setEditId(null)
    setCoverFile(null); setCoverPreview(null)
    setError(''); setModal(true)
  }

  const openEdit = (p) => {
    setForm({ title: p.title, category: p.category, location: p.location || '', year: p.year || '', area: p.area || '', duration: p.duration || '', client: p.client || '', description: p.description || '', featured: p.featured, tags: (p.tags || []).join(', ') })
    setEditId(p._id)
    setCoverFile(null); setCoverPreview(getImageUrl(p.image))
    setError(''); setModal(true)
  }

  const openGallery = (p) => {
    setGalleryFiles([]); setGalleryPreviews([])
    setGalleryModal(p)
  }

  const handleCoverChange = (e) => {
    const f = e.target.files[0]; if (!f) return
    setCoverFile(f); setCoverPreview(URL.createObjectURL(f))
  }

  const handleGallerySelect = (e) => {
    const files = Array.from(e.target.files)
    setGalleryFiles(files)
    setGalleryPreviews(files.map(f => URL.createObjectURL(f)))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!editId && !coverFile) { setError('Cover image আবশ্যক'); return }
    setSaving(true); setError('')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (coverFile) fd.append('image', coverFile)

      if (editId) {
        await axiosInstance.put(`/api/portfolio/${editId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        showToast('প্রজেক্ট আপডেট হয়েছে ✅')
      } else {
        await axiosInstance.post('/api/portfolio', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        showToast('নতুন প্রজেক্ট যোগ হয়েছে ✅')
      }
      setModal(false); fetchProjects()
    } catch (err) {
      setError(err?.response?.data?.message || 'সংরক্ষণ ব্যর্থ')
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('প্রজেক্ট এবং সব ছবি মুছে ফেলবেন?')) return
    try {
      await axiosInstance.delete(`/api/portfolio/${id}`)
      setProjects(p => p.filter(x => x._id !== id))
      showToast('মুছে ফেলা হয়েছে')
    } catch { showToast('মুছতে ব্যর্থ', 'error') }
  }

  const handleGalleryUpload = async () => {
    if (!galleryFiles.length || !galleryModal) return
    setUploadingGallery(true)
    try {
      const fd = new FormData()
      galleryFiles.forEach(f => fd.append('images', f))
      const res = await axiosInstance.post(`/api/portfolio/${galleryModal._id}/images`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      setGalleryModal(res.data.data)
      setGalleryFiles([]); setGalleryPreviews([])
      fetchProjects()
      showToast(`${galleryFiles.length}টি ছবি আপলোড হয়েছে ✅`)
    } catch { showToast('আপলোড ব্যর্থ', 'error') }
    finally { setUploadingGallery(false) }
  }

  const handleDeleteGalleryImage = async (imageId) => {
    if (!confirm('এই ছবি মুছে ফেলবেন?')) return
    try {
      const res = await axiosInstance.delete(`/api/portfolio/${galleryModal._id}/images/${imageId}`)
      setGalleryModal(res.data.data)
      fetchProjects()
      showToast('ছবি মুছে ফেলা হয়েছে')
    } catch { showToast('মুছতে ব্যর্থ', 'error') }
  }

  const inputStyle = { width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-section)', color: 'var(--text-primary)', fontSize: '0.88rem', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', fontWeight: 600, fontSize: '0.82rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999, padding: '0.8rem 1.4rem', borderRadius: '10px', backgroundColor: toast.type === 'success' ? 'var(--accent)' : '#ef4444', color: '#fff', fontWeight: 700, boxShadow: '0 4px 24px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={17} /> {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Projects</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0.2rem 0 0' }}>Manage your project showcase • {projects.length}টি প্রজেক্ট</p>
        </div>
        <div style={{ display: 'flex', gap: '0.7rem' }}>
          <button onClick={fetchProjects} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem' }}>
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.1rem', borderRadius: '8px', border: 'none', background: 'var(--accent)', color: 'var(--bg-primary)', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}>
            <Plus size={15} /> Add Project
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading...</div>
      ) : projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>No projects yet.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.1rem' }}>
          {projects.map(p => (
            <div key={p._id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                <img src={getImageUrl(p.image)} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {p.featured && <span style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', background: 'var(--accent)', color: 'var(--bg-primary)', fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: 4 }}>⭐ Featured</span>}
                <span style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '0.68rem', padding: '0.2rem 0.5rem', borderRadius: 4 }}>{p.category}</span>
                {p.images?.length > 0 && <span style={{ position: 'absolute', bottom: '0.5rem', left: '0.5rem', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '0.68rem', padding: '0.2rem 0.5rem', borderRadius: 4 }}>🖼 +{p.images.length} ছবি</span>}
              </div>
              <div style={{ padding: '0.9rem 1rem' }}>
                <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', margin: '0 0 0.3rem' }}>{p.title}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 0.75rem' }}>{p.location} {p.year && `• ${p.year}`}</p>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button onClick={() => openGallery(p)} style={{ flex: 1, padding: '0.4rem', borderRadius: 7, border: '1px solid var(--border-color)', background: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                    <Images size={12} /> Gallery
                  </button>
                  <button onClick={() => openEdit(p)} style={{ flex: 1, padding: '0.4rem', borderRadius: 7, border: '1px solid var(--border-color)', background: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                    <Pencil size={12} /> Edit
                  </button>
                  <button onClick={() => handleDelete(p._id)} style={{ padding: '0.4rem 0.6rem', borderRadius: 7, border: '1px solid #ef444430', background: 'none', color: '#ef4444', cursor: 'pointer' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setModal(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }}
              onClick={e => e.stopPropagation()}
              style={{ background: 'var(--bg-card)', borderRadius: 14, width: '100%', maxWidth: 600, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>

              <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'var(--bg-card)', zIndex: 10 }}>
                <h3 style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 700 }}>{editId ? 'প্রজেক্ট সম্পাদনা' : 'নতুন প্রজেক্ট যোগ করুন'}</h3>
                <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Cover image */}
                <div>
                  <label style={labelStyle}>Cover Image {!editId && '*'}</label>
                  <div onClick={() => coverRef.current.click()} style={{ border: '2px dashed', borderColor: coverPreview ? 'var(--accent)' : 'var(--border-color)', borderRadius: 10, height: 160, cursor: 'pointer', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-section)' }}>
                    {coverPreview ? <img src={coverPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (
                      <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}><CloudUpload size={28} style={{ margin: '0 auto 0.5rem' }} /><p style={{ fontSize: '0.78rem' }}>Click to upload cover image</p></div>
                    )}
                  </div>
                  <input ref={coverRef} type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
                </div>

                {/* Title + Category */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={labelStyle}>Title *</label>
                    <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required placeholder="Project name" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Category *</label>
                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={inputStyle}>
                      {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Location + Year */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div><label style={labelStyle}>Location</label><input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Gulshan, Dhaka" style={inputStyle} /></div>
                  <div><label style={labelStyle}>Year</label><input value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} placeholder="2026" style={inputStyle} /></div>
                </div>

                {/* Area + Duration */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div><label style={labelStyle}>Area (sqft)</label><input value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} placeholder="e.g. 1200 sqft" style={inputStyle} /></div>
                  <div><label style={labelStyle}>Duration</label><input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 3 months" style={inputStyle} /></div>
                </div>

                {/* Client */}
                <div><label style={labelStyle}>Client Name</label><input value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} placeholder="Optional" style={inputStyle} /></div>

                {/* Description */}
                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} placeholder="Project details, work done, materials used..." style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
                </div>

                {/* Tags */}
                <div><label style={labelStyle}>Tags (comma separated)</label><input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="modern, minimalist, luxury" style={inputStyle} /></div>

                {/* Featured */}
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Featured প্রজেক্ট (Homepage-এ দেখাবে)</span>
                </label>

                {error && <p style={{ color: '#ef4444', fontSize: '0.83rem', margin: 0 }}>{error}</p>}

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setModal(false)} style={{ padding: '0.65rem 1.3rem', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-section)', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}>বাতিল</button>
                  <button type="submit" disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.4rem', borderRadius: 8, border: 'none', background: 'var(--accent)', color: 'var(--bg-primary)', cursor: 'pointer', fontWeight: 700, opacity: saving ? 0.7 : 1 }}>
                    <CloudUpload size={15} /> {saving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Management Modal */}
      <AnimatePresence>
        {galleryModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setGalleryModal(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }}
              onClick={e => e.stopPropagation()}
              style={{ background: 'var(--bg-card)', borderRadius: 14, width: '100%', maxWidth: 680, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>

              <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'var(--bg-card)', zIndex: 10 }}>
                <div>
                  <h3 style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 700 }}>Gallery ম্যানেজ — {galleryModal.title}</h3>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{galleryModal.images?.length || 0}টি অতিরিক্ত ছবি</p>
                </div>
                <button onClick={() => setGalleryModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
              </div>

              <div style={{ padding: '1.5rem' }}>
                {/* Upload area */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div onClick={() => galleryRef.current.click()} style={{ border: '2px dashed', borderColor: galleryPreviews.length ? 'var(--accent)' : 'var(--border-color)', borderRadius: 10, padding: '1.5rem', cursor: 'pointer', textAlign: 'center', background: 'var(--bg-section)' }}>
                    <CloudUpload size={28} style={{ margin: '0 auto 0.5rem', color: 'var(--text-muted)' }} />
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>একসাথে অনেক ছবি সিলেক্ট করুন (max 20)</p>
                  </div>
                  <input ref={galleryRef} type="file" accept="image/*" multiple onChange={handleGallerySelect} className="hidden" />

                  {galleryPreviews.length > 0 && (
                    <div style={{ marginTop: '0.75rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '0.4rem', marginBottom: '0.75rem' }}>
                        {galleryPreviews.map((url, i) => (
                          <img key={i} src={url} style={{ width: '100%', height: 70, objectFit: 'cover', borderRadius: 6, border: '2px solid var(--accent)' }} />
                        ))}
                      </div>
                      <button onClick={handleGalleryUpload} disabled={uploadingGallery} style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: 'none', background: 'var(--accent)', color: 'var(--bg-primary)', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: uploadingGallery ? 0.7 : 1 }}>
                        <CloudUpload size={16} /> {uploadingGallery ? 'আপলোড হচ্ছে...' : `${galleryFiles.length}টি ছবি Upload করুন`}
                      </button>
                    </div>
                  )}
                </div>

                {/* Existing gallery images */}
                {galleryModal.images?.length > 0 ? (
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>বিদ্যমান Gallery ছবি</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.5rem' }}>
                      {galleryModal.images.map(img => (
                        <div key={img._id} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                          <img src={img.url} style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block' }} />
                          <button onClick={() => handleDeleteGalleryImage(img._id)} style={{ position: 'absolute', top: '0.3rem', right: '0.3rem', background: 'rgba(239,68,68,0.9)', border: 'none', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <X size={12} color="#fff" />
                          </button>
                          {img.caption && <p style={{ fontSize: '0.68rem', padding: '0.25rem 0.4rem', background: 'rgba(0,0,0,0.5)', color: '#fff', margin: 0 }}>{img.caption}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>এখনো কোনো gallery ছবি নেই। উপরে থেকে আপলোড করুন।</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
