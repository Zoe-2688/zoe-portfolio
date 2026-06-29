import { useEffect, useRef, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import { FaWhatsapp } from 'react-icons/fa'
import { MdHome, MdKeyboardArrowUp } from 'react-icons/md'

const RED    = '#9F2020'
const BLUE   = '#1E3A8A'
const CREAM  = '#FFFFE6'
const BG     = '#050d1a'
const RED2   = '#c43030'

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

function Tag({ label }) {
  return <span style={{ fontFamily: 'monospace', fontSize: '11px', color: RED, border: `1px solid ${RED}59`, backgroundColor: `${RED}0f`, padding: '3px 10px', letterSpacing: '0.5px' }}>{label}</span>
}

function SectionTitle({ numero, titulo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
      <span style={{ fontFamily: 'monospace', fontSize: '11px', color: RED, opacity: 0.4 }}>{String(numero).padStart(2, '0')}</span>
      <h2 style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", fontSize: '15px', fontWeight: 600, color: 'white', letterSpacing: '0.05em', margin: 0 }}>{titulo}</h2>
      <div style={{ flex: 1, height: '1px', backgroundColor: `${RED}20` }} />
    </div>
  )
}

function SectionText({ children }) {
  return <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, marginBottom: '24px', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{children}</p>
}

function MetricaCard({ valor, label }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ border: `1px solid ${hovered ? RED+'aa' : RED+'26'}`, backgroundColor: hovered ? RED+'14' : RED+'06', padding: '12px 14px', borderRadius: '4px', boxShadow: hovered ? `0 0 16px ${RED}33` : 'none', transition: 'all 200ms ease', cursor: 'default' }}>
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

function BeforeAfter({ newImg, oldImg, newAlt, oldAlt, isEn }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ade80' }} />
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#4ade80', letterSpacing: '1px', textTransform: 'uppercase' }}>{isEn ? 'My Redesign' : 'Mi Rediseño'}</span>
        </div>
        <img src={newImg} alt={newAlt} style={{ width: '100%', borderRadius: '8px', border: '2px solid rgba(74,222,128,0.3)', display: 'block' }} />
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: RED }} />
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: RED, letterSpacing: '1px', textTransform: 'uppercase' }}>{isEn ? 'Original Version' : 'Versión Original'}</span>
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
      <video src={src} controls muted loop playsInline style={{ width: '100%', borderRadius: '12px', border: `1px solid ${RED}33`, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', display: 'block' }} />
    </div>
  )
}

function JohnnyRocketsCaseStudy({ onClose }) {
  const { reduceMotion, language } = usePortfolio()
  const isEn = language === 'en'
  const containerRef = useRef(null)
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => { document.body.style.overflow = 'hidden'; window.scrollTo(0, 0); return () => { document.body.style.overflow = '' } }, [])
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const handleScroll = () => setShowScroll(container.scrollTop > 300)
    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  const WHATSAPP = 'https://wa.me/56989774690'

  const METRICAS = [
    { valor: '+4', label: isEn ? 'New sections added' : 'Secciones nuevas añadidas' },
    { valor: '100%', label: isEn ? 'Front-end built from scratch' : 'Front-end desarrollado desde cero' },
    { valor: '🇨🇱', label: isEn ? 'Local cultural identity integrated' : 'Identidad cultural local integrada' },
    { valor: '3', label: isEn ? 'Videos of the page in action' : 'Videos de la página en acción' },
  ]
  const TAGS = ['HTML', 'Tailwind CSS', 'JavaScript', 'Canva', 'UX/UI', 'Responsive']

  return (
    <div ref={containerRef} className="jr-case-study" style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: BG, overflowY: 'auto', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}><CircuitCanvas reduceMotion={reduceMotion} /></div>

      {showScroll && (
        <div style={{ position: 'fixed', bottom: '32px', right: '24px', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <button onClick={scrollToTop} title={isEn ? 'Back to top' : 'Ir al inicio'} style={{ width: '44px', height: '44px', borderRadius: '50%', border: `1px solid ${RED}66`, backgroundColor: 'rgba(5,13,26,0.9)', backdropFilter: 'blur(8px)', color: RED, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = RED+'26' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(5,13,26,0.9)' }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 15l-6-6-6 6"/></svg>
          </button>
          <button onClick={onClose} title={isEn ? 'Back to projects' : 'Volver a proyectos'} style={{ width: '44px', height: '44px', borderRadius: '50%', border: `1px solid rgba(232,160,144,0.4)`, backgroundColor: 'rgba(5,13,26,0.9)', backdropFilter: 'blur(8px)', color: '#e8a090', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(232,160,144,0.15)' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(5,13,26,0.9)' }}>
            <MdHome size={22} />
          </button>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(37,211,102,0.4)', backgroundColor: 'rgba(5,13,26,0.9)', backdropFilter: 'blur(8px)', color: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', textDecoration: 'none' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(37,211,102,0.15)' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(5,13,26,0.9)' }}>
            <FaWhatsapp size={22} />
          </a>
        </div>
      )}

      {/* Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: `${BG}f5`, backdropFilter: 'blur(12px)', borderBottom: `1px solid ${RED}1a`, padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 200ms', fontFamily: 'monospace' }} onMouseEnter={e => e.currentTarget.style.color = RED} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>
            ← {isEn ? 'Back to projects' : 'Volver a proyectos'}
          </button>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: RED, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Johnny Rockets Chile</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="https://johnnyrocketschile.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#e8a090', border: '1px solid rgba(232,160,144,0.4)', padding: '7px 14px', textDecoration: 'none', fontFamily: 'monospace', transition: 'all 200ms' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(232,160,144,0.1)' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}>
            {isEn ? 'View site on Vercel' : 'Ver sitio en Vercel'} →
          </a>
          <a href="https://github.com/Zoe-2688/My-ecommerce" target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: RED, border: `1px solid ${RED}66`, padding: '7px 14px', textDecoration: 'none', fontFamily: 'monospace', transition: 'all 200ms' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = RED+'14' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}>
            GitHub →
          </a>
        </div>
      </div>

      {/* HERO */}
      <div style={{ position: 'relative', borderBottom: `1px solid ${RED}14`, zIndex: 1 }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}><CircuitCanvas reduceMotion={reduceMotion} /></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '64px 32px', display: 'grid', gridTemplateColumns: '0.85fr 1.5fr', gap: '48px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '11px', color: RED, letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.6, margin: 0 }}>
              {isEn ? 'Case Study · UX/UI · Front-End · Chile 🇨🇱' : 'Caso de Estudio · UX/UI · Front-End · Chile 🇨🇱'}
            </p>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: RED, margin: 0, lineHeight: 1.1 }}>
              JOHNNY ROCKETS<br />
              <span style={{ color: 'white', fontSize: '0.6em', fontWeight: 400, letterSpacing: '0.02em' }}>Chile — Landing Page Redesign</span>
            </h1>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.55, margin: 0 }}>
              {isEn ? 'Complete redesign + front-end development of the national landing page' : 'Rediseño completo + desarrollo front-end de la landing nacional'}
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic', lineHeight: 1.7, margin: 0, borderLeft: `2px solid ${RED}4d`, paddingLeft: '12px' }}>
              {isEn
                ? '"From a visually outdated page to a modern experience with American identity and Chilean heart — built with HTML, Tailwind CSS and JavaScript."'
                : '"De una página visualmente desactualizada a una experiencia moderna con identidad americana y corazón chileno — desarrollada con HTML, Tailwind CSS y JavaScript."'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{TAGS.map(tag => <Tag key={tag} label={tag} />)}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>{METRICAS.map((m) => <MetricaCard key={m.label} valor={m.valor} label={m.label} />)}</div>
          </div>
          <div style={{ position: 'relative', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>
            <style>{`@keyframes jrFloat { 0%, 100% { transform: translateY(0px) rotate(0deg); } 33% { transform: translateY(-10px) rotate(0.5deg); } 66% { transform: translateY(-5px) rotate(-0.4deg); } }`}</style>
            <div style={{ position: 'absolute', inset: '-20%', background: `radial-gradient(ellipse at center, ${RED}30 0%, ${RED}12 40%, transparent 70%)`, pointerEvents: 'none', zIndex: 0, filter: 'blur(24px)' }} />
            <img src={jrHeroImg} alt="Johnny Rockets Chile Redesign" style={{ position: 'relative', zIndex: 1, width: '130%', height: 'auto', display: 'block', maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 40%, transparent 100%)', animation: reduceMotion ? 'none' : 'jrFloat 5s ease-in-out infinite' }} />
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '56px 32px 80px', position: 'relative', zIndex: 1 }}>

        <Separador titulo={isEn ? 'Project Introduction' : 'Introducción al Proyecto'} />

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={1} titulo={isEn ? 'About the Project' : 'Sobre el Proyecto'} />
          <SectionText>
            {isEn
              ? 'This project is the complete redesign of the Johnny Rockets Chile landing page. The original version was functional but visually outdated, unintuitive and disconnected from the local cultural context. My goal was to transform the experience into a modern, clear and attractive page that balances the brand\'s American identity with Chilean cultural elements — improving usability, menu organization and user conversion.'
              : 'Este proyecto es el rediseño completo de la landing page de Johnny Rockets Chile. La versión original era funcional pero visualmente desactualizada, poco intuitiva y sin conexión con el contexto cultural local. Mi objetivo fue transformar la experiencia en una página moderna, clara y atractiva que equilibre la identidad americana de la marca con elementos culturales chilenos — mejorando la usabilidad, la organización del menú y la conversión del usuario.'}
          </SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '8px' }}>
            {(isEn ? [
              { icon: '🎨', titulo: 'UX/UI Design', desc: 'Complete redesign of visual hierarchy, navigation, menu and new sections.' },
              { icon: '💻', titulo: 'Front-End Dev', desc: 'HTML + Tailwind CSS + JavaScript. Modular and responsive design from scratch.' },
              { icon: '🇨🇱', titulo: 'Local Identity', desc: 'Chilean National Holidays, animated cueca, confetti and Santiago skyline in the footer.' },
            ] : [
              { icon: '🎨', titulo: 'UX/UI Design', desc: 'Rediseño completo de jerarquía visual, navegación, menú y secciones nuevas.' },
              { icon: '💻', titulo: 'Front-End Dev', desc: 'HTML + Tailwind CSS + JavaScript. Diseño modular y responsive desde cero.' },
              { icon: '🇨🇱', titulo: 'Identidad Local', desc: 'Fiestas Patrias, cueca animada, confetti y skyline de Santiago en el footer.' },
            ]).map(item => (
              <div key={item.titulo} style={{ backgroundColor: `${RED}08`, border: `1px solid ${RED}26`, borderRadius: '8px', padding: '16px' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>{item.icon}</span>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', margin: '0 0 4px 0' }}>{item.titulo}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={2} titulo={isEn ? 'The Problem — Initial Analysis' : 'El Problema — Análisis Inicial'} />
          <SectionText>
            {isEn
              ? 'Before opening the editor, I analyzed the original page point by point. The problems were clear and affected both the visual and functional experience — a broken carousel, low-contrast navigation, and zero connection with the Chilean user.'
              : 'Antes de abrir el editor, analicé la página original punto por punto. Los problemas eran claros y afectaban tanto la experiencia visual como la funcional — un carrusel roto, navegación de bajo contraste, y cero conexión con el usuario chileno.'}
          </SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
            {(isEn ? [
              { cat: 'Visual', items: ['Low visual hierarchy — uniform text without emphasis', 'Low-contrast navigation, hard to read', '"Order" button imperceptible', 'Full-screen hero without clear hierarchy'] },
              { cat: 'Functional', items: ['Broken and unusable menu carousel', 'No dish images — impossible to choose', 'No promotions or events section', 'No local identity or cultural elements'] },
            ] : [
              { cat: 'Visual', items: ['Baja jerarquía visual — texto uniforme sin énfasis', 'Navegación de bajo contraste, difícil de leer', 'Botón "Ordenar" imperceptible', 'Hero a pantalla completa sin jerarquía clara'] },
              { cat: 'Funcional', items: ['Carrusel de menú roto e inutilizable', 'Sin imágenes de platos — imposible elegir', 'Sin sección de promociones ni eventos', 'Sin identidad local ni elementos culturales'] },
            ]).map(g => (
              <div key={g.cat} style={{ backgroundColor: `${RED}06`, border: `1px solid ${RED}1f`, borderRadius: '8px', padding: '16px' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: RED, margin: '0 0 10px 0', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'monospace' }}>{g.cat}</p>
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

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={3} titulo={isEn ? 'My Role and Approach' : 'Mi Rol y Enfoque'} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {(isEn ? [
              { titulo: 'Analysis & Diagnosis', icon: '🔍', items: ['Analyzed the original page identifying hierarchy, contrast and usability flaws', 'Identified cultural connection opportunities with the Chilean user', 'Defined the redesign scope and new sections to create'] },
              { titulo: 'UX/UI Design', icon: '🎨', items: ['Fixed header with high-contrast visible CTA', 'Reorganized menu with images, descriptions and "Order Online" buttons', 'New sections: Chilean National Holidays + "Share with Us"'] },
              { titulo: 'Front-End Development', icon: '💻', items: ['Full build in HTML + Tailwind CSS + JavaScript', 'Modular and responsive design adapted for mobile', 'Animations: cueca, confetti, dancers in hero, Santiago skyline'] },
              { titulo: 'Visuals & Animations', icon: '🎬', items: ['Produced elements in Canva: animated cueca, confetti, National Holidays visuals', 'Hero image that slides in from the right side of the screen', '3 videos of the page in action produced for the portfolio'] },
            ] : [
              { titulo: 'Análisis y Diagnóstico', icon: '🔍', items: ['Analicé la página original identificando fallos de jerarquía, contraste y usabilidad', 'Identifiqué oportunidades de conexión cultural con el usuario chileno', 'Definí el alcance del rediseño y las secciones nuevas a crear'] },
              { titulo: 'UX/UI Design', icon: '🎨', items: ['Header fijo con CTA visible de alto contraste', 'Menú reorganizado con imágenes, descripciones y botones "Pedir Online"', 'Secciones nuevas: Fiestas Patrias + "Comparte con Nosotros"'] },
              { titulo: 'Front-End Development', icon: '💻', items: ['Construcción completa en HTML + Tailwind CSS + JavaScript', 'Diseño modular y responsive adaptado para mobile', 'Animaciones: cueca, confetti, bailarines en el hero, skyline Santiago'] },
              { titulo: 'Visuales y Animaciones', icon: '🎬', items: ['Producción de elementos en Canva: cueca animada, confetti, visuales Fiestas Patrias', 'Imagen en el hero que aparece desde la derecha de la pantalla', '3 videos de la página en acción producidos para el portfolio'] },
            ]).map(r => (
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

        <Separador titulo={isEn ? 'Design Process' : 'Proceso de Diseño'} />

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={4} titulo={isEn ? 'My Design Process' : 'Mi Proceso de Diseño'} />
          <SectionText>{isEn ? 'I applied Design Thinking in 5 phases — from analyzing the original page and the Chilean user to full development and feedback-based iterations.' : 'Apliqué Design Thinking en 5 fases — desde el análisis de la página original y el usuario chileno hasta el desarrollo completo y las iteraciones basadas en feedback.'}</SectionText>
          <svg width="100%" viewBox="0 0 900 460" role="img" aria-label="Design Process">
            <defs>
              <marker id="arrJR" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="rgba(255,255,255,0.35)"/></marker>
              <linearGradient id="jrg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#9F2020" stopOpacity="0.25"/><stop offset="100%" stopColor="#c43030" stopOpacity="0.1"/></linearGradient>
              <linearGradient id="jrg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.28"/><stop offset="100%" stopColor="#3b5bdb" stopOpacity="0.1"/></linearGradient>
              <linearGradient id="jrg3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#9F2020" stopOpacity="0.2"/><stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.1"/></linearGradient>
              <linearGradient id="jrg4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.22"/><stop offset="100%" stopColor="#9F2020" stopOpacity="0.1"/></linearGradient>
              <linearGradient id="jrg5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#9F2020" stopOpacity="0.25"/><stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.12"/></linearGradient>
              <radialGradient id="jrspot" cx="0%" cy="10%" r="100%" fx="0%" fy="10%"><stop offset="0%" stopColor="rgba(255,245,200,0.22)"/><stop offset="50%" stopColor="rgba(255,245,200,0.08)"/><stop offset="100%" stopColor="rgba(255,245,200,0)"/></radialGradient>
            </defs>
            <polygon points="0,20 900,100 900,300 0,20" fill="rgba(255,245,180,0.05)"/>
            <ellipse cx="100" cy="200" rx="800" ry="200" fill="url(#jrspot)"/>
            <rect x="2" y="12" width="28" height="16" rx="4" fill="#2a2a2a"/><rect x="26" y="16" width="10" height="8" rx="2" fill="#1a1a1a"/><circle cx="10" cy="20" r="6" fill="#ffe066" fillOpacity="0.9"/><circle cx="10" cy="20" r="3" fill="white"/>
            <path d="M188 145 Q240 210 272 285" stroke={`${RED}66`} strokeWidth="1.8" fill="none" markerEnd="url(#arrJR)"/>
            <path d="M358 295 Q395 210 432 160" stroke={`${BLUE}66`} strokeWidth="1.8" fill="none" markerEnd="url(#arrJR)"/>
            <path d="M522 145 Q558 210 588 278" stroke={`${RED}66`} strokeWidth="1.8" fill="none" markerEnd="url(#arrJR)"/>
            <path d="M678 295 Q710 210 742 155" stroke={`${BLUE}66`} strokeWidth="1.8" fill="none" markerEnd="url(#arrJR)"/>
            <circle cx="150" cy="115" r="88" fill="url(#jrg1)" stroke={RED} strokeWidth="1.2"/>
            <text x="150" y="112" fontSize="11" fontWeight="800" textAnchor="middle" fill={RED} fontFamily="Inter,sans-serif" letterSpacing="2">{isEn ? 'RESEARCH' : 'INVESTIGAR'}</text>
            <text x="150" y="128" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">{isEn ? 'Analysis of original JR' : 'Análisis de la página'}</text>
            <text x="150" y="141" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">{isEn ? 'Chile page & diagnosis.' : 'original JR Chile y'}</text>
            <circle cx="195" cy="65" r="10" fill={RED}/><text x="195" y="69" fontSize="10" fontWeight="700" textAnchor="middle" fill="white" fontFamily="Inter,sans-serif">1</text>
            <circle cx="315" cy="310" r="88" fill="url(#jrg2)" stroke={BLUE} strokeWidth="1.2"/>
            <text x="315" y="302" fontSize="11" fontWeight="800" textAnchor="middle" fill="#7b9cff" fontFamily="Inter,sans-serif" letterSpacing="2">{isEn ? 'EMPATHIZE' : 'EMPATIZAR'}</text>
            <text x="315" y="318" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">{isEn ? 'Chilean user:' : 'Usuario chileno:'}</text>
            <text x="315" y="331" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">{isEn ? 'identity, culture' : 'identidad, cultura'}</text>
            <text x="315" y="344" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">{isEn ? 'and local loyalty.' : 'y fidelización local.'}</text>
            <circle cx="360" cy="262" r="10" fill={BLUE}/><text x="360" y="266" fontSize="10" fontWeight="700" textAnchor="middle" fill="white" fontFamily="Inter,sans-serif">2</text>
            <circle cx="480" cy="115" r="88" fill="url(#jrg3)" stroke={RED} strokeWidth="1.2"/>
            <text x="480" y="108" fontSize="11" fontWeight="800" textAnchor="middle" fill={RED} fontFamily="Inter,sans-serif" letterSpacing="2">{isEn ? 'DEFINE' : 'DEFINIR'}</text>
            <text x="480" y="124" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">{isEn ? 'Visual redesign +' : 'Rediseño visual +'}</text>
            <text x="480" y="137" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">{isEn ? 'local identity +' : 'identidad local +'}</text>
            <text x="480" y="150" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">{isEn ? 'front-end development.' : 'desarrollo front-end.'}</text>
            <circle cx="525" cy="65" r="10" fill={RED}/><text x="525" y="69" fontSize="10" fontWeight="700" textAnchor="middle" fill="white" fontFamily="Inter,sans-serif">3</text>
            <circle cx="645" cy="310" r="88" fill="url(#jrg4)" stroke={BLUE} strokeWidth="1.2"/>
            <text x="645" y="302" fontSize="11" fontWeight="800" textAnchor="middle" fill="#7b9cff" fontFamily="Inter,sans-serif" letterSpacing="2">{isEn ? 'IDEATE' : 'IDEAR'}</text>
            <text x="645" y="318" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">{isEn ? 'Fixed header, menu with' : 'Header fijo, menú con'}</text>
            <text x="645" y="331" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">{isEn ? 'images, National Holidays,' : 'imágenes, Fiestas Patrias,'}</text>
            <text x="645" y="344" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">{isEn ? '"Share" section.' : 'sección "Comparte".'}</text>
            <circle cx="690" cy="262" r="10" fill={BLUE}/><text x="690" y="266" fontSize="10" fontWeight="700" textAnchor="middle" fill="white" fontFamily="Inter,sans-serif">4</text>
            <circle cx="810" cy="115" r="88" fill="url(#jrg5)" stroke={RED} strokeWidth="1.2"/>
            <text x="810" y="108" fontSize="10" fontWeight="800" textAnchor="middle" fill={RED} fontFamily="Inter,sans-serif" letterSpacing="1">{isEn ? 'BUILD' : 'CONSTRUIR'}</text>
            <text x="810" y="121" fontSize="8.5" fontWeight="700" textAnchor="middle" fill="#7b9cff" fontFamily="Inter,sans-serif">{isEn ? '+ ITERATE' : '+ ITERAR'}</text>
            <text x="810" y="135" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">{isEn ? 'Tailwind development.' : 'Desarrollo Tailwind.'}</text>
            <text x="810" y="148" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">{isEn ? 'Continuous adjustments' : 'Ajustes continuos'}</text>
            <text x="810" y="161" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">{isEn ? 'based on feedback.' : 'basados en feedback.'}</text>
            <circle cx="855" cy="65" r="10" fill={RED}/><text x="855" y="69" fontSize="10" fontWeight="700" textAnchor="middle" fill="white" fontFamily="Inter,sans-serif">5</text>
          </svg>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={5} titulo={isEn ? 'Visual Style Guide' : 'Guía de Estilo Visual'} />
          <SectionText>
            {isEn
              ? 'I used balanced contrast between warm and cool tones — red conveys warmth and emotional connection with the brand, blue provides professionalism and trust. Cream as background highlights content without overwhelming the user.'
              : 'Usé contraste equilibrado entre tonos cálidos y fríos — el rojo transmite calidez y conexión emocional con la marca, el azul aporta profesionalismo y confianza. El crema como fondo resalta el contenido sin abrumar al usuario.'}
          </SectionText>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: RED, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>// {isEn ? 'Color palette' : 'Paleta de colores'}</p>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {(isEn ? [
              { hex: '#9F2020', label: 'JR Red', role: 'CTAs · emphasis · brand', desc: 'Warmth and emotional connection' },
              { hex: '#1E3A8A', label: 'Deep Blue', role: 'Contrast · key sections', desc: 'Professionalism and trust' },
              { hex: '#FFFFE6', label: 'Cream', role: 'Background · spaces', desc: 'Highlights content, not overwhelming' },
            ] : [
              { hex: '#9F2020', label: 'Rojo JR', role: 'CTAs · énfasis · marca', desc: 'Calidez y conexión emocional' },
              { hex: '#1E3A8A', label: 'Azul Profundo', role: 'Contraste · secciones clave', desc: 'Profesionalismo y confianza' },
              { hex: '#FFFFE6', label: 'Crema', role: 'Fondo · espacios', desc: 'Resalta contenido, no abruma' },
            ]).map(c => (
              <div key={c.hex} style={{ flex: '1 1 150px', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${RED}26` }}>
                <div style={{ height: '52px', backgroundColor: c.hex }} />
                <div style={{ padding: '10px 12px', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'white', margin: '0 0 2px 0' }}>{c.hex}</p>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: '#ffb3b3', margin: '0 0 2px 0' }}>{c.label}</p>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separador titulo={isEn ? 'Before & After Comparison' : 'Comparativa — Original vs. Rediseño'} />

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={6} titulo={isEn ? 'Hero & Header — Before and After' : 'Hero & Header — Antes y Después'} />
          <SectionText>
            {isEn
              ? 'In the redesign, the hero features a JR products image (burger, fries, milkshake) that slides in from the right of the screen, with text on the left and a prominent "Order Online" button below. Two cueca dancers enter and exit at the edges of the hero celebrating Chilean National Holidays — a unique animated element that did not exist in the original version.'
              : 'En el rediseño, el hero muestra una imagen de productos JR (hamburguesa, papas, milkshake) que aparece deslizándose desde la derecha de la pantalla, acompañada de texto a su izquierda y un botón notorio de "Pedir Online" abajo. Dos bailarines de cueca entran y salen por los extremos del hero celebrando Fiestas Patrias — un elemento animado único que no existía en la versión original.'}
          </SectionText>
          <BeforeAfter newImg={jrLandingNew} oldImg={jrLandingOld} newAlt="Redesigned landing" oldAlt="Original landing" isEn={isEn} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
            <div>
              {(isEn ? ['Fixed header with uniform background and separation shadow', 'High-contrast navigation with prominent "Order" button', 'Hero image sliding in from the right with clear text', 'Animated cueca dancers for Chilean National Holidays'] : ['Header fijo con fondo uniforme y sombra de separación', 'Navegación de alto contraste con botón "Ordenar" prominente', 'Imagen hero que entra desde la derecha con texto claro', 'Bailarines de cueca animados para Fiestas Patrias']).map(item => (
                <div key={item} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ color: '#4ade80', fontSize: '12px', flexShrink: 0 }}>✓</span>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
            <div>
              {(isEn ? ['Low-contrast navigation, hard to read', '"Order" button without visual emphasis', 'Full-screen hero without content hierarchy', 'No cultural visuals or local identity elements'] : ['Navegación de bajo contraste, difícil de leer', 'Botón "Ordenar" sin énfasis visual', 'Hero a pantalla completa sin jerarquía de contenido', 'Sin visuales culturales ni elementos de identidad local']).map(item => (
                <div key={item} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ color: RED, fontSize: '12px', flexShrink: 0 }}>✕</span>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={7} titulo={isEn ? 'Interactive Menu — Before and After' : 'Menú Interactivo — Antes y Después'} />
          <SectionText>
            {isEn
              ? 'The original menu was a broken carousel with no images or descriptions. The redesign delivers a functional carousel organized by categories (burgers, starters, hotdog, phillys, salads, shakes, desserts, drinks) with dish images, descriptions, and direct "Order Online" buttons.'
              : 'El menú original era un carrusel roto sin imágenes ni descripciones. El rediseño entrega un carrusel funcional organizado por categorías (hamburguesas, starters, hotdog, phillys, ensaladas, shakes, postres, bebidas) con imágenes de platos, descripciones, y botones directos de "Pedir Online".'}
          </SectionText>
          <BeforeAfter newImg={jrMenu1} oldImg={jrMenuOld} newAlt="Redesigned menu" oldAlt="Original menu" isEn={isEn} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '16px' }}>
            {[
              { img: jrMenu1, label: isEn ? 'Burgers · Starters · Hotdog · Phillys' : 'Hamburguesas · Starters · Hotdog · Phillys' },
              { img: jrMenu2, label: isEn ? 'Detail view with images and descriptions' : 'Vista detalle con imágenes y descripciones' },
              { img: jrMenu3, label: isEn ? 'Salads · Shakes · Desserts · Drinks & Cocktails' : 'Ensaladas · Shakes · Postres · Bebidas & Tragos' },
            ].map((m, i) => (
              <div key={i}>
                <img src={m.img} alt={m.label} style={{ width: '100%', borderRadius: '8px', border: `1px solid ${RED}26`, display: 'block', marginBottom: '6px' }} />
                <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.4 }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={8} titulo={isEn ? 'National Holidays & Share with Us' : 'Fiestas Patrias & Comparte con Nosotros'} />
          <SectionText>
            {isEn
              ? 'Two new sections that did not exist in the original version. The National Holidays section shows text about Chile and the brand\'s relationship with its national holiday, with an animated graphic produced in Canva and a link to promotions. The "Share with Us" section shows images of events and celebrations at JR Chile.'
              : 'Dos secciones nuevas que no existían en la versión original. La sección de Fiestas Patrias muestra texto sobre Chile y la relación de la marca con su festividad patria, con un gráfico animado producido en Canva y un link a promociones. La sección "Comparte con Nosotros" muestra imágenes de eventos y celebraciones en JR Chile.'}
          </SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 10px 0' }}>// 🇨🇱 {isEn ? 'National Holidays — "Chile! We celebrate you"' : 'Fiestas Patrias — "Chile! Te celebramos"'}</p>
              <img src={jrFeatureNew} alt="National Holidays section" style={{ width: '100%', borderRadius: '8px', border: '2px solid rgba(74,222,128,0.3)', display: 'block' }} />
            </div>
            <div>
              <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 10px 0' }}>// 🎉 {isEn ? 'Share with Us' : 'Comparte con Nosotros'}</p>
              <img src={jrShare} alt="Share section" style={{ width: '100%', borderRadius: '8px', border: '2px solid rgba(74,222,128,0.3)', display: 'block' }} />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={9} titulo={isEn ? 'Footer — Before and After' : 'Footer — Antes y Después'} />
          <SectionText>
            {isEn
              ? 'The original footer was basic with few options and no visual appeal. The redesign expanded it with better organization (Menu · Branches · Franchise · Our Company · Food · Contact), more accessibility and privacy options, and the illustrated Santiago skyline as background image — reinforcing the local identity of the Chilean franchise.'
              : 'El footer original era básico, con pocas opciones y sin atractivo visual. El rediseño lo expandió con mejor organización (Menú · Sucursales · Franquicia · Nuestra Empresa · Comida · Contacto), más opciones de accesibilidad y privacidad, y el skyline ilustrado de Santiago como imagen de fondo — reforzando la identidad local de la franquicia chilena.'}
          </SectionText>
          <BeforeAfter newImg={jrFooterNew} oldImg={jrFooterOld} newAlt="Redesigned footer" oldAlt="Original footer" isEn={isEn} />
        </div>

        <Separador titulo={isEn ? 'Page in Action' : 'La Página en Acción'} />

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={10} titulo={isEn ? 'Videos — Landing Page Walkthrough' : 'Videos — Recorrido por la Landing'} />
          <SectionText>
            {isEn
              ? 'Three videos show the final result in motion: the hero with its animations, the interactive menu navigating through categories, and the National Holidays and Share sections in action.'
              : 'Tres videos muestran el resultado final en movimiento: el hero con sus animaciones, el menú interactivo navegando por categorías, y las secciones de Fiestas Patrias y Comparte en acción.'}
          </SectionText>
          <VideoSection src={jrLandingVideo} title={isEn ? 'Full landing — Hero, dancers and National Holidays' : 'Landing completa — Hero, bailarines y Fiestas Patrias'} desc={isEn ? 'Walkthrough of the hero with the sliding image, animated cueca dancers and the National Holidays section with its Canva graphic.' : 'Recorrido por el hero con la imagen deslizante, los bailarines de cueca animados y la sección de Fiestas Patrias con su gráfico en Canva.'} />
          <VideoSection src={jrMenuVideo} title={isEn ? 'Interactive menu — Carousel, images and Order Online' : 'Menú interactivo — Carrusel, imágenes y Pedir Online'} desc={isEn ? 'Navigation through the reorganized menu: functional carousel by categories, dish images, descriptions and direct order buttons.' : 'Navegación por el menú reorganizado: carrusel funcional por categorías, imágenes de platos, descripciones y botones de pedido directo.'} />
          <VideoSection src={jrFeatureVideo} title={isEn ? 'Share with Us & Footer with Santiago skyline' : 'Comparte con Nosotros & Footer con skyline de Santiago'} desc={isEn ? 'The events and promotions sections, and the footer with the illustrated Santiago, Chile skyline background.' : 'Las secciones de eventos y promociones, y el footer con el fondo ilustrado del skyline de Santiago de Chile.'} />
        </div>

        <Separador titulo={isEn ? 'Results & Learnings' : 'Resultados y Aprendizajes'} />

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={11} titulo={isEn ? 'Results and Value Added' : 'Resultados y Valor Aportado'} />
          <SectionText>
            {isEn
              ? 'The redesign significantly improves the user experience with a clearer and more accessible interface. High contrast and intuitive structure stand out especially in the interactive menu. The integration of National Holidays cultural visuals strengthens emotional connection with local users.'
              : 'El rediseño mejora significativamente la experiencia de usuario con una interfaz más clara y accesible. El alto contraste y la estructura intuitiva destacan especialmente en el menú interactivo. La integración de visuales culturales de Fiestas Patrias fortalece la conexión emocional con usuarios locales.'}
          </SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px' }}>
            {(isEn ? [
              { num: '+4', label: 'New sections', desc: 'Menu with images, National Holidays, Share, expanded footer' },
              { num: '100%', label: 'Built from scratch', desc: 'HTML + Tailwind CSS + JavaScript + Canva animations' },
              { num: '🔴', label: 'JR identity applied', desc: '#9F2020 + #1E3A8A + Roboto Flex + Pacifico' },
              { num: '🇨🇱', label: 'Local culture', desc: 'Cueca, confetti, Santiago skyline, animated dancers' },
            ] : [
              { num: '+4', label: 'Secciones nuevas', desc: 'Menú con imágenes, Fiestas Patrias, Comparte, footer expandido' },
              { num: '100%', label: 'Desarrollado desde cero', desc: 'HTML + Tailwind CSS + JavaScript + animaciones Canva' },
              { num: '🔴', label: 'Identidad JR aplicada', desc: '#9F2020 + #1E3A8A + Roboto Flex + Pacifico' },
              { num: '🇨🇱', label: 'Cultura local', desc: 'Cueca, confetti, skyline Santiago, bailarines animados' },
            ]).map(s => (
              <div key={s.label} style={{ backgroundColor: `${RED}06`, border: `1px solid ${RED}1f`, borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: RED, margin: '0 0 4px 0' }}>{s.num}</p>
                <p style={{ fontSize: '11px', fontWeight: 600, color: 'white', margin: '0 0 4px 0', lineHeight: 1.3 }}>{s.label}</p>
                <p style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.4 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={12} titulo={isEn ? 'Tools Used' : 'Herramientas Utilizadas'} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {(isEn ? [
              { icon: '🎨', tool: 'Tailwind CSS', desc: 'Fast, clean and scalable front-end development. Allowed maintaining visual consistency across the site without extensive custom CSS.' },
              { icon: '💻', tool: 'HTML + JavaScript', desc: 'Site structure and core functionality: menu carousel, scroll animations and fixed header behavior.' },
              { icon: '🖥️', tool: 'Visual Studio Code', desc: 'Main editor for managing development and optimizing workflow. Extensions for real-time preview and Tailwind IntelliSense.' },
              { icon: '🎬', tool: 'Canva', desc: 'Creation of animations and visuals: National Holidays graphic, confetti, cueca and decorative elements for the Share section.' },
            ] : [
              { icon: '🎨', tool: 'Tailwind CSS', desc: 'Desarrollo front-end rápido, limpio y escalable. Permitió mantener consistencia visual en todo el sitio sin CSS custom extenso.' },
              { icon: '💻', tool: 'HTML + JavaScript', desc: 'Estructura del sitio y funcionalidades core: carrusel del menú, animaciones de scroll y comportamiento del header fijo.' },
              { icon: '🖥️', tool: 'Visual Studio Code', desc: 'Editor principal para gestionar el desarrollo y optimizar el workflow. Extensiones para preview en tiempo real y Tailwind IntelliSense.' },
              { icon: '🎬', tool: 'Canva', desc: 'Creación de animaciones y visuales: gráfico de Fiestas Patrias, confetti, cueca y elementos decorativos de la sección Share.' },
            ]).map(item => (
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

        <div style={{ backgroundColor: `${RED}06`, border: `1px solid ${RED}1f`, borderRadius: '12px', padding: '28px', marginBottom: '48px' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: RED, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 20px 0' }}>// {isEn ? 'Key Learnings' : 'Aprendizajes Clave'}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {(isEn ? [
              { title: '📍 Cultural Adaptation', text: 'Balancing Johnny Rockets\' global identity with local elements was key to creating an authentic connection. The cueca dancers, Santiago skyline and National Holidays graphic are not decoration — they\'re the difference between a generic page and one that feels like home.' },
              { title: '🎯 UX + Dev in one flow', text: 'Designing and developing in parallel forced me to make visual decisions conscious of technical possibilities. The menu carousel, entry animations and fixed header emerged from that constant dialogue between design and code.' },
              { title: '⚙️ Tailwind CSS as an advantage', text: 'I built a modern and scalable interface quickly. Tailwind\'s utility for maintaining visual consistency without extensive custom CSS was ideal for a project with multiple sections, states and responsive breakpoints.' },
              { title: '🔄 Iterative Design', text: 'Continuous adjustments based on real-time feedback led to a better result than any initial version. Seeing the page work in the browser and adjusting in real time is a methodology I now apply to all my projects.' },
            ] : [
              { title: '📍 Adaptación Cultural', text: 'Equilibrar la identidad global de Johnny Rockets con elementos locales fue clave para crear una conexión auténtica. Los bailarines de cueca, el skyline de Santiago y el gráfico de Fiestas Patrias no son decoración — son la diferencia entre una página genérica y una que siente como propia.' },
              { title: '🎯 UX + Dev en un solo flujo', text: 'Diseñar y desarrollar en paralelo me obligó a tomar decisiones visuales conscientes de las posibilidades técnicas. El carrusel del menú, las animaciones de entrada y el header fijo surgieron de ese diálogo constante entre diseño y código.' },
              { title: '⚙️ Tailwind CSS como ventaja', text: 'Construí una interfaz moderna y escalable rápidamente. La utilidad de Tailwind para mantener consistencia visual sin CSS custom extenso fue ideal para un proyecto con múltiples secciones, estados y responsive breakpoints.' },
              { title: '🔄 Diseño Iterativo', text: 'Los ajustes continuos basados en feedback en tiempo real llevaron a un resultado mejor que cualquier versión inicial. Ver la página funcionar en el navegador y ajustar en tiempo real es una metodología que ahora aplico en todos mis proyectos.' },
            ]).map(item => (
              <div key={item.title}>
                <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', margin: '0 0 8px 0' }}>{item.title}</p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://johnnyrocketschile.vercel.app/" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: RED, color: 'white', fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em', padding: '14px 28px', textDecoration: 'none', borderRadius: '6px', transition: 'all 200ms ease', boxShadow: `0 4px 20px ${RED}4d` }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = RED2 }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = RED }}>
            {isEn ? 'View Site on Vercel' : 'Ver Sitio en Vercel'} →
          </a>
          <a href="https://github.com/Zoe-2688/My-ecommerce" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'transparent', color: RED, border: `2px solid ${RED}`, fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em', padding: '14px 28px', textDecoration: 'none', borderRadius: '6px', transition: 'all 200ms ease' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = RED+'14' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}>
            {isEn ? 'View code on GitHub' : 'Ver código en GitHub'} →
          </a>
        </div>

      </div>
    </div>
  )
}

export default JohnnyRocketsCaseStudy
