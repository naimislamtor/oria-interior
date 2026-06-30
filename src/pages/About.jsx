import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight, Target, Eye, Award, Users, Lightbulb, ShieldCheck, Quote,
} from 'lucide-react'

const journey = [
  { year: '2016', title: 'The Beginning', desc: 'Orio Interior was founded with a small team and a big vision — to redefine living spaces.' },
  { year: '2019', title: 'Expanding Services', desc: 'Launched commercial and office interior services, growing our client base across the city.' },
  { year: '2022', title: '100+ Projects', desc: 'Crossed 100 successful projects and opened our second design studio.' },
  { year: '2026', title: 'Industry Leader', desc: 'Now recognized as one of the leading interior design firms with 250+ completed projects.' },
]

const whyChooseUs = [
  { icon: Award, title: 'Award-Winning Design', desc: 'Recognized with multiple design excellence awards over the years.' },
  { icon: Users, title: 'Expert Team', desc: 'A skilled team of architects, designers, and craftsmen.' },
  { icon: Lightbulb, title: 'Creative Solutions', desc: 'Unique, innovative designs tailored to your lifestyle and budget.' },
  { icon: ShieldCheck, title: 'Quality Assurance', desc: 'Premium materials and rigorous quality checks at every step.' },
]

const stats = [
  { number: 250, suffix: '+', label: 'Projects Completed' },
  { number: 10, suffix: '+', label: 'Years of Experience' },
  { number: 180, suffix: '+', label: 'Happy Clients' },
  { number: 15, suffix: '+', label: 'Design Awards' },
]

const team = [
  { name: 'Naimul Islam', role: 'Founder & Creative Director', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400' },
  { name: 'Tasnia Rahman', role: 'Lead Interior Designer', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400' },
  { name: 'Arif Hossain', role: 'Senior Architect', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400' },
  { name: 'Mehzabin Khan', role: '3D Visualization Artist', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400' },
]

const galleryImages = [
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=500',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=500',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=500',
  'https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=500',
]

const trustedBy = ['HomeStyle Mag', 'Dhaka Living', 'Design Weekly', 'ArchiToday', 'UrbanSpace']

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

function About() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div style={{ backgroundColor: 'var(--bg-section)' }}>
      {/* Page Header with Parallax */}
      <section
        ref={heroRef}
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
      >
        <motion.div className="absolute inset-0 parallax-bg" style={{ y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1600"
            alt="About Orio Interior"
            className="w-full h-[130%] object-cover opacity-25"
          />
        </motion.div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-semibold uppercase tracking-wider text-sm mb-3"
            style={{ color: 'var(--accent)' }}
          >
            About Orio Interior
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Designing Spaces, <span style={{ color: 'var(--accent)' }}>Building Stories</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto opacity-75 text-lg"
          >
            A decade of passion, creativity, and craftsmanship — turning ordinary spaces
            into extraordinary experiences.
          </motion.p>
        </div>
      </section>

      {/* Trusted By Strip */}
      <section className="py-8 border-b" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs uppercase tracking-widest mb-5 font-medium" style={{ color: 'var(--text-muted)' }}>
            As Featured In
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            {trustedBy.map((brand) => (
              <span
                key={brand}
                className="text-lg font-bold opacity-40 hover:opacity-80 transition"
                style={{ color: 'var(--text-primary)', fontFamily: 'serif' }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Company Intro with Image Gallery */}
      <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-2 gap-4">
            <img
              src={galleryImages[0]}
              alt="Studio work"
              className="rounded-lg shadow-lg w-full h-56 object-cover col-span-2"
            />
            <img
              src={galleryImages[1]}
              alt="Studio work"
              className="rounded-lg shadow-lg w-full h-36 object-cover"
            />
            <img
              src={galleryImages[2]}
              alt="Studio work"
              className="rounded-lg shadow-lg w-full h-36 object-cover"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
            Who We Are
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: 'var(--text-primary)' }}>
            A Studio Built on Passion for Design
          </h2>
          <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Orio Interior is a full-service interior design studio dedicated to creating
            spaces that are not only beautiful but deeply personal. We work closely with
            homeowners, businesses, and architects to bring every vision to life — from
            concept sketches to the final reveal.
          </p>
          <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Our team combines functional planning with artistic detail, ensuring every
            project reflects the unique personality of the people who live and work in it.
          </p>
          <Link
            to="/portfolio"
            className="btn-animated inline-flex items-center gap-2 px-7 py-3 rounded font-semibold"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
          >
            See Our Work <ArrowRight size={18} className="icon-slide" />
          </Link>
        </motion.div>
      </section>

      {/* Animated Stats Strip */}
      <section style={{ backgroundColor: 'var(--accent)' }}>
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <Counter end={stat.number} suffix={stat.suffix} />
              <p className="text-sm font-medium opacity-80" style={{ color: 'var(--bg-primary)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Mission - with glow card hover */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
              Our Purpose
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Vision & Mission
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="premium-card p-8 transition-transform hover:-translate-y-2"
              style={{ backgroundColor: 'var(--bg-section)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-5"
                style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)' }}
              >
                <Eye style={{ color: 'var(--accent)' }} size={26} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Our Vision</h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                To become the most trusted interior design brand, recognized for transforming
                everyday spaces into extraordinary, functional works of art across the region.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="premium-card p-8 transition-transform hover:-translate-y-2"
              style={{ backgroundColor: 'var(--bg-section)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-5"
                style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)' }}
              >
                <Target style={{ color: 'var(--accent)' }} size={26} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Our Mission</h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                To deliver thoughtful, high-quality interior design solutions through honest
                communication, creative excellence, and a deep commitment to client satisfaction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-10 items-center p-8 md:p-12 rounded-2xl"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <div className="md:col-span-1">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600"
              alt="Founder"
              className="w-full h-72 object-cover rounded-lg"
            />
          </div>
          <div className="md:col-span-2" style={{ color: 'var(--text-on-dark)' }}>
            <Quote style={{ color: 'var(--accent)' }} size={36} className="mb-4" />
            <p className="text-lg md:text-xl leading-relaxed opacity-90 mb-6">
              "When we started Orio Interior, our goal was simple — to help people fall in
              love with the spaces they live and work in every day. A decade later, that
              mission hasn't changed. Every project we take on is a chance to tell a new
              story through design."
            </p>
            <h4 className="text-lg font-bold">Naimul Islam</h4>
            <p className="text-sm opacity-60">Founder & Creative Director, Orio Interior</p>
          </div>
        </motion.div>
      </section>

      {/* Company Journey / Timeline */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
              Our Journey
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Milestones Along the Way
            </h2>
          </div>
          <div className="relative">
            <div
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
              style={{ backgroundColor: 'var(--border-color)' }}
            />
            <div className="space-y-12">
              {journey.map((item, idx) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    idx % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1 text-center md:text-left" style={{ textAlign: idx % 2 === 1 ? 'right' : 'left' }}>
                    <div
                      className="premium-card inline-block p-6 max-w-sm"
                      style={{ backgroundColor: 'var(--bg-section)', border: '1px solid var(--border-color)' }}
                    >
                      <span className="font-bold text-sm" style={{ color: 'var(--accent)' }}>{item.year}</span>
                      <h3 className="text-lg font-bold mt-1 mb-2" style={{ color: 'var(--text-primary)' }}>
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div
                    className="hidden md:flex w-4 h-4 rounded-full flex-shrink-0 z-10 border-4"
                    style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--bg-card)' }}
                  />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
            Meet The Team
          </p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
            The People Behind Our Designs
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="premium-card overflow-hidden group"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
            >
              <div className="overflow-hidden h-64">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>{member.name}</h3>
                <p className="text-sm" style={{ color: 'var(--accent)' }}>{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us - with glow card hover */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              What Sets Us Apart
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="premium-card text-center p-6 transition-transform hover:-translate-y-2"
                  style={{ backgroundColor: 'var(--bg-section)', border: '1px solid var(--border-color)' }}
                >
                  <div
                    className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)' }}
                  >
                    <Icon style={{ color: 'var(--accent)' }} size={24} />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: 'var(--accent)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--bg-primary)' }}>
            Let's Build Something Beautiful Together
          </h2>
          <p className="mb-8 max-w-xl mx-auto opacity-80" style={{ color: 'var(--bg-primary)' }}>
            Ready to start your interior design journey? Reach out for a free consultation.
          </p>
          <Link
            to="/contact"
            className="btn-animated inline-flex items-center gap-2 px-7 py-3 rounded font-semibold"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
          >
            Get In Touch <ArrowRight size={18} className="icon-slide" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default About