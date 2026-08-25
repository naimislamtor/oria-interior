import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Star } from 'lucide-react'

const typewriterWords = [
  'Modern Interiors',
  'Luxury Design',
  'Creative Spaces',
  'Timeless Elegance',
  'Functional Beauty',
]

// TODO: এখানে আপনার নিজের mobile image path গুলো বসান
const mobileHeroImages = [
  '/images/hero-mobile-1.jpeg',
  '/images/hero-mobile-2.jpeg',
  '/images/hero-mobile-3.jpeg',
  '/images/hero-mobile-4.jpeg',
  '/images/hero-mobile-5.jpeg',
  '/images/hero-mobile-6.jpeg',
  '/images/hero-mobile-7.jpeg',
]

// Screen size detect করার জন্য hook (768px এর নিচে হলে mobile ধরা হবে)
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  )

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint])

  return isMobile
}

// Mobile-এর জন্য image slideshow
// - Auto-play: কয়েক সেকেন্ড পর পর নিজে নিজে বদলায়
// - Swipe/Drag: হাত দিয়ে টেনেও (বাম/ডান) বদলানো যায়
// - নিচে dot indicator থাকে, কয়টা image আছে ও এখন কোনটায় আছি বোঝার জন্য
function MobileImageSlideshow({ images, interval = 3500 }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goNext = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % images.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
  }

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  // Auto-play timer — user drag করলে বা dot চাপলে reset হয়ে আবার শুরু হয়
  useEffect(() => {
    const timer = setInterval(goNext, interval)
    return () => clearInterval(timer)
  }, [current, images.length, interval])

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0.5 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0.5 }),
  }

  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      <AnimatePresence custom={direction} initial={false}>
        <motion.img
          key={current}
          src={images[current]}
          alt="Oria Interior"
          className="w-full h-full object-cover absolute inset-0"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={(e, info) => {
            const swipeThreshold = 60
            if (info.offset.x < -swipeThreshold) goNext()
            else if (info.offset.x > swipeThreshold) goPrev()
          }}
        />
      </AnimatePresence>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: current === idx ? '22px' : '7px',
              height: '7px',
              backgroundColor: current === idx ? 'var(--accent)' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function Typewriter({ words, typingSpeed = 90, deletingSpeed = 50, pauseTime = 1500, isMobile = false }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    let timeout

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % words.length)
    } else {
      timeout = setTimeout(() => {
        setText((prev) =>
          isDeleting ? currentWord.slice(0, prev.length - 1) : currentWord.slice(0, prev.length + 1)
        )
      }, isDeleting ? deletingSpeed : typingSpeed)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime])

  return (
    <span
      style={{
        color: 'var(--accent)',
        textShadow: isMobile
          ? 'none'
          : '0 0 10px var(--accent), 0 0 20px var(--accent), 0 0 40px var(--accent)',
      }}
    >
      {text}
      <span className="animate-pulse">|</span>
    </span>
  )
}

function HeroSlider() {
  const isMobile = useIsMobile()

  return (
    <section className="relative overflow-hidden" style={{ height: '100vh', minHeight: '600px', maxHeight: '900px' }}>
      {/* Background: Video (desktop) or Image Slideshow (mobile) */}
      <div className="absolute inset-0">
        {isMobile ? (
          <MobileImageSlideshow images={mobileHeroImages} />
        ) : (
          <video
            src="/videos/banner-video.mp4"
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        )}
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.1) 100%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center z-10">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            {/* Trust Badge */}
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 border"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: 'white' }}
            >
              <Star size={14} style={{ color: 'var(--accent)', fill: 'var(--accent)' }} />
              Trusted by 180+ Happy Clients
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5 text-white">
              We Design Your{' '}
              <span style={{ color: 'var(--accent)' }}>Dream Space</span>
            </h1>

            {/* Typewriter line */}
            <p className="text-2xl md:text-4xl font-bold mb-5 min-h-[2.5rem]">
              <Typewriter words={typewriterWords} isMobile={isMobile} />
            </p>

            {/* Subtitle */}
            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl">
              From residential homes to commercial spaces — we create interiors that inspire and elevate everyday living.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/quote"
                className="btn-animated inline-flex items-center gap-2 px-7 py-3 rounded font-semibold"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
              >
                Get Free Quote <ArrowRight size={18} className="icon-slide" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-7 py-3 rounded font-semibold border transition hover:opacity-80"
                style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}
              >
                View Portfolio <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSlider