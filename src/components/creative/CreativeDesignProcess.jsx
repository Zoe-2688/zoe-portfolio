import { useEffect, useRef, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import mapaVideo from '../../assets/projects/GifVideoProceso.mp4'

const TEXTS = [
  {
    id: 'investigacion',
    emoji: '🗺️',
    title: 'Investigación y Lluvia de Ideas',
    text: 'Analizo usuarios, mercado y competencia para identificar oportunidades de diseño.',
    top: '1%', left: '37%',
    color: '#e8a090',
    size: 'sm',
  },
  {
    id: 'empatizar',
    emoji: '💬',
    title: 'Empatizar',
    text: 'Escucho a los usuarios reales. La empatía es la brújula del buen diseño UX.',
    top: '12%', left: '58%',
    color: '#e8a090',
    size: 'sm',
  },
  {
    id: 'definir',
    emoji: '🎯',
    title: 'Definir el Problema',
    text: 'Defino claramente los desafíos y objetivos que guiarán el diseño.',
    top: '18%', left: '30%',
    color: '#e8a090',
    size: 'sm',
  },
  {
    id: 'oportunidades',
    emoji: '🔍',
    title: 'Identificar Oportunidades',
    text: 'Encuentro necesidades no satisfechas. Aquí nace la propuesta de valor.',
    top: '21%', left: '63%',
    color: '#00d4ff',
    size: 'md',
  },
  {
    id: 'wireframes',
    emoji: '✏️',
    title: 'Wireframes',
    text: 'Diseño la estructura y flujo de la interfaz antes de agregar detalles visuales.',
    top: '31%', left: '29%',
    color: '#00d4ff',
    size: 'md',
  },
  {
    id: 'prototipo',
    emoji: '🎨',
    title: 'Crear Prototipos',
    text: 'Los wireframes cobran vida con interacciones y colores reales.',
    top: '41%', left: '69%',
    color: '#e8a090',
    size: 'md',
  },
  {
    id: 'probar',
    emoji: '🧪',
    title: 'Probar y Validar',
    text: 'El prototipo llega a usuarios reales para obtener feedback y ajustar el diseño.',
    top: '47%', left: '51%',
    color: '#e8a090',
    size: 'lg',
  },
  {
    id: 'entrega',
    emoji: '🏆',
    title: 'Entrega',
    text: '¡Misión completada! Diseños, documentación y sistema de diseño listos. Ahora un ☕🥐',
    top: '68%', left: '41%',
    color: '#e8a090',
    size: 'lg',
  },
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

function TextLabel({ t, zoomed = false }) {
  const s = zoomed ? SIZE_STYLES_ZOOMED[t.size] : SIZE_STYLES[t.size]
  const bevel = t.size === 'sm' ? '3px' : t.size === 'md' ? '4px' : '5px'

  return (
    <div style={{
      position: 'absolute',
      top: t.top,
      left: t.left,
      maxWidth: s.maxWidth,
      pointerEvents: 'none',
      zIndex: 2,
    }}>
      <div style={{
        position: 'absolute',
        top: '4px', left: '4px', right: '-4px', bottom: '-4px',
        backgroundColor: 'rgba(0,0,0,0.5)',
        filter: 'blur(2px)',
        clipPath: `polygon(${bevel} 0%, calc(100% - ${bevel}) 0%, 100% ${bevel}, 100% calc(100% - ${bevel}), calc(100% - ${bevel}) 100%, ${bevel} 100%, 0% calc(100% - ${bevel}), 0% ${bevel})`,
      }} />
      <div style={{
        position: 'relative',
        backgroundColor: '#1a1008',
        padding: '2px',
        clipPath: `polygon(${bevel} 0%, calc(100% - ${bevel}) 0%, 100% ${bevel}, 100% calc(100% - ${bevel}), calc(100% - ${bevel}) 100%, ${bevel} 100%, 0% calc(100% - ${bevel}), 0% ${bevel})`,
        zIndex: 1,
      }}>
        <div style={{
          backgroundColor: '#f5f0e8',
          padding: s.padding,
          clipPath: `polygon(${bevel} 0%, calc(100% - ${bevel}) 0%, 100% ${bevel}, 100% calc(100% - ${bevel}), calc(100% - ${bevel}) 100%, ${bevel} 100%, 0% calc(100% - ${bevel}), 0% ${bevel})`,
          outline: '1px solid #1a1008',
          outlineOffset: '-2px',
        }}>
          <p style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: s.titleSize,
            fontWeight: '700',
            color: '#1a1008',
            marginBottom: '2px',
            lineHeight: 1.4,
            wordBreak: 'break-word',
          }}>
            {t.emoji} {t.title}
          </p>
          <p style={{
            fontFamily: 'monospace',
            fontSize: s.fontSize,
            color: '#2a1a0e',
            lineHeight: 1.4,
          }}>
            {t.text}
          </p>
        </div>
      </div>
    </div>
  )
}

const LENS_SIZE = 240
const ZOOM = 3

function MagnifierMap({ reduceMotion }) {
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
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // Calcular posición de la imagen dentro de la lupa
  // La imagen ampliada debe estar centrada en el punto del cursor
  const imgLeft = -mouse.x * ZOOM + LENS_SIZE / 2
  const imgTop = -mouse.y * ZOOM + LENS_SIZE / 2

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          setContainerSize({ w: rect.width, h: rect.height })
        }
        setHovering(true)
      }}
      onMouseLeave={() => setHovering(false)}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        cursor: 'none',
        lineHeight: 0,
        userSelect: 'none',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
        WebkitMaskComposite: 'destination-in',
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
        maskComposite: 'intersect',
      }}
    >
      {/* Video base */}
      <video
        autoPlay loop muted playsInline draggable={false}
        style={{ width: '100%', display: 'block', pointerEvents: 'none' }}
      >
        <source src={mapaVideo} type="video/mp4" />
      </video>

      {/* Textos superpuestos */}
      {TEXTS.map((t) => <TextLabel key={t.id} t={t} />)}

      {/* Lupa */}
      {!reduceMotion && hovering && (
        <div style={{
          position: 'absolute',
          left: mouse.x - LENS_SIZE / 2,
          top: mouse.y - LENS_SIZE / 2,
          width: LENS_SIZE,
          height: LENS_SIZE,
          borderRadius: '50%',
          border: '3px solid #00d4ff',
          boxShadow: '0 0 0 2px rgba(0,0,0,0.6), 0 0 20px rgba(0,212,255,0.5)',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 20,
          backgroundColor: '#050d1a',
        }}>
          {/* Imagen ampliada — posicionada para que el punto del cursor quede centrado */}
          <div style={{
            position: 'absolute',
            width: containerSize.w * ZOOM,
            height: containerSize.h * ZOOM,
            left: imgLeft,
            top: imgTop,
          }}>
            <video
              autoPlay loop muted playsInline draggable={false}
              style={{ width: '100%', height: '100%', display: 'block', pointerEvents: 'none', objectFit: 'fill' }}
            >
              <source src={mapaVideo} type="video/mp4" />
            </video>
            {/* Textos también amplificados */}
            {TEXTS.map((t) => <TextLabel key={t.id} t={t} zoomed={true} />)}
          </div>
        </div>
      )}

      {/* Punto cursor */}
      {!reduceMotion && hovering && (
        <div style={{
          position: 'absolute',
          left: mouse.x - 5,
          top: mouse.y - 5,
          width: 10, height: 10,
          borderRadius: '50%',
          backgroundColor: '#00d4ff',
          boxShadow: '0 0 8px #00d4ff',
          pointerEvents: 'none',
          zIndex: 21,
        }} />
      )}
    </div>
  )
}

function CreativeDesignProcess() {
  const { reduceMotion } = usePortfolio()
  const [visible, setVisible] = useState(() => reduceMotion)
  const titleChars = 'PROCESO CREATIVO'.split('')
  const TITLE_COLORS = ['#e8a090', '#00d4ff', '#ffffff', '#e8a090', '#00d4ff', '#ffffff', '#e8a090']

  useEffect(() => {
    if (reduceMotion) return
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [reduceMotion])

  return (
    <section id="proceso" className="bg-[#050d1a] py-24 px-6">
      <div
        className="max-w-6xl mx-auto flex flex-col gap-12"
        style={{ opacity: visible ? 1 : 0, transition: reduceMotion ? 'none' : 'opacity 600ms ease' }}
      >
        <div className="flex flex-col items-center text-center gap-3">
          <p className="text-[#00d4ff] text-xs tracking-[4px] uppercase opacity-60">Mi proceso</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', fontFamily: "'Press Start 2P', monospace", fontSize: '14px', color: '#00d4ff' }}>
              {['<', '<', '<'].map((char, j) => (
                <span key={j} style={{
                  animation: reduceMotion ? 'none' : 'arrowPulse 1.5s ease-in-out infinite',
                  animationDelay: `${j * 150}ms`,
                }}>{char}</span>
              ))}
            </div>
            <h2 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 'clamp(1.2rem, 3vw, 2rem)', lineHeight: 1.4 }}>
              {titleChars.map((char, i) => (
                <span key={i} style={{ color: TITLE_COLORS[i % TITLE_COLORS.length] }}>{char}</span>
              ))}
            </h2>
            <div style={{ display: 'flex', fontFamily: "'Press Start 2P', monospace", fontSize: '14px', color: '#00d4ff' }}>
              {['>', '>', '>'].map((char, j) => (
                <span key={j} style={{
                  animation: reduceMotion ? 'none' : 'arrowPulse 1.5s ease-in-out infinite',
                  animationDelay: `${(2 - j) * 150}ms`,
                }}>{char}</span>
              ))}
            </div>
          </div>
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'rgb(255, 255, 255)', letterSpacing: '1px' }}>
            // usa la lupa para explorar cada etapa del viaje →
          </p>
        </div>
      </div>

      <div style={{
        width: '100%',
        marginTop: '2rem',
        opacity: visible ? 1 : 0,
        transition: reduceMotion ? 'none' : 'opacity 600ms ease',
      }}>
        <MagnifierMap reduceMotion={reduceMotion} />
      </div>

      <style>{`
        @keyframes arrowPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </section>
  )
}

export default CreativeDesignProcess
