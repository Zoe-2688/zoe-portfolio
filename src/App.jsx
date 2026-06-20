import { useEffect, useState } from 'react'
import Intro from './components/intro/Intro'
import Hero from './components/hero/Hero'
import CreativeHero from './components/creative/CreativeHero'
import DesignProcess from './components/about/DesignProcess'
import Projects from './components/projects/Projects'
import AboutMe from './components/aboutme/AboutMe'
import Footer from './components/footer/Footer'
import WhatsAppButton from './components/shared/WhatsAppButton'
import CustomCursor from './components/shared/CustomCursor'
import ScrollProgress from './components/shared/ScrollProgress'
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
      <ScrollProgress />
      {!mode && <Intro />}
      {mode && (
        <>
          <CustomCursor />
          <div style={{ opacity: contentVisible ? 1 : 0, transition: 'opacity 500ms ease' }}>
            {mode === 'creative' ? <CreativeHero /> : <Hero />}
            <Projects />
            <DesignProcess />
            <AboutMe />
            <Footer />
          </div>
        </>
      )}
      {mode && <WhatsAppButton />}
    </main>
  )
}

export default App