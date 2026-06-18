import { useEffect, useRef, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'

const STEP = 70
const GLOW_COLOR = '#00d4ff'
const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]]
const SEGMENT_ON_MS = 400
const SEGMENT_DELAY_MAX_MS = 300

function buildCircuits(w, h) {
  const circuits = []
  const initDirs = [0, 0, 0, 1, 3]
  for (let i = 0; i < 3; i++) {
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

function buildFeaturedCircuits() {
  return []
}

function CircuitCanvas({ reduceMotion, activated = false }) {
  const canvasRef = useRef(null)
  const circuitsRef = useRef([])
  const activatedRef = useRef(activated)
  const activationStartRef = useRef(null)
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
            ctx.strokeStyle = `rgba(0,212,255,${(0.2 * segProgress[s]).toFixed(3)})`
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
              ctx.fillStyle = `rgba(180,240,255,${(0.475 * nodeProgress[i]).toFixed(3)})`
              ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill()
              ctx.restore()
            } else if (isEnd) {
              ctx.fillStyle = `rgba(0,212,255,${(0.3 * nodeProgress[i]).toFixed(3)})`
              ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2); ctx.fill()
            } else {
              ctx.fillStyle = `rgba(0,212,255,${(0.3 * nodeProgress[i]).toFixed(3)})`
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
            ctx.strokeStyle = `rgba(232,160,144,${(0.075 * pFadeY * segProgress[s]).toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(nodes[s].x, nodes[s].y)
            ctx.lineTo(nodes[s + 1].x, nodes[s + 1].y)
            ctx.stroke()
          }
          for (let i = 0; i < nodes.length; i++) {
            if (nodeProgress[i] <= 0) continue
            const { x, y } = nodes[i]
            const isEnd = i === 0 || i === nodes.length - 1
            ctx.fillStyle = `rgba(232,160,144,${(0.1875 * pFadeY * nodeProgress[i]).toFixed(3)})`
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
          const lineOp = (0.015 + t * 0.025) * fadeY
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

const ICON_PROPS = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function MailIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 6.5l9 6.5 9-6.5" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8" cy="8.3" r="1.1" fill="currentColor" stroke="none" />
      <path d="M8 11v6" />
      <path d="M12 17v-3.8c0-1.4.9-2.4 2.3-2.4S17 11.8 17 13.2V17" />
      <path d="M12 11v6" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 3a9 9 0 0 0-2.8 17.6c.4.1.6-.2.6-.4v-1.7c-2.5.5-3-1.1-3-1.1-.4-1-1-1.3-1-1.3-.8-.5.1-.5.1-.5.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.4-1 .7-1.3-2.4-.3-3.6-1.6-3.6-3.5 0-.8.3-1.5.8-2-.1-.3-.4-1.1.1-2.2 0 0 .8-.2 2.4.9a8 8 0 0 1 4.2 0c1.6-1.1 2.4-.9 2.4-.9.5 1.1.2 1.9.1 2.2.5.5.8 1.2.8 2 0 1.9-1.2 3.2-3.6 3.5.4.3.7.9.7 1.7v2.2c0 .2.2.5.6.4A9 9 0 0 0 12 3z" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.3" />
    </svg>
  )
}

const CONTACT_ITEMS = [
  {
    Icon: MailIcon,
    label: 'zoe.mejia.ux@gmail.com',
    href: 'mailto:zoe.mejia.ux@gmail.com',
  },
  {
    Icon: LinkedInIcon,
    label: 'linkedin.com/in/zoe-mejia',
    href: 'https://linkedin.com/in/zoe-mejia',
  },
  {
    Icon: GitHubIcon,
    label: 'github.com/Zoe-2688',
    href: 'https://github.com/Zoe-2688',
  },
  {
    Icon: PinIcon,
    label: 'Santiago, Chile',
    href: null,
  },
]

const fieldClass =
  'bg-transparent text-white placeholder-white/40 rounded-lg px-4 py-3 outline-none transition-colors'
const fieldStyle = { border: '1px solid rgba(0,212,255,0.3)' }

function Contact() {
  const { reduceMotion } = usePortfolio()
  const [visible, setVisible] = useState(() => reduceMotion)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    if (reduceMotion) return
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [reduceMotion])

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section id="contact" className="bg-[#050d1a] py-24 px-6 relative overflow-hidden">
      <CircuitCanvas reduceMotion={reduceMotion} activated />

      <div
        className="max-w-6xl mx-auto flex flex-col gap-16 relative z-10"
        style={{ opacity: visible ? 1 : 0, transition: reduceMotion ? 'none' : 'opacity 600ms ease' }}
      >
        <div className="flex flex-col items-center text-center gap-3">
          <h2 className="text-white text-4xl md:text-5xl font-semibold">¿Hablamos?</h2>
          <p className="text-[#00d4ff] text-base md:text-lg" style={{ opacity: 0.7 }}>
            Un diseño comienza con una conversación.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className="text-white/70 text-sm">
                Nombre
              </label>
              <input
                id="contact-name"
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="Tu nombre"
                className={fieldClass}
                style={fieldStyle}
                onFocus={(e) => { e.target.style.borderColor = '#00d4ff' }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.3)' }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className="text-white/70 text-sm">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="tu@email.com"
                className={fieldClass}
                style={fieldStyle}
                onFocus={(e) => { e.target.style.borderColor = '#00d4ff' }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.3)' }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-white/70 text-sm">
                Mensaje
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={form.message}
                onChange={handleChange('message')}
                placeholder="Cuéntame sobre tu proyecto"
                className={`${fieldClass} resize-none`}
                style={fieldStyle}
                onFocus={(e) => { e.target.style.borderColor = '#00d4ff' }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.3)' }}
              />
            </div>

            <button
              type="submit"
              className="self-start mt-2 bg-[#e8a090] text-[#050d1a] font-semibold text-sm tracking-[1px] uppercase px-6 py-3 rounded-lg transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(232,160,144,0.5)]"
            >
              Enviar mensaje
            </button>
          </form>

          <div className="flex flex-col gap-6 justify-center">
            {CONTACT_ITEMS.map(({ Icon, label, href }) => {
              const content = (
                <>
                  <span className="text-[#00d4ff] group-hover:text-[#e8a090] transition-colors">
                    <Icon />
                  </span>
                  <span className="text-white group-hover:text-[#e8a090] transition-colors text-base">
                    {label}
                  </span>
                </>
              )
              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-3"
                >
                  {content}
                </a>
              ) : (
                <div key={label} className="group flex items-center gap-3">
                  {content}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
