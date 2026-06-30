import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const themes = {
  gold: {
    name: 'Dark Gold',
    '--bg-primary': '#1a1a1a',
    '--bg-secondary': '#111111',
    '--bg-section': '#f9fafb',
    '--bg-card': '#ffffff',
    '--accent': '#c9a84c',
    '--accent-hover': '#eab308',
    '--text-primary': '#1a1a1a',
    '--text-secondary': '#4b5563',
    '--text-on-dark': '#ffffff',
    '--text-muted': '#9ca3af',
    '--border-color': '#e5e7eb',
  },
  cream: {
    name: 'Elegant Cream',
    '--bg-primary': '#3d2f23',
    '--bg-secondary': '#2e2319',
    '--bg-section': '#fffdf9',
    '--bg-card': '#ffffff',
    '--accent': '#9c6b3e',
    '--accent-hover': '#7d5530',
    '--text-primary': '#1f1812',
    '--text-secondary': '#3f3327',
    '--text-on-dark': '#fdf6ec',
    '--text-muted': '#6b5d4f',
    '--border-color': '#ddd0bd',
  },
  navy: {
    name: 'Navy Luxury',
    '--bg-primary': '#0a1929',
    '--bg-secondary': '#091420',
    '--bg-section': '#f4f7fb',
    '--bg-card': '#ffffff',
    '--accent': '#c5a572',
    '--accent-hover': '#d4b483',
    '--text-primary': '#0a1929',
    '--text-secondary': '#4a5a6a',
    '--text-on-dark': '#ffffff',
    '--text-muted': '#8a9aac',
    '--border-color': '#dde5ed',
  },
}

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(() => {
    return localStorage.getItem('oria-theme') || 'gold'
  })

  useEffect(() => {
    const theme = themes[themeName]
    const root = document.documentElement
    Object.entries(theme).forEach(([key, value]) => {
      if (key.startsWith('--')) {
        root.style.setProperty(key, value)
      }
    })
    localStorage.setItem('oria-theme', themeName)
  }, [themeName])

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}