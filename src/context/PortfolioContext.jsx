import { createContext, useContext, useState } from 'react'

const PortfolioContext = createContext()

export function PortfolioProvider({ children }) {
  const [mode, setMode] = useState(null)
  const [language, setLanguage] = useState('es')
  const [accessibility, setAccessibility] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  return (
    <PortfolioContext.Provider value={{
      mode, setMode,
      language, setLanguage,
      accessibility, setAccessibility,
      highContrast, setHighContrast,
      largeText, setLargeText,
      reduceMotion, setReduceMotion,
    }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  return useContext(PortfolioContext)
}