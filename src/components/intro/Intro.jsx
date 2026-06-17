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
    let x = Math.floor(Math.random() * Math.ceil(w * 0.35 / STEP)) * STEP
    let y = Math.floor((0.2 + Math.random() * 0.5) * h / STEP) * STEP
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
    if (nodes.length >= 2) circuits.push({ nodes, featured: false, connection: false })
  }
  return circuits
}

function buildFeaturedCircuits(w, h) {
  return [
    // === SUPERIOR ===
    // Tramo principal: nombre → sube → gira derecha
    {
      nodes: [
        { x: Math.round(w * 0.35), y: Math.round(h * 0.38) },
        { x: Math.round(w * 0.35), y: Math.round(h * 0.22) },
        { x: Math.round(w * 0.73), y: Math.round(h * 0.22) },
      ],
      featured: true,
      connection: false,
    },
    // Ramificación hacia la frase rotativa
    {
      nodes: [
        { x: Math.round(w * 0.73), y: Math.round(h * 0.22) },
        { x: Math.round(w * 0.73), y: Math.round(h * 0.32) },
      ],
      featured: true,
      connection: true,
    },
    // === INFERIOR ===
    // Tramo principal: nombre → baja → gira derecha
    {
      nodes: [
        { x: Math.round(w * 0.35), y: Math.round(h * 0.65) },
        { x: Math.round(w * 0.35), y: Math.round(h * 0.77) },
        { x: Math.round(w * 0.82), y: Math.round(h * 0.77) },
      ],
      featured: true,
      connection: false,
    },
    // Ramificación hacia botón Profesional
    {
      nodes: [
        { x: Math.round(w * 0.575), y: Math.round(h * 0.77) },
        { x: Math.round(w * 0.575), y: Math.round(h * 0.63) },
      ],
      featured: true,
      connection: true,
    },
    // Ramificación hacia botón Creativa
    {
      nodes: [
        { x: Math.round(w * 0.735), y: Math.round(h * 0.77) },
        { x: Math.round(w * 0.735), y: Math.round(h * 0.63) },
      ],
      featured: true,
      connection: true,
    },
  ]
}

function CircuitCanvas({ reduceMotion }) {
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
      circuitsRef.current = [
        ...buildFeaturedCircuits(canvas.width, canvas.height),
        ...buildCircuits(canvas.width, canvas.height),
      ]
    }

    function drawCircuits() {
      ctx.save()
      for (const circuit of circuitsRef.current) {
        const { nodes, featured } = circuit
        if (featured) {
          ctx.lineWidth = 2
          ctx.strokeStyle = 'rgba(0,212,255,0.4)'
          ctx.beginPath()
          ctx.moveTo(nodes[0].x, nodes[0].y)
          for (let i = 1; i < nodes.length; i++) ctx.lineTo(nodes[i].x, nodes[i].y)
          ctx.stroke()
          for (let i = 0; i < nodes.length; i++) {
            const { x, y } = nodes[i]
            const isEnd = i === 0 || i === nodes.length - 1
            const isConnEnd = circuit.connection && i === nodes.length - 1
            if (isConnEnd) {
              ctx.save()
              ctx.shadowBlur = 16
              ctx.shadowColor = GLOW_COLOR
              ctx.fillStyle = 'rgba(180,240,255,0.95)'
              ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill()
              ctx.restore()
            } else if (isEnd) {
              ctx.fillStyle = 'rgba(0,212,255,0.6)'
              ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2); ctx.fill()
            } else {
              ctx.fillStyle = 'rgba(0,212,255,0.6)'
              ctx.fillRect(x - 3, y - 3, 6, 6)
            }
          }
        } else {
          const nx = nodes[0].x / canvas.width
          const ny = nodes[0].y / canvas.height
          const distToEdge = Math.min(nx, 1 - nx, ny, 1 - ny)
          const t = Math.min(distToEdge / 0.3, 1)
          const lineOp = 0.03 + t * 0.05
          ctx.lineWidth = 1
          ctx.strokeStyle = `rgba(0,212,255,${lineOp.toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(nodes[0].x, nodes[0].y)
          for (let i = 1; i < nodes.length; i++) ctx.lineTo(nodes[i].x, nodes[i].y)
          ctx.stroke()
          ctx.fillStyle = `rgba(0,212,255,${(lineOp * 2.5).toFixed(3)})`
          for (let i = 0; i < nodes.length; i++) {
            const { x, y } = nodes[i]
            const isEnd = i === 0 || i === nodes.length - 1
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

      ctx.save()
      const tail = ctx.createLinearGradient(tx, ty, x, y)
      tail.addColorStop(0, 'rgba(0,212,255,0)')
      tail.addColorStop(1, 'rgba(0,212,255,0.6)')
      ctx.strokeStyle = tail
      ctx.lineWidth = circuit.featured ? 2 : 1.5
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(x, y); ctx.stroke()
      ctx.restore()

      const r = circuit.featured ? 8 : 6
      ctx.save()
      const glow = ctx.createRadialGradient(x, y, 0, x, y, r)
      glow.addColorStop(0, 'rgba(0,212,255,1)')
      glow.addColorStop(0.4, 'rgba(0,212,255,0.5)')
      glow.addColorStop(1, 'rgba(0,212,255,0)')
      ctx.shadowBlur = circuit.featured ? 16 : 10
      ctx.shadowColor = GLOW_COLOR
      ctx.fillStyle = glow
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
    }

    resize()
    rebuildCircuits()
    const particles = Array.from({ length: 9 }, makeParticle)

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
      drawCircuits()
    } else {
      tick()
    }

    const ro = new ResizeObserver(() => {
      resize()
      rebuildCircuits()
      if (reduceMotion) { ctx.clearRect(0, 0, canvas.width, canvas.height); drawCircuits() }
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [reduceMotion])

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

function PixelRevealName({ reduceMotion }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let animId
    let cancelled = false

    async function run() {
      const fontSize = window.innerWidth >= 768 ? 72 : 32
      const FONT = `${fontSize}px 'Press Start 2P', monospace`
      const PAD = 8

      await document.fonts.load(FONT)
      if (cancelled) return

      const temp = document.createElement('canvas')
      const tctx = temp.getContext('2d')
      tctx.font = FONT
      const totalWidth = Math.ceil(tctx.measureText('Mejia').width)
      const W = totalWidth + PAD * 2
      const H = Math.ceil(fontSize * 1.6)

      canvas.width = W
      canvas.height = H
      const ctx = canvas.getContext('2d')

      function drawText(target) {
        target.clearRect(0, 0, W, H)
        target.font = FONT
        target.textBaseline = 'middle'
        target.fillStyle = '#00d4ff'
        target.fillText('Mejia', PAD, H / 2)
      }

      if (reduceMotion) {
        drawText(ctx)
        return
      }

      const off = document.createElement('canvas')
      off.width = W; off.height = H
      drawText(off.getContext('2d'))

      const src = off.getContext('2d').getImageData(0, 0, W, H)
      const BLOCK = 4
      const blocks = []
      for (let by = 0; by < H; by += BLOCK) {
        for (let bx = 0; bx < W; bx += BLOCK) {
          let hasText = false
          outer: for (let dy = 0; dy < BLOCK && by + dy < H; dy++) {
            for (let dx = 0; dx < BLOCK && bx + dx < W; dx++) {
              if (src.data[((by + dy) * W + (bx + dx)) * 4 + 3] > 10) { hasText = true; break outer }
            }
          }
          if (hasText) blocks.push({ bx, by })
        }
      }

      for (let i = blocks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[blocks[i], blocks[j]] = [blocks[j], blocks[i]]
      }

      const out = ctx.createImageData(W, H)
      let done = 0

      function tick() {
        if (cancelled) return
        const end = Math.min(done + 15, blocks.length)
        for (let i = done; i < end; i++) {
          const { bx, by } = blocks[i]
          for (let dy = 0; dy < BLOCK && by + dy < H; dy++) {
            for (let dx = 0; dx < BLOCK && bx + dx < W; dx++) {
              const idx = ((by + dy) * W + (bx + dx)) * 4
              out.data[idx]     = src.data[idx]
              out.data[idx + 1] = src.data[idx + 1]
              out.data[idx + 2] = src.data[idx + 2]
              out.data[idx + 3] = src.data[idx + 3]
            }
          }
        }
        done = end
        ctx.putImageData(out, 0, 0)
        if (done < blocks.length) animId = requestAnimationFrame(tick)
      }

      tick()
    }

    run()
    return () => { cancelled = true; cancelAnimationFrame(animId) }
  }, [reduceMotion])

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', imageRendering: 'pixelated' }}
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

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 768)
  window.addEventListener('resize', check)
  return () => window.removeEventListener('resize', check)
}, [])

  return (
    <>
    <section
      id="intro"
      className="bg-[#050d1a] min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6"
    >
      <CircuitCanvas reduceMotion={reduceMotion} />

      {/* Grid 2fr / 3fr en desktop, columna en móvil */}
      <div
  className="z-10 w-full max-w-6xl px-6 md:px-12"
  style={{
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '2fr 3fr',
    alignItems: 'center',
    gap: '2rem',
  }}
>

        {/* Columna izquierda: nombre */}
        <div className="flex flex-col items-start text-left">
          <p className="text-[#00d4ff] text-xs tracking-[6px] uppercase mb-6 opacity-60">
            Portfolio · 2025
          </p>

          <div className="mb-5 flex flex-col gap-2">
            {lettersFalling ? (
              <>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: isMobile ? '32px' : '72px' }}>
                  {'Zoe'.split('').map((char, i) => (
                    <span key={i} className="letter-fall" style={{ color: '#ffffff', animationDelay: `${i * 35}ms` }}>{char}</span>
                  ))}
                </div>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: isMobile ? '32px' : '72px' }}>
                  {'Mejia'.split('').map((char, i) => (
                    <span key={i} className="letter-fall" style={{ color: '#00d4ff', animationDelay: `${(3 + i) * 35}ms` }}>{char}</span>
                  ))}
                </div>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: isMobile ? '32px' : '72px' }}>
                  {'Santana'.split('').map((char, i) => (
                    <span key={i} className="letter-fall" style={{ color: '#ffffff', animationDelay: `${(8 + i) * 35}ms` }}>{char}</span>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: isMobile ? '32px' : '72px', color: '#ffffff', lineHeight: 1.2 }}>Zoe</p>
                <h1 id="main-title" aria-label="Mejia">
                  <PixelRevealName reduceMotion={reduceMotion} />
                </h1>
                <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: isMobile ? '32px' : '72px', color: '#ffffff', lineHeight: 1.2 }}>Santana</p>
              </>
            )}
          </div>

          <p className="text-[#00d4ff] text-sm tracking-[3px] uppercase opacity-70">
            UX/UI · Front-end · Design
          </p>
        </div>

        {/* Columna derecha: frase + selector */}
        <div className="flex flex-col items-center gap-10 pl-0 md:pl-8">

          {/* Frase rotativa */}
          <p style={{ color: '#eab5a8' }} className="text-2xl italic tracking-wide text-center">
            "El buen diseño no se nota. Se{' '}
            <span
              style={{
                color: '#f5c4b4',
                textDecoration: 'underline dotted rgba(245,196,180,0.45)',
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
            <p className="text-white/60 text-sm tracking-[3px] uppercase">
              Elige cómo quieres conocerme
            </p>

            <div className="flex flex-row gap-4  justify-center">
              {/* Botón Profesional */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <button
                    onClick={() => handleModeSelect('professional')}
                    onMouseEnter={() => setTooltip('professional')}
                    onMouseLeave={() => setTooltip(null)}
                    className={`mode-btn text-[#00d4ff] px-5 py-5 text-xs tracking-[2px] uppercase min-w-[140px] ${clickingMode === 'professional' ? 'mode-btn-clicking' : ''}`}
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
                    className={`mode-btn text-[#00d4ff] px-5 py-5 text-xs tracking-[2px] uppercase min-w-[140px] ${clickingMode === 'creative' ? 'mode-btn-clicking' : ''}`}
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
            <div className="flex gap-4 items-center">
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
