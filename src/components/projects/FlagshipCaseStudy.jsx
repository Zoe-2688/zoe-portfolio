import { useEffect, useRef, useState } from 'react'
import { useWindowWidth, isMobile, isTablet } from '../../hooks/useWindowWidth'
import { usePortfolio } from '../../context/PortfolioContext'
import { FaWhatsapp } from 'react-icons/fa'
import { MdHome, MdKeyboardArrowUp } from 'react-icons/md'

const C = { primary: '#15A5B1', dark: '#09253A', light: '#81D1D0', neutral: '#D9D9D1', bg: '#05111d' }

import flagshipPrototype   from '../../assets/projects/PrototypeFlagship.png'
import flagshipPrototypeFV from '../../assets/projects/PrototypeFlagshipextendida.png'
import flagshipWireframe   from '../../assets/projects/WIreframe-Flagship.png'
import flagshipImg         from '../../assets/projects/flagship.png'
import flagshipHeroVideo   from '../../assets/projects/FlagshipHeroVideo.mp4'
import flagshipSimpleCTRL  from '../../assets/projects/FlagShipSimpleCTRLvideo.mp4'
import flagshipShowCTRL    from '../../assets/projects/FlagshipShowCTRLvideo.mp4'
import flagshipSelfCTRL    from '../../assets/projects/FlagshipSelfCTRLvideo.mp4'

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

function Tag({ label }) {
  return <span style={{ fontFamily: 'monospace', fontSize: '11px', color: C.primary, border: `1px solid ${C.primary}59`, backgroundColor: `${C.primary}0f`, padding: '3px 10px', letterSpacing: '0.5px' }}>{label}</span>
}

function SectionTitle({ numero, titulo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
      <span style={{ fontFamily: 'monospace', fontSize: '11px', color: C.primary, opacity: 0.4 }}>{String(numero).padStart(2, '0')}</span>
      <h2 style={{ fontFamily: "'Outfit', 'Inter', sans-serif", fontSize: '15px', fontWeight: 600, color: 'white', letterSpacing: '0.05em', margin: 0 }}>{titulo}</h2>
      <div style={{ flex: 1, height: '1px', backgroundColor: `${C.primary}1f` }} />
    </div>
  )
}

function SectionText({ children }) {
  return <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, marginBottom: '24px', fontFamily: "'Albert Sans', 'Inter', sans-serif" }}>{children}</p>
}

function MetricaCard({ valor, label }) {
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ border: `1px solid ${hov ? C.light+'aa' : C.primary+'26'}`, backgroundColor: hov ? C.primary+'14' : C.primary+'08', padding: '12px 14px', borderRadius: '4px', boxShadow: hov ? `0 0 16px ${C.primary}33` : 'none', transition: 'all 200ms ease', cursor: 'default' }}>
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

function VideoSection({ src, title, desc }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <p style={{ fontFamily: 'monospace', fontSize: '11px', color: C.primary, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 6px 0', opacity: 0.8 }}>// {title}</p>
      {desc && <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', margin: '0 0 12px 0', lineHeight: 1.6 }}>{desc}</p>}
      <video src={src} controls muted loop playsInline style={{ width: '100%', borderRadius: '10px', border: `1px solid ${C.primary}33`, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', display: 'block' }} />
    </div>
  )
}

function FlagshipCaseStudy({ onClose }) {
  const { reduceMotion, language } = usePortfolio()
  const isEn = language === 'en'
  const w = useWindowWidth()
  const mob = isMobile(w)
  const tab = isTablet(w)
  const containerRef = useRef(null)
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => { document.body.style.overflow = 'hidden'; window.scrollTo(0, 0); return () => { document.body.style.overflow = '' } }, [])
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handler = () => setShowScroll(el.scrollTop > 300)
    el.addEventListener('scroll', handler)
    return () => el.removeEventListener('scroll', handler)
  }, [])

  const scrollToTop = () => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  const WHATSAPP = 'https://wa.me/56989774690'

  const METRICAS = [
    { valor: '3', label: isEn ? 'Solutions in one platform' : 'Soluciones en una plataforma' },
    { valor: '+1', label: isEn ? 'Extra delivery proposed & accepted' : 'Entrega extra propuesta y aceptada' },
    { valor: '3', label: isEn ? 'Demo videos produced' : 'Videos demo producidos' },
    { valor: 'B2B', label: isEn ? 'Real Upwork client · Digital Signage' : 'Cliente real Upwork · Digital Signage' },
  ]
  const TAGS = ['Figma', 'Canva', 'UX/UI', 'B2B', 'Landing Page', 'Digital Signage', 'Brand Strategy']

  const SOLUCIONES = isEn ? [
    { nombre: 'SimpleCTRL', sub: 'The Solution for Simple Looping Playlists', color: C.primary, desc: 'Ideal software for basic CMS needs. Delivers a user-friendly experience and frictionless setup for integrators. Perfect when the project only needs a full-screen looping playlist.', casos: ['Project only needs a looping playlist', 'End-user experience must be simple', 'Device setup must be quick', 'Advanced features not needed'] },
    { nombre: 'ShowCTRL', sub: 'The Solution for Dynamic Content', color: C.primary, desc: 'Leverages the Widget/Canvas drag-and-drop system to create interactive, non-interactive and touch experiences. Ideal for digital signage and video walls requiring dynamic, eye-catching content.', casos: ['Dynamic content with wide widget selection', 'Interactive touchscreen systems', 'Impactful touch and non-touch experiences', 'Content control from tablet, phone or laptop'] },
    { nombre: 'SelfCTRL', sub: 'The Solution for Custom Experiences', color: C.dark, desc: 'Manage, maintain and quickly update custom applications for digital signage and video walls without rebuilding the program or requiring labor-intensive system changes.', casos: ['Out-of-the-ordinary digital experiences', 'Rapid deployments of custom signage software', 'Third-party device integration needed', 'Control system interface with serial, TCP/IP and/or IR'] },
  ] : [
    { nombre: 'SimpleCTRL', sub: 'The Solution for Simple Looping Playlists', color: C.primary, desc: 'Software ideal para necesidades CMS básicas. Entrega una experiencia amigable para el usuario final y un setup sin fricciones para integradores. Perfecto cuando el proyecto solo necesita una playlist en loop de pantalla completa.', casos: ['El proyecto solo necesita una playlist en loop', 'La experiencia del usuario final debe ser simple', 'El setup del dispositivo debe ser rápido', 'No se necesitan funcionalidades avanzadas'] },
    { nombre: 'ShowCTRL', sub: 'The Solution for Dynamic Content', color: C.primary, desc: 'Aprovecha el sistema Widget/Canvas drag-and-drop para crear experiencias interactivas, no interactivas y táctiles. Ideal para señalización digital y video walls que requieren contenido dinámico y llamativo.', casos: ['Contenido dinámico con amplia selección de widgets', 'Sistemas touchscreen interactivos', 'Experiencias táctiles y no táctiles impactantes', 'Control de contenido desde tablet, teléfono o laptop'] },
    { nombre: 'SelfCTRL', sub: 'The Solution for Custom Experiences', color: C.dark, desc: 'Gestiona, mantiene y actualiza rápidamente aplicaciones personalizadas para señalización digital y video walls sin reconstruir el programa ni requerir cambios laborales intensos en el sistema.', casos: ['Experiencias digitales fuera de lo convencional', 'Despliegues rápidos de software de señalización personalizado', 'Integración de dispositivos de terceros necesaria', 'Control system interface con serial, TCP/IP y/o IR'] },
  ]

  const btnBase = { width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(5,17,29,0.9)', backdropFilter: 'blur(8px)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: C.bg, overflowY: 'auto', fontFamily: "'Albert Sans', 'Inter', 'Segoe UI', sans-serif" }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}><CircuitCanvas reduceMotion={reduceMotion} /></div>

      {showScroll && (
        <div style={{ position: 'fixed', bottom: '32px', right: '24px', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <button onClick={scrollToTop} style={{ ...btnBase, border: `1px solid ${C.primary}66`, color: C.primary }} onMouseEnter={e => { e.currentTarget.style.backgroundColor=C.primary+'26' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor='rgba(5,17,29,0.9)' }}><MdKeyboardArrowUp size={24} /></button>
          <button onClick={onClose} style={{ ...btnBase, border: `1px solid ${C.light}66`, color: C.light }} onMouseEnter={e => { e.currentTarget.style.backgroundColor=C.light+'26' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor='rgba(5,17,29,0.9)' }}><MdHome size={22} /></button>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ ...btnBase, border: '1px solid rgba(37,211,102,0.4)', color: '#25d366', textDecoration: 'none' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor='rgba(37,211,102,0.15)' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor='rgba(5,17,29,0.9)' }}><FaWhatsapp size={22} /></a>
        </div>
      )}

      {/* Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: C.bg+'f5', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.primary}1a`, padding: mob ? '12px 16px' : '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 200ms', fontFamily: 'monospace' }} onMouseEnter={e => { e.currentTarget.style.color=C.primary }} onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,0.45)' }}>
            {isEn ? 'Back to projects' : 'Volver a proyectos'}
          </button>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: C.primary, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Outfit', monospace" }}>Flagship CMS</span>
        </div>
        <a href="https://www.figma.com/proto/hp9Ob4unyQHcS270jRPgwu/Prototype--UpworkClient?node-id=9-75" target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: C.light, border: `1px solid ${C.light}66`, padding: '7px 16px', textDecoration: 'none', fontFamily: 'monospace', transition: 'all 200ms' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor=C.light+'1a' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor='transparent' }}>
          {isEn ? 'View prototype in Figma' : 'Ver prototipo en Figma'} →
        </a>
      </div>

      {/* HERO */}
      <div style={{ position: 'relative', overflow: 'hidden', borderBottom: `1px solid ${C.primary}14`, zIndex: 1 }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: mob ? '40px 20px' : '64px 32px', display: 'grid', gridTemplateColumns: mob ? '1fr' : '0.85fr 1.5fr', gap: mob ? '32px' : '48px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '11px', color: C.primary, letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.6, margin: 0 }}>
              {isEn ? 'Case Study · UX/UI · B2B · Upwork' : 'Caso de Estudio · UX/UI · B2B · Upwork'}
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: C.primary, margin: 0, lineHeight: 1.1, fontFamily: "'Outfit', sans-serif" }}>FLAGSHIP CMS</h1>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.55, margin: 0 }}>
              {isEn ? 'Landing Page + Digital Strategy for B2B Digital Signage platform' : 'Landing Page + Estrategia Digital para plataforma de Digital Signage B2B'}
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic', lineHeight: 1.7, margin: 0, borderLeft: `2px solid ${C.primary}4d`, paddingLeft: '12px' }}>
              {isEn ? '"The brief asked for a PDF brochure — I proposed and delivered an interactive landing + three demo videos. The client used it for their sales presentations."' : '"El brief pedía un folleto PDF — propuse y entregué una landing interactiva + tres videos demo. El cliente la usó para sus presentaciones de ventas."'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{TAGS.map(t => <Tag key={t} label={t} />)}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>{METRICAS.map(m => <MetricaCard key={m.label} valor={m.valor} label={m.label} />)}</div>
          </div>
          <div style={{ position: 'relative' }}>
            <style>{`@keyframes flagshipFloat { 0%, 100% { transform: translateY(0px) rotate(0deg); } 33% { transform: translateY(-8px) rotate(0.4deg); } 66% { transform: translateY(-4px) rotate(-0.3deg); } }`}</style>
            <img src={flagshipImg} alt="Flagship CMS Landing Page" style={{ width: '100%', display: 'block', maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)', maskComposite: 'intersect', WebkitMaskComposite: 'destination-in', animation: reduceMotion ? 'none' : 'flagshipFloat 5s ease-in-out infinite' }} />
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: mob ? '32px 16px 60px' : '56px 32px 80px', position: 'relative', zIndex: 1 }}>

        <Separador titulo={isEn ? 'The Project' : 'El Proyecto'} />

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={1} titulo={isEn ? 'Project Introduction' : 'Introducción al Proyecto'} />
          <SectionText>
            {isEn ? 'Flagship CMS needed to modernize its comparative brochure to compete in the SaaS market. My research revealed that competitors used interactive digital resources, while Flagship relied on static PDFs. I proposed a comprehensive solution: redesign the brochure and create a landing page + promotional videos to boost their communication.' : 'Flagship CMS necesitaba modernizar su folleto comparativo para competir en el mercado SaaS. Mi investigación reveló que los competidores usaban recursos digitales interactivos, mientras que Flagship dependía de PDFs estáticos. Propuse una solución integral: rediseñar el folleto y crear una landing page + videos promocionales para potenciar su comunicación.'}
          </SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
            {(isEn ? [
              { nombre: 'SimpleCTRL', icono: '🔁', desc: 'Looping playlists. Simple setup. Experience without learning curve.' },
              { nombre: 'ShowCTRL', icono: '🎛️', desc: 'Dynamic content with drag-and-drop. Widget/Canvas for interactive screens and video walls.' },
              { nombre: 'SelfCTRL', icono: '⚙️', desc: 'Custom applications for complex signage. Full control without rebuilding the system.' },
            ] : [
              { nombre: 'SimpleCTRL', icono: '🔁', desc: 'Playlists en loop. Setup simple. Experiencia sin curva de aprendizaje.' },
              { nombre: 'ShowCTRL', icono: '🎛️', desc: 'Contenido dinámico con drag-and-drop. Widget/Canvas para pantallas y video walls interactivos.' },
              { nombre: 'SelfCTRL', icono: '⚙️', desc: 'Aplicaciones personalizadas para señalización compleja. Control total sin reconstruir el sistema.' },
            ]).map(s => (
              <div key={s.nombre} style={{ backgroundColor: `${C.primary}08`, border: `1px solid ${C.primary}26`, borderRadius: '8px', padding: '16px' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>{s.icono}</span>
                <p style={{ fontSize: '13px', fontWeight: 700, color: C.light, margin: '0 0 6px 0' }}>{s.nombre}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: '16px 20px', backgroundColor: `${C.dark}cc`, border: `1px solid ${C.primary}26`, borderRadius: '8px', borderLeft: `3px solid ${C.primary}` }}>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.7, fontStyle: 'italic' }}>
              "There's no such thing as a 'one size fits all' digital signage CMS platform... so we made three unique solutions that all work with each other on our platform."
            </p>
            <p style={{ fontFamily: 'monospace', fontSize: '10px', color: C.primary, margin: '8px 0 0 0', letterSpacing: '1px' }}>— Flagship CMS, Solutions Tier Brochure</p>
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={2} titulo={isEn ? '🔍 The Challenge' : '🔍 El Reto'} />
          <SectionText>
            {isEn ? 'The existing brochure had dense design with low visual hierarchy — uniform text without emphasis on key advantages. The static format (PDF) fell short of competitors already using digital resources. The real risk: communication did not reflect the product\'s innovation.' : 'El folleto existente tenía diseño denso con baja jerarquía visual — texto uniforme sin énfasis en ventajas clave. El formato estático (PDF) quedaba por debajo de los competidores que ya usaban recursos digitales. El riesgo real: la comunicación no reflejaba la innovación del producto.'}
          </SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: `${C.primary}06`, border: `1px solid ${C.primary}1f`, borderRadius: '8px', padding: '16px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, color: C.light, margin: '0 0 12px 0', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'monospace' }}>🚨 {isEn ? 'Original brochure problems' : 'Problemas del folleto original'}</p>
              {(isEn ? ['Low visual hierarchy — uniform text without emphasis', 'Static format (PDF) vs. digital competitors', 'No interactivity or multimedia resources', 'Communication did not reflect product innovation'] : ['Baja jerarquía visual — texto uniforme sin énfasis', 'Formato estático (PDF) vs. competidores digitales', 'Sin interactividad ni recursos multimedia', 'La comunicación no reflejaba la innovación del producto']).map(item => (
                <div key={item} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ color: '#f87171', flexShrink: 0, fontSize: '12px' }}>✕</span>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: `${C.primary}0a`, border: `1px solid ${C.primary}26`, borderRadius: '8px', padding: '16px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, color: C.primary, margin: '0 0 12px 0', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'monospace' }}>💡 {isEn ? 'Identified opportunity' : 'Oportunidad identificada'}</p>
              {(isEn ? ['Interactive landing page integrating the brochure', 'Promotional videos to explain complex benefits', 'Modular system: PDF + digital for sales teams', 'Complete ecosystem: 3× engagement opportunities'] : ['Landing page interactiva que integrara el folleto', 'Videos promocionales para explicar beneficios complejos', 'Sistema modular: PDF + digital para equipos de ventas', 'Ecosistema completo: 3× oportunidades de engagement']).map(item => (
                <div key={item} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ color: C.primary, flexShrink: 0, fontSize: '12px' }}>→</span>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={3} titulo={isEn ? 'My Role and Approach' : 'Mi Rol y Enfoque'} />
          <SectionText>
            {isEn ? 'I discovered 3 hidden opportunities: users did not retain technical data in PDF format, sales teams needed scannable resources, and the brand was losing credibility by not reflecting innovation. I didn\'t just modernize — I redefined the visual communication.' : 'Descubrí 3 oportunidades ocultas: los usuarios no retenían datos técnicos en formato PDF, los equipos de ventas necesitaban recursos escaneables, y la marca perdía credibilidad al no reflejar innovación. No solo modernicé — redefiní la comunicación visual.'}
          </SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: '12px' }}>
            {(isEn ? [
              { icon: '🔍', rol: 'Initial Analysis', desc: 'Identified that users didn\'t retain technical data in PDF and sales teams needed scannable resources. The brand was losing credibility.' },
              { icon: '🎨', rol: 'Visual Redesign', desc: 'Reformulated the design to highlight key points organizing information clearly. Incorporated modern visual elements that convey trust and innovation.' },
              { icon: '🎬', rol: 'Video Production', desc: '4 videos in Canva: 1 corporate general + 1 per product (SimpleCTRL, ShowCTRL, SelfCTRL). 60-90 sec — optimal point for B2B retention.' },
              { icon: '💼', rol: 'Delivery Ecosystem', desc: 'Landing page in Figma (navigable prototype) + Videos in Canva + Editable PDF for future updates. Complete kit for sales teams.' },
            ] : [
              { icon: '🔍', rol: 'Análisis Inicial', desc: 'Identifiqué que usuarios no retenían datos técnicos en PDF y que equipos de ventas necesitaban recursos escaneables. La marca perdía credibilidad.' },
              { icon: '🎨', rol: 'Rediseño Visual', desc: 'Reformulé el diseño para resaltar los puntos clave organizando información de manera clara. Incorporé elementos visuales modernos que transmiten confianza e innovación.' },
              { icon: '🎬', rol: 'Producción de Videos', desc: '4 videos en Canva: 1 corporativo general + 1 por producto (SimpleCTRL, ShowCTRL, SelfCTRL). 60-90 seg — punto óptimo para retención B2B.' },
              { icon: '💼', rol: 'Ecosistema de Entrega', desc: 'Landing page en Figma (prototipo navegable) + Videos en Canva + PDF editable para futuras actualizaciones. Kit completo para equipos de ventas.' },
            ]).map(item => (
              <div key={item.rol} style={{ backgroundColor: `${C.primary}06`, border: `1px solid ${C.primary}18`, borderRadius: '8px', padding: '16px', display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', margin: '0 0 6px 0' }}>{item.rol}</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separador titulo={isEn ? 'The 3 Solutions' : 'Las 3 Soluciones'} />

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={4} titulo="SimpleCTRL · ShowCTRL · SelfCTRL" />
          <SectionText>
            {isEn ? 'One of the central design challenges was communicating that Flagship is not a CMS but a platform with three modular products that coexist. The landing needed a B2B visitor to quickly understand which solution applies to them, without feeling overwhelmed by technical comparison.' : 'Uno de los retos centrales del diseño fue comunicar que Flagship no es un CMS sino una plataforma con tres productos modulares que conviven. La landing necesitaba que un visitante B2B entendiera rápidamente cuál solución le aplica, sin sentirse abrumado por la comparación técnica.'}
          </SectionText>
          {SOLUCIONES.map(s => (
            <div key={s.nombre} style={{ backgroundColor: s.color===C.dark?`${C.dark}cc`:`${C.primary}0a`, border: `1px solid ${C.primary}33`, borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
              <div style={{ marginBottom: '16px' }}>
                <span style={{ display: 'inline-block', backgroundColor: s.color===C.dark?C.dark:C.primary, color: 'white', fontWeight: 700, fontSize: '15px', padding: '4px 14px', borderRadius: '20px', marginBottom: '4px', border: `1px solid ${C.light}40` }}>{s.nombre}</span>
                <p style={{ fontFamily: 'monospace', fontSize: '11px', color: C.light, margin: 0 }}>{s.sub}</p>
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: '0 0 14px 0' }}>{s.desc}</p>
              <p style={{ fontFamily: 'monospace', fontSize: '10px', color: C.primary, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 10px 0' }}>// {isEn ? 'When to use it' : 'Cuándo usarlo'}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {s.casos.map(c => (
                  <div key={c} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: C.light, fontSize: '11px', flexShrink: 0, marginTop: '2px' }}>◆</span>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.5 }}>{c}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Separador titulo={isEn ? 'Design Process' : 'Proceso de Diseño'} />

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={5} titulo={isEn ? 'Design System — Brand Guide Applied' : 'Sistema de Diseño — Brand Guide Aplicado'} />
          <SectionText>
            {isEn ? 'The Flagship Brand Guide is precise and well documented. My job was to apply it faithfully to the landing — without improvising, without deviating from the palette, without changing fonts. In B2B, brand consistency is a signal of professionalism that directly influences potential client trust.' : 'El Brand Guide de Flagship es preciso y bien documentado. Mi trabajo fue aplicarlo fielmente a la landing — sin improvisar, sin salirme de la paleta, sin cambiar tipografías. En B2B, la consistencia de marca es una señal de profesionalismo que influye directamente en la confianza del cliente potencial.'}
          </SectionText>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: C.primary, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>// {isEn ? 'Official color palette' : 'Paleta de colores oficial'}</p>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {[
              { hex: '#15A5B1', label: 'Primary Teal', role: isEn ? 'CTAs · borders · emphasis' : 'CTAs · bordes · énfasis' },
              { hex: '#09253A', label: 'Dark Navy', role: isEn ? 'Backgrounds · headers · depth' : 'Fondos · headers · profundidad' },
              { hex: '#81D1D0', label: 'Light Teal', role: isEn ? 'Highlights · hover · accents' : 'Highlights · hover · acentos' },
              { hex: '#D9D9D1', label: 'Warm Gray', role: isEn ? 'Secondary text · soft backgrounds' : 'Texto secundario · fondos suaves' },
            ].map(c => (
              <div key={c.hex} style={{ flex: '1 1 120px', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${C.primary}26` }}>
                <div style={{ height: '44px', backgroundColor: c.hex }} />
                <div style={{ padding: '8px 10px', backgroundColor: `${C.dark}cc` }}>
                  <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'white', margin: '0 0 2px 0' }}>{c.hex}</p>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: C.light, margin: '0 0 2px 0' }}>{c.label}</p>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={6} titulo={isEn ? 'Wireframe' : 'Wireframe'} />
          <SectionText>
            {isEn ? 'The wireframe defined the landing\'s information architecture: hero with direct value proposition → 3 setup steps → platform selection (the three solutions) → expandable "Learn More" section → testimonial → contact form. Each section responds to a typical objection or question from the B2B digital signage buyer.' : 'El wireframe definió la arquitectura de información de la landing: hero con propuesta de valor directa → 3 pasos de setup → selección de plataforma (las tres soluciones) → sección "Learn More" expandible → testimonial → formulario de contacto. Cada sección responde a una objeción o pregunta típica del comprador B2B de señalización digital.'}
          </SectionText>
          <img src={flagshipWireframe} alt="Wireframe Flagship Landing" style={{ display: 'block', width: '60%', margin: '0 auto', borderRadius: '10px', border: `1px solid ${C.primary}26`, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }} />
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={7} titulo={isEn ? 'Final Design — Landing Page' : 'Diseño Final — Landing Page'} />
          <SectionText>
            {isEn ? 'The landing communicates Flagship\'s value in seconds: hero with direct CTA ("Get Started" + "Try a Demo"), the three solutions presented as comparative cards, and an expandable "Learn More" section that dives deeper into when to use each platform and the installation process — without leaving the page.' : 'La landing comunica el valor de Flagship en segundos: hero con CTA directo ("Get Started" + "Try a Demo"), las tres soluciones presentadas como cards comparativas, y una sección expandible "Learn More" que profundiza en cuándo usar cada plataforma y el proceso de instalación — sin salir de la página.'}
          </SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '20px', alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 10px 0' }}>// {isEn ? 'Main view' : 'Vista principal'}</p>
              <img src={flagshipPrototype} alt="Flagship Landing — main view" style={{ width: '100%', borderRadius: '10px', border: `1px solid ${C.primary}33`, boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }} />
            </div>
            <div>
              <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 10px 0' }}>// {isEn ? 'With "Learn More" expanded' : 'Con "Learn More" expandido'}</p>
              <img src={flagshipPrototypeFV} alt="Flagship Landing — Learn More expanded" style={{ width: '100%', borderRadius: '10px', border: `1px solid ${C.primary}33`, boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }} />
            </div>
          </div>
        </div>

        <Separador titulo={isEn ? 'Demo Videos' : 'Videos Demo'} />

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={8} titulo={isEn ? 'Video Production' : 'Producción de Videos'} />
          <SectionText>
            {isEn ? 'I produced four videos — one corporate general and one per solution — showing Flagship in real use. The videos transform technical specifications into visual stories: they replaced pages of technical manuals and reduced friction in the B2B sales cycle.' : 'Produje cuatro videos — uno corporativo general y uno por cada solución — mostrando Flagship en uso real. Los videos transforman especificaciones técnicas en historias visuales: reemplazaron páginas de manuales técnicos y redujeron la fricción en el ciclo de ventas B2B.'}
          </SectionText>
          <div style={{ marginBottom: '28px', padding: '20px', backgroundColor: `${C.dark}cc`, border: `1px solid ${C.light}33`, borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ backgroundColor: C.light, color: C.dark, fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', fontFamily: 'monospace' }}>📌 {isEn ? 'EXTRA WORK' : 'TRABAJO EXTRA'}</span>
              <p style={{ fontFamily: 'monospace', fontSize: '11px', color: C.light, margin: 0, opacity: 0.7 }}>{isEn ? 'Not requested · Proposed by Zoe' : 'No solicitado · Propuesto por Zoe'}</p>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', margin: '0 0 12px 0', lineHeight: 1.6 }}>
              {isEn ? 'Auto-playing video in the landing header. Communicates Flagship\'s value proposition in the first seconds — without the visitor having to read anything. Produced in Canva with animated graphics, dynamic text and branded music.' : 'Video auto-reproducible en el header de la landing. Comunica la propuesta de valor de Flagship en los primeros segundos — sin que el visitante tenga que leer nada. Producido en Canva con gráficos animados, textos dinámicos y música brandeada.'}
            </p>
            <video src={flagshipHeroVideo} controls muted loop playsInline style={{ width: '100%', borderRadius: '8px', border: `1px solid ${C.light}33`, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', display: 'block' }} />
          </div>
          <VideoSection src={flagshipSimpleCTRL} title={isEn ? 'SimpleCTRL — Looping playlists' : 'SimpleCTRL — Playlists en loop'} desc={isEn ? 'Playlist creation and device delivery flow. Simple setup, experience without learning curve.' : 'Flujo de creación y envío de una playlist al dispositivo. Setup simple, experiencia sin curva de aprendizaje.'} />
          <VideoSection src={flagshipShowCTRL} title={isEn ? 'ShowCTRL — Dynamic content with Canvas' : 'ShowCTRL — Contenido dinámico con Canvas'} desc={isEn ? 'Widget/Canvas drag-and-drop editor for creating interactive and touchless experiences on screens and video walls.' : 'Editor drag-and-drop Widget/Canvas para crear experiencias interactivas y touchless en pantallas y video walls.'} />
          <VideoSection src={flagshipSelfCTRL} title={isEn ? 'SelfCTRL — Custom applications' : 'SelfCTRL — Aplicaciones personalizadas'} desc={isEn ? 'Custom application management for complex signage. Full control without rebuilding the program.' : 'Gestión de aplicaciones custom para señalización compleja. Control total sin reconstruir el programa.'} />
        </div>

        <Separador titulo={isEn ? 'Results & Learnings' : 'Resultados y Aprendizajes'} />

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={9} titulo={isEn ? 'Project Results' : 'Resultados del Proyecto'} />
          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px' }}>
            {(isEn ? [
              { num: '3×', label: 'Engagement opportunities', desc: 'Landing + videos + PDF = complete ecosystem' },
              { num: '+4', label: 'Deliverables produced', desc: '1 landing + 3 videos + 1 redesigned PDF' },
              { num: '1', label: 'Click', desc: 'Sales teams show complex benefits in 1 click' },
              { num: '⭐', label: 'Real Upwork client', desc: 'B2B project with real product on the market' },
            ] : [
              { num: '3×', label: 'Oportunidades de engagement', desc: 'Landing + videos + PDF = ecosistema completo' },
              { num: '+4', label: 'Entregables producidos', desc: '1 landing + 3 videos + 1 PDF rediseñado' },
              { num: '1', label: 'Clic', desc: 'Equipos de ventas muestran beneficios complejos en 1 clic' },
              { num: '⭐', label: 'Cliente Upwork real', desc: 'Proyecto B2B con producto real en mercado' },
            ]).map(s => (
              <div key={s.label} style={{ backgroundColor: `${C.primary}06`, border: `1px solid ${C.primary}1f`, borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: C.primary, margin: '0 0 4px 0' }}>{s.num}</p>
                <p style={{ fontSize: '11px', fontWeight: 600, color: 'white', margin: '0 0 4px 0', lineHeight: 1.3 }}>{s.label}</p>
                <p style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.4 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: '20px 24px', backgroundColor: `${C.dark}cc`, border: `1px solid ${C.primary}33`, borderRadius: '10px', borderLeft: `3px solid ${C.light}` }}>
            <p style={{ fontSize: '16px', color: 'white', margin: '0 0 10px 0', lineHeight: 1.7, fontStyle: 'italic' }}>"Fue genial trabajar con Zoe."</p>
            <p style={{ fontFamily: 'monospace', fontSize: '10px', color: C.light, margin: 0, letterSpacing: '1px' }}>— {isEn ? 'Upwork Client · Flagship CMS' : 'Cliente Upwork · Flagship CMS'}</p>
          </div>
        </div>

        <div style={{ backgroundColor: `${C.primary}06`, border: `1px solid ${C.primary}1f`, borderRadius: '12px', padding: '28px', marginBottom: '48px' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: C.primary, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 20px 0' }}>// {isEn ? 'Key Learnings' : 'Aprendizajes Clave'}</p>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : tab ? 'repeat(2, 1fr)' : '1fr 1fr 1fr', gap: '20px' }}>
            {(isEn ? [
              { title: '🧠 Strategic thinking', text: 'I identified the need for videos and landing before the client did. The PDF was the deliverable — but the landing was the real solution. Proposing that difference required confidence and clarity.' },
              { title: '🎬 SaaS B2B multimedia', text: 'Mastery of B2B resource creation: videos + interactive PDFs + navigable prototypes. Each format serves a specific function in the sales cycle.' },
              { title: '⚡ Agile management', text: 'Complex deliverable in record time without sacrificing quality. Designing with an established brand guide taught me to move with precision within brand constraints.' },
            ] : [
              { title: '🧠 Pensamiento estratégico', text: 'Identifiqué la necesidad de videos y landing antes que el cliente. El PDF era el entregable — pero la landing era la solución real. Proponer esa diferencia requirió confianza y claridad.' },
              { title: '🎬 Multimedia SaaS B2B', text: 'Dominio de creación de recursos B2B: videos + PDFs interactivos + prototipos navegables. Cada formato cumple una función específica en el ciclo de ventas.' },
              { title: '⚡ Gestión ágil', text: 'Entregable complejo en plazo récord sin sacrificar calidad. Diseñar con brand guide establecido me enseñó a moverme con precisión dentro de restricciones de marca.' },
            ]).map(item => (
              <div key={item.title}>
                <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', margin: '0 0 8px 0' }}>{item.title}</p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="https://www.figma.com/proto/hp9Ob4unyQHcS270jRPgwu/Prototype--UpworkClient?node-id=9-75" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: C.primary, color: '#05111d', fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em', padding: '14px 32px', textDecoration: 'none', borderRadius: '6px', transition: 'all 200ms ease', boxShadow: `0 4px 20px ${C.primary}4d` }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor=C.light }} onMouseLeave={e => { e.currentTarget.style.backgroundColor=C.primary }}>
            {isEn ? 'View Interactive Prototype in Figma' : 'Ver Prototipo Interactivo en Figma'} →
          </a>
        </div>

      </div>
    </div>
  )
}

export default FlagshipCaseStudy
