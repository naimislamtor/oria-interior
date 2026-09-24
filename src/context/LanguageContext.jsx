import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../data/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('oria_lang') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('oria_lang', lang)
  }, [lang])

  const toggleLang = () => {
    setLang((prev) => (prev === 'bn' ? 'en' : 'bn'))
  }

  // Translation helper function
  const t = (path) => {
    const keys = path.split('.')
    let current = translations[lang]

    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key]
      } else {
        // Fallback to English if translation missing
        let fallback = translations.en
        for (const k of keys) {
          if (fallback && fallback[k] !== undefined) {
            fallback = fallback[k]
          } else {
            return path
          }
        }
        return fallback
      }
    }
    return current
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
