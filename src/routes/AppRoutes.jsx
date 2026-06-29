import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import About from '../pages/About'
import Services from '../pages/Services'
import Portfolio from '../pages/Portfolio'
import Gallery from '../pages/Gallery'
import Blog from '../pages/Blog'
import FAQ from '../pages/FAQ'
import Contact from '../pages/Contact'
import Appointment from '../pages/Appointment'
import QuoteRequest from '../pages/QuoteRequest'
import Consultation from '../pages/Consultation'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="blog" element={<Blog />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
        <Route path="appointment" element={<Appointment />} />
        <Route path="quote" element={<QuoteRequest />} />
        <Route path="consultation" element={<Consultation />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes