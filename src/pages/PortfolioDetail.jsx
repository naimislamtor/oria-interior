import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Calendar, ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight,
  Maximize2, Home, Layers, Clock, User, Tag, Share2, Check
} from 'lucide-react'
import axiosInstance, { BASE_URL } from '../api/axiosInstance'

const getImageUrl = (p) => {
  if (!p) return ''
  if (p.startsWith('http://') || p.startsWith('https://')) return p
  return `${BASE_URL}/uploads/${p}`
}

/* ─── Auto-scroll Hero Slider ─── */
function HeroSlider({ images }) {
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const timerRef = useRef(null)

  const next = useCallback(() => setCurrent(c => (c + 1) % images.length), [images.length])
  const prev = useCallback(() => setCurrent(c => (c - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    timerRef.current = setInterval(next, 4000)
    return () => clearInterval(timerRef.current)
  }, [next])

  const resetTimer = (fn) => { clearInterval(timerRef.current); fn(); timerRef.current = setInterval(next, 4000) }

  if (!images.length) return null

  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: 'clamp(340px, 55vw, 620px)', overflow: 'hidden', borderRadius: '0 0 2rem 2rem', background: '#111' }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`slide-${current}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'zoom-in' }}
            onClick={() => setLightbox(current)}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />

        {/* Prev/Next buttons */}
        {images.length > 1 && (
          <>
            <button onClick={() => resetTimer(prev)} style={navBtnStyle('left')}>
              <ChevronLeft size={22} color="#fff" />
            </button>
            <button onClick={() => resetTimer(next)} style={navBtnStyle('right')}>
              <ChevronRight size={22} color="#fff" />
            </button>
          </>
        )}

        {/* Zoom icon */}
        <button onClick={() => setLightbox(current)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
          <Maximize2 size={16} color="#fff" />
        </button>

        {/* Dot indicators */}
        {images.length > 1 && (
          <div style={{ position: 'absolute', bottom: '1.2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.4rem' }}>
            {images.map((_, i) => (
              <button key={i} onClick={() => resetTimer(() => setCurrent(i))}
                style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, background: i === current ? 'var(--accent)' : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
            ))}
          </div>
        )}

        {/* Counter */}
        <div style={{ position: 'absolute', bottom: '1.2rem', right: '1.2rem', background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '1rem', backdropFilter: 'blur(8px)' }}>
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '0.75rem 1.5rem', background: 'var(--bg-primary)', scrollbarWidth: 'none' }}>
          {images.map((img, i) => (
            <img key={i} src={img} alt={`thumb-${i}`}
              onClick={() => resetTimer(() => setCurrent(i))}
              style={{ width: 72, height: 52, objectFit: 'cover', borderRadius: 8, cursor: 'pointer', border: i === current ? '2.5px solid var(--accent)' : '2.5px solid transparent', opacity: i === current ? 1 : 0.65, transition: 'all 0.2s', flexShrink: 0 }} />
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setLightbox(null)}>
            <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={20} color="#fff" />
            </button>
            {images.length > 1 && <>
              <button onClick={(e) => { e.stopPropagation(); setLightbox(l => (l - 1 + images.length) % images.length) }} style={lbNavBtn('left')}><ChevronLeft size={28} color="#fff" /></button>
              <button onClick={(e) => { e.stopPropagation(); setLightbox(l => (l + 1) % images.length) }} style={lbNavBtn('right')}><ChevronRight size={28} color="#fff" /></button>
            </>}
            <motion.img key={lightbox} src={images[lightbox]} alt="full"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: 12 }} />
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              {lightbox + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const navBtnStyle = (side) => ({
  position: 'absolute', top: '50%', [side]: '1rem', transform: 'translateY(-50%)',
  background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: '50%',
  width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', backdropFilter: 'blur(8px)', zIndex: 2, transition: 'background 0.2s'
})

const lbNavBtn = (side) => ({
  position: 'absolute', top: '50%', [side]: '1.5rem', transform: 'translateY(-50%)',
  background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
  width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', backdropFilter: 'blur(8px)', zIndex: 2
})

/* ─── Masonry Gallery Grid ─── */
function MasonryGrid({ images }) {
  const [lightbox, setLightbox] = useState(null)
  if (!images.length) return null

  return (
    <div>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.2rem' }}>
        প্রজেক্টের ছবি সমূহ
        <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--text-muted)', marginLeft: '0.75rem' }}>({images.length}টি)</span>
      </h2>

      <div style={{ columns: 'auto 240px', columnGap: '0.75rem', gap: '0.75rem' }}>
        {images.map((img, i) => (
          <motion.div key={i} whileHover={{ y: -4 }} style={{ marginBottom: '0.75rem', breakInside: 'avoid', borderRadius: 10, overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
            onClick={() => setLightbox(i)}>
            <img src={img.url} alt={img.caption || `gallery-${i}`}
              style={{ width: '100%', display: 'block', objectFit: 'cover', transition: 'transform 0.4s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
            {img.caption && (
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', color: '#fff', fontSize: '0.75rem', padding: '1.5rem 0.75rem 0.5rem' }}>
                {img.caption}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setLightbox(null)}>
            <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={20} color="#fff" />
            </button>
            {images.length > 1 && <>
              <button onClick={e => { e.stopPropagation(); setLightbox(l => (l - 1 + images.length) % images.length) }} style={lbNavBtn('left')}><ChevronLeft size={28} color="#fff" /></button>
              <button onClick={e => { e.stopPropagation(); setLightbox(l => (l + 1) % images.length) }} style={lbNavBtn('right')}><ChevronRight size={28} color="#fff" /></button>
            </>}
            <motion.img key={lightbox} src={images[lightbox].url} alt="full"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: 12 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Main Page ─── */
export default function PortfolioDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [shared, setShared] = useState(false)

  useEffect(() => {
    setLoading(true)
    axiosInstance.get(`/api/portfolio/${slug}`)
      .then(res => {
        const p = res.data.data
        setProject(p)
        // Fetch related projects (same category)
        return axiosInstance.get('/api/portfolio').then(all => {
          setRelated((all.data.data || []).filter(x => x._id !== p._id && x.category === p.category).slice(0, 3))
        })
      })
      .catch(() => navigate('/portfolio'))
      .finally(() => setLoading(false))
  }, [slug])

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try { await navigator.share({ title: project.title, url }) } catch { }
    } else {
      await navigator.clipboard.writeText(url)
      setShared(true)
      setTimeout(() => setShared(false), 2500)
    }
  }

  if (loading) return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, border: '3px solid var(--border-color)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
        <p style={{ color: 'var(--text-muted)' }}>লোড হচ্ছে...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  if (!project) return null

  // Collect all images for hero slider (cover first, then gallery)
  const heroImages = [getImageUrl(project.image), ...(project.images || []).map(i => i.url)].filter(Boolean)

  const infoItems = [
    { icon: Layers, label: 'ক্যাটাগরি', value: project.category },
    { icon: MapPin, label: 'লোকেশন', value: project.location },
    { icon: Calendar, label: 'বছর', value: project.year },
    { icon: Home, label: 'আয়তন', value: project.area },
    { icon: Clock, label: 'সময়কাল', value: project.duration },
    { icon: User, label: 'ক্লায়েন্ট', value: project.client },
  ].filter(i => i.value)

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Back button */}
      <div style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <ArrowLeft size={17} /> সব প্রজেক্ট
          </Link>

          <button onClick={handleShare} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
            {shared ? <><Check size={15} color="#22c55e" /> কপি হয়েছে!</> : <><Share2 size={15} /> শেয়ার করুন</>}
          </button>
        </div>
      </div>

      {/* Hero slider */}
      <HeroSlider images={heroImages} />

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: '2.5rem', alignItems: 'start' }}>

          {/* Left — description + masonry gallery */}
          <div>
            {/* Title */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ display: 'inline-block', background: 'var(--accent)', color: 'var(--bg-primary)', fontSize: '0.72rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '1rem', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {project.category}
              </span>
              <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.5rem', lineHeight: 1.25 }}>
                {project.title}
              </h1>
              {project.location && (
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
                  <MapPin size={14} /> {project.location} {project.year && `• ${project.year}`}
                </p>
              )}
            </div>

            {/* Description */}
            {project.description && (
              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>প্রজেক্টের বিবরণ</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>
                  {project.description}
                </p>
              </div>
            )}

            {/* Tags */}
            {project.tags?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2.5rem' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'var(--bg-section)', color: 'var(--text-secondary)', fontSize: '0.78rem', padding: '0.3rem 0.7rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                    <Tag size={11} /> {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Masonry Gallery */}
            {project.images?.length > 0 && <MasonryGrid images={project.images} />}
          </div>

          {/* Right — Project info sidebar */}
          <div style={{ position: 'sticky', top: '5rem' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 1.1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                প্রজেক্ট তথ্য
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {infoItems.map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--bg-section)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={15} color="var(--accent)" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '0 0 0.1rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0, fontWeight: 600 }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ background: 'var(--accent)', borderRadius: 16, padding: '1.5rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--bg-primary)', fontWeight: 700, fontSize: '1rem', margin: '0 0 0.4rem' }}>এরকম ডিজাইন চান?</p>
              <p style={{ color: 'var(--bg-primary)', opacity: 0.8, fontSize: '0.82rem', margin: '0 0 1rem' }}>আজই আমাদের সাথে কথা বলুন</p>
              <Link to="/consultation" style={{ display: 'block', background: 'var(--bg-primary)', color: 'var(--accent)', padding: '0.65rem', borderRadius: 10, fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                ফ্রি কনসালটেশন নিন →
              </Link>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <div style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border-color)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              সম্পর্কিত প্রজেক্ট
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.1rem' }}>
              {related.map(p => (
                <Link key={p._id} to={`/portfolio/${p.slug || p._id}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <motion.div whileHover={{ y: -5 }} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 12, overflow: 'hidden', transition: 'box-shadow 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                    <div style={{ height: 160, overflow: 'hidden' }}>
                      <img src={getImageUrl(p.image)} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                    </div>
                    <div style={{ padding: '0.9rem 1rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.category}</span>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0.3rem 0 0.2rem' }}>{p.title}</h3>
                      {p.location && <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={11} />{p.location}</p>}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          .portfolio-detail-grid { grid-template-columns: 1fr !important; }
          .portfolio-sidebar { position: static !important; }
        }
      `}</style>
    </div>
  )
}
