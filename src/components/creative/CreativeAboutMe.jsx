import { useEffect, useRef, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import {
  SiFigma, SiCanva, SiGithub, SiNpm, SiTrello, SiReact,
  SiHtml5, SiJavascript, SiTailwindcss, SiBootstrap, SiCss,
  SiVite, SiGit,
} from 'react-icons/si'
import { FiLayout, FiUser, FiEye, FiSmartphone, FiPackage, FiGlobe, FiPenTool, FiCode } from 'react-icons/fi'

import introVideo from '../../assets/projects/Intro-zoeOscuro.mp4'
import islaVideo from '../../assets/projects/Isla-tropicalOscuro.mp4'
import castilloVideo from '../../assets/projects/Castillo-universidadOscuro.mp4'
import descubrimientoVideo from '../../assets/projects/Descubrimiento-uxuiOscuro.mp4'
import cafeVideo from '../../assets/projects/CafeRechargeOscuro.mp4'
import misionVideo from '../../assets/projects/Mision-finalOscuro.mp4'

import avatar from '../../assets/projects/avatar1.png'
import iconoCorazon from '../../assets/projects/IconoCorazon.png'
import iconoMagia from '../../assets/projects/IconoMagia.png'
import iconoIlustrador from '../../assets/projects/IconoIlusstrador.png'
import iconoPuzzle from '../../assets/projects/IconoPuzzle.png'
import iconoGreca from '../../assets/projects/iconoGreca.png'

const STEP = 60
const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]]

function buildCircuits(w, h) {
  const circuits = []
  for (let i = 0; i < 26; i++) {
    const nodes = []
    let x = Math.floor(Math.random() * w / STEP) * STEP
    let y = Math.floor(Math.random() * h / STEP) * STEP
    nodes.push({ x, y })
    let dir = Math.floor(Math.random() * 4)
    const segs = 3 + Math.floor(Math.random() * 4)
    for (let s = 0; s < segs; s++) {
      const len = STEP * (1 + Math.floor(Math.random() * 3))
      const [dx, dy] = DIRS[dir]
      const nx = x + dx * len
      const ny = y + dy * len
      if (nx < 0 || nx > w || ny < 0 || ny > h) break
      x = nx; y = ny
      nodes.push({ x, y })
      dir = (dir + (Math.random() > 0.5 ? 1 : 3)) % 4
    }
    if (nodes.length >= 2) circuits.push({ nodes, pink: Math.random() < 0.5 })
  }
  return circuits
}

function AboutCircuitCanvas({ reduceMotion }) {
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
      for (const { nodes, pink } of circuitsRef.current) {
        const color = pink ? 'rgba(232,160,144,' : 'rgba(0,212,255,'
        ctx.lineWidth = 1
        ctx.strokeStyle = `${color}0.08)`
        ctx.beginPath()
        ctx.moveTo(nodes[0].x, nodes[0].y)
        for (let i = 1; i < nodes.length; i++) ctx.lineTo(nodes[i].x, nodes[i].y)
        ctx.stroke()
        for (const { x, y } of nodes) {
          ctx.fillStyle = `${color}0.2)`
          ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill()
        }
      }
      ctx.restore()
    }

    function makeParticle() {
      const ci = Math.floor(Math.random() * circuitsRef.current.length)
      return { ci, si: 0, t: Math.random(), speed: 0.004 + Math.random() * 0.006 }
    }

    function drawParticle(p) {
      const circuit = circuitsRef.current[p.ci]
      if (!circuit || p.si >= circuit.nodes.length - 1) return
      const n1 = circuit.nodes[p.si]
      const n2 = circuit.nodes[p.si + 1]
      const x = n1.x + (n2.x - n1.x) * p.t
      const y = n1.y + (n2.y - n1.y) * p.t
      const color = circuit.pink ? '#e8a090' : '#00d4ff'
      ctx.save()
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 5)
      glow.addColorStop(0, circuit.pink ? 'rgba(232,160,144,0.8)' : 'rgba(0,212,255,0.8)')
      glow.addColorStop(1, circuit.pink ? 'rgba(232,160,144,0)' : 'rgba(0,212,255,0)')
      ctx.shadowBlur = 6
      ctx.shadowColor = color
      ctx.fillStyle = glow
      ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
    }

    resize()
    rebuildCircuits()
    const particles = Array.from({ length: 8 }, makeParticle)

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

    if (reduceMotion) { drawFrame() } else { tick() }

    const ro = new ResizeObserver(() => { resize(); rebuildCircuits(); if (reduceMotion) drawFrame() })
    ro.observe(canvas)
    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [reduceMotion])

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', top: 0, left: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0,
    }} />
  )
}

const PODERES = [
  { icon: iconoCorazon, nombre: 'Diseño centrado en el usuario', nivel: 75 },
  { icon: iconoPuzzle, nombre: 'Resolución de problemas creativos', nivel: 87 },
  { icon: iconoGreca, nombre: 'Amante del café', nivel: 100 },
  { icon: iconoMagia, nombre: 'Front-end mágico', nivel: 60 },
  { icon: iconoIlustrador, nombre: 'Ilustración y diseño gráfico épico', nivel: 78 },
]

const CAPITULOS = [
  {
    id: 'intro',
    titulo: '',
    video: introVideo,
    texto: '',
    lado: 'centro',
  },
  {
    id: 'isla',
    titulo: 'La Isla Tropical',
    video: islaVideo,
    texto: 'Mi viaje comenzó en una isla tropical, donde el sol y los días cálidos fueron mi primer escenario. Desde niña, siempre me fascinó el arte, en especial el dibujo, y eso marcó el inicio de mi aventura creativa.',
    lado: 'centro-texto',
  },
  {
    id: 'castillo',
    titulo: 'Batalla del Castillo Universidad',
    video: castilloVideo,
    texto: 'Estudié diseño de modas en la universidad, pero sentí que ese mundo no era suficiente para llenar mi corazón creativo. Como Link enfrentando dragones en Zelda, perseveré hasta descubrir algo que realmente me apasionara. Y fue en Chile, junto a mi pareja (quien es programador backend), donde encontré el mundo del diseño UX/UI.',
    lado: 'derecha',
  },
  {
    id: 'descubrimiento',
    titulo: 'El Gran Descubrimiento UX/UI',
    video: descubrimientoVideo,
    texto: 'Aquí descubrí que podía combinar mi amor por el arte y mi deseo de ayudar a las personas. Me dediqué a aprender y perfeccionar mis habilidades, incluso estudiando Front-end para complementar mi trabajo.',
    lado: 'izquierda',
  },
  {
    id: 'cafe',
    titulo: '⚡ Recarga de Energía',
    video: cafeVideo,
    texto: 'Todo héroe necesita recargar energías. El café es mi poción mágica favorita — sin ella, ninguna aventura de diseño sería posible. ☕',
    lado: 'derecha',
  },
  {
    id: 'mision',
    titulo: 'La Gran Misión: Crear Tecnología Accesible',
    video: misionVideo,
    texto: 'Ahora sueño con participar en proyectos que aporten al mundo, haciéndolo más accesible, inclusivo y fácil para todos, porque creo que con la tecnología y un simple clic, podemos marcar la diferencia.',
    lado: 'centro-texto',
  },
]

function Video({ src }) {
  return (
    <div style={{
      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
      WebkitMaskComposite: 'destination-in',
      maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
      maskComposite: 'intersect',
    }}>
      <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}

function BarraXP({ nivel }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
      <div style={{
        flex: 1, height: '8px', backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '0px', border: '1px solid rgba(0,212,255,0.3)', overflow: 'hidden',
      }}>
        <div style={{ width: `${nivel}%`, height: '100%', backgroundColor: '#00d4ff', boxShadow: '0 0 6px #00d4ff' }} />
      </div>
      <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#00d4ff', minWidth: '32px' }}>{nivel}</span>
    </div>
  )
}

function TarjetaPersonaje() {
  return (
    <div style={{
      border: '2px solid #00d4ff', borderRadius: '8px',
      backgroundColor: 'rgba(0,212,255,0.05)', padding: '20px',
      maxWidth: '480px', margin: '0 auto', boxShadow: '0 0 30px rgba(0,212,255,0.1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{
          width: '64px', height: '64px', backgroundColor: '#00d4ff',
          borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, overflow: 'hidden',
        }}>
          <img src={avatar} alt="Zoe" style={{ width: '100%', height: '100%', objectFit: 'cover', imageRendering: 'pixelated' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '12px', color: 'white' }}>Zoe</span>
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Lv: 8</span>
          </div>
          <div style={{ height: '8px', backgroundColor: 'rgba(0,212,255,0.2)', border: '1px solid rgba(0,212,255,0.4)', marginBottom: '6px', overflow: 'hidden' }}>
            <div style={{ width: '80%', height: '100%', backgroundColor: '#00d4ff', boxShadow: '0 0 6px #00d4ff' }} />
          </div>
          <div style={{ display: 'flex', gap: '3px' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} style={{ color: '#e8a090', fontSize: '14px' }}>♥</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: '#e8a090', borderRadius: '4px', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px', color: '#050d1a' }}>Clase: Diseñadora UX/UI</span>
        <span style={{ fontSize: '12px' }}>✏️</span>
      </div>
      <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginBottom: '10px', letterSpacing: '1px' }}>Poderes especiales:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {PODERES.map((p) => (
          <div key={p.nombre} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={p.icon} alt={p.nombre} style={{ width: '20px', height: '20px', objectFit: 'contain', flexShrink: 0 }} />
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.8)', minWidth: '200px' }}>
              {p.nombre} <span style={{ color: 'rgba(255,255,255,0.4)' }}>(Nivel {p.nivel})</span>
            </span>
            <BarraXP nivel={p.nivel} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Capitulo({ cap }) {
  const esIzquierda = cap.lado === 'izquierda'

  if (cap.lado === 'centro') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '-30px' }}>
        <div style={{ width: '60%' }}>
          <Video src={cap.video} />
        </div>
      </div>
    )
  }

  if (cap.lado === 'centro-texto') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '0px' }}>
        <div style={{ width: '60%' }}>
          <Video src={cap.video} />
        </div>
        <div style={{ textAlign: 'center', marginTop: '-10px', zIndex: 2, position: 'relative' }}>
          <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px', color: '#e8a090', marginBottom: '4px', lineHeight: 1.6, textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
            {cap.titulo}
          </p>
          <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, textShadow: '0 2px 8px rgba(0,0,0,0.9)', maxWidth: '400px' }}>
            {cap.texto}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: esIzquierda ? 'flex-end' : 'flex-start',
      marginBottom: '-10px',
      paddingLeft: esIzquierda ? '0' : '0',
    }}>
      <div style={{ width: '55%', position: 'relative' }}>
        <Video src={cap.video} />
        <div style={{
          position: 'absolute',
          bottom: '20px',
          [esIzquierda ? 'left' : 'right']: '20px',
          maxWidth: '160px',
          zIndex: 2,
        }}>
          <p style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '8px', color: '#e8a090',
            marginBottom: '4px', lineHeight: 1.6,
            wordBreak: 'break-word',
            textShadow: '0 2px 8px rgba(0,0,0,0.9)',
          }}>
            {cap.titulo}
          </p>
          <p style={{
            fontFamily: 'monospace', fontSize: '11px',
            color: 'rgba(255,255,255,0.9)', lineHeight: 1.7,
            wordBreak: 'break-word',
            textShadow: '0 2px 8px rgba(0,0,0,0.9)',
          }}>
            {cap.texto}
          </p>
        </div>
      </div>
    </div>
  )
}

function CreativeAboutMe() {
  const { reduceMotion } = usePortfolio()
  const [visible, setVisible] = useState(() => reduceMotion)

  useEffect(() => {
    if (reduceMotion) return
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [reduceMotion])

  return (
    <section id="about" className="bg-[#050d1a] py-24 px-0">
      <div
        className="w-full flex flex-col gap-4"
        style={{ opacity: visible ? 1 : 0, transition: reduceMotion ? 'none' : 'opacity 600ms ease' }}
      >
        {/* Título y tarjeta centrados */}
        <div className="max-w-6xl mx-auto w-full px-6 flex flex-col gap-4">
          <div className="flex flex-col items-center text-center gap-3">
            <p className="text-[#00d4ff] text-xs tracking-[4px] uppercase opacity-60">Sobre mí</p>
            <h2 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 'clamp(1.2rem, 3vw, 2rem)', lineHeight: 1.4 }}>
              {'MI HISTORIA'.split('').map((char, i) => (
                <span key={i} style={{ color: ['#e8a090', '#00d4ff', '#ffffff'][i % 3] }}>{char}</span>
              ))}
            </h2>
            <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>
              // una historia de arte, tecnología y café ☕
            </p>
          </div>

          <div>
            <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: '20px' }}>
              Conoce a la narradora ;)
            </p>
            <TarjetaPersonaje />
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '12px', color: '#e8a090', letterSpacing: '4px' }}>
              ⚔ LA AVENTURA ⚔
            </span>
          </div>
        </div>

        {/* Capítulos a ancho completo con circuitos */}
        <div style={{ position: 'relative', marginTop: '-20px', width: '100%' }}>
          <AboutCircuitCanvas reduceMotion={reduceMotion} />
          {CAPITULOS.map((cap) => (
            <Capitulo key={cap.id} cap={cap} reduceMotion={reduceMotion} />
          ))}
        </div>

        {/* Botón YouTube centrado */}
        <div style={{ textAlign: 'center', padding: '40px 24px 0' }}>
          <a
            href="https://www.youtube.com/watch?v=Zsx0NoSQITo"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              backgroundColor: 'transparent', border: '2px solid #e8a090',
              color: '#e8a090', fontFamily: "'Press Start 2P', monospace",
              fontSize: '10px', padding: '14px 24px', borderRadius: '0px',
              boxShadow: '4px 4px 0px rgba(232,160,144,0.3)',
              textDecoration: 'none', transition: 'all 200ms ease', letterSpacing: '1px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(232,160,144,0.1)'
              e.currentTarget.style.boxShadow = '4px 4px 0px rgba(232,160,144,0.6)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.boxShadow = '4px 4px 0px rgba(232,160,144,0.3)'
            }}
          >
            <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="17" rx="4" fill="#FF0000"/>
              <path d="M9.5 11.5V5.5L16 8.5L9.5 11.5Z" fill="white"/>
            </svg>
            Ver mi historia animada →
          </a>
          <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '10px' }}>
            // concept, script, art direction & production — todo hecho por mí
          </p>
        </div>

        {/* Skills retro */}
        <div className="max-w-6xl mx-auto w-full px-6" style={{ paddingTop: '48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '12px', color: '#00d4ff', letterSpacing: '4px' }}>
              ⚔ INVENTARIO DESBLOQUEADO ⚔
            </span>
            <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '8px' }}>
              // habilidades adquiridas a lo largo del viaje
            </p>
          </div>

          {[
            { categoria: '>ATAQUE< // Diseño UX/UI', icono: FiPenTool, color: '#e8a090', skills: [
              { name: 'Wireframing', icon: FiLayout },
              { name: 'Prototipado', icon: FiPackage },
              { name: 'Diseño Responsivo', icon: FiSmartphone },
              { name: 'Pruebas de Usabilidad', icon: FiUser },
              { name: 'Design Thinking', icon: FiEye },
              { name: 'Diseño UI', icon: FiLayout },
              { name: 'Branding', icon: FiEye },
              { name: 'Ilustración Digital', icon: FiPenTool },
              { name: 'WCAG / Accesibilidad', icon: FiEye },
            ]},
            { categoria: '>DEFENSA< // Desarrollo Front-End', icono: FiCode, color: '#00d4ff', skills: [
              { name: 'HTML', icon: SiHtml5 },
              { name: 'CSS', icon: SiCss },
              { name: 'JavaScript', icon: SiJavascript },
              { name: 'React', icon: SiReact },
              { name: 'Tailwind CSS', icon: SiTailwindcss },
              { name: 'Bootstrap', icon: SiBootstrap },
              { name: 'Vite', icon: SiVite },
              { name: 'Git', icon: SiGit },
            ]},
            { categoria: '[ITEMS] // Herramientas', icono: FiPackage, color: '#e8a090', skills: [
              { name: 'Figma', icon: SiFigma },
              { name: 'Adobe XD', icon: FiPenTool },
              { name: 'Adobe Illustrator', icon: FiPenTool },
              { name: 'Adobe Photoshop', icon: FiLayout },
              { name: 'Canva', icon: SiCanva },
              { name: 'After Effects', icon: FiLayout },
              { name: 'VS Code', icon: FiCode },
              { name: 'GitHub', icon: SiGithub },
              { name: 'npm', icon: SiNpm },
              { name: 'Trello', icon: SiTrello },
            ]},
            { categoria: '[WISDOM] // Metodologías', icono: FiEye, color: '#00d4ff', skills: [
              { name: 'Design Thinking', icon: FiEye },
              { name: 'UCD', icon: FiUser },
              { name: 'Heurísticas de Usabilidad', icon: FiLayout },
              { name: 'Evaluación de Interfaces', icon: FiSmartphone },
            ]},
            { categoria: '[LINGUA] // Idiomas', icono: FiGlobe, color: '#e8a090', skills: [
              { name: 'Español nativo', icon: FiGlobe },
              { name: 'Inglés B2+', icon: FiGlobe },
            ]},
          ].map((grupo) => (
            <div key={grupo.categoria} style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <grupo.icono size={14} style={{ color: grupo.color, opacity: 0.9 }} />
                <p style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '8px', color: grupo.color,
                  letterSpacing: '2px', opacity: 0.8, margin: 0,
                }}>
                  {grupo.categoria}
                </p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
               {grupo.skills.map((skill) => {
  const Icon = skill.icon
  const [hovered, setHovered] = useState(false)
  return (
    <div key={skill.name}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        fontFamily: 'monospace', fontSize: '10px', color: grupo.color,
        border: `1px solid ${hovered ? grupo.color : grupo.color + '44'}`,
        backgroundColor: hovered ? `${grupo.color}20` : `${grupo.color}08`,
        padding: '4px 10px', borderRadius: '0px',
        boxShadow: hovered ? `2px 2px 0px ${grupo.color}, 0 0 12px ${grupo.color}66` : `2px 2px 0px ${grupo.color}22`,
        transition: 'all 150ms ease',
        cursor: 'default',
      }}>
      <Icon size={12} style={{ color: grupo.color, opacity: hovered ? 1 : 0.8, filter: hovered ? `drop-shadow(0 0 4px ${grupo.color})` : 'none', transition: 'all 150ms ease' }} />
      {skill.name}
    </div>
  )
})}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default CreativeAboutMe
