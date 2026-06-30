import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, Sofa, Building2, Briefcase, Utensils, PenTool, Box,
  Star, Quote, MessageCircle, CheckCircle2, Search, PencilRuler, Hammer, Sparkles
} from 'lucide-react'

const services = [
  { icon: Sofa, title: 'Residential Interior', desc: 'Transform your home into a stylish, comfortable living space.' },
  { icon: Building2, title: 'Commercial Interior', desc: 'Professional designs that reflect your brand identity.' },
  { icon: Briefcase, title: 'Office Interior', desc: 'Productive, modern workspaces designed for your team.' },
  { icon: Utensils, title: 'Restaurant Interior', desc: 'Inviting dining spaces that keep customers coming back.' },
  { icon: PenTool, title: 'Furniture Design', desc: 'Custom furniture crafted to match your interior style.' },
  { icon: Box, title: '3D Visualization', desc: 'See your space before it\'s built with realistic 3D renders.' },
]

const projects = [
  { title: 'Modern Living Room', category: 'Residential', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800' },
  { title: 'Luxury Bedroom Suite', category: 'Residential', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800' },
  { title: 'Corporate Office Space', category: 'Commercial', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800' },
  { title: 'Fine Dining Restaurant', category: 'Restaurant', img: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=800' },
]

const testimonials = [
  { name: 'Sarah Ahmed', role: 'Homeowner', text: 'Orio Interior transformed our home beyond our expectations. Professional, creative, and on time.' },
  { name: 'Rafiq Hossain', role: 'Restaurant Owner', text: 'They understood our vision perfectly and delivered a stunning dining space that customers love.' },
  { name: 'Nadia Islam', role: 'Office Manager', text: 'Our new office design boosted team morale instantly. Highly recommend their expertise.' },
]

const stats = [
  { number: 250, suffix: '+', label: 'Projects Completed' },
  { number: 10, suffix: '+', label: 'Years Experience' },
  { number: 180, suffix: '+', label: 'Happy Clients' },
  { number: 15, suffix: '+', label: 'Design Awards' },
]

const process = [
  { icon: Search, step: '01', title: 'Consultation', desc: 'We learn about your vision, needs, and budget.' },
  { icon: PencilRuler, step: '02', title: 'Design & Plan', desc: 'Our team creates detailed designs and 3D visuals.' },
  { icon: Hammer, step: '03', title: 'Execution', desc: 'Skilled craftsmen bring the design to life on-site.' },
  { icon: Sparkles, step: '04', title: 'Final Reveal', desc: 'Walk into your fully transformed dream space.' },
]

const blogs = [
  { title: '10 Modern Interior Trends for 2026', date: 'Jun 15, 2026', img: 'https://images.unsplash.com/photo-1618219944342-824e40a13285?q=80&w=600' },
  { title: 'How to Choose the Right Color Palette', date: 'Jun 02, 2026', img: 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?q=80&w=600' },
  { title: 'Small Space, Big Style: Smart Tips', date: 'May 20, 2026', img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=600' },
]

function Counter({ end, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true)
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let start = 0
    const duration = 1500
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [started, end])

  return (
    <h3 ref={ref} className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--bg-primary)' }}>
      {count}{suffix}
    </h3>
  )
}

function Home() {
  return (
    <div style={{ backgroundColor: 'var(--bg-section)' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600"
            alt="Modern Interior"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--bg-primary) 20%, transparent 90%)', opacity: 0.85 }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-4 py-32 md:py-44"
        >
          <span
            className="inline-flex items-center gap-2 backdrop-blur px-4 py-1.5 rounded-full text-xs font-medium mb-6 border"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)' }}
          >
            <Star size={14} style={{ color: 'var(--accent)', fill: 'var(--accent)' }} />
            Trusted by 180+ Happy Clients
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            We Design Your <span style={{ color: 'var(--accent)' }}>Dream Space</span>
          </h1>
          <p className="opacity-80 max-w-xl mb-8 text-lg">
            From residential homes to commercial spaces, we create interiors that inspire,
            function beautifully, and reflect who you are.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/quote"
              className="px-7 py-3 rounded font-semibold transition flex items-center gap-2 shadow-lg"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
            >
              Get Free Quote <ArrowRight size={18} />
            </Link>
            <Link
              to="/portfolio"
              className="border px-7 py-3 rounded font-semibold transition hover:opacity-80"
              style={{ borderColor: 'rgba(255,255,255,0.3)' }}
            >
              View Portfolio
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section style={{ backgroundColor: 'var(--accent)' }}>
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <Counter end={stat.number} suffix={stat.suffix} />
              <p className="text-sm font-medium opacity-80" style={{ color: 'var(--bg-primary)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800"
            alt="About Orio Interior"
            className="rounded-lg shadow-xl w-full h-[420px] object-cover"
          />
          <div
            className="absolute -bottom-6 -right-6 p-5 rounded-lg shadow-xl hidden md:flex items-center gap-3 border"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <div className="p-3 rounded-full" style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
              <CheckCircle2 style={{ color: 'var(--accent)' }} size={26} />
            </div>
            <div>
              <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>10+ Years</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Of Excellence</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>About Us</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: 'var(--text-primary)' }}>
            Crafting Spaces That Tell Your Story
          </h2>
          <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            At Orio Interior, we believe every space has the potential to inspire. With over a
            decade of experience, our team blends creativity with functionality to design
            interiors that truly reflect your personality and needs.
          </p>
          <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            From concept to completion, we handle every detail — ensuring a seamless journey
            toward your dream space.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {['Free Consultation', 'Expert Designers', 'On-Time Delivery', 'Quality Materials'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 size={18} style={{ color: 'var(--accent)' }} className="flex-shrink-0" />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item}</span>
              </div>
            ))}
          </div>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all"
            style={{ color: 'var(--accent)' }}
          >
            Learn More About Us <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>Our Services</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>What We Offer</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-7 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border group"
                  style={{ backgroundColor: 'var(--bg-section)', borderColor: 'var(--border-color)' }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)' }}
                  >
                    <Icon style={{ color: 'var(--accent)' }} size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{service.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{service.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>Our Process</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>How We Work</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 mx-20" style={{ backgroundColor: 'var(--border-color)' }} />
          {process.map((p, idx) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="relative text-center"
              >
                <div
                  className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-5 relative z-10"
                  style={{ backgroundColor: 'var(--bg-primary)' }}
                >
                  <Icon style={{ color: 'var(--accent)' }} size={28} />
                </div>
                <span className="font-bold text-sm" style={{ color: 'var(--accent)' }}>{p.step}</span>
                <h3 className="text-lg font-bold mt-1 mb-2" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{p.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Before & After */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>Transformations</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-on-dark)' }}>Before & After</h2>
            <p className="mt-3 max-w-xl mx-auto opacity-70" style={{ color: 'var(--text-on-dark)' }}>
              See the dramatic difference our design expertise makes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-lg overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=800"
                alt="Before"
                className="w-full h-72 object-cover"
              />
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                BEFORE
              </span>
            </div>
            <div className="relative rounded-lg overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800"
                alt="After"
                className="w-full h-72 object-cover"
              />
              <span
                className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
              >
                AFTER
              </span>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 border px-7 py-3 rounded font-semibold transition hover:opacity-80"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'var(--text-on-dark)' }}
            >
              View More Transformations <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>Our Work</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>Featured Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
            >
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-5">
                <p className="text-xs font-semibold uppercase mb-1" style={{ color: 'var(--accent)' }}>{project.category}</p>
                <h3 className="text-white font-bold">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-3 rounded font-semibold transition"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
          >
            View All Projects <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-7 rounded-lg shadow-sm border"
                style={{ backgroundColor: 'var(--bg-section)', borderColor: 'var(--border-color)' }}
              >
                <Quote style={{ color: 'var(--accent)' }} className="mb-4" size={28} />
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>{t.text}</p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} style={{ color: 'var(--accent)', fill: 'var(--accent)' }} />
                  ))}
                </div>
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>Our Blog</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>Design Tips & Ideas</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--accent)' }}>{blog.date}</p>
              <h3 className="text-lg font-bold transition" style={{ color: 'var(--text-primary)' }}>
                {blog.title}
              </h3>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all"
            style={{ color: 'var(--accent)' }}
          >
            Read All Articles <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: 'var(--accent)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--bg-primary)' }}>
            Ready to Transform Your Space?
          </h2>
          <p className="mb-8 max-w-xl mx-auto opacity-80" style={{ color: 'var(--bg-primary)' }}>
            Get a free consultation with our design experts and take the first step toward
            your dream interior.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/consultation"
              className="px-7 py-3 rounded font-semibold transition"
              style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
            >
              Book Free Consultation
            </Link>
            <Link
              to="/contact"
              className="border px-7 py-3 rounded font-semibold transition hover:opacity-80"
              style={{ borderColor: 'var(--bg-primary)', color: 'var(--bg-primary)' }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/8801983890650"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition hover:scale-110"
      >
        <MessageCircle size={26} fill="white" />
      </a>
    </div>
  )
}

export default Home