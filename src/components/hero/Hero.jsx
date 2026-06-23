import { useEffect, useRef, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import boostHome from '../../assets/projects/homescreen2.png'
import boostGames from '../../assets/projects/gamescreen.png'
import boostAdherence from '../../assets/projects/adherencescreen.png'
import boostAccessibility from '../../assets/projects/accesibilityscreen.png'

const STEP = 70
const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]]
const BOOST_SCREENS = [boostHome, boostGames, boostAdherence, boostAccessibility]

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

function Hero() {
  const { mode, language, reduceMotion } = usePortfolio()
  const [visible, setVisible] = useState(() => reduceMotion)
  const [currentScreen, setCurrentScreen] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => {
      setCurrentScreen((i) => (i + 1) % BOOST_SCREENS.length)
    }, 3000)
    return () => clearInterval(id)
  }, [reduceMotion])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <section
      id="hero"
      lang={language}
      data-mode={mode}
      className="bg-[#050d1a] min-h-screen flex items-center justify-center relative overflow-hidden px-6"
    >
      <HeroCircuitCanvas reduceMotion={reduceMotion} />

      <div
        className="z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 items-center"
        style={{ opacity: visible ? 1 : 0, transition: reduceMotion ? 'none' : 'opacity 600ms ease' }}
      >
        <div className="flex flex-col items-start text-left gap-6">
          <p className="text-[#00d4ff] text-xs md:text-sm tracking-[4px] uppercase opacity-80">
            UX/UI Designer · Front-end · Accesibilidad
          </p>

          <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-semibold leading-snug">
            Diseño experiencias digitales que conectan personas con tecnología.
          </h1>

          <div className="flex flex-col items-start gap-1 mt-2">
            <p className="text-[#e8a090] text-base md:text-lg tracking-wide">Zoe Mejia Santana</p>
            <p className="text-[#00d4ff] text-xs md:text-sm opacity-50">
              Santiago, Chile · Disponible para trabajo remoto e híbrido
            </p>
          </div>

          <div className="flex flex-wrap items-start justify-start gap-4 mt-4">
            <button
              onClick={() => scrollTo('projects')}
              className="bg-[#e8a090] text-[#050d1a] font-semibold text-sm tracking-[1px] uppercase px-6 py-3 rounded-lg transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(232,160,144,0.5)]"
            >
              Ver proyectos
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="border-2 border-[#e8a090] text-[#e8a090] text-sm tracking-[1px] uppercase px-6 py-3 rounded-lg transition-colors hover:bg-[#e8a090]/10"
            >
              Contacto
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '-40px' }}>
            {BOOST_SCREENS.map((screen, i) => (
              <img
                key={i}
                src={screen}
                alt={`Boost pantalla ${i + 1}`}
                style={{
                  position: i === 0 ? 'relative' : 'absolute',
                  width: '100%',
                  maxWidth: '460px',
                  objectFit: 'contain',
                  opacity: currentScreen === i ? 1 : 0,
                  transition: reduceMotion ? 'none' : 'opacity 800ms ease',
                  filter: 'drop-shadow(0 -10px 15px rgba(0,212,255,0.2)) drop-shadow(0 25px 35px rgba(232,160,144,0.4)) drop-shadow(0 15px 20px rgba(232,160,144,0.2))',
                  animation: reduceMotion ? 'none' : 'phoneFloat 3s ease-in-out infinite',
                }}
              />
            ))}
            <div className="flex items-center gap-2" style={{ marginTop: '12px' }}>
              {BOOST_SCREENS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentScreen(i)}
                  className={`h-3 w-3 rounded-full transition-colors ${currentScreen === i ? 'bg-[#00d4ff]' : 'bg-white/30 hover:bg-white/60'}`}
                  aria-label={`Ver pantalla ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes phoneFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }`}</style>
    </section>
  )
}

export default Hero
