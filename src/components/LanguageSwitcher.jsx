import { useLanguage } from '../context/LanguageContext'
import { Languages } from 'lucide-react'

function LanguageSwitcher() {
  const { lang, toggleLang } = useLanguage()

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-color)] hover:border-[var(--accent)] transition bg-[var(--bg-card)] text-xs font-semibold"
      style={{ color: 'var(--text-primary)' }}
      aria-label="Switch Language"
      title={lang === 'bn' ? 'English এ পরিবর্তন করুন' : 'বাংলায় পরিবর্তন করুন'}
    >
      <Languages size={15} style={{ color: 'var(--accent)' }} />
      <span className="tracking-wide">
        {lang === 'bn' ? (
          <>
            <span style={{ color: 'var(--accent)' }}>BN</span> | EN
          </>
        ) : (
          <>
            EN | <span style={{ color: 'var(--accent)' }}>বাংলা</span>
          </>
        )}
      </span>
    </button>
  )
}

export default LanguageSwitcher
