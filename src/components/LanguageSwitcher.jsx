import { useLanguage } from '../context/LanguageContext'
import { Globe } from 'lucide-react'

function LanguageSwitcher({ compact = false }) {
  const { lang, toggleLang } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleLang}
      className={`inline-flex items-center rounded-full border transition-all shadow-sm hover:opacity-90 active:scale-95 cursor-pointer select-none ${
        compact ? 'px-1.5 py-0.5 gap-1 text-[11px]' : 'px-3 py-1.5 gap-2 text-xs font-medium'
      }`}
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)',
        color: 'var(--text-primary)',
      }}
      title={lang === 'en' ? 'Switch to Bangla' : 'Switch to English'}
    >
      <Globe size={compact ? 13 : 16} style={{ color: 'var(--accent)' }} className="flex-shrink-0" />
      {compact ? (
        <span
          className="px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--bg-primary)',
          }}
        >
          {lang === 'en' ? 'EN' : 'BN'}
        </span>
      ) : (
        <div className="flex items-center gap-1">
          <span
            className="px-1.5 py-0.5 rounded text-[11px] font-bold"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-primary)',
            }}
          >
            {lang === 'en' ? 'EN' : 'বাংলা'}
          </span>
          <span className="text-[10px] opacity-50 font-semibold uppercase">
            / {lang === 'en' ? 'BN' : 'EN'}
          </span>
        </div>
      )}
    </button>
  )
}

export default LanguageSwitcher
