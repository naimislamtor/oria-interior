import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { AdminAuthProvider } from './context/AdminAuthContext'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <AdminAuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AdminAuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)