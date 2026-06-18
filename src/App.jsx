import { useEffect, useState } from 'react'
import Intro from './components/intro/Intro'
import Hero from './components/hero/Hero'
import About from './components/about/About'
import Projects from './components/projects/Projects'
import Contact from './components/contact/Contact'
import { usePortfolio } from './context/PortfolioContext'

function App() {
  const { highContrast, largeText, reduceMotion, mode } = usePortfolio()
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('high-contrast', highContrast)
    root.classList.toggle('large-text', largeText)
    root.classList.toggle('reduce-motion', reduceMotion)
  }, [highContrast, largeText, reduceMotion])

  useEffect(() => {
    if (!mode) return
    const id = requestAnimationFrame(() => setContentVisible(true))
    return () => cancelAnimationFrame(id)
  }, [mode])

  return (
    <main>
      {!mode && <Intro />}
      {mode && (
        <div style={{ opacity: contentVisible ? 1 : 0, transition: 'opacity 500ms ease' }}>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </div>
      )}
    </main>
  )
}

export default App