import { useEffect, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import iconAnalisis from '../../assets/projects/analisis.png'
import iconConexion from '../../assets/projects/Conexion.png'
import iconSintesis from '../../assets/projects/sintesis.png'
import iconNecesidades from '../../assets/projects/Necesidades.png'
import iconEstructura from '../../assets/projects/Estructura.png'
import iconPrototipo from '../../assets/projects/Prototipo.png'
import iconPruebas from '../../assets/projects/Pruebas.png'
import iconDocumentacion from '../../assets/projects/Documentacion final.png'
import es from '../../locales/es'
import en from '../../locales/en'

const ICONS = [iconAnalisis, iconConexion, iconSintesis, iconNecesidades, iconEstructura, iconPrototipo, iconPruebas, iconDocumentacion]

function DesignProcessBlock({ icon, label, text, index, reduceMotion }) {
  const [hovered, setHovered] = useState(false)
  const num = String(index + 1).padStart(2, '0')

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col gap-4 p-6 rounded-lg"
      style={{
        backgroundColor: hovered ? 'rgba(0,212,255,0.06)' : 'rgba(0,212,255,0.02)',
        border: `1px solid ${hovered ? 'rgba(0,212,255,0.25)' : 'rgba(0,212,255,0.08)'}`,
        transition: reduceMotion ? 'none' : 'background-color 300ms ease, border-color 300ms ease',
      }}
    >
      <div className="flex items-center gap-4">
        <span style={{
          fontFamily: 'monospace', fontSize: '28px', fontWeight: '700',
          color: hovered ? '#e8a090' : '#00d4ff',
          opacity: hovered ? 0.9 : 0.3, lineHeight: 1,
          transition: reduceMotion ? 'none' : 'color 300ms ease, opacity 300ms ease',
          minWidth: '40px',
        }}>{num}</span>
        <div style={{
          width: '56px', height: '56px', borderRadius: '10px',
          backgroundColor: hovered ? 'rgba(0,212,255,0.12)' : 'rgba(0,212,255,0.06)',
          border: '1px solid rgba(0,212,255,0.3)',
          boxShadow: hovered
            ? '0 2px 0 rgba(232,160,144,0.4), 0 4px 16px rgba(0,212,255,0.3), 0 8px 24px rgba(232,160,144,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 4px 0 rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: hovered ? 'translateY(2px)' : 'translateY(0)',
          transition: reduceMotion ? 'none' : 'all 150ms ease', flexShrink: 0,
        }}>
          <img src={icon} alt="" style={{
            width: '32px', height: '32px', objectFit: 'contain',
            filter: hovered
              ? 'drop-shadow(0 0 6px rgba(232,160,144,0.6)) drop-shadow(0 0 12px rgba(0,212,255,0.3)) brightness(1.2)'
              : 'brightness(0.9)',
            transition: reduceMotion ? 'none' : 'filter 300ms ease',
          }} />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p style={{
          fontFamily: 'monospace', fontSize: '15px', fontWeight: '700',
          color: '#00d4ff', opacity: hovered ? 1 : 0.85, letterSpacing: '1px',
          transition: reduceMotion ? 'none' : 'opacity 300ms ease',
        }}>{label}</p>
        <div style={{
          width: hovered ? '40px' : '20px', height: '1px',
          backgroundColor: '#00d4ff', opacity: 0.4,
          transition: reduceMotion ? 'none' : 'width 300ms ease',
        }} />
      </div>
      <p className="text-white text-base leading-relaxed" style={{ opacity: 0.75 }}>{text}</p>
    </div>
  )
}

function PhaseHeader({ phase, phaseLabel, reduceMotion }) {
  return (
    <div className="flex items-center gap-4">
      <div style={{
        padding: '4px 14px', borderRadius: '20px',
        backgroundColor: 'rgba(0,212,255,0.12)',
        border: '1px solid rgba(0,212,255,0.6)',
        boxShadow: '0 0 10px rgba(0,212,255,0.3), 0 0 20px rgba(0,212,255,0.15)',
        cursor: 'default', flexShrink: 0,
      }}>
        <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#ffffff', letterSpacing: '2px', textTransform: 'uppercase' }}>{phase}</span>
      </div>
      <span className="text-white font-semibold text-lg">{phaseLabel}</span>
      <div style={{ flex: 1, position: 'relative', height: '20px', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00d4ff', opacity: 0.6, boxShadow: '0 0 6px rgba(0,212,255,0.6)', flexShrink: 0 }} />
        <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(0,212,255,0.25)', position: 'relative', overflow: 'hidden' }}>
          {!reduceMotion && (
            <div style={{
              position: 'absolute', top: '-2px', width: '40px', height: '4px',
              background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.8), transparent)',
              animation: 'circuitFlow 2.5s linear infinite',
            }} />
          )}
        </div>
        <div style={{ width: '6px', height: '6px', borderRight: '1px solid rgba(0,212,255,0.4)', borderBottom: '1px solid rgba(0,212,255,0.4)', flexShrink: 0 }} />
      </div>
      <style>{`@keyframes circuitFlow { from { left: -40px; } to { left: 100%; } }`}</style>
    </div>
  )
}

function DesignProcess() {
  const { reduceMotion, language } = usePortfolio()
  const t = language === 'en' ? en : es
  const dp = t.designProcess
  const [visible, setVisible] = useState(() => reduceMotion)

  if (!dp) return null

  useEffect(() => {
    if (reduceMotion) return
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [reduceMotion])

  let globalIndex = 0

  return (
    <section id="proceso" className="bg-[#050d1a] py-24 px-6">
      <div
        className="max-w-6xl mx-auto flex flex-col gap-16"
        style={{ opacity: visible ? 1 : 0, transition: reduceMotion ? 'none' : 'opacity 600ms ease' }}
      >
        <div className="flex flex-col items-center text-center gap-2">
          <p className="text-[#00d4ff] text-xs tracking-[4px] uppercase opacity-60">{dp.tag}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '1.8rem', color: '#00d4ff', opacity: 0.4 }}>&lt;</span>
            <h2 className="text-white font-semibold" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {dp.title}
            </h2>
            <span style={{ fontFamily: 'monospace', fontSize: '1.8rem', color: '#00d4ff', opacity: 0.4 }}>/&gt;</span>
          </div>
          <p className="text-white/60 text-base max-w-2xl mt-2">{dp.subtitle}</p>
        </div>

        {dp.phases.map((phase, pi) => (
          <div key={phase.phase} className="flex flex-col gap-6">
            <PhaseHeader phase={phase.phase} phaseLabel={phase.phaseLabel} reduceMotion={reduceMotion} />
            <div className="grid grid-cols-1 gap-6" style={{ gridTemplateColumns: phase.blocks.length === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)' }}>
              {phase.blocks.map(({ label, text }) => {
                const idx = globalIndex++
                return (
                  <DesignProcessBlock
                    key={label}
                    icon={ICONS[idx]}
                    label={label}
                    text={text}
                    index={idx}
                    reduceMotion={reduceMotion}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DesignProcess
