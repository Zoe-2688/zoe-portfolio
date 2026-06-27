import { useEffect, useState } from 'react'
import Intro from './components/intro/Intro'
import Hero from './components/hero/Hero'
import CreativeHero from './components/creative/CreativeHero'
import CreativeProjects from './components/creative/CreativeProjects'
import CreativeDesignProcess from './components/creative/CreativeDesignProcess'
import CreativeAboutMe from './components/creative/CreativeAboutMe'
import DesignProcess from './components/about/DesignProcess'
import Projects from './components/projects/Projects'
import AboutMe from './components/aboutme/AboutMe'
import Footer from './components/footer/Footer'
import WhatsAppButton from './components/shared/WhatsAppButton'
import CustomCursor from './components/shared/CustomCursor'
import ScrollProgress from './components/shared/ScrollProgress'
import { usePortfolio } from './context/PortfolioContext'
import BoostCaseStudy from './components/projects/BoostCaseStudy'

function A11yIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
    >
      <circle cx="12" cy="4.5" r="2" fill="currentColor" />
      <path
        d="M12 7v7.5M6.5 10.5h11M12 14.5l-3 5.5M12 14.5l3 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer select-none">
      <span className="text-white/70 text-[11px] tracking-[1px] uppercase">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full border transition-colors duration-200 flex-shrink-0 ${checked ? 'bg-[#00d4ff]/20 border-[#00d4ff]' : 'bg-transparent border-[#00d4ff]/30'
          }`}
      >
        <span
          className={`toggle-thumb absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform duration-200 ${checked ? 'translate-x-4 bg-[#00d4ff]' : 'translate-x-0 bg-white/30'
            }`}
        />
      </button>
    </label>
  )
}

function A11yPanel() {
  const { highContrast, setHighContrast, largeText, setLargeText, reduceMotion, setReduceMotion } = usePortfolio()
  const [a11yOpen, setA11yOpen] = useState(false)

  return (
    <div className="fixed top-6 right-6 z-[1100] flex flex-col-reverse items-end gap-2">
      {a11yOpen && (
        <div className="w-56 bg-[#050d1a] border border-[#00d4ff]/20 p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[#00d4ff] text-[10px] tracking-[3px] uppercase opacity-60">
              Accesibilidad
            </p>
            <button
              onClick={() => setA11yOpen(false)}
              aria-label="Cerrar opciones de accesibilidad"
              className="text-white/40 hover:text-white/80 transition-colors text-xs leading-none"
            >
              ✕
            </button>
          </div>
          <Toggle checked={highContrast} onChange={setHighContrast} label="Alto contraste" />
          <Toggle checked={largeText} onChange={setLargeText} label="Texto grande" />
          <Toggle checked={reduceMotion} onChange={setReduceMotion} label="Reducir animaciones" />
        </div>
      )}

      <button
        onClick={() => setA11yOpen((prev) => !prev)}
        aria-label="Opciones de accesibilidad"
        aria-expanded={a11yOpen}
        className={`a11y-btn ${a11yOpen ? 'opacity-100' : 'opacity-60'}`}
      >
        <A11yIcon />
      </button>
    </div>
  )
}

function App() {
  const { highContrast, largeText, reduceMotion, mode } = usePortfolio()
  const [contentVisible, setContentVisible] = useState(false)
  const [activeCaseStudy, setActiveCaseStudy] = useState(null)

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
      <A11yPanel />
      {!mode && <Intro />}
      {mode && (
        <>
          <CustomCursor />
          <div style={{ opacity: contentVisible ? 1 : 0, transition: 'opacity 500ms ease' }}>
            {mode === 'creative' ? <CreativeHero /> : <Hero />}
            {mode === 'professional'
              ? <Projects onOpenCaseStudy={setActiveCaseStudy} />
              : <CreativeProjects onOpenCaseStudy={setActiveCaseStudy} />
            }
            {mode === 'professional' ? <DesignProcess /> : <CreativeDesignProcess />}
            {mode === 'professional' ? <AboutMe /> : <CreativeAboutMe />}
            <Footer />
          </div>
        </>
        
      )}
  {mode && <WhatsAppButton />}
      {activeCaseStudy === 'boost' && (
        <BoostCaseStudy onClose={() => setActiveCaseStudy(null)} />
      )}
    </main>
  )
}
export default App