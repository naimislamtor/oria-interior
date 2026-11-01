import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, RefreshCw, CloudUpload, CheckCircle2, Users } from 'lucide-react'
import axiosInstance from '../../api/axiosInstance'

const EMPTY = { name: '', designation: '', order: 0 }

export default function AdminTeam() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(null)
  const fileRef = useRef()

  const showToast = (msg, type='success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchMembers = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get('/api/team')
      setMembers(res.data.data || [])
    } catch { } finally { setLoading(false) }
  }

  useEffect(() => { fetchMembers() }, [])

  const openAdd = () => {
    setForm(EMPTY); setEditId(null)
    setPhotoFile(null); setPhotoPreview(null)
    setError(''); setModal(true)
  }

  const openEdit = (m) => {
    setForm({ name: m.name, designation: m.designation, order: m.order || 0 })
    setEditId(m._id); setPhotoFile(null)
    setPhotoPreview(m.imageUrl || null)
    setError(''); setModal(true)
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.designation) { setError('নাম ও পদবী আবশ্যক'); return }
    if (!editId && !photoFile) { setError('ছবি আপলোড করুন'); return }

    setSaving(true); setError('')
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('designation', form.designation)
      fd.append('order', form.order)
      if (photoFile) fd.append('photo', photoFile)

      if (editId) {
        await axiosInstance.put(`/api/team/${editId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        showToast('টিম মেম্বার আপডেট ✅')
      } else {
        await axiosInstance.post('/api/team', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        showToast('নতুন মেম্বার যোগ হয়েছে ✅')
      }
      setModal(false); fetchMembers()
    } catch (err) {
      setError(err?.response?.data?.message || 'সংরক্ষণ ব্যর্থ')
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('এই মেম্বার মুছে ফেলবেন?')) return
    try {
      await axiosInstance.delete(`/api/team/${id}`)
      setMembers(p => p.filter(m => m._id !== id))
      showToast('মুছে ফেলা হয়েছে')
    } catch { showToast('মুছতে ব্যর্থ', 'error') }
  }

  return (
    <div>
      {toast && (
        <div style={{ position:'fixed', top:'1.5rem', right:'1.5rem', zIndex:9999, padding:'0.8rem 1.4rem', borderRadius:'10px', backgroundColor: toast.type==='success' ? 'var(--accent)' : '#ef4444', color:'#fff', fontWeight:700, boxShadow:'0 4px 24px rgba(0,0,0,0.2)', display:'flex', alignItems:'center', gap:'0.5rem' }}>
          <CheckCircle2 size={17} /> {toast.msg}
        </div>
      )}

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h1 style={{ fontSize:'1.6rem', fontWeight:700, color:'var(--text-primary)', margin:0 }}>টিম ম্যানেজমেন্ট</h1>
          <p style={{ color:'var(--text-muted)', fontSize:'0.85rem', margin:'0.2rem 0 0' }}>ছবি Cloudinary-তে save হবে • মোট {members.length} জন</p>
        </div>
        <div style={{ display:'flex', gap:'0.7rem' }}>
          <button onClick={fetchMembers} style={{ display:'flex', alignItems:'center', gap:'0.4rem', padding:'0.6rem 1rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-card)', color:'var(--text-secondary)', cursor:'pointer', fontSize:'0.85rem' }}>
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={openAdd} style={{ display:'flex', alignItems:'center', gap:'0.4rem', padding:'0.6rem 1.1rem', borderRadius:'8px', border:'none', background:'var(--accent)', color:'var(--bg-primary)', cursor:'pointer', fontWeight:700, fontSize:'0.85rem' }}>
            <Plus size={15} /> নতুন মেম্বার
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign:'center', padding:'4rem', color:'var(--text-muted)' }}>লোড হচ্ছে...</div>
      ) : members.length === 0 ? (
        <div style={{ textAlign:'center', padding:'4rem', color:'var(--text-muted)' }}>
          <Users size={40} style={{ margin:'0 auto 1rem', opacity:0.3 }} />
          <p>কোনো টিম মেম্বার নেই</p>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'1.2rem' }}>
          {members.map(m => (
            <div key={m._id} style={{ background:'var(--bg-card)', border:'1px solid var(--border-color)', borderRadius:'12px', overflow:'hidden', textAlign:'center' }}>
              <div style={{ position:'relative', height:'180px', overflow:'hidden' }}>
                <img src={m.imageUrl} alt={m.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.4)', opacity:0, transition:'0.2s', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem' }}
                  onMouseEnter={e => e.currentTarget.style.opacity=1} onMouseLeave={e => e.currentTarget.style.opacity=0}>
                  <button onClick={() => openEdit(m)} style={{ padding:'0.5rem 0.8rem', borderRadius:'7px', border:'none', background:'#fff', color:'#333', cursor:'pointer' }}><Pencil size={13} /></button>
                  <button onClick={() => handleDelete(m._id)} style={{ padding:'0.5rem 0.8rem', borderRadius:'7px', border:'none', background:'#ef4444', color:'#fff', cursor:'pointer' }}><Trash2 size={13} /></button>
                </div>
              </div>
              <div style={{ padding:'0.8rem' }}>
                <p style={{ fontWeight:700, fontSize:'0.9rem', color:'var(--text-primary)', margin:0 }}>{m.name}</p>
                <p style={{ fontSize:'0.78rem', color:'var(--text-muted)', margin:'0.2rem 0 0' }}>{m.designation}</p>
                {m.order > 0 && <p style={{ fontSize:'0.7rem', color:'var(--accent)', margin:'0.2rem 0 0' }}>ক্রম: {m.order}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setModal(false)}
            style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
            <motion.div initial={{ scale:0.94 }} animate={{ scale:1 }} exit={{ scale:0.94 }}
              onClick={e => e.stopPropagation()}
              style={{ background:'var(--bg-card)', borderRadius:'14px', width:'100%', maxWidth:'440px', boxShadow:'0 20px 60px rgba(0,0,0,0.3)' }}>

              <div style={{ padding:'1.2rem 1.5rem', borderBottom:'1px solid var(--border-color)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <h3 style={{ margin:0, color:'var(--text-primary)', fontWeight:700 }}>{editId ? 'মেম্বার সম্পাদনা' : 'নতুন টিম মেম্বার'}</h3>
                <button onClick={() => setModal(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)' }}><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit} style={{ padding:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
                {/* Photo upload */}
                <div>
                  <label style={{ display:'block', fontWeight:600, fontSize:'0.82rem', marginBottom:'0.5rem', color:'var(--text-secondary)' }}>ছবি {!editId && '*'}</label>
                  <div onClick={() => fileRef.current.click()} style={{ border:'2px dashed', borderColor: photoPreview ? 'var(--accent)' : 'var(--border-color)', borderRadius:'10px', height:'160px', cursor:'pointer', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg-section)', position:'relative' }}>
                    {photoPreview ? (
                      <img src={photoPreview} alt="preview" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    ) : (
                      <div style={{ textAlign:'center', color:'var(--text-muted)' }}>
                        <CloudUpload size={28} style={{ margin:'0 auto 0.5rem' }} />
                        <p style={{ fontSize:'0.78rem' }}>ক্লিক করে ছবি আপলোড করুন</p>
                      </div>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                </div>

                <div>
                  <label style={{ display:'block', fontWeight:600, fontSize:'0.82rem', marginBottom:'0.4rem', color:'var(--text-secondary)' }}>নাম *</label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="যেমন: Naim Islam"
                    style={{ width:'100%', padding:'0.7rem 1rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-section)', color:'var(--text-primary)', fontSize:'0.88rem', boxSizing:'border-box' }} />
                </div>

                <div>
                  <label style={{ display:'block', fontWeight:600, fontSize:'0.82rem', marginBottom:'0.4rem', color:'var(--text-secondary)' }}>পদবী *</label>
                  <input value={form.designation} onChange={e => setForm({...form, designation: e.target.value})} required placeholder="যেমন: Lead Designer"
                    style={{ width:'100%', padding:'0.7rem 1rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-section)', color:'var(--text-primary)', fontSize:'0.88rem', boxSizing:'border-box' }} />
                </div>

                <div>
                  <label style={{ display:'block', fontWeight:600, fontSize:'0.82rem', marginBottom:'0.4rem', color:'var(--text-secondary)' }}>ক্রম (Order)</label>
                  <input type="number" value={form.order} onChange={e => setForm({...form, order: e.target.value})} min="0"
                    style={{ width:'100%', padding:'0.7rem 1rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-section)', color:'var(--text-primary)', fontSize:'0.88rem', boxSizing:'border-box' }} />
                </div>

                {error && <p style={{ color:'#ef4444', fontSize:'0.83rem', margin:0 }}>{error}</p>}

                <div style={{ display:'flex', gap:'0.75rem', justifyContent:'flex-end' }}>
                  <button type="button" onClick={() => setModal(false)} style={{ padding:'0.65rem 1.3rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-section)', color:'var(--text-primary)', cursor:'pointer', fontWeight:600 }}>বাতিল</button>
                  <button type="submit" disabled={saving} style={{ display:'flex', alignItems:'center', gap:'0.4rem', padding:'0.65rem 1.4rem', borderRadius:'8px', border:'none', background:'var(--accent)', color:'var(--bg-primary)', cursor:'pointer', fontWeight:700, opacity: saving ? 0.7 : 1 }}>
                    <CloudUpload size={15} /> {saving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
