import { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ChevronDown, Sofa, Wrench } from 'lucide-react'
import ThemeSwitcher from './ThemeSwitcher'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Blog', path: '/blog' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
]

const serviceDropdown = [
  {
    name: 'Interior Design Services',
    path: '/services',
    icon: Sofa,
    desc: 'Residential, Commercial & More',
  },
  {
    name: 'Maintenance & Repair',
    path: '/services/maintenance',
    icon: Wrench,
    desc: 'Painting, Plumbing, Electrical & More',
  },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav
      className="sticky top-0 z-50 shadow-lg"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
          ORIO <span style={{ color: 'var(--text-on-dark)', fontWeight: 300 }}>INTERIOR</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 text-sm font-medium items-center">
          {navLinks.slice(0, 2).map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className="transition pb-1"
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

          {/* Services Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 transition hover:opacity-80 text-sm font-medium"
              style={{ color: 'var(--text-on-dark)' }}
            >
              Services
              <ChevronDown
                size={16}
                className="transition-transform duration-300"
                style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                className="absolute top-full left-0 mt-3 w-72 rounded-xl shadow-2xl overflow-hidden z-50 border"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
              >
                {serviceDropdown.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-4 px-5 py-4 transition hover:opacity-90 border-b last:border-0"
                      style={{ borderColor: 'var(--border-color)' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-section)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)' }}
                      >
                        <Icon size={20} style={{ color: 'var(--accent)' }} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                          {item.name}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </li>

          {navLinks.slice(2).map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className="transition pb-1"
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

        {/* Right Side */}
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

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeSwitcher />
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <ul className="flex flex-col gap-3 text-sm font-medium">
            {navLinks.slice(0, 2).map((link) => (
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

            {/* Mobile Services Dropdown */}
            <li>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center gap-1 w-full text-left"
                style={{ color: 'var(--text-on-dark)' }}
              >
                Services
                <ChevronDown
                  size={16}
                  className="transition-transform duration-300"
                  style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>
              {mobileServicesOpen && (
                <div className="mt-2 ml-3 space-y-2">
                  {serviceDropdown.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => { setMenuOpen(false); setMobileServicesOpen(false) }}
                        className="flex items-center gap-3 py-2"
                        style={{ color: 'var(--accent)' }}
                      >
                        <Icon size={16} />
                        <span className="text-sm">{item.name}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </li>

            {navLinks.slice(2).map((link) => (
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