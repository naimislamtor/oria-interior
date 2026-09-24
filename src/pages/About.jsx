import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight, Target, Eye, Sparkles, Users, Lightbulb, ShieldCheck, Quote,
} from 'lucide-react'
import axiosInstance from '../api/axiosInstance'
import { useLanguage } from '../context/LanguageContext'

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
  const { t } = useLanguage()
  const [teamMembers, setTeamMembers] = useState([])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axiosInstance.get('/api/team')
        if (res.data.data && res.data.data.length > 0) {
          setTeamMembers(res.data.data)
        }
      } catch (err) {
        console.error('Fetch team error:', err)
      }
    }
    fetchTeam()
  }, [])

  const journey = t('aboutPage.journey') || []

  const stats = [
    { number: 100, suffix: '+', label: t('stats.completedProjects') },
    { number: 13, suffix: '+', label: t('stats.yearsExperience') },
    { number: 80, suffix: '+', label: t('stats.happyClients') },
    { number: 100, suffix: '%', label: t('stats.onTimeDelivery') },
  ]

  const whyChooseUsData = t('aboutPage.whyItems') || []
  const whyIcons = [Sparkles, Users, Lightbulb, ShieldCheck]

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
            alt="About Oria Interior"
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
            {t('aboutPage.tag')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {t('aboutPage.titleStart')}{' '}
            <span style={{ color: 'var(--accent)' }}>{t('aboutPage.titleSpan')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto opacity-75 text-lg"
          >
            {t('aboutPage.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Trusted By Strip */}
      <section className="py-8 border-b" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs uppercase tracking-widest mb-5 font-medium" style={{ color: 'var(--text-muted)' }}>
            {t('aboutPage.featuredIn')}
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
            {t('aboutPage.whoWeAre')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: 'var(--text-primary)' }}>
            {t('aboutPage.studioTitle')}
          </h2>
          <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('aboutPage.studioDesc1')}
          </p>
          <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('aboutPage.studioDesc2')}
          </p>
          <Link
            to="/portfolio"
            className="btn-animated inline-flex items-center gap-2 px-7 py-3 rounded font-semibold"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
          >
            {t('aboutPage.seeOurWork')} <ArrowRight size={18} className="icon-slide" />
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

      {/* Vision & Mission */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
              {t('aboutPage.ourPurpose')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {t('aboutPage.visionMissionTitle')}
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
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{t('aboutPage.vision')}</h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t('aboutPage.visionDesc')}
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
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{t('aboutPage.mission')}</h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t('aboutPage.missionDesc')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CEO / Managing Director Message */}
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
              src="/images/ceo-sahin.png"
              alt="MD Sahin Hossain"
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="md:col-span-2" style={{ color: 'var(--text-on-dark)' }}>
            <Quote style={{ color: 'var(--accent)' }} size={36} className="mb-4" />
            <p className="text-lg md:text-xl leading-relaxed opacity-90 mb-6">
              {t('aboutPage.founderQuote')}
            </p>
            <h4 className="text-xl font-bold">MD Sahin Hossain</h4>
            <p className="text-sm opacity-60 mt-1">{t('aboutPage.founderRole')}</p>
          </div>
        </motion.div>
      </section>

      {/* Company Journey / Timeline */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
              {t('aboutPage.journeyTag')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {t('aboutPage.journeyTitle')}
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

      {/* Team Section - Admin dynamic grid (3 column on desktop, 1 column on mobile) */}
      {teamMembers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
              {t('aboutPage.teamTag')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {t('aboutPage.teamTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member._id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="premium-card overflow-hidden group rounded-xl"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
              >
                <div className="overflow-hidden h-72">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/400x400?text=Team+Member'
                    }}
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{member.name}</h3>
                  <p className="text-sm font-medium mt-1" style={{ color: 'var(--accent)' }}>{member.designation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
              {t('aboutPage.whyTag')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {t('aboutPage.whyTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUsData.map((item, idx) => {
              const Icon = whyIcons[idx % whyIcons.length]
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
            {t('aboutPage.ctaTitle')}
          </h2>
          <p className="mb-8 max-w-xl mx-auto opacity-80" style={{ color: 'var(--bg-primary)' }}>
            {t('aboutPage.ctaSubtitle')}
          </p>
          <Link
            to="/contact"
            className="btn-animated inline-flex items-center gap-2 px-7 py-3 rounded font-semibold"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
          >
            {t('aboutPage.getInTouch')} <ArrowRight size={18} className="icon-slide" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default About