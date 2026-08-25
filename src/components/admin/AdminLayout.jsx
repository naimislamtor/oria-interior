import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Inbox, Image, FileText, LogOut, Menu, X, ExternalLink
} from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Inquiries', path: '/admin/inquiries', icon: Inbox },
  { name: 'Portfolio', path: '/admin/portfolio', icon: Image },
  { name: 'Blog', path: '/admin/blog', icon: FileText },
]

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { admin, logout } = useAdminAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#f4f4f5' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-64 flex flex-col z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{ backgroundColor: '#1a1a1a' }}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b" style={{ borderColor: '#2a2a2a' }}>
          <h1 className="text-xl font-bold" style={{ color: '#c9a84c' }}>
            ORIA <span className="text-white font-light">ADMIN</span>
          </h1>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                    isActive ? '' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
                style={({ isActive }) =>
                  isActive
                    ? { backgroundColor: 'rgba(201,168,76,0.15)', color: '#c9a84c' }
                    : {}
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            )
          })}
        </nav>

        {/* View Site Link */}
        <div className="px-4 pb-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition"
          >
            <ExternalLink size={18} />
            View Website
          </a>
        </div>

        {/* Admin Info + Logout */}
        <div className="px-4 py-4 border-t" style={{ borderColor: '#2a2a2a' }}>
          <div className="flex items-center gap-3 px-2 mb-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: '#c9a84c', color: '#1a1a1a' }}
            >
              {admin?.name?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{admin?.name || 'Admin'}</p>
              <p className="text-gray-500 text-xs truncate">{admin?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-4 bg-white border-b sticky top-0 z-30">
          <h1 className="font-bold text-lg" style={{ color: '#c9a84c' }}>ORIA ADMIN</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout