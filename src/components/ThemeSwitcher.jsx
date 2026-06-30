import { useState } from 'react'
import { Palette, Check } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const { themeName, setThemeName, themes } = useTheme()

  const swatchColors = {
    gold: '#c9a84c',
    cream: '#b08968',
    navy: '#0a1929',
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-[var(--border-color)] hover:border-[var(--accent)] transition bg-[var(--bg-card)]"
        aria-label="Switch theme"
      >
        <Palette size={16} style={{ color: 'var(--accent)' }} />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg shadow-xl z-50 p-2">
            <p className="text-xs font-semibold text-[var(--text-muted)] px-3 py-2 uppercase tracking-wider">
              Choose Theme
            </p>
            {Object.keys(themes).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setThemeName(key)
                  setOpen(false)
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-[var(--bg-section)] transition text-left"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-5 h-5 rounded-full border border-black/10"
                    style={{ backgroundColor: swatchColors[key] }}
                  />
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {themes[key].name}
                  </span>
                </div>
                {themeName === key && (
                  <Check size={16} style={{ color: 'var(--accent)' }} />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ThemeSwitcher