import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Mail, FileText, Calendar, MessageSquare, Eye, X, Trash2,
  Phone, MapPin, Clock, ChevronDown, RefreshCw
} from 'lucide-react'
import axiosInstance from '../../api/axiosInstance'
import { useAdminAuth } from '../../context/AdminAuthContext'

const tabs = [
  { key: 'contact', label: 'Contact', icon: Mail, endpoint: '/api/contact' },
  { key: 'quote', label: 'Quote Requests', icon: FileText, endpoint: '/api/quote' },
  { key: 'appointment', label: 'Appointments', icon: Calendar, endpoint: '/api/appointment' },
  { key: 'consultation', label: 'Consultations', icon: MessageSquare, endpoint: '/api/consultation' },
]

const statusOptions = {
  contact: ['new', 'read', 'replied'],
  quote: ['new', 'reviewed', 'quoted', 'accepted', 'rejected'],
  appointment: ['pending', 'confirmed', 'cancelled', 'completed'],
  consultation: ['new', 'contacted', 'completed'],
}

const statusColors = {
  new: '#3b82f6', pending: '#f59e0b', read: '#8b5cf6', reviewed: '#8b5cf6',
  quoted: '#06b6d4', confirmed: '#10b981', accepted: '#10b981', completed: '#10b981',
  replied: '#10b981', contacted: '#06b6d4', cancelled: '#ef4444', rejected: '#ef4444',
}

function AdminInquiries() {
  const [activeTab, setActiveTab] = useState('contact')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)
  const { token } = useAdminAuth()

  const currentTab = tabs.find((t) => t.key === activeTab)

  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await axiosInstance.get(currentTab.endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setData(res.data.data || [])
    } catch (err) {
      setError('Failed to load data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [activeTab])

  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.put(`${currentTab.endpoint}/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setData((prev) => prev.map((item) => (item._id === id ? { ...item, status } : item)))
      if (selected && selected._id === id) setSelected({ ...selected, status })
    } catch (err) {
      alert('Failed to update status.')
    }
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
          <p className="text-gray-500 text-sm">Manage all customer requests and messages</p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 hover:bg-gray-50 transition"
        >
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setSelected(null) }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition"
              style={{
                backgroundColor: activeTab === tab.key ? '#1a1a1a' : 'white',
                color: activeTab === tab.key ? 'white' : '#6b7280',
                border: '1px solid #e5e7eb',
              }}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      {loading ? (
        <div className="bg-white rounded-xl p-16 border border-gray-200 text-center text-gray-400">
          Loading...
        </div>
      ) : error ? (
        <div className="bg-white rounded-xl p-16 border border-gray-200 text-center text-red-500">
          {error}
        </div>
      ) : data.length === 0 ? (
        <div className="bg-white rounded-xl p-16 border border-gray-200 text-center text-gray-400">
          No {currentTab.label.toLowerCase()} yet.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Name</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Contact</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">Date</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="px-5 py-4 font-medium text-gray-900">{item.name}</td>
                    <td className="px-5 py-4 text-gray-500">{item.email || item.phone}</td>
                    <td className="px-5 py-4 text-gray-500 hidden md:table-cell">{formatDate(item.createdAt)}</td>
                    <td className="px-5 py-4">
                      <span
                        className="inline-block px-2.5 py-1 rounded-full text-xs font-medium capitalize"
                        style={{ backgroundColor: `${statusColors[item.status]}15`, color: statusColors[item.status] }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setSelected(item)}
                        className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition"
                        style={{ color: '#c9a84c', backgroundColor: 'rgba(201,168,76,0.1)' }}
                      >
                        <Eye size={14} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="font-bold text-lg text-gray-900">{currentTab.label} Details</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Status Selector */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500">Status:</span>
                <div className="relative">
                  <select
                    value={selected.status}
                    onChange={(e) => updateStatus(selected._id, e.target.value)}
                    className="appearance-none pl-3 pr-8 py-1.5 rounded-lg text-sm font-medium capitalize outline-none cursor-pointer"
                    style={{ backgroundColor: `${statusColors[selected.status]}15`, color: statusColors[selected.status], border: `1px solid ${statusColors[selected.status]}30` }}
                  >
                    {statusOptions[activeTab].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: statusColors[selected.status] }} />
                </div>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {Object.entries(selected).map(([key, value]) => {
                  if (['_id', '__v', 'status', 'createdAt', 'updatedAt', 'files'].includes(key)) return null
                  if (!value) return null
                  return (
                    <div key={key} className={typeof value === 'string' && value.length > 60 ? 'md:col-span-2' : ''}>
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </p>
                      <p className="text-sm text-gray-800">{String(value)}</p>
                    </div>
                  )
                })}
              </div>

              {selected.files && selected.files.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Attached Files</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.files.map((f, idx) => (
                      <a
                        key={idx}
                        href={`http://localhost:5000/uploads/${f}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                      >
                        File {idx + 1}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-1.5 text-xs text-gray-400 pt-2 border-t border-gray-100">
                <Clock size={12} />
                Submitted on {formatDate(selected.createdAt)}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AdminInquiries