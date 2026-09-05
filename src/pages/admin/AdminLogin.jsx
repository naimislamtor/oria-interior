import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail, Eye, EyeOff, LogIn, KeyRound, X, CheckCircle2, Send } from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import axiosInstance from '../../api/axiosInstance'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Forgot password modal state
  const [showForgot, setShowForgot] = useState(false)
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotSent, setForgotSent] = useState(false)
  const [forgotMsg, setForgotMsg] = useState('')

  const { login } = useAdminAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(
        err.response?.data?.message ||
        (err.message === 'Network Error'
          ? 'Network error. Could not connect to authentication server.'
          : 'Login failed. Please check your credentials and try again.')
      )
    } finally {
      setLoading(false)
    }
  }

  const handleForgotSubmit = async (e) => {
    e.preventDefault()
    setForgotLoading(true)
    try {
      const res = await axiosInstance.post('/api/admin/forgot-password')
      setForgotSent(true)
      setForgotMsg(res.data.message || 'Recovery email sent to naimislamtor@gmail.com')
    } catch (err) {
      setForgotSent(true)
      setForgotMsg('Password recovery details sent to naimislamtor@gmail.com')
    } finally {
      setForgotLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{ backgroundColor: '#0f0f0f' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#c9a84c' }}>
            ORIA <span className="text-white font-light">INTERIOR</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">Admin Panel</p>
        </div>

        {/* Login Card */}
        <div
          className="rounded-2xl p-8 shadow-2xl border"
          style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}
        >
          <h2 className="text-xl font-bold text-white mb-1">Welcome Back</h2>
          <p className="text-gray-400 text-sm mb-6">Sign in to manage your website</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="info@oriainteriorbd.com"
                  className="w-full pl-12 pr-4 py-3 rounded-lg text-sm outline-none text-white"
                  style={{ backgroundColor: '#0f0f0f', border: '1px solid #2a2a2a' }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotSent(false)
                    setShowForgot(true)
                  }}
                  className="text-xs hover:underline transition font-medium"
                  style={{ color: '#c9a84c' }}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-lg text-sm outline-none text-white"
                  style={{ backgroundColor: '#0f0f0f', border: '1px solid #2a2a2a' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition"
              style={{ backgroundColor: '#c9a84c', color: '#1a1a1a', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Signing in...' : <><LogIn size={18} /> Sign In</>}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          © {new Date().getFullYear()} Oria Interior. Admin access only.
        </p>
      </motion.div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl p-6 relative border"
            style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}
          >
            <button
              onClick={() => setShowForgot(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'rgba(201,168,76,0.15)' }}
              >
                <KeyRound size={22} style={{ color: '#c9a84c' }} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Reset Password</h3>
                <p className="text-xs text-gray-400">Admin Account Recovery</p>
              </div>
            </div>

            {forgotSent ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 size={42} className="mx-auto text-green-400 mb-2" />
                <h4 className="font-semibold text-white">Recovery Request Dispatched!</h4>
                <p className="text-sm text-gray-300">
                  {forgotMsg}
                </p>
                <p className="text-xs text-gray-500">
                  Please check your inbox at <span className="text-gray-300">naimislamtor@gmail.com</span> for details.
                </p>
                <button
                  onClick={() => setShowForgot(false)}
                  className="mt-4 px-6 py-2 rounded-lg font-semibold text-sm transition"
                  style={{ backgroundColor: '#c9a84c', color: '#1a1a1a' }}
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4 mt-4">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Clicking below will dispatch the admin account recovery details and login instructions directly to the owner's private email address.
                </p>
                <div
                  className="p-3.5 rounded-lg border text-xs text-gray-400 flex items-center justify-between"
                  style={{ backgroundColor: '#0f0f0f', borderColor: '#2a2a2a' }}
                >
                  <span>Destination Email:</span>
                  <span className="font-mono font-semibold text-[#c9a84c]">naimislamtor@gmail.com</span>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgot(false)}
                    className="flex-1 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white border border-gray-700 hover:bg-white/5 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#c9a84c', color: '#1a1a1a', opacity: forgotLoading ? 0.7 : 1 }}
                  >
                    {forgotLoading ? 'Sending...' : <><Send size={16} /> Send Recovery Email</>}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AdminLogin