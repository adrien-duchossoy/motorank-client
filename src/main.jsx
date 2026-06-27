import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'
import { AuthWrapper } from './context/auth.context.jsx'
import { ThemeWrapper } from './context/theme.context'

createRoot(document.getElementById('root')).render(
  <ThemeWrapper>
    <BrowserRouter>
      <AuthWrapper>
          <App />
      </AuthWrapper>
    </BrowserRouter>
  </ThemeWrapper>
)
