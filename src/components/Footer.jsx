import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

const socialLinks = [
  {
    name: 'Facebook',
    url: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.05 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.05-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.25A3.25 3.25 0 1 1 12 8.5a3.25 3.25 0 0 1 0 6.5zm5.25-9.563a1.17 1.17 0 1 0 0-2.34 1.17 1.17 0 0 0 0 2.34z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.546 15.568V8.432L15.818 12l-6.272 3.568z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z" />
      </svg>
    ),
  },
]

function Footer() {
  return (
    <footer
      className="pt-12 pb-6"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--accent)' }}>
            ORIO <span style={{ color: 'var(--text-on-dark)', fontWeight: 300 }}>INTERIOR</span>
          </h2>
          <p className="text-sm opacity-70 leading-relaxed">
            We design beautiful, functional spaces that inspire and elevate everyday living.
          </p>
          <div className="flex gap-3 mt-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                aria-label={social.name}
                className="w-9 h-9 flex items-center justify-center rounded-full border transition hover:scale-110"
                style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-90">Quick Links</h3>
          <ul className="space-y-2 text-sm opacity-70">
            {['/', '/about', '/services', '/portfolio', '/gallery', '/blog', '/faq', '/contact'].map((path, i) => (
              <li key={path}>
                <Link to={path} className="hover:opacity-100 transition capitalize">
                  {['Home', 'About', 'Services', 'Portfolio', 'Gallery', 'Blog', 'FAQ', 'Contact'][i]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-90">Services</h3>
          <ul className="space-y-2 text-sm opacity-70">
            <li>Residential Interior</li>
            <li>Commercial Interior</li>
            <li>Office Interior</li>
            <li>Restaurant Interior</li>
            <li>Furniture Design</li>
            <li>3D Visualization</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-90">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={15} style={{ color: 'var(--accent)' }} />
              <span className="opacity-80">01983890650</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} style={{ color: 'var(--accent)' }} />
              <span className="opacity-80">info@oriointerior.com</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-1" style={{ color: 'var(--accent)' }} />
              <span className="opacity-80">Dhaka, Bangladesh</span>
            </li>
          </ul>
          <Link
            to="/appointment"
            className="mt-4 inline-block px-4 py-2 rounded text-sm font-semibold transition"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
          >
            Book Appointment
          </Link>
        </div>
      </div>

      <div className="border-t mt-8 pt-4 text-center text-xs opacity-50" style={{ borderColor: 'var(--border-color)' }}>
        © {new Date().getFullYear()} Orio Interior. All rights reserved. Developement by Hamza's Team.
      </div>
    </footer>
  )
}

export default Footer