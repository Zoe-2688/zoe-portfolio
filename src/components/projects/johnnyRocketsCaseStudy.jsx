import { useEffect, useRef, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import { FaWhatsapp } from 'react-icons/fa'
import { MdHome, MdKeyboardArrowUp } from 'react-icons/md'

// ─── Paleta JR Chile ──────────────────────────────────────────────
const RED    = '#9F2020'
const BLUE   = '#1E3A8A'
const CREAM  = '#FFFFE6'
const BG     = '#050d1a'
const RED2   = '#c43030'

// ─── Assets (paths reales del repo) ───────────────────────────────
import jrHeroImg      from '../../assets/projects/JRmockup.png'
import jrLandingNew   from '../../assets/projects/JRlandingRedesing.png'
import jrLandingOld   from '../../assets/projects/JRCapturalanding.png'
import jrFooterNew    from '../../assets/projects/JRredesignFooter.png'
import jrFooterOld    from '../../assets/projects/JRCapturaChilefooter.png'
import jrShare        from '../../assets/projects/JRredesignShare.png'
import jrFeatureNew   from '../../assets/projects/JRredesingFeature.png'
import jrMenu1        from '../../assets/projects/JRredesignMenu1.png'
import jrMenu2        from '../../assets/projects/JRredesignMenu2.png'
import jrMenu3        from '../../assets/projects/JRredesignMenu3.png'
import jrMenuOld      from '../../assets/projects/JRCapturaMenuchilePagina.png'
import jrLandingVideo from '../../assets/projects/JRlandingvideo.mp4'
import jrMenuVideo    from '../../assets/projects/JRmenuVideo.mp4'
import jrFeatureVideo from '../../assets/projects/JRfeatureVideo.mp4'

// ─── Circuit canvas (misma lógica que Boost, colores JR) ──────────
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
    if (nodes.length >= 2) circuits.push({ nodes, blue: Math.random() < 0.4 })
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
    function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    function rebuildCircuits() { circuitsRef.current = buildCircuits(canvas.width, canvas.height) }
    function drawCircuits() {
      ctx.save()
      for (const { nodes, blue } of circuitsRef.current) {
        const color = blue ? 'rgba(30,58,138,' : 'rgba(159,32,32,'
        ctx.lineWidth = 1; ctx.strokeStyle = `${color}0.07)`
        ctx.beginPath(); ctx.moveTo(nodes[0].x, nodes[0].y)
        for (let i = 1; i < nodes.length; i++) ctx.lineTo(nodes[i].x, nodes[i].y)
        ctx.stroke()
        for (const { x, y } of nodes) { ctx.fillStyle = `${color}0.18)`; ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill() }
      }
      ctx.restore()
    }
    function makeParticle() { const ci = Math.floor(Math.random() * circuitsRef.current.length); return { ci, si: 0, t: Math.random(), speed: 0.004 + Math.random() * 0.006 } }
    function drawParticle(p) {
      const circuit = circuitsRef.current[p.ci]
      if (!circuit || p.si >= circuit.nodes.length - 1) return
      const n1 = circuit.nodes[p.si]; const n2 = circuit.nodes[p.si + 1]
      const x = n1.x + (n2.x - n1.x) * p.t; const y = n1.y + (n2.y - n1.y) * p.t
      const color = circuit.blue ? BLUE : RED
      ctx.save()
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 5)
      glow.addColorStop(0, circuit.blue ? 'rgba(30,58,138,0.8)' : 'rgba(159,32,32,0.8)')
      glow.addColorStop(1, circuit.blue ? 'rgba(30,58,138,0)' : 'rgba(159,32,32,0)')
      ctx.shadowBlur = 6; ctx.shadowColor = color; ctx.fillStyle = glow
      ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
    }
    resize(); rebuildCircuits()
    const particles = Array.from({ length: 8 }, makeParticle)
    function drawFrame() { ctx.clearRect(0, 0, canvas.width, canvas.height); drawCircuits() }
    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); drawCircuits()
      for (const p of particles) {
        p.t += p.speed
        if (p.t >= 1) { p.si++; p.t = 0; const c = circuitsRef.current[p.ci]; if (!c || p.si >= c.nodes.length - 1) { p.ci = Math.floor(Math.random() * circuitsRef.current.length); p.si = 0 } }
        drawParticle(p)
      }
      animId = requestAnimationFrame(tick)
    }
    if (reduceMotion) { drawFrame() } else { tick() }
    const ro = new ResizeObserver(() => { resize(); rebuildCircuits(); if (reduceMotion) drawFrame() })
    ro.observe(canvas)
    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [reduceMotion])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

// ─── Métricas y tags ──────────────────────────────────────────────
const METRICAS = [
  { valor: '+4',    label: 'Secciones nuevas añadidas' },
  { valor: '100%',  label: 'Front-end desarrollado desde cero' },
  { valor: '🇨🇱',   label: 'Identidad cultural local integrada' },
  { valor: '3',     label: 'Videos de la página en acción' },
]
const TAGS = ['HTML', 'Tailwind CSS', 'JavaScript', 'Canva', 'UX/UI', 'Responsive']

// ─── Sub-componentes (misma estructura que Boost) ─────────────────
function Tag({ label }) {
  return (
    <span style={{ fontFamily: 'monospace', fontSize: '11px', color: RED, border: `1px solid ${RED}59`, backgroundColor: `${RED}0f`, padding: '3px 10px', letterSpacing: '0.5px' }}>
      {label}
    </span>
  )
}

function SectionTitle({ numero, titulo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
      <span style={{ fontFamily: 'monospace', fontSize: '11px', color: RED, opacity: 0.4 }}>
        {String(numero).padStart(2, '0')}
      </span>
      <h2 style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", fontSize: '15px', fontWeight: 600, color: 'white', letterSpacing: '0.05em', margin: 0 }}>
        {titulo}
      </h2>
      <div style={{ flex: 1, height: '1px', backgroundColor: `${RED}20` }} />
    </div>
  )
}

function SectionText({ children }) {
  return (
    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, marginBottom: '24px', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {children}
    </p>
  )
}

function MetricaCard({ valor, label }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? RED+'aa' : RED+'26'}`,
        backgroundColor: hovered ? RED+'14' : RED+'06',
        padding: '12px 14px', borderRadius: '4px',
        boxShadow: hovered ? `0 0 16px ${RED}33` : 'none',
        transition: 'all 200ms ease', cursor: 'default',
      }}>
      <p style={{ fontSize: '1.4rem', fontWeight: 700, color: RED, margin: '0 0 4px 0', lineHeight: 1 }}>{valor}</p>
      <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.4 }}>{label}</p>
    </div>
  )
}

function Separador({ titulo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '52px 0' }}>
      <div style={{ flex: 1, height: '1px', backgroundColor: `${RED}33` }} />
      <span style={{ fontSize: '16px', fontWeight: 700, color: RED, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>{titulo}</span>
      <div style={{ flex: 1, height: '1px', backgroundColor: `${RED}33` }} />
    </div>
  )
}

function BeforeAfter({ newImg, oldImg, newAlt, oldAlt }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ade80' }} />
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#4ade80', letterSpacing: '1px', textTransform: 'uppercase' }}>Mi Rediseño</span>
        </div>
        <img src={newImg} alt={newAlt} style={{ width: '100%', borderRadius: '8px', border: '2px solid rgba(74,222,128,0.3)', display: 'block' }} />
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: RED }} />
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: RED, letterSpacing: '1px', textTransform: 'uppercase' }}>Versión Original</span>
        </div>
        <img src={oldImg} alt={oldAlt} style={{ width: '100%', borderRadius: '8px', border: `2px solid ${RED}44`, display: 'block' }} />
      </div>
    </div>
  )
}

function VideoSection({ src, title, desc }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <p style={{ fontFamily: 'monospace', fontSize: '11px', color: RED, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 6px 0', opacity: 0.8 }}>// {title}</p>
      {desc && <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', margin: '0 0 12px 0', lineHeight: 1.6 }}>{desc}</p>}
      <video src={src} controls muted loop playsInline
        style={{ width: '100%', borderRadius: '12px', border: `1px solid ${RED}33`, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', display: 'block' }} />
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────
function JohnnyRocketsCaseStudy({ onClose }) {
  const { reduceMotion } = usePortfolio()
  const containerRef = useRef(null)
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const handleScroll = () => setShowScroll(container.scrollTop > 300)
    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  const WHATSAPP = 'https://wa.me/56989774690'

  return (
    <div ref={containerRef} className="jr-case-study"
      style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: BG, overflowY: 'auto', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* Circuitos de fondo */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <CircuitCanvas reduceMotion={reduceMotion} />
      </div>

      {/* Botones flotantes */}
      {showScroll && (
        <div style={{ position: 'fixed', bottom: '32px', right: '24px', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <button onClick={scrollToTop} title="Ir al inicio"
            style={{ width: '44px', height: '44px', borderRadius: '50%', border: `1px solid ${RED}66`, backgroundColor: 'rgba(5,13,26,0.9)', backdropFilter: 'blur(8px)', color: RED, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = RED+'26'; e.currentTarget.style.boxShadow = `0 0 16px ${RED}4d` }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(5,13,26,0.9)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)' }}>
            <MdHome size={22} style={{ display: 'none' }} />
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 15l-6-6-6 6"/></svg>
          </button>
          <button onClick={onClose} title="Volver a proyectos"
            style={{ width: '44px', height: '44px', borderRadius: '50%', border: `1px solid rgba(232,160,144,0.4)`, backgroundColor: 'rgba(5,13,26,0.9)', backdropFilter: 'blur(8px)', color: '#e8a090', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(232,160,144,0.15)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(232,160,144,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(5,13,26,0.9)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)' }}>
            <MdHome size={22} />
          </button>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" title="WhatsApp"
            style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(37,211,102,0.4)', backgroundColor: 'rgba(5,13,26,0.9)', backdropFilter: 'blur(8px)', color: '#25d366', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(37,211,102,0.15)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(37,211,102,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(5,13,26,0.9)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)' }}>
            <FaWhatsapp size={22} />
          </a>
        </div>
      )}

      {/* Header sticky */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: `${BG}f5`, backdropFilter: 'blur(12px)', borderBottom: `1px solid ${RED}1a`, padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 200ms', fontFamily: 'monospace' }}
            onMouseEnter={e => e.currentTarget.style.color = RED}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>
            ← Volver a proyectos
          </button>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: RED, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Johnny Rockets Chile</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="https://johnnyrocketschile.vercel.app/" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '12px', color: '#e8a090', border: '1px solid rgba(232,160,144,0.4)', padding: '7px 14px', textDecoration: 'none', fontFamily: 'monospace', transition: 'all 200ms' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(232,160,144,0.1)'; e.currentTarget.style.borderColor = '#e8a090' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(232,160,144,0.4)' }}>
            Ver sitio en Vercel →
          </a>
          <a href="https://github.com/Zoe-2688/My-ecommerce" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '12px', color: `${RED}`, border: `1px solid ${RED}66`, padding: '7px 14px', textDecoration: 'none', fontFamily: 'monospace', transition: 'all 200ms' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = RED+'14'; e.currentTarget.style.borderColor = RED }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = RED+'66' }}>
            GitHub →
          </a>
        </div>
      </div>

      {/* ══ HERO ══ */}
      <div style={{ position: 'relative', borderBottom: `1px solid ${RED}14`, zIndex: 1 }}>
        {/* Circuitos dentro del hero */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <CircuitCanvas reduceMotion={reduceMotion} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '64px 32px', display: 'grid', gridTemplateColumns: '0.85fr 1.5fr', gap: '48px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '11px', color: RED, letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.6, margin: 0 }}>
              Caso de Estudio · UX/UI · Front-End · Chile 🇨🇱
            </p>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: RED, margin: 0, lineHeight: 1.1 }}>
              JOHNNY ROCKETS
              <br />
              <span style={{ color: 'white', fontSize: '0.6em', fontWeight: 400, letterSpacing: '0.02em' }}>Chile — Landing Page Redesign</span>
            </h1>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.55, margin: 0 }}>
              Rediseño completo + desarrollo front-end de la landing nacional
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic', lineHeight: 1.7, margin: 0, borderLeft: `2px solid ${RED}4d`, paddingLeft: '12px' }}>
              "De una página visualmente desactualizada a una experiencia moderna con identidad americana y corazón chileno — desarrollada con HTML, Tailwind CSS y JavaScript."
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {TAGS.map(tag => <Tag key={tag} label={tag} />)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {METRICAS.map((m) => <MetricaCard key={m.label} valor={m.valor} label={m.label} />)}
            </div>
          </div>
          <div style={{ position: 'relative', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            <style>{`
              @keyframes jrFloat {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                33% { transform: translateY(-10px) rotate(0.5deg); }
                66% { transform: translateY(-5px) rotate(-0.4deg); }
              }
            `}</style>
            <div style={{
              position: 'absolute', inset: '-20%',
              background: `radial-gradient(ellipse at center, ${RED}30 0%, ${RED}12 40%, transparent 70%)`,
              pointerEvents: 'none', zIndex: 0,
              filter: 'blur(24px)',
            }} />
            <img src={jrHeroImg} alt="Johnny Rockets Chile Redesign"
              style={{
                position: 'relative', zIndex: 1,
                width: '100%',
                height: 'auto',
                display: 'block',
                maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 40%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 40%, transparent 100%)',
                animation: reduceMotion ? 'none' : 'jrFloat 5s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>

      {/* ══ CONTENIDO ══ */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '56px 32px 80px', position: 'relative', zIndex: 1 }}>

        <Separador titulo="Introducción al Proyecto" />

        {/* 1. Sobre el proyecto */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={1} titulo="Sobre el Proyecto" />
          <SectionText>
            Este proyecto es el rediseño completo de la landing page de Johnny Rockets Chile. La versión original era funcional pero visualmente desactualizada, poco intuitiva y sin conexión con el contexto cultural local. Mi objetivo fue transformar la experiencia en una página moderna, clara y atractiva que equilibre la identidad americana de la marca con elementos culturales chilenos — mejorando la usabilidad, la organización del menú y la conversión del usuario.
          </SectionText>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '8px' }}>
            {[
              { icon: '🎨', titulo: 'UX/UI Design', desc: 'Rediseño completo de jerarquía visual, navegación, menú y secciones nuevas.' },
              { icon: '💻', titulo: 'Front-End Dev', desc: 'HTML + Tailwind CSS + JavaScript. Diseño modular y responsive desde cero.' },
              { icon: '🇨🇱', titulo: 'Identidad Local', desc: 'Fiestas Patrias, cueca animada, confetti y skyline de Santiago en el footer.' },
            ].map(item => (
              <div key={item.titulo} style={{ backgroundColor: `${RED}08`, border: `1px solid ${RED}26`, borderRadius: '8px', padding: '16px' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>{item.icon}</span>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', margin: '0 0 4px 0' }}>{item.titulo}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Problema */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={2} titulo="El Problema — Análisis Inicial" />
          <SectionText>
            Antes de abrir el editor, analicé la página original punto por punto. Los problemas eran claros y afectaban tanto la experiencia visual como la funcional — un carrusel roto, navegación de bajo contraste, y cero conexión con el usuario chileno.
          </SectionText>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
            {[
              { cat: 'Visual', color: RED, items: ['Baja jerarquía visual — texto uniforme sin énfasis', 'Navegación de bajo contraste, difícil de leer', 'Botón "Ordenar" imperceptible', 'Hero a pantalla completa sin jerarquía clara'] },
              { cat: 'Funcional', color: RED, items: ['Carrusel de menú roto e inutilizable', 'Sin imágenes de platos — imposible elegir', 'Sin sección de promociones ni eventos', 'Sin identidad local ni elementos culturales'] },
            ].map(g => (
              <div key={g.cat} style={{ backgroundColor: `${RED}06`, border: `1px solid ${RED}1f`, borderRadius: '8px', padding: '16px' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: g.color, margin: '0 0 10px 0', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'monospace' }}>{g.cat}</p>
                {g.items.map(item => (
                  <div key={item} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ color: RED, flexShrink: 0, fontSize: '12px' }}>✕</span>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Mi Rol */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={3} titulo="Mi Rol y Enfoque" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              { titulo: 'Análisis y Diagnóstico', icon: '🔍', items: ['Analicé la página original identificando fallos de jerarquía, contraste y usabilidad', 'Identifiqué oportunidades de conexión cultural con el usuario chileno', 'Definí el alcance del rediseño y las secciones nuevas a crear'] },
              { titulo: 'UX/UI Design', icon: '🎨', items: ['Header fijo con CTA visible de alto contraste', 'Menú reorganizado con imágenes, descripciones y botones "Pedir Online"', 'Secciones nuevas: Fiestas Patrias + "Comparte con Nosotros"'] },
              { titulo: 'Front-End Development', icon: '💻', items: ['Construcción completa en HTML + Tailwind CSS + JavaScript', 'Diseño modular y responsive adaptado para mobile', 'Animaciones: cueca, confetti, bailarines en el hero, skyline Santiago'] },
              { titulo: 'Visuales y Animaciones', icon: '🎬', items: ['Producción de elementos en Canva: cueca animada, confetti, visuales Fiestas Patrias', 'Imagen en el hero que aparece desde la derecha de la pantalla', '3 videos de la página en acción producidos para el portfolio'] },
            ].map(r => (
              <div key={r.titulo} style={{ backgroundColor: `rgba(0,212,255,0.03)`, border: '1px solid rgba(0,212,255,0.12)', borderRadius: '8px', padding: '16px' }}>
                <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', margin: '0 0 10px 0' }}>{r.icon} {r.titulo}</p>
                {r.items.map(item => (
                  <div key={item} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ color: RED, flexShrink: 0, fontSize: '12px' }}>✓</span>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <Separador titulo="Proceso de Diseño" />

        {/* 4. Design Thinking */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={4} titulo="Mi Proceso de Diseño" />
          <SectionText>Apliqué Design Thinking en 5 fases — desde el análisis de la página original y el usuario chileno hasta el desarrollo completo y las iteraciones basadas en feedback.</SectionText>
          <svg width="100%" viewBox="0 0 900 460" role="img" aria-label="Proceso de Diseño JR">
            <defs>
              <marker id="arrJR" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="rgba(255,255,255,0.35)"/>
              </marker>
              <linearGradient id="jrg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#9F2020" stopOpacity="0.25"/><stop offset="100%" stopColor="#c43030" stopOpacity="0.1"/></linearGradient>
              <linearGradient id="jrg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.28"/><stop offset="100%" stopColor="#3b5bdb" stopOpacity="0.1"/></linearGradient>
              <linearGradient id="jrg3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#9F2020" stopOpacity="0.2"/><stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.1"/></linearGradient>
              <linearGradient id="jrg4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.22"/><stop offset="100%" stopColor="#9F2020" stopOpacity="0.1"/></linearGradient>
              <linearGradient id="jrg5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#9F2020" stopOpacity="0.25"/><stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.12"/></linearGradient>
              <radialGradient id="jrspot" cx="0%" cy="10%" r="100%" fx="0%" fy="10%">
                <stop offset="0%" stopColor="rgba(255,245,200,0.22)"/><stop offset="50%" stopColor="rgba(255,245,200,0.08)"/><stop offset="100%" stopColor="rgba(255,245,200,0)"/>
              </radialGradient>
            </defs>
            <polygon points="0,20 900,100 900,300 0,20" fill="rgba(255,245,180,0.05)"/>
            <polygon points="0,20 900,150 900,250 0,20" fill="rgba(255,245,180,0.04)"/>
            <ellipse cx="100" cy="200" rx="800" ry="200" fill="url(#jrspot)"/>
            <rect x="2" y="12" width="28" height="16" rx="4" fill="#2a2a2a"/>
            <rect x="26" y="16" width="10" height="8" rx="2" fill="#1a1a1a"/>
            <circle cx="10" cy="20" r="6" fill="#ffe066" fillOpacity="0.9"/>
            <circle cx="10" cy="20" r="3" fill="white"/>
            <path d="M188 145 Q240 210 272 285" stroke={`${RED}66`} strokeWidth="1.8" fill="none" markerEnd="url(#arrJR)"/>
            <path d="M358 295 Q395 210 432 160" stroke={`${BLUE}66`} strokeWidth="1.8" fill="none" markerEnd="url(#arrJR)"/>
            <path d="M522 145 Q558 210 588 278" stroke={`${RED}66`} strokeWidth="1.8" fill="none" markerEnd="url(#arrJR)"/>
            <path d="M678 295 Q710 210 742 155" stroke={`${BLUE}66`} strokeWidth="1.8" fill="none" markerEnd="url(#arrJR)"/>
            {/* 1 INVESTIGAR */}
            <circle cx="150" cy="115" r="88" fill="url(#jrg1)" stroke={RED} strokeWidth="1.2"/>
            <circle cx="150" cy="78" r="14" fill="none" stroke={RED} strokeWidth="1.5"/>
            <path d="M143 78 Q150 72 157 78 Q150 84 143 78Z" fill={RED} fillOpacity="0.4"/>
            <line x1="150" y1="92" x2="150" y2="98" stroke={RED} strokeWidth="1.5"/>
            <text x="150" y="112" fontSize="11" fontWeight="800" textAnchor="middle" fill={RED} fontFamily="Inter,sans-serif" letterSpacing="2">INVESTIGAR</text>
            <text x="150" y="128" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">Análisis de la página</text>
            <text x="150" y="141" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">original JR Chile y</text>
            <text x="150" y="154" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">diagnóstico de fallos.</text>
            <circle cx="195" cy="65" r="10" fill={RED}/>
            <text x="195" y="69" fontSize="10" fontWeight="700" textAnchor="middle" fill="white" fontFamily="Inter,sans-serif">1</text>
            {/* 2 EMPATIZAR */}
            <circle cx="315" cy="310" r="88" fill="url(#jrg2)" stroke={BLUE} strokeWidth="1.2"/>
            <circle cx="308" cy="272" r="7" fill="none" stroke={BLUE} strokeWidth="1.5"/>
            <circle cx="322" cy="272" r="7" fill="none" stroke={BLUE} strokeWidth="1.5"/>
            <path d="M300 287 Q308 282 316 287" stroke={BLUE} strokeWidth="1.3" fill="none"/>
            <path d="M314 287 Q322 282 330 287" stroke={BLUE} strokeWidth="1.3" fill="none"/>
            <text x="315" y="302" fontSize="11" fontWeight="800" textAnchor="middle" fill="#7b9cff" fontFamily="Inter,sans-serif" letterSpacing="2">EMPATIZAR</text>
            <text x="315" y="318" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">Usuario chileno:</text>
            <text x="315" y="331" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">identidad, cultura</text>
            <text x="315" y="344" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">y fidelización local.</text>
            <circle cx="360" cy="262" r="10" fill={BLUE}/>
            <text x="360" y="266" fontSize="10" fontWeight="700" textAnchor="middle" fill="white" fontFamily="Inter,sans-serif">2</text>
            {/* 3 DEFINIR */}
            <circle cx="480" cy="115" r="88" fill="url(#jrg3)" stroke={RED} strokeWidth="1.2"/>
            <circle cx="480" cy="78" r="14" fill="none" stroke={RED} strokeWidth="1.5"/>
            <circle cx="480" cy="78" r="7" fill="none" stroke={RED} strokeWidth="1.2"/>
            <circle cx="480" cy="78" r="2.5" fill={RED}/>
            <text x="480" y="108" fontSize="11" fontWeight="800" textAnchor="middle" fill={RED} fontFamily="Inter,sans-serif" letterSpacing="2">DEFINIR</text>
            <text x="480" y="124" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">Rediseño visual +</text>
            <text x="480" y="137" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">identidad local +</text>
            <text x="480" y="150" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">desarrollo front-end.</text>
            <circle cx="525" cy="65" r="10" fill={RED}/>
            <text x="525" y="69" fontSize="10" fontWeight="700" textAnchor="middle" fill="white" fontFamily="Inter,sans-serif">3</text>
            {/* 4 IDEAR */}
            <circle cx="645" cy="310" r="88" fill="url(#jrg4)" stroke={BLUE} strokeWidth="1.2"/>
            <circle cx="645" cy="272" r="10" fill="none" stroke={BLUE} strokeWidth="1.5"/>
            <path d="M641 282 L649 282" stroke={BLUE} strokeWidth="1.3"/>
            <path d="M642 286 L648 286" stroke={BLUE} strokeWidth="1.3"/>
            <line x1="645" y1="262" x2="645" y2="258" stroke={BLUE} strokeWidth="1.3"/>
            <line x1="635" y1="265" x2="632" y2="262" stroke={BLUE} strokeWidth="1.3"/>
            <line x1="655" y1="265" x2="658" y2="262" stroke={BLUE} strokeWidth="1.3"/>
            <text x="645" y="302" fontSize="11" fontWeight="800" textAnchor="middle" fill="#7b9cff" fontFamily="Inter,sans-serif" letterSpacing="2">IDEAR</text>
            <text x="645" y="318" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">Header fijo, menú con</text>
            <text x="645" y="331" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">imágenes, Fiestas Patrias,</text>
            <text x="645" y="344" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">sección "Comparte".</text>
            <circle cx="690" cy="262" r="10" fill={BLUE}/>
            <text x="690" y="266" fontSize="10" fontWeight="700" textAnchor="middle" fill="white" fontFamily="Inter,sans-serif">4</text>
            {/* 5 CONSTRUIR + ITERAR */}
            <circle cx="810" cy="115" r="88" fill="url(#jrg5)" stroke={RED} strokeWidth="1.2"/>
            <rect x="796" y="68" width="28" height="20" rx="3" fill="none" stroke={RED} strokeWidth="1.5"/>
            <line x1="810" y1="88" x2="810" y2="94" stroke={RED} strokeWidth="1.5"/>
            <line x1="804" y1="94" x2="816" y2="94" stroke={RED} strokeWidth="1.5"/>
            <text x="810" y="108" fontSize="10" fontWeight="800" textAnchor="middle" fill={RED} fontFamily="Inter,sans-serif" letterSpacing="1">CONSTRUIR</text>
            <text x="810" y="121" fontSize="8.5" fontWeight="700" textAnchor="middle" fill="#7b9cff" fontFamily="Inter,sans-serif">+ ITERAR</text>
            <text x="810" y="135" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">Desarrollo Tailwind.</text>
            <text x="810" y="148" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">Ajustes continuos</text>
            <text x="810" y="161" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">basados en feedback.</text>
            <circle cx="855" cy="65" r="10" fill={RED}/>
            <text x="855" y="69" fontSize="10" fontWeight="700" textAnchor="middle" fill="white" fontFamily="Inter,sans-serif">5</text>
            <text x="450" y="440" fontSize="10" textAnchor="middle" fill={`${RED}33`} fontFamily="monospace" letterSpacing="3">PROCESO DE DISEÑO — DESIGN THINKING</text>
          </svg>
        </div>

        {/* 5. Guía de Estilo Visual */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={5} titulo="Guía de Estilo Visual" />
          <SectionText>
            Usé contraste equilibrado entre tonos cálidos y fríos — el rojo transmite calidez y conexión emocional con la marca, el azul aporta profesionalismo y confianza. El crema como fondo resalta el contenido sin abrumar al usuario.
          </SectionText>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: RED, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>// Paleta de colores</p>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {[
              { hex: '#9F2020', label: 'Rojo JR', role: 'CTAs · énfasis · marca', desc: 'Calidez y conexión emocional' },
              { hex: '#1E3A8A', label: 'Azul Profundo', role: 'Contraste · secciones clave', desc: 'Profesionalismo y confianza' },
              { hex: '#FFFFE6', label: 'Crema', role: 'Fondo · espacios', desc: 'Resalta contenido, no abruma' },
            ].map(c => (
              <div key={c.hex} style={{ flex: '1 1 150px', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${RED}26` }}>
                <div style={{ height: '52px', backgroundColor: c.hex }} />
                <div style={{ padding: '10px 12px', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'white', margin: '0 0 2px 0' }}>{c.hex}</p>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: '#ffb3b3', margin: '0 0 2px 0' }}>{c.label}</p>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', margin: '0 0 1px 0' }}>{c.role}</p>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', margin: 0, fontStyle: 'italic' }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: RED, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>// Tipografía</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { familia: 'Roboto Flex', rol: 'Botones y encabezados', peso: '600–700', muestra: 'Johnny Rockets Chile', desc: 'Claridad y legibilidad. Usada en navegación, CTAs y títulos de sección.' },
              { familia: 'Pacifico', rol: 'Tono informal y festivo', peso: '400', muestra: '¡Pide Online!', desc: 'Refleja el ambiente relajado de JR. Usada en acentos y llamadas especiales.' },
            ].map(t => (
              <div key={t.familia} style={{ backgroundColor: 'rgba(0,0,0,0.25)', border: `1px solid ${RED}1f`, borderRadius: '8px', padding: '16px' }}>
                <p style={{ fontFamily: 'monospace', fontSize: '10px', color: RED, margin: '0 0 8px 0', letterSpacing: '1px', textTransform: 'uppercase' }}>{t.rol}</p>
                <p style={{ fontFamily: `'${t.familia}', cursive, sans-serif`, fontSize: '22px', fontWeight: t.peso, color: 'white', margin: '0 0 4px 0', lineHeight: 1.2 }}>{t.muestra}</p>
                <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#ffb3b3', margin: '0 0 8px 0' }}>{t.familia} · weight {t.peso}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.5 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Separador titulo="Comparativa — Original vs. Rediseño" />

        {/* 6. Landing / Hero */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={6} titulo="Hero & Header — Antes y Después" />
          <SectionText>
            En el rediseño, el hero muestra una imagen de productos JR (hamburguesa, papas, milkshake) que aparece deslizándose desde la derecha de la pantalla, acompañada de texto a su izquierda y un botón notorio de "Pedir Online" abajo. Dos bailarines de cueca entran y salen por los extremos del hero celebrando Fiestas Patrias — un elemento animado único que no existía en la versión original.
          </SectionText>
          <BeforeAfter newImg={jrLandingNew} oldImg={jrLandingOld} newAlt="Landing rediseñada" oldAlt="Landing original" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
            <div>
              {['Header fijo con fondo uniforme y sombra de separación', 'Navegación de alto contraste con botón "Ordenar" prominente', 'Imagen hero que entra desde la derecha con texto claro', 'Bailarines de cueca animados para Fiestas Patrias'].map(item => (
                <div key={item} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ color: '#4ade80', fontSize: '12px', flexShrink: 0 }}>✓</span>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
            <div>
              {['Navegación de bajo contraste, difícil de leer', 'Botón "Ordenar" sin énfasis visual', 'Hero a pantalla completa sin jerarquía de contenido', 'Sin visuales culturales ni elementos de identidad local'].map(item => (
                <div key={item} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ color: RED, fontSize: '12px', flexShrink: 0 }}>✕</span>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7. Menú */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={7} titulo="Menú Interactivo — Antes y Después" />
          <SectionText>
            El menú original era un carrusel roto sin imágenes ni descripciones. El rediseño entrega un carrusel funcional organizado por categorías (hamburguesas, starters, hotdog, phillys, ensaladas, shakes, postres, bebidas) con imágenes de platos, descripciones, y botones directos de "Pedir Online". Los tamaños de los cards se adaptan al contenido de cada plato.
          </SectionText>
          <BeforeAfter newImg={jrMenu1} oldImg={jrMenuOld} newAlt="Menú rediseñado" oldAlt="Menú original" />
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', textTransform: 'uppercase', margin: '16px 0 10px 0' }}>// Categorías del menú rediseñado</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {[
              { img: jrMenu1, label: 'Hamburguesas · Starters · Hotdog · Phillys' },
              { img: jrMenu2, label: 'Vista detalle con imágenes y descripciones' },
              { img: jrMenu3, label: 'Ensaladas · Shakes · Postres · Bebidas & Tragos' },
            ].map((m, i) => (
              <div key={i}>
                <img src={m.img} alt={m.label} style={{ width: '100%', borderRadius: '8px', border: `1px solid ${RED}26`, display: 'block', marginBottom: '6px' }} />
                <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.4 }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Fiestas Patrias + Share */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={8} titulo="Fiestas Patrias & Comparte con Nosotros" />
          <SectionText>
            Dos secciones nuevas que no existían en la versión original. La sección de Fiestas Patrias muestra texto sobre Chile y la relación de la marca con su festividad patria, con un gráfico animado producido en Canva y un link a promociones. La sección "Comparte con Nosotros" muestra imágenes de eventos y celebraciones en JR Chile.
          </SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 10px 0' }}>// 🇨🇱 Fiestas Patrias — "Chile! Te celebramos"</p>
              <img src={jrFeatureNew} alt="Sección Fiestas Patrias" style={{ width: '100%', borderRadius: '8px', border: '2px solid rgba(74,222,128,0.3)', display: 'block' }} />
            </div>
            <div>
              <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 10px 0' }}>// 🎉 Comparte con Nosotros</p>
              <img src={jrShare} alt="Sección Comparte" style={{ width: '100%', borderRadius: '8px', border: '2px solid rgba(74,222,128,0.3)', display: 'block' }} />
            </div>
          </div>
          <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { titulo: '🇨🇱 Fiestas Patrias', items: ['Texto sobre Chile y cómo JR celebra la independencia', 'Gráfico animado con banderas, cueca y símbolos patrios (Canva)', 'Link directo a promociones y ofertas del mes', 'Imagen interactiva que refuerza la identidad local'] },
              { titulo: '🎉 Comparte con Nosotros', items: ['Imágenes de eventos y celebraciones en JR Chile', 'Sección de "Celebra tus fiestas con nosotros"', 'Visualmente impactante para engagement del usuario', 'Sección completamente nueva — inexistente en el original'] },
            ].map(s => (
              <div key={s.titulo} style={{ backgroundColor: `${RED}06`, border: `1px solid ${RED}1f`, borderRadius: '8px', padding: '14px' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', margin: '0 0 10px 0' }}>{s.titulo}</p>
                {s.items.map(item => (
                  <div key={item} style={{ display: 'flex', gap: '8px', marginBottom: '5px' }}>
                    <span style={{ color: '#4ade80', fontSize: '11px', flexShrink: 0 }}>✓</span>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 9. Footer */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={9} titulo="Footer — Antes y Después" />
          <SectionText>
            El footer original era básico, con pocas opciones y sin atractivo visual. El rediseño lo expandió con mejor organización (Menú · Sucursales · Franquicia · Nuestra Empresa · Comida · Contacto), más opciones de accesibilidad y privacidad, y el skyline ilustrado de Santiago como imagen de fondo — reforzando la identidad local de la franquicia chilena.
          </SectionText>
          <BeforeAfter newImg={jrFooterNew} oldImg={jrFooterOld} newAlt="Footer rediseñado" oldAlt="Footer original" />
        </div>

        <Separador titulo="La Página en Acción" />

        {/* 10. Videos */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={10} titulo="Videos — Recorrido por la Landing" />
          <SectionText>
            Tres videos muestran el resultado final en movimiento: el hero con sus animaciones, el menú interactivo navegando por categorías, y las secciones de Fiestas Patrias y Comparte en acción.
          </SectionText>
          <VideoSection
            src={jrLandingVideo}
            title="Landing completa — Hero, bailarines y Fiestas Patrias"
            desc="Recorrido por el hero con la imagen deslizante, los bailarines de cueca animados y la sección de Fiestas Patrias con su gráfico en Canva."
          />
          <VideoSection
            src={jrMenuVideo}
            title="Menú interactivo — Carrusel, imágenes y Pedir Online"
            desc="Navegación por el menú reorganizado: carrusel funcional por categorías, imágenes de platos, descripciones y botones de pedido directo."
          />
          <VideoSection
            src={jrFeatureVideo}
            title="Comparte con Nosotros & Footer con skyline de Santiago"
            desc="Las secciones de eventos y promociones, y el footer con el fondo ilustrado del skyline de Santiago de Chile."
          />
        </div>

        <Separador titulo="Resultados y Aprendizajes" />

        {/* 11. Resultados */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={11} titulo="Resultados y Valor Aportado" />
          <SectionText>
            El rediseño mejora significativamente la experiencia de usuario con una interfaz más clara y accesible. El alto contraste y la estructura intuitiva destacan especialmente en el menú interactivo. La integración de visuales culturales de Fiestas Patrias fortalece la conexión emocional con usuarios locales y establece una base escalable para futuras actualizaciones.
          </SectionText>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px' }}>
            {[
              { num: '+4', label: 'Secciones nuevas', desc: 'Menú con imágenes, Fiestas Patrias, Comparte, footer expandido' },
              { num: '100%', label: 'Desarrollado desde cero', desc: 'HTML + Tailwind CSS + JavaScript + animaciones Canva' },
              { num: '🔴', label: 'Identidad JR aplicada', desc: '#9F2020 + #1E3A8A + Roboto Flex + Pacifico' },
              { num: '🇨🇱', label: 'Cultura local', desc: 'Cueca, confetti, skyline Santiago, bailarines animados' },
            ].map(s => (
              <div key={s.label} style={{ backgroundColor: `${RED}06`, border: `1px solid ${RED}1f`, borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: RED, margin: '0 0 4px 0' }}>{s.num}</p>
                <p style={{ fontSize: '11px', fontWeight: 600, color: 'white', margin: '0 0 4px 0', lineHeight: 1.3 }}>{s.label}</p>
                <p style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.4 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'Menú interactivo funcional con carrusel por categorías, imágenes reales de platos y botones de pedido directo — reemplazó el carrusel roto original.',
              'Identidad cultural integrada: los bailarines de cueca, el gráfico de Fiestas Patrias y el skyline de Santiago crean una conexión emocional genuina con el usuario chileno.',
              'Diseño modular y responsive que se adapta a mobile y establece una base escalable para futuras actualizaciones estacionales.',
              'Alto contraste visual y jerarquía clara que mejoran la accesibilidad — especialmente en el menú y en los CTAs principales.',
            ].map(item => (
              <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: RED, fontSize: '13px', flexShrink: 0 }}>✅</span>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 12. Herramientas */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={12} titulo="Herramientas Utilizadas" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              { icon: '🎨', tool: 'Tailwind CSS', desc: 'Desarrollo front-end rápido, limpio y escalable. Permitió mantener consistencia visual en todo el sitio sin CSS custom extenso.' },
              { icon: '💻', tool: 'HTML + JavaScript', desc: 'Estructura del sitio y funcionalidades core: carrusel del menú, animaciones de scroll y comportamiento del header fijo.' },
              { icon: '🖥️', tool: 'Visual Studio Code', desc: 'Editor principal para gestionar el desarrollo y optimizar el workflow. Extensiones para preview en tiempo real y Tailwind IntelliSense.' },
              { icon: '🎬', tool: 'Canva', desc: 'Creación de animaciones y visuales: gráfico de Fiestas Patrias, confetti, cueca y elementos decorativos de la sección Share.' },
            ].map(item => (
              <div key={item.tool} style={{ backgroundColor: 'rgba(0,0,0,0.25)', border: `1px solid ${RED}1a`, borderRadius: '8px', padding: '16px', display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: RED, margin: '0 0 4px 0' }}>{item.tool}</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 13. Reflexión final */}
        <div style={{ backgroundColor: `${RED}06`, border: `1px solid ${RED}1f`, borderRadius: '12px', padding: '28px', marginBottom: '48px' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: RED, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 20px 0' }}>// Aprendizajes Clave</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', margin: '0 0 8px 0' }}>📍 Adaptación Cultural</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, margin: 0 }}>
                Equilibrar la identidad global de Johnny Rockets con elementos locales fue clave para crear una conexión auténtica. Los bailarines de cueca, el skyline de Santiago y el gráfico de Fiestas Patrias no son decoración — son la diferencia entre una página genérica y una que siente como propia.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', margin: '0 0 8px 0' }}>🎯 UX + Dev en un solo flujo</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, margin: 0 }}>
                Diseñar y desarrollar en paralelo me obligó a tomar decisiones visuales conscientes de las posibilidades técnicas. El carrusel del menú, las animaciones de entrada y el header fijo surgieron de ese diálogo constante entre diseño y código.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', margin: '0 0 8px 0' }}>⚙️ Tailwind CSS como ventaja</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, margin: 0 }}>
                Construí una interfaz moderna y escalable rápidamente. La utilidad de Tailwind para mantener consistencia visual sin CSS custom extenso fue ideal para un proyecto con múltiples secciones, estados y responsive breakpoints.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', margin: '0 0 8px 0' }}>🔄 Diseño Iterativo</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, margin: 0 }}>
                Los ajustes continuos basados en feedback en tiempo real llevaron a un resultado mejor que cualquier versión inicial. Ver la página funcionar en el navegador y ajustar en tiempo real es una metodología que ahora aplico en todos mis proyectos.
              </p>
            </div>
          </div>
        </div>

        {/* CTAs finales */}
        <div style={{ textAlign: 'center', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://johnnyrocketschile.vercel.app/" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: RED, color: 'white', fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em', padding: '14px 28px', textDecoration: 'none', borderRadius: '6px', transition: 'all 200ms ease', boxShadow: `0 4px 20px ${RED}4d` }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = RED2; e.currentTarget.style.boxShadow = `0 6px 28px ${RED}70` }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = RED; e.currentTarget.style.boxShadow = `0 4px 20px ${RED}4d` }}>
            Ver Sitio en Vercel →
          </a>
          <a href="https://github.com/Zoe-2688/My-ecommerce" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'transparent', color: RED, border: `2px solid ${RED}`, fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em', padding: '14px 28px', textDecoration: 'none', borderRadius: '6px', transition: 'all 200ms ease' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = RED+'14' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}>
            Ver código en GitHub →
          </a>
        </div>

      </div>
    </div>
  )
}

export default JohnnyRocketsCaseStudy
