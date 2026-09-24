import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="border-b last:border-0 cursor-pointer"
      style={{ borderColor: 'var(--border-color)' }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-5 gap-4">
        <h3 className="font-medium text-base leading-snug" style={{ color: 'var(--text-primary)' }}>{q}</h3>
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition"
          style={{ backgroundColor: open ? 'var(--accent)' : 'color-mix(in srgb, var(--accent) 10%, transparent)' }}
        >
          {open
            ? <Minus size={16} style={{ color: 'var(--bg-primary)' }} />
            : <Plus size={16} style={{ color: 'var(--accent)' }} />
          }
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FAQ() {
  const { t } = useLanguage()
  const [search, setSearch] = useState('')
  const [activeCategoryKey, setActiveCategoryKey] = useState('All')

  const rawFaqs = t('faqPage.faqs') || []

  const categoryKeys = ['All', 'General', 'Pricing', 'Process', 'Services']

  const getCategoryLabel = (catKey) => {
    if (catKey === 'All') return t('faqPage.allCategory')
    return t(`faqPage.categories.${catKey}`) || catKey
  }

  const filtered = rawFaqs
    .map((section) => ({
      ...section,
      questions: (section.questions || []).filter(
        (q) =>
          (activeCategoryKey === 'All' || section.category === activeCategoryKey) &&
          (q.q.toLowerCase().includes(search.toLowerCase()) ||
            q.a.toLowerCase().includes(search.toLowerCase()))
      ),
    }))
    .filter((section) => section.questions.length > 0)

  return (
    <div style={{ backgroundColor: 'var(--bg-section)' }}>
      {/* Header */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1600"
            alt="FAQ"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-semibold uppercase tracking-wider text-sm mb-3" style={{ color: 'var(--accent)' }}>
            {t('faqPage.tag')}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">
            {t('faqPage.titleStart')}{' '}
            <span style={{ color: 'var(--accent)' }}>{t('faqPage.titleSpan')}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="opacity-75 mb-8">
            {t('faqPage.subtitle')}
          </motion.p>

          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative max-w-lg mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
            <input
              type="text"
              placeholder={t('faqPage.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg text-sm outline-none"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--text-on-dark)' }}
            />
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 border-b" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        <div className="max-w-3xl mx-auto px-4 flex flex-wrap gap-3 justify-center">
          {categoryKeys.map((catKey) => (
            <button
              key={catKey}
              onClick={() => setActiveCategoryKey(catKey)}
              className="px-5 py-2 rounded-full text-sm font-medium transition"
              style={{
                backgroundColor: activeCategoryKey === catKey ? 'var(--accent)' : 'transparent',
                color: activeCategoryKey === catKey ? 'var(--bg-primary)' : 'var(--text-secondary)',
                border: `1px solid ${activeCategoryKey === catKey ? 'var(--accent)' : 'var(--border-color)'}`,
              }}
            >
              {getCategoryLabel(catKey)}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        {filtered.length === 0 ? (
          <p className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
            {t('faqPage.noResults')}
          </p>
        ) : (
          <div className="space-y-10">
            {filtered.map((section) => (
              <motion.div key={section.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                <h2 className="text-lg font-bold mb-4 pb-2 border-b" style={{ color: 'var(--accent)', borderColor: 'var(--border-color)' }}>
                  {getCategoryLabel(section.category)}
                </h2>
                <div className="premium-card px-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  {section.questions.map((item) => (
                    <FAQItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: 'var(--accent)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'var(--bg-primary)' }}>
            {t('faqPage.stillHaveQuestions')}
          </h2>
          <p className="mb-6 opacity-80" style={{ color: 'var(--bg-primary)' }}>
            {t('faqPage.stillQuestionsDesc')}
          </p>
          <Link
            to="/contact"
            className="btn-animated inline-flex items-center gap-2 px-7 py-3 rounded font-semibold"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
          >
            {t('faqPage.contactBtn')}
          </Link>
        </div>
      </section>
    </div>
  )
}

export default FAQ