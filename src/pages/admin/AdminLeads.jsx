import React, { useState, useEffect } from 'react';
import { UserCheck, Phone, Mail, Search, Trash2, Edit, Activity, Radio, RefreshCw } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000/api'
    : 'https://oira-interior-server.onrender.com/api');

export default function AdminLeads() {
  const { token } = useAdminAuth();
  const [leads, setLeads] = useState([]);
  const [realtimeLogs, setRealtimeLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Fetch real-time webhook logs
  const fetchLiveLogs = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/leads/live-logs`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setRealtimeLogs(data.logs || []);
        }
      }
    } catch (err) {
      console.error('Fetch live logs error:', err);
    }
  };

  // Poll live logs every 3 seconds
  useEffect(() => {
    fetchLiveLogs();
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      fetchLiveLogs();
    }, 3000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/admin/leads?`;
      if (search) url += `search=${encodeURIComponent(search)}&`;
      if (sourceFilter) url += `source=${encodeURIComponent(sourceFilter)}&`;
      if (statusFilter) url += `status=${encodeURIComponent(statusFilter)}&`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setLeads(data.leads || []);
        }
      } else {
        setLeads([]);
      }
    } catch (error) {
      console.error('Fetch leads error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [search, sourceFilter, statusFilter]);

  const handleUpdateLead = async () => {
    if (!selectedLead) return;
    try {
      const response = await fetch(`${API_BASE_URL}/admin/leads/${selectedLead._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: editStatus, notes: editNotes }),
      });

      if (response.ok) {
        setLeads((prev) =>
          prev.map((l) => (l._id === selectedLead._id ? { ...l, status: editStatus, notes: editNotes } : l))
        );
        setSelectedLead(null);
      }
    } catch (err) {
      console.error('Update lead error:', err);
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await fetch(`${API_BASE_URL}/admin/leads/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      console.error('Delete lead error:', err);
    }
  };

  const handleClearLiveLogs = async () => {
    try {
      await fetch(`${API_BASE_URL}/admin/leads/live-logs`, { method: 'DELETE' });
      setRealtimeLogs([]);
    } catch (err) {
      console.error('Clear logs error:', err);
    }
  };

  const getSourceBadge = (source) => {
    switch (source) {
      case 'Website Live Chat':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'Facebook Messenger':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'WhatsApp':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <UserCheck className="text-amber-600" /> AI Lead Management & Real-Time Monitor
          </h1>
          <p className="text-sm text-gray-500">
            Real-time Messenger & Webhook auto-responder activity log and client leads hub
          </p>
        </div>
      </div>

      {/* 🔴 REAL-TIME LIVE WEBHOOK MONITOR */}
      <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h2 className="font-bold text-sm tracking-wide text-amber-300">
              REAL-TIME WEBHOOK & MESSENGER LIVE STREAM
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Live Stream Active (Auto-3s)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchLiveLogs}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition"
              title="Refresh Logs"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
            <button
              onClick={handleClearLiveLogs}
              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition"
            >
              Clear Live Screen
            </button>
          </div>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-1 text-xs scrollbar-thin scrollbar-thumb-slate-700">
          {realtimeLogs.length === 0 ? (
            <div className="p-4 text-center text-slate-500 italic">
              Waiting for incoming Webhook or Messenger events... Send a message to Facebook Page or Web Chat to see live stream!
            </div>
          ) : (
            realtimeLogs.map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded-lg bg-slate-850/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {log.platform}
                    </span>
                    <span className="text-slate-400 text-[11px] font-mono">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <span className="text-emerald-400 font-semibold text-[11px]">
                      Sender: {log.senderId}
                    </span>
                  </div>
                  <p className="text-slate-200">
                    <strong className="text-slate-400">User:</strong> "{log.userText}"
                  </p>
                  <p className="text-amber-200/90">
                    <strong className="text-slate-400">Response:</strong> "{log.aiReply}"
                  </p>
                </div>
                <span className="px-2 py-1 rounded text-[10px] font-bold self-start sm:self-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {log.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads by name, phone, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-amber-500"
          />
        </div>

        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-amber-500"
        >
          <option value="">All Lead Sources</option>
          <option value="Website Live Chat">Website Live Chat</option>
          <option value="Facebook Messenger">Facebook Messenger</option>
          <option value="WhatsApp">WhatsApp</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-amber-500"
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Consultation Scheduled">Consultation Scheduled</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading leads data...</div>
        ) : leads.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No leads captured yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-50 text-gray-900 border-b border-gray-200 font-semibold">
                <tr>
                  <th className="p-4">Client Name</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Source</th>
                  <th className="p-4">Requirements</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-4 font-medium text-gray-900">
                      {lead.name}
                      {lead.notes && <p className="text-xs text-amber-700 italic mt-0.5">Note: {lead.notes}</p>}
                    </td>
                    <td className="p-4 space-y-1">
                      {lead.phone && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Phone className="w-3.5 h-3.5 text-emerald-600" /> {lead.phone}
                        </div>
                      )}
                      {lead.email && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Mail className="w-3.5 h-3.5 text-blue-600" /> {lead.email}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs border font-medium ${getSourceBadge(lead.source)}`}>
                        {lead.source}
                      </span>
                    </td>
                    <td className="p-4 max-w-xs text-xs text-gray-600 truncate">{lead.details}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedLead(lead);
                          setEditStatus(lead.status);
                          setEditNotes(lead.notes || '');
                        }}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600"
                        title="Edit Lead"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLead(lead._id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-red-600"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900">Update Lead Details</h3>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full p-2 border rounded-lg text-sm"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Consultation Scheduled">Consultation Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Follow-up Notes</label>
              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                rows="3"
                className="w-full p-2 border rounded-lg text-sm"
                placeholder="Enter notes..."
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateLead}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm hover:bg-amber-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
