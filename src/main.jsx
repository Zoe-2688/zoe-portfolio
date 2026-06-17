import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PortfolioProvider } from './context/PortfolioContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PortfolioProvider>
      <App />
    </PortfolioProvider>
  </StrictMode>,
)