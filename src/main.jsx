import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PortfolioProvider } from './context/PortfolioContext'
import './index.css'
import App from './App.jsx'
import { onCLS, onINP, onLCP } from 'web-vitals'

const sendToGA = ({ name, value, id }) => {
  if (window.gtag) {
    window.gtag('event', name, {
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      metric_id: id,
      metric_value: value,
    })
  }
}
onCLS(sendToGA)
onINP(sendToGA)
onLCP(sendToGA)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PortfolioProvider>
      <App />
    </PortfolioProvider>
  </StrictMode>,
)