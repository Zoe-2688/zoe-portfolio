import { useEffect, useRef, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import avatar from '../../assets/projects/avatar1.png'
import avatar2 from '../../assets/projects/avatar2.png'

const STEP = 70
const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]]
const GREETING = '¡Hola! Bienvenid@ a mi portfolio. Soy Zoe, diseñadora UX/UI.'
const SECOND_GREETING = '¡Espero que disfrutes la experiencia! 🎮'
const HEADLINE = 'Diseño experiencias digitales que conectan personas con tecnología.'
const WORD_COLORS = ['#ffffff', '#00d4ff', '#e8a090']

function buildCircuits(w, h) {
  const circuits = []
  const initDirs = [0, 0, 0, 1, 3]
  for (let i = 0; i < 7; i++) {
    const nodes = []
    let x = Math.floor(Math.random() * w / STEP) * STEP
    let y = Math.floor(Math.random() * h / STEP) * STEP
    nodes.push({ x, y })
    let dir = initDirs[Math.floor(Math.random() * initDirs.length)]
    const segs = 3 + Math.floor(Math.random() * 3)
    for (let s = 0; s < segs; s++) {
      const len = (1 + Math.floor(Math.random() * 4)) * STEP
      const [dx, dy] = DIRS[dir]
      const nx = x + dx * len
      const ny = y + dy * len
      if (nx < 0 || nx > w || ny < 0 || ny > h) break
      x = nx; y = ny
      nodes.push({ x, y })
      dir = (dir + (Math.random() > 0.5 ? 1 : 3)) % 4
    }
    if (nodes.length >= 2) circuits.push({ nodes })
  }
  return circuits
}

function HeroCircuitCanvas({ reduceMotion }) {
  const canvasRef = useRef(null)
  const circuitsRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function rebuildCircuits() {
      circuitsRef.current = buildCircuits(canvas.width, canvas.height)
    }

    function drawCircuits() {
      ctx.save()
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(0,212,255,0.06)'
      for (const { nodes } of circuitsRef.current) {
        ctx.beginPath()
        ctx.moveTo(nodes[0].x, nodes[0].y)
        for (let i = 1; i < nodes.length; i++) ctx.lineTo(nodes[i].x, nodes[i].y)
        ctx.stroke()
        ctx.fillStyle = 'rgba(0,212,255,0.15)'
        for (const { x, y } of nodes) {
          ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill()
        }
      }
      ctx.restore()
    }

    function makeParticle() {
      const ci = Math.floor(Math.random() * circuitsRef.current.length)
      return { ci, si: 0, t: Math.random(), speed: 0.005 + Math.random() * 0.008 }
    }

    function drawParticle(p) {
      const circuit = circuitsRef.current[p.ci]
      if (!circuit || p.si >= circuit.nodes.length - 1) return
      const n1 = circuit.nodes[p.si]
      const n2 = circuit.nodes[p.si + 1]
      const x = n1.x + (n2.x - n1.x) * p.t
      const y = n1.y + (n2.y - n1.y) * p.t

      ctx.save()
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 6)
      glow.addColorStop(0, 'rgba(0,212,255,0.8)')
      glow.addColorStop(1, 'rgba(0,212,255,0)')
      ctx.shadowBlur = 8
      ctx.shadowColor = '#00d4ff'
      ctx.fillStyle = glow
      ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
    }

    resize()
    rebuildCircuits()
    const particles = Array.from({ length: 6 }, makeParticle)

    function drawFrame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawCircuits()
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawCircuits()
      for (const p of particles) {
        p.t += p.speed
        if (p.t >= 1) {
          p.si++
          p.t = 0
          const c = circuitsRef.current[p.ci]
          if (!c || p.si >= c.nodes.length - 1) {
            p.ci = Math.floor(Math.random() * circuitsRef.current.length)
            p.si = 0
          }
        }
        drawParticle(p)
      }
      animId = requestAnimationFrame(tick)
    }

    if (reduceMotion) {
      drawFrame()
    } else {
      tick()
    }

    const ro = new ResizeObserver(() => {
      resize()
      rebuildCircuits()
      if (reduceMotion) drawFrame()
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [reduceMotion])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

function useTypewriter(text, reduceMotion, speed = 35) {
  const chars = Array.from(text)
  const [count, setCount] = useState(() => (reduceMotion ? chars.length : 0))

  useEffect(() => {
    if (reduceMotion) return
    let i = 0
    const id = setInterval(() => {
      i++
      setCount(i)
      if (i >= chars.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, reduceMotion, speed])

  return chars.slice(0, count).join('')
}

const PIXEL_GRID = 20

function PixelAvatar({ src, alt, maxWidth, reduceMotion }) {
  const [cells] = useState(() =>
    Array.from({ length: PIXEL_GRID * PIXEL_GRID }, () => ({ delay: Math.random() * 1500 }))
  )

  return (
    <div style={{ position: 'relative', overflow: 'visible', width: '100%', maxWidth }}>
      <img src={src} alt={alt} style={{ width: '100%', display: 'block', objectFit: 'contain' }} />
      {!reduceMotion && cells.map((cell, i) => {
        const row = Math.floor(i / PIXEL_GRID)
        const col = i % PIXEL_GRID
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${(row / PIXEL_GRID) * 100}%`,
              left: `${(col / PIXEL_GRID) * 100}%`,
              width: `${100 / PIXEL_GRID}%`,
              height: `${100 / PIXEL_GRID}%`,
              backgroundColor: '#050d1a',
              animation: `pixelReveal 200ms ${cell.delay}ms forwards`,
            }}
          />
        )
      })}
    </div>
  )
}

function FallingWordsHeading({ text, reduceMotion }) {
  const words = text.split(' ')

  return (
    <h1
      className="text-lg md:text-2xl lg:text-3xl leading-snug"
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            marginRight: '0.4em',
            color: WORD_COLORS[i % WORD_COLORS.length],
            opacity: reduceMotion ? 1 : 0,
            transform: reduceMotion ? 'none' : 'translateY(-120px)',
            animation: reduceMotion
              ? 'none'
              : `wordFall 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 120}ms forwards`,
          }}
        >
          {word}
        </span>
      ))}
    </h1>
  )
}

function CreativeHero() {
  const { mode, language, reduceMotion } = usePortfolio()
  const [visible, setVisible] = useState(() => reduceMotion)
  const [avatarPhase, setAvatarPhase] = useState(() => (reduceMotion ? 2 : 1))
  const typed = useTypewriter(GREETING, reduceMotion)

  useEffect(() => {
    if (reduceMotion) return
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion) return
    const id = setTimeout(() => setAvatarPhase(2), 3500)
    return () => clearTimeout(id)
  }, [reduceMotion])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <section
      id="hero"
      lang={language}
      data-mode={mode}
      className="bg-[#050d1a] min-h-screen flex items-center relative overflow-hidden px-6"
    >
      <HeroCircuitCanvas reduceMotion={reduceMotion} />

      <div
        className="z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
        style={{
          opacity: visible ? 1 : 0,
          transition: reduceMotion ? 'none' : 'opacity 600ms ease',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        {/* Columna izquierda: contenido */}
        <div className="flex flex-col items-start text-left gap-6">
          <p className="text-[#00d4ff] text-xs md:text-sm tracking-[4px] uppercase opacity-80">
            UX/UI Designer · Front-end · Accesibilidad
          </p>

          <FallingWordsHeading text={HEADLINE} reduceMotion={reduceMotion} />

          <div className="flex flex-col items-start gap-1">
            <p className="text-[#e8a090] text-base md:text-lg tracking-wide">Zoe Mejia Santana</p>
            <p className="text-[#00d4ff] text-xs md:text-sm opacity-50">
              Santiago, Chile · Disponible para trabajo remoto e híbrido
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button
              onClick={() => scrollTo('projects')}
              className="bg-[#e8a090] text-[#050d1a] font-semibold text-sm tracking-[1px] uppercase px-6 py-3 rounded-lg transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(232,160,144,0.5)]"
            >
              Ver proyectos
            </button>
            <button
              onClick={() => scrollTo('footer')}
              className="border-2 border-[#e8a090] text-[#e8a090] text-sm tracking-[1px] uppercase px-6 py-3 rounded-lg transition-colors hover:bg-[#e8a090]/10"
            >
              Contacto
            </button>
          </div>
        </div>

        <div style={{ position: 'relative', width: '100%', height: '500px', marginTop: '100px' }}>

          {/* Burbuja — posición absoluta arriba izquierda */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            maxWidth: '280px',
            backgroundColor: 'rgba(0,212,255,0.08)',
            border: '1px solid rgba(0,212,255,0.3)',
            borderRadius: '12px',
            padding: '10px 14px',
            color: 'white',
            fontSize: '9px',
            fontFamily: "'Press Start 2P', monospace",
            lineHeight: '2',
            zIndex: 2,
          }}>
            <div style={{
              opacity: avatarPhase === 2 ? 0 : 1,
              transition: reduceMotion ? 'none' : 'opacity 800ms ease',
            }}>
              {typed}
              <span style={{
                display: 'inline-block',
                width: '2px',
                height: '1em',
                backgroundColor: '#00d4ff',
                marginLeft: '2px',
                verticalAlign: 'text-bottom',
                animation: reduceMotion ? 'none' : 'blink 1s step-end infinite',
              }} />
            </div>
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '14px',
              right: '14px',
              opacity: avatarPhase === 2 ? 1 : 0,
              transition: reduceMotion ? 'none' : 'opacity 800ms ease',
            }}>
              {SECOND_GREETING}
              <span style={{
                display: 'inline-block',
                width: '2px',
                height: '1em',
                backgroundColor: '#00d4ff',
                marginLeft: '2px',
                verticalAlign: 'text-bottom',
                animation: reduceMotion ? 'none' : 'blink 1s step-end infinite',
              }} />
            </div>
          </div>

          {/* Avatar — posición absoluta centrado abajo */}
          <div
            style={{
              position: 'absolute',
              bottom: '85px',
              left: '50%',
              transform: 'translateX(-50%)',
              maxWidth: '200px',
              width: '100%',
            }}
          >
            <div style={{ position: 'relative', width: '100%' }}>
              <div style={{
                opacity: avatarPhase === 2 ? 0 : 1,
                visibility: 'visible',
                transition: reduceMotion ? 'none' : 'opacity 800ms ease',
              }}>
                <PixelAvatar
                  src={avatar}
                  alt="Avatar de Zoe Mejia Santana"
                  maxWidth="200px"
                  reduceMotion={reduceMotion}
                />
              </div>
              <img
                src={avatar2}
                alt="Avatar de Zoe Mejia Santana"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  maxWidth: '190px',
                  objectFit: 'contain',
                  maxHeight: '100%',
                  opacity: avatarPhase === 2 ? 1 : 0,
                  transition: reduceMotion ? 'none' : 'opacity 800ms ease',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes wordFall {
          from { opacity: 0; transform: translateY(-120px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pixelReveal {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </section>
  )
}

export default CreativeHero
