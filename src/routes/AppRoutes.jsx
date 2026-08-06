import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import About from '../pages/About'
import Services from '../pages/Services'
import ServiceDetail from '../pages/ServiceDetail'
import Maintenance from '../pages/Maintenance'
import Portfolio from '../pages/Portfolio'
import Gallery from '../pages/Gallery'
import BlogDetail from '../pages/BlogDetail'
import FAQ from '../pages/FAQ'
import Contact from '../pages/Contact'
import Appointment from '../pages/Appointment'
import QuoteRequest from '../pages/QuoteRequest'
import Consultation from '../pages/Consultation'

import AdminLogin from '../pages/admin/AdminLogin'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminInquiries from '../pages/admin/AdminInquiries'
import AdminBlog from '../pages/admin/AdminBlog'
import AdminLayout from '../components/admin/AdminLayout'
import ProtectedRoute from '../components/admin/ProtectedRoute'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/maintenance" element={<Maintenance />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="blog/:id" element={<BlogDetail />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
        <Route path="appointment" element={<Appointment />} />
        <Route path="quote" element={<QuoteRequest />} />
        <Route path="consultation" element={<Consultation />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="inquiries" element={<AdminInquiries />} />
        <Route path="blog" element={<AdminBlog />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes