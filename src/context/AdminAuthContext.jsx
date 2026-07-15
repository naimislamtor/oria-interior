import { createContext, useContext, useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'

const AdminAuthContext = createContext()

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('oria_admin_token') || null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verify = async () => {
      const savedToken = localStorage.getItem('oria_admin_token')
      if (!savedToken) {
        setLoading(false)
        return
      }
      try {
        const res = await axiosInstance.get('/api/admin/me', {
          headers: { Authorization: `Bearer ${savedToken}` },
        })
        setAdmin(res.data.data)
        setToken(savedToken)
      } catch (err) {
        localStorage.removeItem('oria_admin_token')
        setToken(null)
        setAdmin(null)
      } finally {
        setLoading(false)
      }
    }
    verify()
  }, [])

  const login = async (email, password) => {
    const res = await axiosInstance.post('/api/admin/login', { email, password })
    localStorage.setItem('oria_admin_token', res.data.token)
    setToken(res.data.token)
    setAdmin(res.data.admin)
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('oria_admin_token')
    setToken(null)
    setAdmin(null)
  }

  return (
    <AdminAuthContext.Provider value={{ admin, token, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  return useContext(AdminAuthContext)
}