import { useEffect } from 'react'
import Intro from './components/intro/Intro'
import Hero from './components/hero/Hero'
import About from './components/about/About'
import Projects from './components/projects/Projects'
import Contact from './components/contact/Contact'
import { usePortfolio } from './context/PortfolioContext'

function App() {
  const { highContrast, largeText, reduceMotion } = usePortfolio()

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('high-contrast', highContrast)
    root.classList.toggle('large-text', largeText)
    root.classList.toggle('reduce-motion', reduceMotion)
  }, [highContrast, largeText, reduceMotion])

  return (
    <main>
      <Intro />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  )
}

export default App