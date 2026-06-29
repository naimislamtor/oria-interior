import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-[#c9a84c] mb-3">ORIO <span className="text-white font-light">INTERIOR</span></h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            We design beautiful, functional spaces that inspire and elevate everyday living.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-[#c9a84c] transition text-sm">Facebook</a>
            <a href="#" className="hover:text-[#c9a84c] transition text-sm">Instagram</a>
            <a href="#" className="hover:text-[#c9a84c] transition text-sm">YouTube</a>
            <a href="#" className="hover:text-[#c9a84c] transition text-sm">LinkedIn</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {['/', '/about', '/services', '/portfolio', '/gallery', '/blog', '/faq', '/contact'].map((path, i) => (
              <li key={path}>
                <Link to={path} className="hover:text-[#c9a84c] transition capitalize">
                  {['Home', 'About', 'Services', 'Portfolio', 'Gallery', 'Blog', 'FAQ', 'Contact'][i]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Services</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Residential Interior</li>
            <li>Commercial Interior</li>
            <li>Office Interior</li>
            <li>Restaurant Interior</li>
            <li>Furniture Design</li>
            <li>3D Visualization</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={15} className="text-[#c9a84c]" />
              <span>01983890650</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-[#c9a84c]" />
              <span>info@oriointerior.com</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="text-[#c9a84c] mt-1" />
              <span>Dhaka, Bangladesh</span>
            </li>
          </ul>
          <Link
            to="/appointment"
            className="mt-4 inline-block bg-[#c9a84c] text-black px-4 py-2 rounded text-sm font-semibold hover:bg-yellow-500 transition"
          >
            Book Appointment
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Orio Interior. All rights reserved. Powered by Naim's Team.
      </div>
    </footer>
  )
}

export default Footer