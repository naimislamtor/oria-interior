import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Mail, FileText, Calendar, MessageSquare, Image, ArrowRight,
  TrendingUp, Clock
} from 'lucide-react'
import axiosInstance from '../../api/axiosInstance'
import { useAdminAuth } from '../../context/AdminAuthContext'

const statCards = [
  { key: 'contact', label: 'Contact Messages', icon: Mail, endpoint: '/api/contact', color: '#3b82f6', path: '/admin/inquiries' },
  { key: 'quote', label: 'Quote Requests', icon: FileText, endpoint: '/api/quote', color: '#8b5cf6', path: '/admin/inquiries' },
  { key: 'appointment', label: 'Appointments', icon: Calendar, endpoint: '/api/appointment', color: '#10b981', path: '/admin/inquiries' },
  { key: 'consultation', label: 'Consultations', icon: MessageSquare, endpoint: '/api/consultation', color: '#f59e0b', path: '/admin/inquiries' },
  { key: 'portfolio', label: 'Portfolio Projects', icon: Image, endpoint: '/api/portfolio', color: '#c9a84c', path: '/admin/portfolio', public: true },
]

function AdminDashboard() {
  const [stats, setStats] = useState({})
  const [recentItems, setRecentItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { token, admin } = useAdminAuth()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const results = await Promise.all(
          statCards.map(async (card) => {
            try {
              const headers = card.public ? {} : { Authorization: `Bearer ${token}` }
              const res = await axiosInstance.get(card.endpoint, { headers })
              return { key: card.key, count: res.data.data?.length || 0, data: res.data.data || [] }
            } catch {
              return { key: card.key, count: 0, data: [] }
            }
          })
        )

        const statsObj = {}
        let allRecent = []
        results.forEach((r) => {
          statsObj[r.key] = r.count
          if (r.key !== 'portfolio') {
            allRecent = allRecent.concat(
              r.data.slice(0, 3).map((item) => ({ ...item, _type: r.key }))
            )
          }
        })

        allRecent.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        setRecentItems(allRecent.slice(0, 5))
        setStats(statsObj)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [token])

  const typeLabels = {
    contact: 'Contact Message', quote: 'Quote Request',
    appointment: 'Appointment', consultation: 'Consultation',
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    const now = new Date()
    const diffHrs = Math.floor((now - d) / (1000 * 60 * 60))
    if (diffHrs < 1) return 'Just now'
    if (diffHrs < 24) return `${diffHrs}h ago`
    const diffDays = Math.floor(diffHrs / 24)
    if (diffDays < 7) return `${diffDays}d ago`
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {admin?.name?.split(' ')[0] || 'Admin'} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">Here's what's happening with your website today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((card, idx) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <Link
                to={card.path}
                className="block bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${card.color}15` }}
                  >
                    <Icon size={20} style={{ color: card.color }} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {loading ? '—' : stats[card.key] ?? 0}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{card.label}</p>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <Clock size={17} style={{ color: '#c9a84c' }} />
              Recent Activity
            </h2>
            <Link to="/admin/inquiries" className="text-xs font-medium flex items-center gap-1" style={{ color: '#c9a84c' }}>
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {loading ? (
              <p className="text-center py-10 text-gray-400 text-sm">Loading...</p>
            ) : recentItems.length === 0 ? (
              <p className="text-center py-10 text-gray-400 text-sm">No recent activity yet.</p>
            ) : (
              recentItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between px-6 py-4">
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">{typeLabels[item._type]}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0 ml-3">{formatDate(item.createdAt)}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={17} style={{ color: '#c9a84c' }} />
            Quick Actions
          </h2>
          <div className="space-y-2">
            <Link
              to="/admin/portfolio"
              className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition border border-gray-100"
            >
              <span className="text-gray-700">Add New Project</span>
              <ArrowRight size={14} className="text-gray-400" />
            </Link>
            <Link
              to="/admin/inquiries"
              className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition border border-gray-100"
            >
              <span className="text-gray-700">View Inquiries</span>
              <ArrowRight size={14} className="text-gray-400" />
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition border border-gray-100"
            >
              <span className="text-gray-700">View Live Website</span>
              <ArrowRight size={14} className="text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard