import { useEffect, useRef, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import { FaWhatsapp } from 'react-icons/fa'
import { MdHome, MdKeyboardArrowUp } from 'react-icons/md'

// ─── Paleta Flagship (Brand Guide oficial) ───────────────────────
const C = {
  primary: '#15A5B1',
  dark:    '#09253A',
  light:   '#81D1D0',
  neutral: '#D9D9D1',
  bg:      '#05111d',
}

// ─── Assets (static imports para Vite) ──────────────────────────
import flagshipPrototype   from '../../assets/projects/PrototypeFlagship.png'
import flagshipPrototypeFV from '../../assets/projects/PrototypeFlagshipextendida.png'
import flagshipWireframe   from '../../assets/projects/WIreframe-Flagship.png'
import flagshipImg         from '../../assets/projects/flagship.png'
import flagshipHeroVideo   from '../../assets/projects/FlagshipHeroVideo.mp4'
import flagshipSimpleCTRL  from '../../assets/projects/FlagShipSimpleCTRLvideo.mp4'
import flagshipShowCTRL    from '../../assets/projects/FlagshipShowCTRLvideo.mp4'
import flagshipSelfCTRL    from '../../assets/projects/FlagshipSelfCTRLvideo.mp4'

// ─── Circuit background teal ─────────────────────────────────────
const STEP = 70
const DIRS = [[1,0],[0,1],[-1,0],[0,-1]]

function buildCircuits(w, h) {
  const circuits = []
  for (let i = 0; i < 12; i++) {
    const nodes = []
    let x = Math.floor(Math.random() * w / STEP) * STEP
    let y = Math.floor(Math.random() * h / STEP) * STEP
    nodes.push({ x, y })
    let dir = Math.floor(Math.random() * 4)
    const segs = 3 + Math.floor(Math.random() * 4)
    for (let s = 0; s < segs; s++) {
      const len = STEP * (1 + Math.floor(Math.random() * 3))
      const [dx, dy] = DIRS[dir]
      const nx = x + dx * len, ny = y + dy * len
      if (nx < 0 || nx > w || ny < 0 || ny > h) break
      x = nx; y = ny; nodes.push({ x, y })
      dir = (dir + (Math.random() > 0.5 ? 1 : 3)) % 4
    }
    if (nodes.length >= 2) circuits.push({ nodes, light: Math.random() < 0.45 })
  }
  return circuits
}

function CircuitCanvas({ reduceMotion }) {
  const canvasRef = useRef(null)
  const circuitsRef = useRef([])
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    const rebuild = () => { circuitsRef.current = buildCircuits(canvas.width, canvas.height) }
    const drawCircuits = () => {
      ctx.save()
      for (const { nodes, light } of circuitsRef.current) {
        const col = light ? 'rgba(129,209,208,' : 'rgba(21,165,177,'
        ctx.lineWidth = 1; ctx.strokeStyle = `${col}0.07)`
        ctx.beginPath(); ctx.moveTo(nodes[0].x, nodes[0].y)
        for (let i = 1; i < nodes.length; i++) ctx.lineTo(nodes[i].x, nodes[i].y)
        ctx.stroke()
        for (const {x,y} of nodes) { ctx.fillStyle=`${col}0.18)`; ctx.beginPath(); ctx.arc(x,y,2,0,Math.PI*2); ctx.fill() }
      }
      ctx.restore()
    }
    const makeP = () => { const ci=Math.floor(Math.random()*circuitsRef.current.length); return {ci,si:0,t:Math.random(),speed:0.004+Math.random()*0.006} }
    const drawP = p => {
      const c = circuitsRef.current[p.ci]
      if (!c || p.si >= c.nodes.length-1) return
      const n1=c.nodes[p.si], n2=c.nodes[p.si+1]
      const x=n1.x+(n2.x-n1.x)*p.t, y=n1.y+(n2.y-n1.y)*p.t
      const col = c.light ? C.light : C.primary
      ctx.save()
      const g=ctx.createRadialGradient(x,y,0,x,y,5)
      g.addColorStop(0,c.light?'rgba(129,209,208,0.8)':'rgba(21,165,177,0.8)')
      g.addColorStop(1,c.light?'rgba(129,209,208,0)':'rgba(21,165,177,0)')
      ctx.shadowBlur=6; ctx.shadowColor=col; ctx.fillStyle=g
      ctx.beginPath(); ctx.arc(x,y,5,0,Math.PI*2); ctx.fill()
      ctx.restore()
    }
    resize(); rebuild()
    const particles = Array.from({length:8},makeP)
    const drawFrame = () => { ctx.clearRect(0,0,canvas.width,canvas.height); drawCircuits() }
    const tick = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height); drawCircuits()
      for (const p of particles) {
        p.t += p.speed
        if (p.t >= 1) { p.si++; p.t=0; const c=circuitsRef.current[p.ci]; if (!c||p.si>=c.nodes.length-1){p.ci=Math.floor(Math.random()*circuitsRef.current.length);p.si=0} }
        drawP(p)
      }
      animId = requestAnimationFrame(tick)
    }
    if (reduceMotion) drawFrame(); else tick()
    const ro = new ResizeObserver(()=>{resize();rebuild();if(reduceMotion)drawFrame()})
    ro.observe(canvas)
    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [reduceMotion])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

// ─── Datos ───────────────────────────────────────────────────────
const METRICAS = [
  { valor: '3',    label: 'Soluciones en una plataforma' },
  { valor: '+1',   label: 'Entrega extra propuesta y aceptada' },
  { valor: '3',    label: 'Videos demo producidos' },
  { valor: 'B2B',  label: 'Cliente real Upwork · Digital Signage' },
]

const TAGS = ['Figma', 'Canva', 'UX/UI', 'B2B', 'Landing Page', 'Digital Signage', 'Brand Strategy']

const SOLUCIONES = [
  {
    nombre: 'SimpleCTRL',
    sub: 'The Solution for Simple Looping Playlists',
    color: C.primary,
    desc: 'Software ideal para necesidades CMS básicas. Entrega una experiencia amigable para el usuario final y un setup sin fricciones para integradores. Perfecto cuando el proyecto solo necesita una playlist en loop de pantalla completa.',
    casos: [
      'El proyecto solo necesita una playlist en loop',
      'La experiencia del usuario final debe ser simple',
      'El setup del dispositivo debe ser rápido',
      'No se necesitan funcionalidades avanzadas',
    ],
  },
  {
    nombre: 'ShowCTRL',
    sub: 'The Solution for Dynamic Content',
    color: C.primary,
    desc: 'Aprovecha el sistema Widget/Canvas drag-and-drop para crear experiencias interactivas, no interactivas y táctiles. Ideal para señalización digital y video walls que requieren contenido dinámico y llamativo.',
    casos: [
      'Contenido dinámico con amplia selección de widgets',
      'Sistemas touchscreen interactivos',
      'Experiencias táctiles y no táctiles impactantes',
      'Control de contenido desde tablet, teléfono o laptop',
    ],
  },
  {
    nombre: 'SelfCTRL',
    sub: 'The Solution for Custom Experiences',
    color: C.dark,
    desc: 'Gestiona, mantiene y actualiza rápidamente aplicaciones personalizadas para señalización digital y video walls sin reconstruir el programa ni requerir cambios laborales intensos en el sistema.',
    casos: [
      'Experiencias digitales fuera de lo convencional',
      'Despliegues rápidos de software de señalización personalizado',
      'Integración de dispositivos de terceros necesaria',
      'Control system interface con serial, TCP/IP y/o IR',
    ],
  },
]

// ─── Sub-componentes ─────────────────────────────────────────────
function Tag({ label }) {
  return (
    <span style={{
      fontFamily: 'monospace', fontSize: '11px', color: C.primary,
      border: `1px solid ${C.primary}59`, backgroundColor: `${C.primary}0f`,
      padding: '3px 10px', letterSpacing: '0.5px',
    }}>{label}</span>
  )
}

function SectionTitle({ numero, titulo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
      <span style={{ fontFamily: 'monospace', fontSize: '11px', color: C.primary, opacity: 0.4 }}>
        {String(numero).padStart(2, '0')}
      </span>
      <h2 style={{ fontFamily: "'Outfit', 'Inter', sans-serif", fontSize: '15px', fontWeight: 600, color: 'white', letterSpacing: '0.05em', margin: 0 }}>
        {titulo}
      </h2>
      <div style={{ flex: 1, height: '1px', backgroundColor: `${C.primary}1f` }} />
    </div>
  )
}

function SectionText({ children }) {
  return (
    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, marginBottom: '24px', fontFamily: "'Albert Sans', 'Inter', sans-serif" }}>
      {children}
    </p>
  )
}

function MetricaCard({ valor, label }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        border: `1px solid ${hov ? C.light+'aa' : C.primary+'26'}`,
        backgroundColor: hov ? C.primary+'14' : C.primary+'08',
        padding: '12px 14px', borderRadius: '4px',
        boxShadow: hov ? `0 0 16px ${C.primary}33` : 'none',
        transition: 'all 200ms ease', cursor: 'default',
      }}
    >
      <p style={{ fontSize: '1.4rem', fontWeight: 700, color: C.light, margin: '0 0 4px 0', lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>{valor}</p>
      <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.4 }}>{label}</p>
    </div>
  )
}

function Separador({ titulo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '52px 0' }}>
      <div style={{ flex: 1, height: '1px', backgroundColor: C.primary+'33' }} />
      <span style={{ fontSize: '16px', fontWeight: 700, color: C.primary, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>{titulo}</span>
      <div style={{ flex: 1, height: '1px', backgroundColor: C.primary+'33' }} />
    </div>
  )
}

function SolucionCard({ s }) {
  const isDark = s.color === C.dark
  return (
    <div style={{
      backgroundColor: isDark ? `${C.dark}cc` : `${C.primary}0a`,
      border: `1px solid ${C.primary}33`,
      borderRadius: '10px', padding: '20px', marginBottom: '20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
        <div>
          <span style={{
            display: 'inline-block', backgroundColor: isDark ? C.dark : C.primary,
            color: 'white', fontWeight: 700, fontSize: '15px',
            padding: '4px 14px', borderRadius: '20px', marginBottom: '4px',
            fontFamily: "'Outfit', sans-serif", border: `1px solid ${C.light}40`,
          }}>{s.nombre}</span>
          <p style={{ fontFamily: 'monospace', fontSize: '11px', color: C.light, margin: 0, letterSpacing: '0.5px' }}>{s.sub}</p>
        </div>
      </div>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: '0 0 14px 0' }}>{s.desc}</p>
      <p style={{ fontFamily: 'monospace', fontSize: '10px', color: C.primary, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 10px 0' }}>// Cuándo usarlo</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
        {s.casos.map(c => (
          <div key={c} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <span style={{ color: C.light, fontSize: '11px', flexShrink: 0, marginTop: '2px' }}>◆</span>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.5 }}>{c}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SetupStep({ num, texto }) {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '8px' }}>
      <span style={{
        flexShrink: 0, width: '22px', height: '22px', borderRadius: '50%',
        backgroundColor: C.primary, color: '#05111d',
        fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'monospace',
      }}>{num}</span>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.6, paddingTop: '1px' }}>{texto}</p>
    </div>
  )
}

function VideoSection({ src, title, desc }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <p style={{ fontFamily: 'monospace', fontSize: '11px', color: C.primary, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 6px 0', opacity: 0.8 }}>// {title}</p>
      {desc && <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', margin: '0 0 12px 0', lineHeight: 1.6 }}>{desc}</p>}
      <video src={src} controls muted loop playsInline style={{
        width: '100%', borderRadius: '10px',
        border: `1px solid ${C.primary}33`,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)', display: 'block',
      }} />
    </div>
  )
}

// ─── Componente principal ────────────────────────────────────────
function FlagshipCaseStudy({ onClose }) {
  const { reduceMotion } = usePortfolio()
  const containerRef = useRef(null)
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handler = () => setShowScroll(el.scrollTop > 300)
    el.addEventListener('scroll', handler)
    return () => el.removeEventListener('scroll', handler)
  }, [])

  const scrollToTop = () => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  const WHATSAPP = 'https://wa.me/56989774690'

  const btnBase = {
    width: '44px', height: '44px', borderRadius: '50%',
    backgroundColor: 'rgba(5,17,29,0.9)', backdropFilter: 'blur(8px)',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 200ms', boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
  }

  return (
    <div ref={containerRef} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      backgroundColor: C.bg, overflowY: 'auto',
      fontFamily: "'Albert Sans', 'Inter', 'Segoe UI', sans-serif",
    }}>
      {/* Fondo circuitos */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <CircuitCanvas reduceMotion={reduceMotion} />
      </div>

      {/* Botones flotantes */}
      {showScroll && (
        <div style={{ position: 'fixed', bottom: '32px', right: '24px', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <button onClick={scrollToTop} title="Ir al inicio"
            style={{ ...btnBase, border: `1px solid ${C.primary}66`, color: C.primary }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor=C.primary+'26'; e.currentTarget.style.boxShadow=`0 0 16px ${C.primary}4d` }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor='rgba(5,17,29,0.9)'; e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.3)' }}>
            <MdKeyboardArrowUp size={24} />
          </button>
          <button onClick={onClose} title="Volver a proyectos"
            style={{ ...btnBase, border: `1px solid ${C.light}66`, color: C.light }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor=C.light+'26'; e.currentTarget.style.boxShadow=`0 0 16px ${C.light}4d` }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor='rgba(5,17,29,0.9)'; e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.3)' }}>
            <MdHome size={22} />
          </button>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" title="WhatsApp"
            style={{ ...btnBase, border: '1px solid rgba(37,211,102,0.4)', color: '#25d366', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor='rgba(37,211,102,0.15)'; e.currentTarget.style.boxShadow='0 0 16px rgba(37,211,102,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor='rgba(5,17,29,0.9)'; e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.3)' }}>
            <FaWhatsapp size={22} />
          </a>
        </div>
      )}

      {/* Header sticky */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        backgroundColor: C.bg+'f5', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${C.primary}1a`,
        padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 200ms', fontFamily: 'monospace' }}
            onMouseEnter={e => e.currentTarget.style.color=C.primary}
            onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.45)'}>
            ← Volver a proyectos
          </button>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: C.primary, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Outfit', monospace" }}>Flagship CMS</span>
        </div>
        <a href="https://www.figma.com/proto/hp9Ob4unyQHcS270jRPgwu/Prototype--UpworkClient?node-id=9-75&t=GIvTTUjSkPnW7fs0-1"
          target="_blank" rel="noopener noreferrer"
          style={{ fontSize: '12px', color: C.light, border: `1px solid ${C.light}66`, padding: '7px 16px', textDecoration: 'none', fontFamily: 'monospace', transition: 'all 200ms', letterSpacing: '0.5px' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor=C.light+'1a'; e.currentTarget.style.borderColor=C.light }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor='transparent'; e.currentTarget.style.borderColor=C.light+'66' }}>
          Ver prototipo en Figma →
        </a>
      </div>

      {/* ══ HERO ══ */}
      <div style={{ position: 'relative', overflow: 'hidden', borderBottom: `1px solid ${C.primary}14`, zIndex: 1 }}>
        <div style={{
          position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto',
          padding: '64px 32px', display: 'grid', gridTemplateColumns: '0.85fr 1.5fr', gap: '48px', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '11px', color: C.primary, letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.6, margin: 0 }}>
              Caso de Estudio · UX/UI · B2B · Upwork
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: C.primary, margin: 0, lineHeight: 1.1, fontFamily: "'Outfit', sans-serif" }}>
              FLAGSHIP CMS
            </h1>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.55, margin: 0, fontFamily: "'Albert Sans', sans-serif" }}>
              Landing Page + Estrategia Digital para plataforma de Digital Signage B2B
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic', lineHeight: 1.7, margin: 0, borderLeft: `2px solid ${C.primary}4d`, paddingLeft: '12px' }}>
              "El brief pedía un folleto PDF — propuse y entregué una landing interactiva + tres videos demo. El cliente la usó para sus presentaciones de ventas."
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {TAGS.map(t => <Tag key={t} label={t} />)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {METRICAS.map(m => <MetricaCard key={m.label} valor={m.valor} label={m.label} />)}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <style>{`
              @keyframes flagshipFloat {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                33% { transform: translateY(-8px) rotate(0.4deg); }
                66% { transform: translateY(-4px) rotate(-0.3deg); }
              }
            `}</style>
            <img
              src={flagshipImg}
              alt="Flagship CMS Landing Page"
              style={{
                width: '100%', display: 'block',
                maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)',
                maskComposite: 'intersect',
                WebkitMaskComposite: 'destination-in',
                animation: reduceMotion ? 'none' : 'flagshipFloat 5s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>

      {/* ══ CONTENIDO ══ */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '56px 32px 80px', position: 'relative', zIndex: 1 }}>

        <Separador titulo="El Proyecto" />

        {/* 1. Intro */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={1} titulo="Introducción al Proyecto" />
          <SectionText>
            Flagship CMS necesitaba modernizar su folleto comparativo para competir en el mercado SaaS. Mi investigación reveló que los competidores usaban recursos digitales interactivos, mientras que Flagship dependía de PDFs estáticos. Propuse una solución integral: rediseñar el folleto y crear una landing page + videos promocionales para potenciar su comunicación.
          </SectionText>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
            {[
              { nombre: 'SimpleCTRL', icono: '🔁', desc: 'Playlists en loop. Setup simple. Experiencia sin curva de aprendizaje.' },
              { nombre: 'ShowCTRL', icono: '🎛️', desc: 'Contenido dinámico con drag-and-drop. Widget/Canvas para pantallas y video walls interactivos.' },
              { nombre: 'SelfCTRL', icono: '⚙️', desc: 'Aplicaciones personalizadas para señalización compleja. Control total sin reconstruir el sistema.' },
            ].map(s => (
              <div key={s.nombre} style={{ backgroundColor: `${C.primary}08`, border: `1px solid ${C.primary}26`, borderRadius: '8px', padding: '16px' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>{s.icono}</span>
                <p style={{ fontSize: '13px', fontWeight: 700, color: C.light, margin: '0 0 6px 0', fontFamily: "'Outfit', sans-serif" }}>{s.nombre}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ padding: '16px 20px', backgroundColor: `${C.dark}cc`, border: `1px solid ${C.primary}26`, borderRadius: '8px', borderLeft: `3px solid ${C.primary}` }}>
            <p style={{ fontFamily: "'Albert Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.7, fontStyle: 'italic' }}>
              "There's no such thing as a 'one size fits all' digital signage CMS platform... so we made three unique solutions that all work with each other on our platform."
            </p>
            <p style={{ fontFamily: 'monospace', fontSize: '10px', color: C.primary, margin: '8px 0 0 0', letterSpacing: '1px' }}>— Flagship CMS, Solutions Tier Brochure</p>
          </div>
        </div>

        {/* 2. El reto */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={2} titulo="🔍 El Reto" />
          <SectionText>
            El folleto existente tenía diseño denso con baja jerarquía visual — texto uniforme sin énfasis en ventajas clave. El formato estático (PDF) quedaba por debajo de los competidores que ya usaban recursos digitales. El riesgo real: la comunicación no reflejaba la innovación del producto.
          </SectionText>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: `${C.primary}06`, border: `1px solid ${C.primary}1f`, borderRadius: '8px', padding: '16px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, color: C.light, margin: '0 0 12px 0', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'monospace' }}>🚨 Problemas del folleto original</p>
              {['Baja jerarquía visual — texto uniforme sin énfasis', 'Formato estático (PDF) vs. competidores digitales', 'Sin interactividad ni recursos multimedia', 'La comunicación no reflejaba la innovación del producto'].map(item => (
                <div key={item} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ color: '#f87171', flexShrink: 0, fontSize: '12px' }}>✕</span>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: `${C.primary}0a`, border: `1px solid ${C.primary}26`, borderRadius: '8px', padding: '16px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, color: C.primary, margin: '0 0 12px 0', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'monospace' }}>💡 Oportunidad identificada</p>
              {['Landing page interactiva que integrara el folleto', 'Videos promocionales para explicar beneficios complejos', 'Sistema modular: PDF + digital para equipos de ventas', 'Ecosistema completo: 3× oportunidades de engagement'].map(item => (
                <div key={item} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ color: C.primary, flexShrink: 0, fontSize: '12px' }}>→</span>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Rol */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={3} titulo="Mi Rol y Enfoque" />
          <SectionText>
            Descubrí 3 oportunidades ocultas: los usuarios no retenían datos técnicos en formato PDF, los equipos de ventas necesitaban recursos escaneables, y la marca perdía credibilidad al no reflejar innovación. No solo modernicé — redefiní la comunicación visual.
          </SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              { icon: '🔍', rol: 'Análisis Inicial', desc: 'Identifiqué que usuarios no retenían datos técnicos en PDF y que equipos de ventas necesitaban recursos escaneables. La marca perdía credibilidad.' },
              { icon: '🎨', rol: 'Rediseño Visual', desc: 'Reformulé el diseño para resaltar los puntos clave organizando información de manera clara. Incorporé elementos visuales modernos que transmiten confianza e innovación.' },
              { icon: '🎬', rol: 'Producción de Videos', desc: '4 videos en Canva: 1 corporativo general + 1 por producto (SimpleCTRL, ShowCTRL, SelfCTRL). 60-90 seg — punto óptimo para retención B2B.' },
              { icon: '💼', rol: 'Ecosistema de Entrega', desc: 'Landing page en Figma (prototipo navegable) + Videos en Canva + PDF editable para futuras actualizaciones. Kit completo para equipos de ventas.' },
            ].map(item => (
              <div key={item.rol} style={{ backgroundColor: `${C.primary}06`, border: `1px solid ${C.primary}18`, borderRadius: '8px', padding: '16px', display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', margin: '0 0 6px 0', fontFamily: "'Outfit', sans-serif" }}>{item.rol}</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separador titulo="Las 3 Soluciones" />

        {/* 4. Las soluciones en detalle */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={4} titulo="SimpleCTRL · ShowCTRL · SelfCTRL" />
          <SectionText>
            Uno de los retos centrales del diseño fue comunicar que Flagship no es un CMS sino una plataforma con tres productos modulares que conviven. La landing necesitaba que un visitante B2B entendiera rápidamente cuál solución le aplica, sin sentirse abrumado por la comparación técnica.
          </SectionText>
          {SOLUCIONES.map(s => <SolucionCard key={s.nombre} s={s} />)}
        </div>

        {/* 5. Setup Process */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={5} titulo="Setup Process — Cómo se instala cada solución" />
          <SectionText>
            El brochure de Flagship documenta el proceso de instalación de cada solución. Esta información fue clave para entender el flujo técnico que el diseño de la landing debía simplificar visualmente para audiencias B2B no técnicas.
          </SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              {
                nombre: 'SimpleCTRL', color: C.primary,
                pasos: [
                  'Instalar software en Windows 10/11 PC',
                  'Usar Link Code para conectar con el dashboard',
                  'Crear playlist y agregar contenido',
                  'Enviar playlist al dispositivo',
                ],
              },
              {
                nombre: 'ShowCTRL', color: C.primary,
                pasos: [
                  'Instalar software en Windows 10/11 PC',
                  'Usar Link Code para conectar con el dashboard',
                  'Crear Canvas con el editor drag-and-drop',
                  'Agregar contenido a playlists, tablas y objetos del Canvas',
                  'Enviar Canvas al dispositivo',
                ],
              },
              {
                nombre: 'SelfCTRL', color: C.dark,
                pasos: [
                  'Instalar software en Windows 10/11 PC',
                  'Usar Link Code para conectar con el dashboard',
                  'Crear Application Container con la app personalizada',
                  'Agregar objetos del dashboard que la app utilizará',
                  'Enviar Application Container al dispositivo',
                ],
              },
            ].map(p => (
              <div key={p.nombre} style={{ backgroundColor: p.color===C.dark?`${C.dark}cc`:`${C.primary}08`, border: `1px solid ${C.primary}26`, borderRadius: '8px', padding: '16px' }}>
                <span style={{ display: 'inline-block', backgroundColor: p.color===C.dark?C.dark:C.primary, color: 'white', fontWeight: 700, fontSize: '13px', padding: '3px 12px', borderRadius: '16px', marginBottom: '14px', fontFamily: "'Outfit', sans-serif", border: `1px solid ${C.light}40` }}>{p.nombre}</span>
                {p.pasos.map((paso, i) => <SetupStep key={i} num={i+1} texto={paso} />)}
              </div>
            ))}
          </div>
        </div>

        <Separador titulo="Proceso de Diseño" />

        {/* 6. Design Thinking */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={6} titulo="Mi Proceso de Diseño" />
          <SectionText>Apliqué la metodología Design Thinking en 5 fases — desde la investigación del cliente y el producto hasta el prototipado navegable y los videos demo entregados.</SectionText>
          <svg width="100%" viewBox="0 0 900 460" role="img" aria-label="Proceso de Diseño">
            <defs>
              <marker id="arrF" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="rgba(255,255,255,0.35)"/>
              </marker>
              <linearGradient id="fg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#15A5B1" stopOpacity="0.25"/><stop offset="100%" stopColor="#81D1D0" stopOpacity="0.15"/></linearGradient>
              <linearGradient id="fg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#09253A" stopOpacity="0.4"/><stop offset="100%" stopColor="#15A5B1" stopOpacity="0.15"/></linearGradient>
              <linearGradient id="fg3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#81D1D0" stopOpacity="0.2"/><stop offset="100%" stopColor="#15A5B1" stopOpacity="0.1"/></linearGradient>
              <linearGradient id="fg4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#15A5B1" stopOpacity="0.2"/><stop offset="100%" stopColor="#09253A" stopOpacity="0.1"/></linearGradient>
              <linearGradient id="fg5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#81D1D0" stopOpacity="0.25"/><stop offset="100%" stopColor="#15A5B1" stopOpacity="0.12"/></linearGradient>
              <radialGradient id="fspotlight" cx="0%" cy="10%" r="100%" fx="0%" fy="10%">
                <stop offset="0%" stopColor="rgba(21,165,177,0.15)"/>
                <stop offset="50%" stopColor="rgba(21,165,177,0.05)"/>
                <stop offset="100%" stopColor="rgba(21,165,177,0)"/>
              </radialGradient>
            </defs>
            <polygon points="0,20 900,100 900,300 0,20" fill="rgba(21,165,177,0.04)"/>
            <polygon points="0,20 900,150 900,250 0,20" fill="rgba(21,165,177,0.03)"/>
            <ellipse cx="100" cy="200" rx="800" ry="200" fill="url(#fspotlight)"/>
            <rect x="2" y="12" width="28" height="16" rx="4" fill="#09253A"/>
            <rect x="26" y="16" width="10" height="8" rx="2" fill="#05111d"/>
            <circle cx="10" cy="20" r="6" fill="#15A5B1" fillOpacity="0.9"/>
            <circle cx="10" cy="20" r="3" fill="#81D1D0"/>
            {/* flechas */}
            <path d="M188 145 Q240 210 272 285" stroke="rgba(21,165,177,0.4)" strokeWidth="1.8" fill="none" markerEnd="url(#arrF)"/>
            <path d="M358 295 Q395 210 432 160" stroke="rgba(129,209,208,0.4)" strokeWidth="1.8" fill="none" markerEnd="url(#arrF)"/>
            <path d="M522 145 Q558 210 588 278" stroke="rgba(21,165,177,0.4)" strokeWidth="1.8" fill="none" markerEnd="url(#arrF)"/>
            <path d="M678 295 Q710 210 742 155" stroke="rgba(129,209,208,0.4)" strokeWidth="1.8" fill="none" markerEnd="url(#arrF)"/>
            {/* 1 INVESTIGAR */}
            <circle cx="150" cy="115" r="88" fill="url(#fg1)" stroke="#15A5B1" strokeWidth="1.2"/>
            <circle cx="150" cy="78" r="14" fill="none" stroke="#15A5B1" strokeWidth="1.5"/>
            <path d="M143 78 Q150 72 157 78 Q150 84 143 78Z" fill="#15A5B1" fillOpacity="0.5"/>
            <line x1="150" y1="92" x2="150" y2="98" stroke="#15A5B1" strokeWidth="1.5"/>
            <text x="150" y="112" fontSize="11" fontWeight="800" textAnchor="middle" fill="#15A5B1" fontFamily="Outfit,sans-serif" letterSpacing="2">INVESTIGAR</text>
            <text x="150" y="128" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Albert Sans,sans-serif">Brief del cliente, producto</text>
            <text x="150" y="141" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Albert Sans,sans-serif">y mercado de digital signage.</text>
            <circle cx="195" cy="65" r="10" fill="#15A5B1"/>
            <text x="195" y="69" fontSize="10" fontWeight="700" textAnchor="middle" fill="#05111d" fontFamily="Outfit,sans-serif">1</text>
            {/* 2 EMPATIZAR */}
            <circle cx="315" cy="310" r="88" fill="url(#fg2)" stroke="#81D1D0" strokeWidth="1.2"/>
            <circle cx="308" cy="272" r="7" fill="none" stroke="#81D1D0" strokeWidth="1.5"/>
            <circle cx="322" cy="272" r="7" fill="none" stroke="#81D1D0" strokeWidth="1.5"/>
            <path d="M300 287 Q308 282 316 287" stroke="#81D1D0" strokeWidth="1.3" fill="none"/>
            <path d="M314 287 Q322 282 330 287" stroke="#81D1D0" strokeWidth="1.3" fill="none"/>
            <text x="315" y="302" fontSize="11" fontWeight="800" textAnchor="middle" fill="#81D1D0" fontFamily="Outfit,sans-serif" letterSpacing="2">EMPATIZAR</text>
            <text x="315" y="318" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Albert Sans,sans-serif">Comprador B2B, su proceso</text>
            <text x="315" y="331" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Albert Sans,sans-serif">de ventas y sus objeciones.</text>
            <circle cx="360" cy="262" r="10" fill="#81D1D0"/>
            <text x="360" y="266" fontSize="10" fontWeight="700" textAnchor="middle" fill="#09253A" fontFamily="Outfit,sans-serif">2</text>
            {/* 3 DEFINIR */}
            <circle cx="480" cy="115" r="88" fill="url(#fg3)" stroke="#15A5B1" strokeWidth="1.2"/>
            <circle cx="480" cy="78" r="14" fill="none" stroke="#15A5B1" strokeWidth="1.5"/>
            <circle cx="480" cy="78" r="7" fill="none" stroke="#15A5B1" strokeWidth="1.2"/>
            <circle cx="480" cy="78" r="2.5" fill="#15A5B1"/>
            <text x="480" y="108" fontSize="11" fontWeight="800" textAnchor="middle" fill="#15A5B1" fontFamily="Outfit,sans-serif" letterSpacing="2">DEFINIR</text>
            <text x="480" y="124" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Albert Sans,sans-serif">PDF no comunica el valor.</text>
            <text x="480" y="137" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Albert Sans,sans-serif">Landing interactiva es</text>
            <text x="480" y="150" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Albert Sans,sans-serif">la solución correcta.</text>
            <circle cx="525" cy="65" r="10" fill="#15A5B1"/>
            <text x="525" y="69" fontSize="10" fontWeight="700" textAnchor="middle" fill="#05111d" fontFamily="Outfit,sans-serif">3</text>
            {/* 4 IDEAR */}
            <circle cx="645" cy="310" r="88" fill="url(#fg4)" stroke="#81D1D0" strokeWidth="1.2"/>
            <circle cx="645" cy="272" r="10" fill="none" stroke="#81D1D0" strokeWidth="1.5"/>
            <path d="M641 282 L649 282" stroke="#81D1D0" strokeWidth="1.3"/>
            <path d="M642 286 L648 286" stroke="#81D1D0" strokeWidth="1.3"/>
            <line x1="645" y1="262" x2="645" y2="258" stroke="#81D1D0" strokeWidth="1.3"/>
            <line x1="635" y1="265" x2="632" y2="262" stroke="#81D1D0" strokeWidth="1.3"/>
            <line x1="655" y1="265" x2="658" y2="262" stroke="#81D1D0" strokeWidth="1.3"/>
            <text x="645" y="302" fontSize="11" fontWeight="800" textAnchor="middle" fill="#81D1D0" fontFamily="Outfit,sans-serif" letterSpacing="2">IDEAR</text>
            <text x="645" y="318" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Albert Sans,sans-serif">Arquitectura de la landing,</text>
            <text x="645" y="331" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Albert Sans,sans-serif">wireframe y sistema visual</text>
            <text x="645" y="344" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Albert Sans,sans-serif">alineado al Brand Guide.</text>
            <circle cx="690" cy="262" r="10" fill="#81D1D0"/>
            <text x="690" y="266" fontSize="10" fontWeight="700" textAnchor="middle" fill="#09253A" fontFamily="Outfit,sans-serif">4</text>
            {/* 5 PROTOTIPAR + TESTEAR */}
            <circle cx="810" cy="115" r="88" fill="url(#fg5)" stroke="#15A5B1" strokeWidth="1.2"/>
            <rect x="796" y="68" width="28" height="20" rx="3" fill="none" stroke="#15A5B1" strokeWidth="1.5"/>
            <line x1="810" y1="88" x2="810" y2="94" stroke="#15A5B1" strokeWidth="1.5"/>
            <line x1="804" y1="94" x2="816" y2="94" stroke="#15A5B1" strokeWidth="1.5"/>
            <text x="810" y="108" fontSize="10" fontWeight="800" textAnchor="middle" fill="#15A5B1" fontFamily="Outfit,sans-serif" letterSpacing="1">PROTOTIPAR</text>
            <text x="810" y="121" fontSize="8.5" fontWeight="700" textAnchor="middle" fill="#81D1D0" fontFamily="Outfit,sans-serif">+ ENTREGAR</text>
            <text x="810" y="135" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Albert Sans,sans-serif">Figma navegable + 3</text>
            <text x="810" y="148" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Albert Sans,sans-serif">videos demo entregados</text>
            <text x="810" y="161" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Albert Sans,sans-serif">al cliente.</text>
            <circle cx="855" cy="65" r="10" fill="#15A5B1"/>
            <text x="855" y="69" fontSize="10" fontWeight="700" textAnchor="middle" fill="#05111d" fontFamily="Outfit,sans-serif">5</text>
            <text x="450" y="440" fontSize="10" textAnchor="middle" fill="rgba(129,209,208,0.2)" fontFamily="monospace" letterSpacing="3">PROCESO DE DISEÑO — DESIGN THINKING</text>
          </svg>
        </div>

        {/* 7. Sistema visual */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={7} titulo="Sistema de Diseño — Brand Guide Aplicado" />
          <SectionText>
            El Brand Guide de Flagship es preciso y bien documentado. Mi trabajo fue aplicarlo fielmente a la landing — sin improvisar, sin salirme de la paleta, sin cambiar tipografías. En B2B, la consistencia de marca es una señal de profesionalismo que influye directamente en la confianza del cliente potencial.
          </SectionText>

          {/* Paleta */}
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: C.primary, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>// Paleta de colores oficial</p>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {[
              { hex: '#15A5B1', label: 'Primary Teal', role: 'CTAs · bordes · énfasis', tipo: 'Primary Palette' },
              { hex: '#09253A', label: 'Dark Navy', role: 'Fondos · headers · profundidad', tipo: 'Primary Palette' },
              { hex: '#81D1D0', label: 'Light Teal', role: 'Highlights · hover · acentos', tipo: 'Secondary Palette' },
              { hex: '#D9D9D1', label: 'Warm Gray', role: 'Texto secundario · fondos suaves', tipo: 'Secondary Palette' },
              { hex: '#F8F8F8', label: 'Off White', role: 'Fondos claros · espacios', tipo: 'Secondary Palette' },
            ].map(c => (
              <div key={c.hex} style={{ flex: '1 1 120px', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${C.primary}26` }}>
                <div style={{ height: '44px', backgroundColor: c.hex }} />
                <div style={{ padding: '8px 10px', backgroundColor: `${C.dark}cc` }}>
                  <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'white', margin: '0 0 2px 0' }}>{c.hex}</p>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: C.light, margin: '0 0 2px 0' }}>{c.label}</p>
                  <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', margin: '0 0 1px 0', fontFamily: 'monospace' }}>{c.tipo}</p>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>{c.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tipografía */}
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: C.primary, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>// Tipografía oficial</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { familia: 'Outfit', rol: 'Headers / Medium weight', peso: '500', muestra: 'Flagship CMS', desc: 'Geométrica y moderna. Usada en todos los títulos de sección, nombres de productos (SimpleCTRL, ShowCTRL, SelfCTRL) y CTA principal.' },
              { familia: 'Albert Sans', rol: 'Body text / Regular weight', peso: '400', muestra: "There's no one size fits all.", desc: 'Legible y profesional. Usada en párrafos descriptivos, bullets explicativos y texto de apoyo en toda la landing.' },
            ].map(t => (
              <div key={t.familia} style={{ backgroundColor: `${C.dark}cc`, border: `1px solid ${C.primary}1f`, borderRadius: '8px', padding: '16px' }}>
                <p style={{ fontFamily: 'monospace', fontSize: '10px', color: C.primary, margin: '0 0 8px 0', letterSpacing: '1px', textTransform: 'uppercase' }}>{t.rol}</p>
                <p style={{ fontFamily: `'${t.familia}', sans-serif`, fontSize: '22px', fontWeight: t.peso, color: 'white', margin: '0 0 4px 0', lineHeight: 1.2 }}>{t.muestra}</p>
                <p style={{ fontFamily: 'monospace', fontSize: '11px', color: C.light, margin: '0 0 8px 0' }}>{t.familia} · weight {t.peso}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.5 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Wireframe */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={8} titulo="Wireframe" />
          <SectionText>
            El wireframe definió la arquitectura de información de la landing: hero con propuesta de valor directa → 3 pasos de setup → selección de plataforma (las tres soluciones) → sección "Learn More" expandible → testimonial → formulario de contacto. Cada sección responde a una objeción o pregunta típica del comprador B2B de señalización digital.
          </SectionText>
          <img src={flagshipWireframe} alt="Wireframe Flagship Landing"
            style={{ display: 'block', width: '60%', margin: '0 auto', borderRadius: '10px', border: `1px solid ${C.primary}26`, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
          />
        </div>

        {/* 8. Diseño final */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={9} titulo="Diseño Final — Landing Page" />
          <SectionText>
            La landing comunica el valor de Flagship en segundos: hero con CTA directo ("Get Started" + "Try a Demo"), las tres soluciones presentadas como cards comparativas, y una sección expandible "Learn More" que profundiza en cuándo usar cada plataforma y el proceso de instalación — sin salir de la página.
          </SectionText>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 10px 0' }}>// Vista principal</p>
              <img src={flagshipPrototype} alt="Flagship Landing — diseño final cerrado"
                style={{ width: '100%', borderRadius: '10px', border: `1px solid ${C.primary}33`, boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }}
              />
            </div>
            <div>
              <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 10px 0' }}>// Con "Learn More" expandido</p>
              <img src={flagshipPrototypeFV} alt="Flagship Landing — sección Learn More expandida"
                style={{ width: '100%', borderRadius: '10px', border: `1px solid ${C.primary}33`, boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }}
              />
            </div>
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', margin: '12px 0 0 0', fontStyle: 'italic', textAlign: 'center', fontFamily: "'Albert Sans', sans-serif" }}>
            El botón "Learn More" expande una sección completa con comparativa de cuándo usar cada solución y el proceso de setup — sin redireccionar al usuario.
          </p>
        </div>

        <Separador titulo="Videos Demo" />

        {/* 9. Videos */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={10} titulo="Producción de Videos" />
          <SectionText>
            Produje cuatro videos — uno corporativo general y uno por cada solución — mostrando Flagship en uso real. Los videos transforman especificaciones técnicas en historias visuales: reemplazaron páginas de manuales técnicos y redujeron la fricción en el ciclo de ventas B2B.
          </SectionText>

          {/* Video corporativo — trabajo extra */}
          <div style={{ marginBottom: '28px', padding: '20px', backgroundColor: `${C.dark}cc`, border: `1px solid ${C.light}33`, borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ backgroundColor: C.light, color: C.dark, fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', fontFamily: 'monospace', letterSpacing: '1px' }}>📌 TRABAJO EXTRA</span>
              <p style={{ fontFamily: 'monospace', fontSize: '11px', color: C.light, margin: 0, opacity: 0.7 }}>No solicitado · Propuesto por Zoe</p>
            </div>
            <p style={{ fontFamily: 'monospace', fontSize: '11px', color: C.light, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 6px 0', opacity: 0.8 }}>// Video Corporativo — Header de la Landing</p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', margin: '0 0 12px 0', lineHeight: 1.6 }}>
              Video auto-reproducible en el header de la landing. Comunica la propuesta de valor de Flagship en los primeros segundos — sin que el visitante tenga que leer nada. Producido en Canva con gráficos animados, textos dinámicos y música brandeada.
            </p>
            <video src={flagshipHeroVideo} controls muted loop playsInline style={{
              width: '100%', borderRadius: '8px',
              border: `1px solid ${C.light}33`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)', display: 'block',
            }} />
          </div>

          <VideoSection
            src={flagshipSimpleCTRL}
            title="SimpleCTRL — Playlists en loop"
            desc="Flujo de creación y envío de una playlist al dispositivo. Setup simple, experiencia sin curva de aprendizaje."
          />

          <VideoSection
            src={flagshipShowCTRL}
            title="ShowCTRL — Contenido dinámico con Canvas"
            desc="Editor drag-and-drop Widget/Canvas para crear experiencias interactivas y touchless en pantallas y video walls."
          />

          <VideoSection
            src={flagshipSelfCTRL}
            title="SelfCTRL — Aplicaciones personalizadas"
            desc="Gestión de aplicaciones custom para señalización compleja. Control total sin reconstruir el programa."
          />
        </div>

        <Separador titulo="Resultados y Aprendizajes" />

        {/* 11. Comparativa brochure */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={11} titulo="Comparativa — Brochure Original vs. Mi Versión" />
          <div style={{ overflowX: 'auto', borderRadius: '8px', border: `1px solid ${C.primary}26` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Albert Sans', sans-serif" }}>
              <thead>
                <tr style={{ backgroundColor: `${C.dark}cc` }}>
                  {['Aspecto', 'Diseño Original', 'Mi Versión', 'Impacto'].map((h, i) => (
                    <th key={h} style={{ padding: '10px 14px', fontSize: '11px', fontFamily: 'monospace', color: i === 0 ? 'rgba(255,255,255,0.5)' : i === 1 ? '#f87171' : i === 2 ? C.primary : C.light, textAlign: 'left', borderBottom: `1px solid ${C.primary}26`, textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { aspecto: 'Legibilidad', original: 'Texto denso y uniforme', version: `Codificación por color (#15A5B1, #09253A)`, impacto: '+70% legibilidad*' },
                  { aspecto: 'Jerarquía', original: '0 jerarquía visual', version: 'Divisiones blancas + headers contrastantes', impacto: 'Guía el ojo en 2 seg' },
                  { aspecto: 'Interactividad', original: 'Documento estático', version: 'Botón "Learn More" interactivo', impacto: 'Menos saturación visual' },
                  { aspecto: 'Gráficos', original: 'Gráficos genéricos', version: 'Elementos decorativos alineados a marca', impacto: 'Refuerza identidad' },
                ].map((f, i) => (
                  <tr key={f.aspecto} style={{ backgroundColor: i % 2 === 0 ? `${C.primary}05` : 'transparent' }}>
                    <td style={{ padding: '10px 14px', fontSize: '13px', color: 'white', fontWeight: 600, borderBottom: `1px solid ${C.primary}14` }}>{f.aspecto}</td>
                    <td style={{ padding: '10px 14px', fontSize: '13px', color: 'rgba(248,113,113,0.8)', borderBottom: `1px solid ${C.primary}14` }}>{f.original}</td>
                    <td style={{ padding: '10px 14px', fontSize: '13px', color: `${C.primary}`, borderBottom: `1px solid ${C.primary}14` }}>{f.version}</td>
                    <td style={{ padding: '10px 14px', fontSize: '13px', color: C.light, fontWeight: 700, borderBottom: `1px solid ${C.primary}14` }}>{f.impacto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '10px' }}>* Métricas proyectadas basadas en principios de diseño y datos de industria.</p>
        </div>

        {/* 12. Resultados */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={12} titulo="Resultados del Proyecto" />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px' }}>
            {[
              { num: '3×', label: 'Oportunidades de engagement', desc: 'Landing + videos + PDF = ecosistema completo' },
              { num: '+4', label: 'Entregables producidos', desc: '1 landing + 3 videos + 1 PDF rediseñado' },
              { num: '1', label: 'Clic', desc: 'Equipos de ventas muestran beneficios complejos en 1 clic' },
              { num: '⭐', label: 'Cliente Upwork real', desc: 'Proyecto B2B con producto real en mercado' },
            ].map(s => (
              <div key={s.label} style={{ backgroundColor: `${C.primary}06`, border: `1px solid ${C.primary}1f`, borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: C.primary, margin: '0 0 4px 0', fontFamily: "'Outfit', sans-serif" }}>{s.num}</p>
                <p style={{ fontSize: '11px', fontWeight: 600, color: 'white', margin: '0 0 4px 0', fontFamily: "'Outfit', sans-serif", lineHeight: 1.3 }}>{s.label}</p>
                <p style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.4 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {[
              'Branding consistente: Identidad Flagship (#15A5B1, #09253A) aplicada para reforzar confianza en cada touchpoint.',
              'Multiplataforma: Landing + videos + PDF = 3 recursos independientes que se potencian entre sí.',
              'Clientes B2B experimentan una narrativa visual coherente desde el primer contacto.',
              'Equipos de marketing ganaron recursos efectivos para mostrar beneficios complejos de forma simple.',
              'La marca se posicionó como innovadora en su sector gracias a la coherencia visual del ecosistema.',
            ].map(item => (
              <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: C.primary, fontSize: '13px', flexShrink: 0 }}>✅</span>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>

          {/* Comentario del cliente */}
          <div style={{ padding: '20px 24px', backgroundColor: `${C.dark}cc`, border: `1px solid ${C.primary}33`, borderRadius: '10px', borderLeft: `3px solid ${C.light}` }}>
            <p style={{ fontFamily: "'Albert Sans', sans-serif", fontSize: '16px', color: 'white', margin: '0 0 10px 0', lineHeight: 1.7, fontStyle: 'italic' }}>
              "Fue genial trabajar con Zoe."
            </p>
            <p style={{ fontFamily: 'monospace', fontSize: '10px', color: C.light, margin: 0, letterSpacing: '1px' }}>— Cliente Upwork · Flagship CMS</p>
          </div>
        </div>

        {/* 13. Takeaways */}
        <div style={{ backgroundColor: `${C.primary}06`, border: `1px solid ${C.primary}1f`, borderRadius: '12px', padding: '28px', marginBottom: '48px' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: C.primary, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 20px 0' }}>// Aprendizajes Clave</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', margin: '0 0 8px 0', fontFamily: "'Outfit', sans-serif" }}>🧠 Pensamiento estratégico</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: 0 }}>
                Identifiqué la necesidad de videos y landing antes que el cliente. El PDF era el entregable — pero la landing era la solución real. Proponer esa diferencia requirió confianza y claridad.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', margin: '0 0 8px 0', fontFamily: "'Outfit', sans-serif" }}>🎬 Multimedia SaaS B2B</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: 0 }}>
                Dominio de creación de recursos B2B: videos + PDFs interactivos + prototipos navegables. Cada formato cumple una función específica en el ciclo de ventas.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', margin: '0 0 8px 0', fontFamily: "'Outfit', sans-serif" }}>⚡ Gestión ágil</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: 0 }}>
                Entregable complejo en plazo récord sin sacrificar calidad. Diseñar con brand guide establecido me enseñó a moverme con precisión dentro de restricciones de marca.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '14px 18px', backgroundColor: `${C.primary}0d`, border: `1px solid ${C.primary}26`, borderRadius: '8px' }}>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.7, fontFamily: "'Albert Sans', sans-serif" }}>
              <strong style={{ color: C.light }}>Impacto potencial:</strong> Aunque el proyecto no se implementó en producción, el diseño fue elogiado por su claridad y estética moderna. Esta landing page habría mejorado el compromiso del usuario al hacer la información más accesible y visualmente atractiva, potencialmente aumentando conversiones y satisfacción del cliente.
            </p>
          </div>
        </div>

        {/* CTA final */}
        <div style={{ textAlign: 'center' }}>
          <a href="https://www.figma.com/proto/hp9Ob4unyQHcS270jRPgwu/Prototype--UpworkClient?node-id=9-75&t=GIvTTUjSkPnW7fs0-1"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              backgroundColor: C.primary, color: '#05111d',
              fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em',
              padding: '14px 32px', textDecoration: 'none', borderRadius: '6px',
              transition: 'all 200ms ease', boxShadow: `0 4px 20px ${C.primary}4d`,
              fontFamily: "'Outfit', sans-serif",
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor=C.light; e.currentTarget.style.boxShadow=`0 6px 28px ${C.light}80` }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor=C.primary; e.currentTarget.style.boxShadow=`0 4px 20px ${C.primary}4d` }}>
            Ver Prototipo Interactivo en Figma →
          </a>
        </div>

      </div>
    </div>
  )
}

export default FlagshipCaseStudy
