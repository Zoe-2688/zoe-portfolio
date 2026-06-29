import { useEffect, useRef, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import mapaVideo from '../../assets/projects/GifVideoProceso.mp4'
import es from '../../locales/es'
import en from '../../locales/en'

const TEXT_POSITIONS = [
  { id: 'investigacion', top: '1%', left: '37%', color: '#e8a090', size: 'sm' },
  { id: 'empatizar', top: '12%', left: '58%', color: '#e8a090', size: 'sm' },
  { id: 'definir', top: '18%', left: '30%', color: '#e8a090', size: 'sm' },
  { id: 'oportunidades', top: '21%', left: '63%', color: '#00d4ff', size: 'md' },
  { id: 'wireframes', top: '31%', left: '29%', color: '#00d4ff', size: 'md' },
  { id: 'prototipo', top: '41%', left: '69%', color: '#e8a090', size: 'md' },
  { id: 'probar', top: '47%', left: '51%', color: '#e8a090', size: 'lg' },
  { id: 'entrega', top: '68%', left: '41%', color: '#e8a090', size: 'lg' },
]

const SIZE_STYLES = {
  sm: { fontSize: '4px', titleSize: '4px', maxWidth: '55px', padding: '2px 3px' },
  md: { fontSize: '5px', titleSize: '6px', maxWidth: '80px', padding: '3px 4px' },
  lg: { fontSize: '7px', titleSize: '8px', maxWidth: '110px', padding: '4px 6px' },
}
const SIZE_STYLES_ZOOMED = {
  sm: { fontSize: '10px', titleSize: '11px', maxWidth: '140px', padding: '5px 7px' },
  md: { fontSize: '12px', titleSize: '13px', maxWidth: '180px', padding: '6px 9px' },
  lg: { fontSize: '14px', titleSize: '16px', maxWidth: '240px', padding: '8px 12px' },
}

function TextLabel({ item, pos, zoomed = false }) {
  const s = zoomed ? SIZE_STYLES_ZOOMED[pos.size] : SIZE_STYLES[pos.size]
  const bevel = pos.size === 'sm' ? '3px' : pos.size === 'md' ? '4px' : '5px'
  return (
    <div style={{ position: 'absolute', top: pos.top, left: pos.left, maxWidth: s.maxWidth, pointerEvents: 'none', zIndex: 2 }}>
      <div style={{ position: 'absolute', top: '4px', left: '4px', right: '-4px', bottom: '-4px', backgroundColor: 'rgba(0,0,0,0.5)', filter: 'blur(2px)', clipPath: `polygon(${bevel} 0%, calc(100% - ${bevel}) 0%, 100% ${bevel}, 100% calc(100% - ${bevel}), calc(100% - ${bevel}) 100%, ${bevel} 100%, 0% calc(100% - ${bevel}), 0% ${bevel})` }} />
      <div style={{ position: 'relative', backgroundColor: '#1a1008', padding: '2px', clipPath: `polygon(${bevel} 0%, calc(100% - ${bevel}) 0%, 100% ${bevel}, 100% calc(100% - ${bevel}), calc(100% - ${bevel}) 100%, ${bevel} 100%, 0% calc(100% - ${bevel}), 0% ${bevel})`, zIndex: 1 }}>
        <div style={{ backgroundColor: '#f5f0e8', padding: s.padding, clipPath: `polygon(${bevel} 0%, calc(100% - ${bevel}) 0%, 100% ${bevel}, 100% calc(100% - ${bevel}), calc(100% - ${bevel}) 100%, ${bevel} 100%, 0% calc(100% - ${bevel}), 0% ${bevel})`, outline: '1px solid #1a1008', outlineOffset: '-2px' }}>
          <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: s.titleSize, fontWeight: '700', color: '#1a1008', marginBottom: '2px', lineHeight: 1.4, wordBreak: 'break-word' }}>{item.emoji} {item.title}</p>
          <p style={{ fontFamily: 'monospace', fontSize: s.fontSize, color: '#2a1a0e', lineHeight: 1.4 }}>{item.text}</p>
        </div>
      </div>
    </div>
  )
}

const LENS_SIZE = 240
const ZOOM = 3

function MagnifierMap({ reduceMotion, mapTexts }) {
  const containerRef = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setContainerSize({ w: rect.width, h: rect.height })
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect()
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const imgLeft = -mouse.x * ZOOM + LENS_SIZE / 2
  const imgTop = -mouse.y * ZOOM + LENS_SIZE / 2

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove}
      onMouseEnter={() => { if (containerRef.current) { const rect = containerRef.current.getBoundingClientRect(); setContainerSize({ w: rect.width, h: rect.height }) } setHovering(true) }}
      onMouseLeave={() => setHovering(false)}
      style={{ position: 'relative', width: '100%', overflow: 'hidden', cursor: 'none', lineHeight: 0, userSelect: 'none', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)', WebkitMaskComposite: 'destination-in', maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)', maskComposite: 'intersect' }}
    >
      <video autoPlay loop muted playsInline draggable={false} style={{ width: '100%', display: 'block', pointerEvents: 'none' }}>
        <source src={mapaVideo} type="video/mp4" />
      </video>
      {mapTexts.map((item, i) => <TextLabel key={item.id} item={item} pos={TEXT_POSITIONS[i]} />)}
      {!reduceMotion && hovering && (
        <div style={{ position: 'absolute', left: mouse.x - LENS_SIZE / 2, top: mouse.y - LENS_SIZE / 2, width: LENS_SIZE, height: LENS_SIZE, borderRadius: '50%', border: '3px solid #00d4ff', boxShadow: '0 0 0 2px rgba(0,0,0,0.6), 0 0 20px rgba(0,212,255,0.5)', overflow: 'hidden', pointerEvents: 'none', zIndex: 20, backgroundColor: '#050d1a' }}>
          <div style={{ position: 'absolute', width: containerSize.w * ZOOM, height: containerSize.h * ZOOM, left: imgLeft, top: imgTop }}>
            <video autoPlay loop muted playsInline draggable={false} style={{ width: '100%', height: '100%', display: 'block', pointerEvents: 'none', objectFit: 'fill' }}>
              <source src={mapaVideo} type="video/mp4" />
            </video>
            {mapTexts.map((item, i) => <TextLabel key={item.id} item={item} pos={TEXT_POSITIONS[i]} zoomed={true} />)}
          </div>
        </div>
      )}
      {!reduceMotion && hovering && (
        <div style={{ position: 'absolute', left: mouse.x - 5, top: mouse.y - 5, width: 10, height: 10, borderRadius: '50%', backgroundColor: '#00d4ff', boxShadow: '0 0 8px #00d4ff', pointerEvents: 'none', zIndex: 21 }} />
      )}
    </div>
  )
}

function CreativeDesignProcess() {
  const { reduceMotion, language } = usePortfolio()
  const t = language === 'en' ? en : es
  const dp = t.designProcess || {}
  const creative = dp.creative || {}
  const mapTexts = creative.mapTexts || []
  const [visible, setVisible] = useState(() => reduceMotion)
  const titleChars = (creative.title || 'PROCESO CREATIVO').split('')
  const TITLE_COLORS = ['#e8a090', '#00d4ff', '#ffffff', '#e8a090', '#00d4ff', '#ffffff', '#e8a090']

  useEffect(() => {
    if (reduceMotion) return
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [reduceMotion])

  return (
    <section id="proceso" className="bg-[#050d1a] py-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-12" style={{ opacity: visible ? 1 : 0, transition: reduceMotion ? 'none' : 'opacity 600ms ease' }}>
        <div className="flex flex-col items-center text-center gap-3">
          <p className="text-[#00d4ff] text-xs tracking-[4px] uppercase opacity-60">{dp.tag}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', fontFamily: "'Press Start 2P', monospace", fontSize: '14px', color: '#00d4ff' }}>
              {['<', '<', '<'].map((char, j) => <span key={j} style={{ animation: reduceMotion ? 'none' : 'arrowPulse 1.5s ease-in-out infinite', animationDelay: `${j * 150}ms` }}>{char}</span>)}
            </div>
            <h2 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 'clamp(1.2rem, 3vw, 2rem)', lineHeight: 1.4 }}>
              {titleChars.map((char, i) => <span key={i} style={{ color: TITLE_COLORS[i % TITLE_COLORS.length] }}>{char}</span>)}
            </h2>
            <div style={{ display: 'flex', fontFamily: "'Press Start 2P', monospace", fontSize: '14px', color: '#00d4ff' }}>
              {['>', '>', '>'].map((char, j) => <span key={j} style={{ animation: reduceMotion ? 'none' : 'arrowPulse 1.5s ease-in-out infinite', animationDelay: `${(2 - j) * 150}ms` }}>{char}</span>)}
            </div>
          </div>
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'rgb(255, 255, 255)', letterSpacing: '1px' }}>{creative.hint}</p>
        </div>
      </div>
      <div style={{ width: '100%', marginTop: '2rem', opacity: visible ? 1 : 0, transition: reduceMotion ? 'none' : 'opacity 600ms ease' }}>
        <MagnifierMap reduceMotion={reduceMotion} mapTexts={mapTexts} />
      </div>
      <style>{`@keyframes arrowPulse { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.8; } }`}</style>
    </section>
  )
}

export default CreativeDesignProcess
