import { useLanguage } from '../context/LanguageContext'
import { Globe } from 'lucide-react'

function LanguageSwitcher({ compact = false }) {
  const { lang, setLang } = useLanguage()

  return (
    <div
      className={`inline-flex items-center rounded-full border transition-all shadow-sm ${
        compact ? 'p-0.5 gap-0.5 text-[11px] h-8' : 'p-1 gap-1 text-xs h-9'
      }`}
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)',
      }}
      aria-label="Language Switcher"
    >
      <div className="pl-1.5 pr-0.5 flex items-center justify-center">
        <Globe size={compact ? 13 : 15} style={{ color: 'var(--accent)' }} />
      </div>

      <div
        className="flex items-center rounded-full p-0.5"
        style={{ backgroundColor: 'color-mix(in srgb, var(--border-color) 40%, transparent)' }}
      >
        <button
          type="button"
          onClick={() => setLang('en')}
          className={`px-2 py-0.5 rounded-full transition-all duration-200 text-center leading-none ${
            compact ? 'text-[10px]' : 'text-xs'
          }`}
          style={
            lang === 'en'
              ? {
                  backgroundColor: 'var(--accent)',
                  color: 'var(--bg-primary)',
                  fontWeight: '700',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }
              : {
                  color: 'var(--text-primary)',
                  opacity: 0.75,
                  fontWeight: '500',
                }
          }
          aria-label="Switch to English"
        >
          EN
        </button>

        <button
          type="button"
          onClick={() => setLang('bn')}
          className={`px-2 py-0.5 rounded-full transition-all duration-200 text-center leading-none ${
            compact ? 'text-[10px]' : 'text-xs'
          }`}
          style={
            lang === 'bn'
              ? {
                  backgroundColor: 'var(--accent)',
                  color: 'var(--bg-primary)',
                  fontWeight: '700',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }
              : {
                  color: 'var(--text-primary)',
                  opacity: 0.75,
                  fontWeight: '500',
                }
          }
          aria-label="Switch to Bangla"
        >
          বাংলা
        </button>
      </div>
    </div>
  )
}

export default LanguageSwitcher
