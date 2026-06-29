import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

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
    <nav className="bg-[#1a1a1a] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#c9a84c]">
          ORIO <span className="text-white font-light">INTERIOR</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-[#c9a84c] border-b-2 border-[#c9a84c] pb-1'
                    : 'hover:text-[#c9a84c] transition'
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          to="/quote"
          className="hidden md:block bg-[#c9a84c] text-black px-5 py-2 rounded font-semibold hover:bg-yellow-500 transition text-sm"
        >
          Get Quote
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#111] px-4 pb-4">
          <ul className="flex flex-col gap-3 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? 'text-[#c9a84c]' : 'hover:text-[#c9a84c] transition'
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
                className="block bg-[#c9a84c] text-black px-4 py-2 rounded font-semibold text-center"
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