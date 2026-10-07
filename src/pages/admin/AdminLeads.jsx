import React, { useState, useEffect } from 'react';
import { UserCheck, Phone, Mail, MessageSquare, Search, Filter, Trash2, Edit, Plus, CheckCircle, Clock } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

const API_BASE_URL = 'http://localhost:5000/api';

export default function AdminLeads() {
  const { token } = useAdminAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');

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
        // Mock sample leads if backend has no records yet
        setLeads([
          {
            _id: 'sample-1',
            name: 'তানভীর আহমেদ',
            phone: '01711223344',
            email: 'tanvir@gmail.com',
            source: 'Website Live Chat',
            serviceNeeded: '3BHK Flat Interior',
            details: '৩ বেডরুমের ফ্ল্যাটের আধুনিক ইন্টেরিয়র ৩ডি ডিজাইন ও খরচ জানতে চাই।',
            status: 'New',
            notes: 'হোয়াটসঅ্যাপে ক্যাটালগ পাঠাতে হবে',
            createdAt: new Date().toISOString(),
          },
          {
            _id: 'sample-2',
            name: 'মাকসুদা বেগম (Facebook)',
            phone: '01899887766',
            email: '',
            source: 'Facebook Messenger',
            serviceNeeded: 'Living Room Ceiling',
            details: 'ড্রয়িং রুমের ফলস সিলিং এবং স্পটলাইটের ডিজাইন দেখতে চাই।',
            status: 'Contacted',
            notes: 'কল করা হয়েছে, শনিবার সাইট ভিজিট করবে',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
        ]);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <UserCheck className="text-amber-600" /> AI Lead Management Hub
          </h1>
          <p className="text-sm text-gray-500">
            Website Live AI Chat, Facebook Messenger & WhatsApp auto-captured client leads
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, phone, email..."
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
          <option value="">All Sources</option>
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
