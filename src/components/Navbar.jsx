import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ThemeSwitcher from './ThemeSwitcher'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Blog', path: '/blog' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-50 shadow-lg"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
          ORIO <span style={{ color: 'var(--text-on-dark)', fontWeight: 300 }}>INTERIOR</span>
        </Link>

        <ul className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => 'transition pb-1'}
                style={({ isActive }) =>
                  isActive
                    ? { color: 'var(--accent)', borderBottom: '2px solid var(--accent)' }
                    : { color: 'inherit' }
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <ThemeSwitcher />
          <Link
            to="/quote"
            className="px-5 py-2 rounded font-semibold transition text-sm"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
          >
            Get Quote
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <ThemeSwitcher />
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <ul className="flex flex-col gap-3 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  style={({ isActive }) =>
                    isActive ? { color: 'var(--accent)' } : { color: 'inherit' }
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to="/quote"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded font-semibold text-center"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
              >
                Get Quote
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar