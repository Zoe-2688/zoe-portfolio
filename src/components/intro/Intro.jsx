import { useState, useRef, useEffect } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'

const STEP = 70
const GLOW_COLOR = '#00d4ff'
const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]]

function buildCircuits(w, h) {
  const circuits = []
  const initDirs = [0, 0, 0, 1, 3]
  for (let i = 0; i < 8; i++) {
    const nodes = []
    let x = Math.floor(Math.random() * w / STEP) * STEP
    let y = Math.floor(Math.random() * h / STEP) * STEP
    nodes.push({ x, y })
    let dir = initDirs[Math.floor(Math.random() * initDirs.length)]
    const segs = 4 + Math.floor(Math.random() * 4)
    for (let s = 0; s < segs; s++) {
      const len = STEP * (1 + s * 0.5)
      const [dx, dy] = DIRS[dir]
      const nx = x + dx * len
      const ny = y + dy * len
      if (nx < -w * 0.2 || nx > w * 1.2 || ny < -h * 0.2 || ny > h * 1.2) break
      x = nx; y = ny
      nodes.push({ x, y })
      dir = (dir + (Math.random() > 0.5 ? 1 : 3)) % 4
    }
    if (nodes.length >= 2) circuits.push({ nodes, featured: false, connection: false, pink: Math.random() < 0.375 })
  }
  return circuits
}

function buildFeaturedCircuits(w, h) {
  return []
}

const SEGMENT_ON_MS = 400
const SEGMENT_DELAY_MAX_MS = 300

function CircuitCanvas({ reduceMotion, activated = false }) {
  const canvasRef = useRef(null)
  const circuitsRef = useRef([])
  const activatedRef = useRef(activated)
  const activationStartRef = useRef(activated ? performance.now() : null)
  const drawRef = useRef(() => {})

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
      const built = [
        ...buildFeaturedCircuits(canvas.width, canvas.height),
        ...buildCircuits(canvas.width, canvas.height),
      ]
      circuitsRef.current = built.map((c) => ({
        ...c,
        segDelays: c.nodes.slice(1).map(() => Math.random() * SEGMENT_DELAY_MAX_MS),
      }))
    }

    function getSegProgress(circuit, now) {
      const { nodes, segDelays } = circuit
      const segProgress = []
      for (let s = 0; s < nodes.length - 1; s++) {
        if (reduceMotion) { segProgress.push(1); continue }
        const start = activationStartRef.current
        if (start === null) { segProgress.push(0); continue }
        const elapsed = now - start - segDelays[s]
        segProgress.push(Math.min(Math.max(elapsed / SEGMENT_ON_MS, 0), 1))
      }
      return segProgress
    }

    function getNodeProgress(segProgress, nodeCount) {
      const out = []
      for (let i = 0; i < nodeCount; i++) {
        const before = i > 0 ? segProgress[i - 1] : 0
        const after = i < nodeCount - 1 ? segProgress[i] : 0
        out.push(Math.max(before, after))
      }
      return out
    }

    function drawCircuits(now) {
      ctx.save()
      for (const circuit of circuitsRef.current) {
        const { nodes, featured } = circuit
        const segProgress = getSegProgress(circuit, now)
        const nodeProgress = getNodeProgress(segProgress, nodes.length)

        if (featured) {
          ctx.lineWidth = 2
          for (let s = 0; s < nodes.length - 1; s++) {
            if (segProgress[s] <= 0) continue
            ctx.strokeStyle = `rgba(0,212,255,${(0.4 * segProgress[s]).toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(nodes[s].x, nodes[s].y)
            ctx.lineTo(nodes[s + 1].x, nodes[s + 1].y)
            ctx.stroke()
          }
          for (let i = 0; i < nodes.length; i++) {
            if (nodeProgress[i] <= 0) continue
            const { x, y } = nodes[i]
            const isEnd = i === 0 || i === nodes.length - 1
            const isConnEnd = circuit.connection && i === nodes.length - 1
            if (isConnEnd) {
              ctx.save()
              ctx.shadowBlur = 16
              ctx.shadowColor = GLOW_COLOR
              ctx.fillStyle = `rgba(180,240,255,${(0.95 * nodeProgress[i]).toFixed(3)})`
              ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill()
              ctx.restore()
            } else if (isEnd) {
              ctx.fillStyle = `rgba(0,212,255,${(0.6 * nodeProgress[i]).toFixed(3)})`
              ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2); ctx.fill()
            } else {
              ctx.fillStyle = `rgba(0,212,255,${(0.6 * nodeProgress[i]).toFixed(3)})`
              ctx.fillRect(x - 3, y - 3, 6, 6)
            }
          }
        } else if (circuit.pink) {
          const pny = nodes[0].y / canvas.height
          const pDistToVertEdge = Math.min(pny, 1 - pny)
          const pFadeY = Math.min(pDistToVertEdge / 0.15, 1)
          ctx.lineWidth = 1
          for (let s = 0; s < nodes.length - 1; s++) {
            if (segProgress[s] <= 0) continue
            ctx.strokeStyle = `rgba(232,160,144,${(0.15 * pFadeY * segProgress[s]).toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(nodes[s].x, nodes[s].y)
            ctx.lineTo(nodes[s + 1].x, nodes[s + 1].y)
            ctx.stroke()
          }
          for (let i = 0; i < nodes.length; i++) {
            if (nodeProgress[i] <= 0) continue
            const { x, y } = nodes[i]
            const isEnd = i === 0 || i === nodes.length - 1
            ctx.fillStyle = `rgba(232,160,144,${(0.375 * pFadeY * nodeProgress[i]).toFixed(3)})`
            if (isEnd) {
              ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill()
            } else {
              ctx.fillRect(x - 2, y - 2, 4, 4)
            }
          }
        } else {
          const nx = nodes[0].x / canvas.width
          const ny = nodes[0].y / canvas.height
          const distToEdge = Math.min(nx, 1 - nx, ny, 1 - ny)
          const t = Math.min(distToEdge / 0.3, 1)
          const distToVertEdge = Math.min(ny, 1 - ny)
          const fadeY = Math.min(distToVertEdge / 0.15, 1)
          const lineOp = (0.03 + t * 0.05) * fadeY
          ctx.lineWidth = 1
          for (let s = 0; s < nodes.length - 1; s++) {
            if (segProgress[s] <= 0) continue
            ctx.strokeStyle = `rgba(0,212,255,${(lineOp * segProgress[s]).toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(nodes[s].x, nodes[s].y)
            ctx.lineTo(nodes[s + 1].x, nodes[s + 1].y)
            ctx.stroke()
          }
          for (let i = 0; i < nodes.length; i++) {
            if (nodeProgress[i] <= 0) continue
            const { x, y } = nodes[i]
            const isEnd = i === 0 || i === nodes.length - 1
            ctx.fillStyle = `rgba(0,212,255,${(lineOp * 2.5 * nodeProgress[i]).toFixed(3)})`
            if (isEnd) {
              ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill()
            } else {
              ctx.fillRect(x - 2, y - 2, 4, 4)
            }
          }
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
      const tailT = Math.max(0, p.t - 0.25)
      const tx = n1.x + (n2.x - n1.x) * tailT
      const ty = n1.y + (n2.y - n1.y) * tailT

      const pny = circuit.nodes[0].y / canvas.height
      const pDistToVertEdge = Math.min(pny, 1 - pny)
      const fadeY = circuit.featured ? 1 : Math.min(pDistToVertEdge / 0.15, 1)

      ctx.save()
      ctx.globalAlpha = fadeY
      const tail = ctx.createLinearGradient(tx, ty, x, y)
      if (circuit.pink) {
        tail.addColorStop(0, 'rgba(232,160,144,0)')
        tail.addColorStop(1, 'rgba(232,160,144,0.6)')
      } else {
        tail.addColorStop(0, 'rgba(0,212,255,0)')
        tail.addColorStop(1, 'rgba(0,212,255,0.6)')
      }
      ctx.strokeStyle = tail
      ctx.lineWidth = circuit.featured ? 2 : 1.5
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(x, y); ctx.stroke()
      ctx.restore()

      const r = circuit.featured ? 8 : 6
      ctx.save()
      ctx.globalAlpha = fadeY
      const glow = ctx.createRadialGradient(x, y, 0, x, y, r)
      if (circuit.pink) {
        glow.addColorStop(0, 'rgba(232,160,144,1)')
        glow.addColorStop(0.4, 'rgba(232,160,144,0.5)')
        glow.addColorStop(1, 'rgba(232,160,144,0)')
      } else {
        glow.addColorStop(0, 'rgba(0,212,255,1)')
        glow.addColorStop(0.4, 'rgba(0,212,255,0.5)')
        glow.addColorStop(1, 'rgba(0,212,255,0)')
      }
      ctx.shadowBlur = circuit.featured ? 16 : 10
      ctx.shadowColor = circuit.pink ? '#e8a090' : GLOW_COLOR
      ctx.fillStyle = glow
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
    }

    resize()
    rebuildCircuits()
    const particles = Array.from({ length: 9 }, makeParticle)

    function renderStatic() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (activatedRef.current) drawCircuits(performance.now())
    }
    drawRef.current = renderStatic

    function tick(now) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (activatedRef.current) {
        drawCircuits(now)
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
      }
      animId = requestAnimationFrame(tick)
    }

    if (reduceMotion) {
      renderStatic()
    } else {
      tick()
    }

    const ro = new ResizeObserver(() => {
      resize()
      rebuildCircuits()
      if (reduceMotion) renderStatic()
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [reduceMotion])

  useEffect(() => {
    activatedRef.current = activated
    if (activated) {
      if (activationStartRef.current === null) activationStartRef.current = performance.now()
    } else {
      activationStartRef.current = null
    }
    if (reduceMotion) drawRef.current()
  }, [activated, reduceMotion])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

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
        className={`relative w-9 h-5 rounded-full border transition-colors duration-200 flex-shrink-0 ${
          checked ? 'bg-[#00d4ff]/20 border-[#00d4ff]' : 'bg-transparent border-[#00d4ff]/30'
        }`}
      >
        <span
          className={`toggle-thumb absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform duration-200 ${
            checked ? 'translate-x-4 bg-[#00d4ff]' : 'translate-x-0 bg-white/30'
          }`}
        />
      </button>
    </label>
  )
}

const ROTATING_WORDS = ['siente', 'vive', 'usa', 'recuerda', 'comparte']

function BorderParticle({ onComplete }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    const W = canvas.width
    const H = canvas.height
    const ctx = canvas.getContext('2d')
    const DURATION = 1200
    const perim = 2 * (W + H)
    const TAIL = 70
    const STEPS = 26
    let startTime = null
    let animId
    const done = onComplete

    function getPos(d) {
      d = ((d % perim) + perim) % perim
      if (d <= W) return { x: d, y: 0 }
      d -= W
      if (d <= H) return { x: W, y: d }
      d -= H
      if (d <= W) return { x: W - d, y: H }
      d -= W
      return { x: 0, y: H - d }
    }

    function frame(ts) {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / DURATION, 1)
      const cur = progress * perim
      ctx.clearRect(0, 0, W, H)

      for (let i = STEPS; i >= 1; i--) {
        const { x, y } = getPos(Math.max(0, cur - TAIL * (i / STEPS)))
        const a = 1 - i / STEPS
        ctx.save()
        ctx.shadowBlur = 6
        ctx.shadowColor = '#00d4ff'
        ctx.fillStyle = `rgba(0,212,255,${a * 0.6})`
        ctx.beginPath()
        ctx.arc(x, y, Math.max(0.5, a * 3.5), 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      const { x, y } = getPos(cur)

      // Halo exterior
      ctx.save()
      const outer = ctx.createRadialGradient(x, y, 0, x, y, 20)
      outer.addColorStop(0,   'rgba(0,212,255,0.4)')
      outer.addColorStop(1,   'rgba(0,212,255,0)')
      ctx.fillStyle = outer
      ctx.beginPath()
      ctx.arc(x, y, 20, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // Halo interior + núcleo
      ctx.save()
      const g = ctx.createRadialGradient(x, y, 0, x, y, 12)
      g.addColorStop(0,    'rgba(255,255,255,1)')
      g.addColorStop(0.33, 'rgba(0,212,255,0.9)')
      g.addColorStop(1,    'rgba(0,212,255,0)')
      ctx.shadowBlur = 20
      ctx.shadowColor = '#00d4ff'
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(x, y, 12, 0, Math.PI * 2)
      ctx.fill()
      // Punto central sólido
      ctx.shadowBlur = 0
      ctx.fillStyle = 'rgba(255,255,255,1)'
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      if (progress < 1) {
        animId = requestAnimationFrame(frame)
      } else {
        done()
      }
    }

    animId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(animId)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}
    />
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
  const [wordIndex, setWordIndex] = useState(0)
  const [wordVisible, setWordVisible] = useState(true)
  const [creativePixel, setCreativePixel] = useState(false)
  const [creativeVisible, setCreativeVisible] = useState(true)
  const [tooltip, setTooltip] = useState(null)
  const [clickingMode, setClickingMode] = useState(null)
  const [lettersFalling, setLettersFalling] = useState(false)
  const [letterOffsets] = useState(() => {
    const rand = () => (Math.random() * 2 - 1) * 150
    const colors = ['#e8a090', '#00d4ff', '#ffffff']
    const randColor = () => colors[Math.floor(Math.random() * colors.length)]
    const build = (word) => word.split('').map(() => ({ dx: rand(), dy: rand(), color: randColor() }))
    return { Zoe: build('Zoe'), Mejia: build('Mejia'), Santana: build('Santana') }
  })
  const [started, setStarted] = useState(() => reduceMotion)
  const [lettersWhite, setLettersWhite] = useState(() => reduceMotion)
  const [nameGlow, setNameGlow] = useState(false)
  const [assembled, setAssembled] = useState(() => reduceMotion)
  const [activated, setActivated] = useState(() => reduceMotion)
  const creativeTid = useRef(null)

  const handleCreativeEnter = () => {
    clearTimeout(creativeTid.current)
    setCreativeVisible(false)
    creativeTid.current = setTimeout(() => { setCreativePixel(true); setCreativeVisible(true) }, 180)
  }

  const handleCreativeLeave = () => {
    clearTimeout(creativeTid.current)
    setCreativeVisible(false)
    creativeTid.current = setTimeout(() => { setCreativePixel(false); setCreativeVisible(true) }, 180)
  }

  const handleModeSelect = (mode) => {
    if (clickingMode) return
    if (reduceMotion) {
      setMode(mode)
      if (mode === 'professional') window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
      return
    }
    setClickingMode(mode)
    if (mode === 'creative') setLettersFalling(true)
  }

  const handleAnimationComplete = (mode) => {
    setMode(mode)
    if (mode === 'professional') window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    setClickingMode(null)
    setLettersFalling(false)
  }

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => {
      setWordVisible(false)
      setTimeout(() => {
        setWordIndex(i => (i + 1) % ROTATING_WORDS.length)
        setWordVisible(true)
      }, 300)
    }, 2500)
    return () => clearInterval(id)
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion) {
      setStarted(true)
      setLettersWhite(true)
      setNameGlow(false)
      setAssembled(true)
      return
    }
    const startId = requestAnimationFrame(() => setStarted(true))
    const whiteId = setTimeout(() => setLettersWhite(true), 600)
    const glowOnId = setTimeout(() => setNameGlow(true), 700)
    const glowOffId = setTimeout(() => setNameGlow(false), 1100)
    const assembledId = setTimeout(() => setAssembled(true), 700)
    return () => {
      cancelAnimationFrame(startId)
      clearTimeout(whiteId)
      clearTimeout(glowOnId)
      clearTimeout(glowOffId)
      clearTimeout(assembledId)
    }
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion) {
      setActivated(true)
      return
    }
    const activatedId = setTimeout(() => setActivated(true), 1100)
    return () => clearTimeout(activatedId)
  }, [reduceMotion])

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [isSmallScreen, setIsSmallScreen] = useState(() => window.innerWidth < 1280)
  const [isLaptop, setIsLaptop] = useState(() => window.innerWidth < 1400)
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768)
      setIsSmallScreen(window.innerWidth < 1280)
      setIsLaptop(window.innerWidth < 1400)
    }
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const nameFontSize = isMobile ? 28 : isLaptop ? 44 : 68

  return (
    <>
    <section
      id="intro"
      className="bg-[#050d1a] min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6"
    >
      <CircuitCanvas reduceMotion={reduceMotion} activated={activated} />

      {/* Grid 2fr / 3fr en desktop, columna en móvil */}
      <div
  className="z-10 w-full max-w-5xl mx-auto px-12"
  style={{
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '3fr 2fr',
    alignItems: 'center',
    gap: '1rem',
  }}
>

        {/* Columna izquierda: nombre */}
        <div className="flex flex-col items-start text-left pl-8" style={{ overflow: 'visible' }}>
          <p className="text-[#00d4ff] text-xs tracking-[6px] uppercase mb-3 opacity-60">
            Portfolio · 2025
          </p>

          <div className="mb-2 flex flex-col gap-1">
            {lettersFalling ? (
              <>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: `${nameFontSize}px` }}>
                  {'Zoe'.split('').map((char, i) => (
                    <span key={i} className="letter-fall" style={{ color: '#e8a090', animationDelay: `${i * 35}ms` }}>{char}</span>
                  ))}
                </div>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: `${nameFontSize}px` }}>
                  {'Mejia'.split('').map((char, i) => (
                    <span key={i} className="letter-fall" style={{ color: '#00d4ff', animationDelay: `${(3 + i) * 35}ms` }}>{char}</span>
                  ))}
                </div>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: `${nameFontSize}px` }}>
                  {'Santana'.split('').map((char, i) => (
                    <span key={i} className="letter-fall" style={{ color: '#ffffff', animationDelay: `${(8 + i) * 35}ms` }}>{char}</span>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: `${nameFontSize}px`, lineHeight: 1.2, display: 'flex' }}>
                  {'Zoe'.split('').map((char, i) => {
                    const off = letterOffsets.Zoe[i]
                    return (
                      <span
                        key={i}
                        style={{
                          display: 'inline-block',
                          color: lettersWhite ? '#ffffff' : off.color,
                          textShadow: nameGlow ? '0 0 20px #e8a090, 0 0 40px #e8a090' : 'none',
                          transform: started ? 'translate(0px, 0px)' : `translate(${off.dx}px, ${off.dy}px)`,
                          transition: reduceMotion
                            ? 'none'
                            : 'transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), color 200ms ease, text-shadow 400ms ease',
                        }}
                      >
                        {char}
                      </span>
                    )
                  })}
                </p>
                <h1
                  id="main-title"
                  aria-label="Mejia"
                  style={{ fontFamily: "'Press Start 2P', monospace", fontSize: `${nameFontSize}px`, lineHeight: 1.2, display: 'flex' }}
                >
                  {'Mejia'.split('').map((char, i) => {
                    const off = letterOffsets.Mejia[i]
                    return (
                      <span
                        key={i}
                        style={{
                          display: 'inline-block',
                          color: lettersWhite ? '#ffffff' : off.color,
                          textShadow: nameGlow ? '0 0 20px #e8a090, 0 0 40px #e8a090' : 'none',
                          transform: started ? 'translate(0px, 0px)' : `translate(${off.dx}px, ${off.dy}px)`,
                          transition: reduceMotion
                            ? 'none'
                            : 'transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), color 200ms ease, text-shadow 400ms ease',
                        }}
                      >
                        {char}
                      </span>
                    )
                  })}
                </h1>
                <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: `${nameFontSize}px`, lineHeight: 1.2, display: 'flex' }}>
                  {'Santana'.split('').map((char, i) => {
                    const off = letterOffsets.Santana[i]
                    return (
                      <span
                        key={i}
                        style={{
                          display: 'inline-block',
                          color: lettersWhite ? '#ffffff' : off.color,
                          textShadow: nameGlow ? '0 0 20px #e8a090, 0 0 40px #e8a090' : 'none',
                          transform: started ? 'translate(0px, 0px)' : `translate(${off.dx}px, ${off.dy}px)`,
                          transition: reduceMotion
                            ? 'none'
                            : 'transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), color 200ms ease, text-shadow 400ms ease',
                        }}
                      >
                        {char}
                      </span>
                    )
                  })}
                </p>
              </>
            )}
          </div>

          <p className="text-[#00d4ff] text-sm tracking-[3px] uppercase opacity-70">
            UX/UI · Front-end · Design
          </p>
        </div>

        {/* Columna derecha: frase + selector */}
        <div
          className="flex flex-col items-center gap-4 pl-0 md:pl-8"
          style={{ opacity: assembled ? 1 : 0, transition: reduceMotion ? 'none' : 'opacity 400ms ease' }}
        >

          {/* Frase rotativa */}
          <p style={{ color: '#eab5a8' }} className="text-2xl italic tracking-wide text-center">
            "Un buen diseño se{' '}
            <span
              style={{
                color: '#f5c4b4',
                opacity: wordVisible ? 1 : 0,
                transition: 'opacity 300ms ease',
                display: 'inline-block',
              }}
            >
              {ROTATING_WORDS[wordIndex]}
            </span>."
          </p>

          {/* Selector de versión + idioma */}
          <div className="flex flex-col items-center gap-6">
            <p className="text-white/90 text-sm tracking-[3px] uppercase">
              Elige cómo quieres conocerme
            </p>

            <div className="flex flex-row gap-2  justify-center">
              {/* Botón Profesional */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <button
                    onClick={() => handleModeSelect('professional')}
                    onMouseEnter={() => setTooltip('professional')}
                    onMouseLeave={() => setTooltip(null)}
                    className={`mode-btn text-[#00d4ff] ${isSmallScreen ? 'px-4 py-4' : 'px-4 py-3'} text-xs tracking-[2px] uppercase min-w-[120px] ${clickingMode === 'professional' ? 'mode-btn-clicking' : ''}`}
                  >
                    <span className="block text-base mb-1">Profesional</span>
                    <span className="opacity-70 normal-case tracking-normal text-xs">Proceso y resultados</span>
                  </button>
                  {clickingMode === 'professional' && (
                    <BorderParticle onComplete={() => handleAnimationComplete('professional')} />
                  )}
                </div>
                <p
                  className="mt-2 w-56 text-sm text-white/70 normal-case tracking-normal text-center pointer-events-none"
                  style={{ opacity: tooltip === 'professional' ? 1 : 0, transition: 'opacity 200ms ease' }}
                >
                  Proceso de diseño, casos de estudio y resultados
                </p>
              </div>

              {/* Botón Creativa */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <button
                    onClick={() => handleModeSelect('creative')}
                    onMouseEnter={() => { handleCreativeEnter(); setTooltip('creative') }}
                    onMouseLeave={() => { handleCreativeLeave(); setTooltip(null) }}
                    className={`mode-btn text-[#00d4ff] ${isSmallScreen ? 'px-4 py-4' : 'px-4 py-3'} text-xs tracking-[2px] uppercase min-w-[120px] ${clickingMode === 'creative' ? 'mode-btn-clicking' : ''}`}
                  >
                    <span
                      className="block mb-1"
                      style={{
                        fontFamily: creativePixel ? "'Press Start 2P', monospace" : 'inherit',
                        fontSize: creativePixel ? '0.6rem' : '1rem',
                        lineHeight: creativePixel ? 1.8 : 'inherit',
                        opacity: creativeVisible ? 1 : 0,
                        transition: 'opacity 180ms ease',
                      }}
                    >
                      Creativa
                    </span>
                    <span className="opacity-70 normal-case tracking-normal text-xs">Experiencia interactiva</span>
                  </button>
                  {clickingMode === 'creative' && (
                    <BorderParticle onComplete={() => handleAnimationComplete('creative')} />
                  )}
                </div>
                <p
                  className="mt-2 w-56 text-sm text-white/70 normal-case tracking-normal text-center pointer-events-none"
                  style={{ opacity: tooltip === 'creative' ? 1 : 0, transition: 'opacity 200ms ease' }}
                >
                  Experiencia interactiva con animaciones y mi historia
                </p>
              </div>
            </div>

            {/* Selector de idioma */}
            <div className="flex gap-4 items-center" style={{ width: 'fit-content', margin: '0 auto' }}>
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
            </div>
          </div>

        </div>

      </div>
    </section>

    {/* Accesibilidad — fixed esquina inferior derecha */}
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
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
        onClick={() => setA11yOpen(prev => !prev)}
        aria-label="Opciones de accesibilidad"
        aria-expanded={a11yOpen}
        className={`a11y-btn ${a11yOpen ? 'opacity-100' : 'opacity-60'}`}
      >
        <A11yIcon />
      </button>
    </div>
    </>
  )
}

export default Intro
