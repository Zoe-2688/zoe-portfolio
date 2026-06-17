import { useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer select-none">
      <span className="text-white/70 text-[11px] tracking-[1px] uppercase">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full border transition-colors duration-200 flex-shrink-0 ${
          checked ? 'bg-[#00d4ff]/20 border-[#00d4ff]' : 'bg-transparent border-[#00d4ff]/30'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform duration-200 ${
            checked ? 'translate-x-4 bg-[#00d4ff]' : 'translate-x-0 bg-white/30'
          }`}
        />
      </button>
    </label>
  )
}

function Intro() {
  const {
    setMode,
    language, setLanguage,
    highContrast, setHighContrast,
    largeText, setLargeText,
    reduceMotion, setReduceMotion,
  } = usePortfolio()

  const [a11yOpen, setA11yOpen] = useState(false)

  return (
    <section
      id="intro"
      className="bg-[#050d1a] min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Nombre y título */}
      <div className="text-center z-10 mb-12">
        <p className="text-[#00d4ff] text-xs tracking-[6px] uppercase mb-3 opacity-60">
          Portfolio · 2025
        </p>
        <h1 id="main-title" className="text-white text-4xl md:text-5xl font-bold tracking-wider mb-2">
          Zoe <span className="text-[#00d4ff]">Mejia</span>
        </h1>
        <p className="text-[#00d4ff] text-sm tracking-[3px] uppercase opacity-70">
          UX/UI · Front-end · Design
        </p>
      </div>

      {/* Selector de versión */}
      <div className="z-10 flex gap-6 mb-10 flex-wrap justify-center px-4">
        <button
          onClick={() => setMode('professional')}
          className="border border-[#00d4ff]/40 text-[#00d4ff] px-8 py-4 text-xs tracking-[2px] uppercase hover:bg-[#00d4ff]/10 transition-all duration-300 min-w-[180px]"
        >
          <span className="block text-base mb-1">Profesional</span>
          <span className="opacity-50 normal-case tracking-normal text-[10px]">Proceso y resultados</span>
        </button>
        <button
          onClick={() => setMode('creative')}
          className="border border-[#00d4ff]/40 text-[#00d4ff] px-8 py-4 text-xs tracking-[2px] uppercase hover:bg-[#00d4ff]/10 transition-all duration-300 min-w-[180px]"
        >
          <span className="block text-base mb-1">Creativa</span>
          <span className="opacity-50 normal-case tracking-normal text-[10px]">Experiencia interactiva</span>
        </button>
      </div>

      {/* Selector de idioma + accesibilidad */}
      <div className="z-10 flex gap-4 items-center relative">
        <button
          onClick={() => setLanguage('es')}
          className={`text-xs tracking-[2px] uppercase transition-all ${language === 'es' ? 'text-[#00d4ff]' : 'text-white/30 hover:text-white/60'}`}
        >
          ES
        </button>
        <span className="text-white/20">·</span>
        <button
          onClick={() => setLanguage('en')}
          className={`text-xs tracking-[2px] uppercase transition-all ${language === 'en' ? 'text-[#00d4ff]' : 'text-white/30 hover:text-white/60'}`}
        >
          EN
        </button>

        <span className="text-white/20">·</span>

        {/* Botón accesibilidad */}
        <div className="relative">
          <button
            onClick={() => setA11yOpen(prev => !prev)}
            aria-label="Opciones de accesibilidad"
            aria-expanded={a11yOpen}
            className={`text-base leading-none transition-all duration-200 ${
              a11yOpen ? 'opacity-100' : 'opacity-40 hover:opacity-80'
            }`}
          >
            ♿
          </button>

          {/* Panel */}
          {a11yOpen && (
            <div className="absolute bottom-8 right-0 w-56 bg-[#050d1a] border border-[#00d4ff]/20 p-4 flex flex-col gap-3">
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
              <Toggle
                checked={highContrast}
                onChange={setHighContrast}
                label="Alto contraste"
              />
              <Toggle
                checked={largeText}
                onChange={setLargeText}
                label="Texto grande"
              />
              <Toggle
                checked={reduceMotion}
                onChange={setReduceMotion}
                label="Reducir animaciones"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Intro