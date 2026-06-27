import { useEffect, useRef, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import { FaWhatsapp } from 'react-icons/fa'
import { MdHome, MdKeyboardArrowUp } from 'react-icons/md'

function A11yIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="12" cy="4.5" r="2" fill="currentColor" />
      <path d="M12 7v7.5M6.5 10.5h11M12 14.5l-3 5.5M12 14.5l3 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

import boostOverview from '../../assets/projects/BoostProjectOverview.png'
import boostStructure from '../../assets/projects/Appstructure.png'
import boostWireframe from '../../assets/projects/wireframe-prototipoHome.png'
import boostUserFlow from '../../assets/projects/CapturaregistrationUserFlow.PNG'
import boostGameMockup from '../../assets/projects/gameScreenMockup.png'
import boostGame from '../../assets/projects/GamesScreen.png'
import boostProgressMockup from '../../assets/projects/YourProgressBoostMockup.png'
import boostProgress from '../../assets/projects/Yourprogress.png'
import boostDispenserMockup from '../../assets/projects/smartDispenserMockup.png'
import boostDispenser from '../../assets/projects/SmartDispenser.png'
import boostForUser from '../../assets/projects/ForUserBoostMockup.png'
import boostLandingV1 from '../../assets/projects/BoostLanding1Version.png'
import boostCitasV1 from '../../assets/projects/BoostCitas1Version.png'
import boostLandingNew from '../../assets/projects/LandingBoost.png'
import boostAppointmentNew from '../../assets/projects/BoostAppointmentScreen.png'
import boostProfile from '../../assets/projects/BoostProfileUserPartner.png'
import boostVideo from '../../assets/projects/BoostAppPresentation.mp4'

function UserPersonas() {
  return (
    <svg width="100%" viewBox="0 0 680 620" role="img" aria-label="User Personas Carmen y Marcos">
      {/* ===== CARMEN ===== */}
      <rect x="10" y="10" width="320" height="600" rx="12" fill="none" stroke="#346BB1" strokeWidth="0.8"/>
      <circle cx="170" cy="100" r="56" fill="#346BB1" fillOpacity="0.1"/>
      {/* cabello largo */}
      <path d="M138 82 Q130 125 135 158 Q144 168 154 165 Q149 135 147 102Z" fill="#2a1a0e"/>
      <path d="M202 82 Q210 125 205 158 Q196 168 186 165 Q191 135 193 102Z" fill="#2a1a0e"/>
      <path d="M138 80 Q140 52 170 50 Q200 52 202 80 Q194 65 170 63 Q146 65 138 80Z" fill="#2a1a0e"/>
      <path d="M142 70 Q146 61 150 66" stroke="#b0a090" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M194 67 Q198 58 200 64" stroke="#b0a090" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* cabeza */}
      <circle cx="170" cy="93" r="29" fill="#c9956b"/>
      <ellipse cx="160" cy="90" rx="4" ry="3" fill="#2a1a0e"/>
      <ellipse cx="180" cy="90" rx="4" ry="3" fill="#2a1a0e"/>
      <path d="M156 87 Q158 84 160 86" stroke="#1a1008" strokeWidth="1" fill="none"/>
      <path d="M176 87 Q178 84 180 86" stroke="#1a1008" strokeWidth="1" fill="none"/>
      <path d="M168 97 Q170 100 172 97" stroke="#a07050" strokeWidth="1" fill="none"/>
      <path d="M162 104 Q170 110 178 104" stroke="#7a4a2e" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="153" cy="101" rx="5" ry="3" fill="#e8a090" fillOpacity="0.4"/>
      <ellipse cx="187" cy="101" rx="5" ry="3" fill="#e8a090" fillOpacity="0.4"/>
      {/* cuello y cuerpo */}
      <rect x="164" y="122" width="12" height="10" rx="2" fill="#c9956b"/>
      <path d="M128 152 Q142 135 170 133 Q198 135 212 152 L216 168 L124 168Z" fill="#f5f5f0" stroke="#e0e0da" strokeWidth="0.5"/>
      {/* flores */}
      <circle cx="148" cy="148" r="5" fill="#cc2020"/><circle cx="148" cy="142" r="3" fill="#cc2020"/><circle cx="154" cy="146" r="3" fill="#cc2020"/><circle cx="142" cy="146" r="3" fill="#cc2020"/><circle cx="148" cy="148" r="2.5" fill="#ffcccc"/>
      <circle cx="170" cy="143" r="5" fill="#cc2020"/><circle cx="170" cy="137" r="3" fill="#cc2020"/><circle cx="176" cy="141" r="3" fill="#cc2020"/><circle cx="164" cy="141" r="3" fill="#cc2020"/><circle cx="170" cy="143" r="2.5" fill="#ffcccc"/>
      <circle cx="192" cy="148" r="5" fill="#cc2020"/><circle cx="192" cy="142" r="3" fill="#cc2020"/><circle cx="198" cy="146" r="3" fill="#cc2020"/><circle cx="186" cy="146" r="3" fill="#cc2020"/><circle cx="192" cy="148" r="2.5" fill="#ffcccc"/>
      <ellipse cx="144" cy="153" rx="3" ry="2" fill="#4a8a40" transform="rotate(-30 144 153)"/>
      <ellipse cx="165" cy="150" rx="3" ry="2" fill="#4a8a40" transform="rotate(20 165 150)"/>
      <ellipse cx="188" cy="153" rx="3" ry="2" fill="#4a8a40" transform="rotate(-20 188 153)"/>
      {/* tag */}
      <rect x="140" y="173" width="60" height="18" rx="9" fill="#346BB1"/>
      <text x="170" y="186" fontSize="10" textAnchor="middle" fill="white" fontFamily="monospace">Usuario</text>
      {/* datos */}
      <text x="170" y="212" fontSize="15" fontWeight="700" textAnchor="middle" fill="#346BB1" fontFamily="Inter, sans-serif">Carmen</text>
      <text x="170" y="228" fontSize="11" textAnchor="middle" fill="#888" fontFamily="monospace">60 años · Abogada freelance</text>
      <text x="170" y="244" fontSize="11" textAnchor="middle" fill="#888" fontFamily="monospace">República Dominicana · 3 hijos</text>
      <line x1="30" y1="256" x2="310" y2="256" stroke="#346BB1" strokeWidth="0.4" strokeOpacity="0.3"/>
      {/* quote */}
      <text x="170" y="274" fontSize="11" textAnchor="middle" fill="#7fa8cc" fontStyle="italic" fontFamily="Inter, sans-serif">"Quiero seguir siendo independiente</text>
      <text x="170" y="289" fontSize="11" textAnchor="middle" fill="#7fa8cc" fontStyle="italic" fontFamily="Inter, sans-serif">y hacer mis cosas sola."</text>
      <line x1="30" y1="300" x2="310" y2="300" stroke="#346BB1" strokeWidth="0.4" strokeOpacity="0.3"/>
      {/* goals */}
      <text x="30" y="318" fontSize="12" fontWeight="700" fill="#4ade80" fontFamily="Inter, sans-serif">Goals</text>
      <text x="30" y="334" fontSize="11" fill="#aaa" fontFamily="monospace">• Recordar medicamentos y citas médicas</text>
      <text x="30" y="349" fontSize="11" fill="#aaa" fontFamily="monospace">• Ejercicio cognitivo diario</text>
      <text x="30" y="364" fontSize="11" fill="#aaa" fontFamily="monospace">• Mantener su independencia</text>
      {/* frustrations */}
      <text x="30" y="386" fontSize="12" fontWeight="700" fill="#f87171" fontFamily="Inter, sans-serif">Frustraciones</text>
      <text x="30" y="402" fontSize="11" fill="#aaa" fontFamily="monospace">• Dificultades cognitivas crecientes</text>
      <text x="30" y="417" fontSize="11" fill="#aaa" fontFamily="monospace">• La tecnología se le dificulta</text>
      <text x="30" y="432" fontSize="11" fill="#aaa" fontFamily="monospace">• Depender de sus hijos la frustra</text>
      <line x1="30" y1="444" x2="310" y2="444" stroke="#346BB1" strokeWidth="0.4" strokeOpacity="0.3"/>
      {/* problem statement */}
      <text x="30" y="462" fontSize="11" fontWeight="600" fill="#888" fontFamily="Inter, sans-serif">Problem statement</text>
      <text x="170" y="480" fontSize="11" textAnchor="middle" fill="#7fa8cc" fontStyle="italic" fontFamily="Inter, sans-serif">"Carmen necesita recordatorios para</text>
      <text x="170" y="496" fontSize="11" textAnchor="middle" fill="#7fa8cc" fontStyle="italic" fontFamily="Inter, sans-serif">sus actividades diarias y apoyo para</text>
      <text x="170" y="512" fontSize="11" textAnchor="middle" fill="#7fa8cc" fontStyle="italic" fontFamily="Inter, sans-serif">mejorar su condición cognitiva."</text>

      {/* ===== MARCOS ===== */}
      <rect x="350" y="10" width="320" height="600" rx="12" fill="none" stroke="#F29251" strokeWidth="0.8"/>
      <circle cx="510" cy="100" r="56" fill="#F29251" fillOpacity="0.1"/>
      {/* cabello */}
      <path d="M482 82 Q482 52 510 50 Q538 52 538 82 Q532 66 510 64 Q488 66 482 82Z" fill="#1a1008"/>
      {/* cabeza */}
      <circle cx="510" cy="93" r="29" fill="#b8855b"/>
      <ellipse cx="500" cy="90" rx="4" ry="3" fill="#1a1008"/>
      <ellipse cx="520" cy="90" rx="4" ry="3" fill="#1a1008"/>
      <path d="M493 108 Q510 114 527 108" stroke="#1a1008" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M494 104 Q493 109 494 113" stroke="#1a1008" strokeWidth="1" fill="none"/>
      <path d="M526 104 Q527 109 526 113" stroke="#1a1008" strokeWidth="1" fill="none"/>
      <path d="M508 97 Q510 100 512 97" stroke="#906040" strokeWidth="1" fill="none"/>
      <path d="M502 104 Q510 109 518 104" stroke="#7a4a2e" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* cuello y cuerpo */}
      <rect x="504" y="122" width="12" height="10" rx="2" fill="#b8855b"/>
      <path d="M468 152 Q482 135 510 133 Q538 135 552 152 L556 168 L464 168Z" fill="#3d5a6e" stroke="#2a4050" strokeWidth="0.5"/>
      <circle cx="510" cy="140" r="2" fill="#2a3a4a"/>
      <circle cx="510" cy="150" r="2" fill="#2a3a4a"/>
      <circle cx="510" cy="160" r="2" fill="#2a3a4a"/>
      {/* tag */}
      <rect x="480" y="173" width="60" height="18" rx="9" fill="#F29251"/>
      <text x="510" y="186" fontSize="10" textAnchor="middle" fill="white" fontFamily="monospace">Cuidador</text>
      {/* datos */}
      <text x="510" y="212" fontSize="15" fontWeight="700" textAnchor="middle" fill="#F29251" fontFamily="Inter, sans-serif">Marcos</text>
      <text x="510" y="228" fontSize="11" textAnchor="middle" fill="#888" fontFamily="monospace">36 años · Ing. Industrial</text>
      <text x="510" y="244" fontSize="11" textAnchor="middle" fill="#888" fontFamily="monospace">Rep. Dominicana · Vive con su madre</text>
      <line x1="370" y1="256" x2="650" y2="256" stroke="#F29251" strokeWidth="0.4" strokeOpacity="0.3"/>
      {/* quote */}
      <text x="510" y="274" fontSize="11" textAnchor="middle" fill="#d4a070" fontStyle="italic" fontFamily="Inter, sans-serif">"Quiero saber que mi mamá está</text>
      <text x="510" y="289" fontSize="11" textAnchor="middle" fill="#d4a070" fontStyle="italic" fontFamily="Inter, sans-serif">bien cuando no estoy con ella."</text>
      <line x1="370" y1="300" x2="650" y2="300" stroke="#F29251" strokeWidth="0.4" strokeOpacity="0.3"/>
      {/* goals */}
      <text x="370" y="318" fontSize="12" fontWeight="700" fill="#4ade80" fontFamily="Inter, sans-serif">Goals</text>
      <text x="370" y="334" fontSize="11" fill="#aaa" fontFamily="monospace">• Saber si su madre tomó medicamentos</text>
      <text x="370" y="349" fontSize="11" fill="#aaa" fontFamily="monospace">• Ayudar sin invadir su independencia</text>
      <text x="370" y="364" fontSize="11" fill="#aaa" fontFamily="monospace">• Tranquilidad cuando no está presente</text>
      {/* frustrations */}
      <text x="370" y="386" fontSize="12" fontWeight="700" fill="#f87171" fontFamily="Inter, sans-serif">Frustraciones</text>
      <text x="370" y="402" fontSize="11" fill="#aaa" fontFamily="monospace">• No puede costear una enfermera</text>
      <text x="370" y="417" fontSize="11" fill="#aaa" fontFamily="monospace">• Su trabajo le impide estar siempre</text>
      <text x="370" y="432" fontSize="11" fill="#aaa" fontFamily="monospace">• Preocupación constante por su madre</text>
      <line x1="370" y1="444" x2="650" y2="444" stroke="#F29251" strokeWidth="0.4" strokeOpacity="0.3"/>
      {/* problem statement */}
      <text x="370" y="462" fontSize="11" fontWeight="600" fill="#888" fontFamily="Inter, sans-serif">Problem statement</text>
      <text x="510" y="480" fontSize="11" textAnchor="middle" fill="#d4a070" fontStyle="italic" fontFamily="Inter, sans-serif">"Marcos necesita asistencia para</text>
      <text x="510" y="496" fontSize="11" textAnchor="middle" fill="#d4a070" fontStyle="italic" fontFamily="Inter, sans-serif">ayudar a su madre y mejorar su</text>
      <text x="510" y="512" fontSize="11" textAnchor="middle" fill="#d4a070" fontStyle="italic" fontFamily="Inter, sans-serif">condición cognitiva desde la distancia."</text>
    </svg>
  )
}

const STEP = 70
const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]]

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
      const nx = x + dx * len
      const ny = y + dy * len
      if (nx < 0 || nx > w || ny < 0 || ny > h) break
      x = nx; y = ny
      nodes.push({ x, y })
      dir = (dir + (Math.random() > 0.5 ? 1 : 3)) % 4
    }
    if (nodes.length >= 2) circuits.push({ nodes, pink: Math.random() < 0.4 })
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
      for (const { nodes, pink } of circuitsRef.current) {
        const color = pink ? 'rgba(232,160,144,' : 'rgba(0,212,255,'
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
      const color = circuit.pink ? '#e8a090' : '#00d4ff'
      ctx.save()
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 5)
      glow.addColorStop(0, circuit.pink ? 'rgba(232,160,144,0.8)' : 'rgba(0,212,255,0.8)')
      glow.addColorStop(1, circuit.pink ? 'rgba(232,160,144,0)' : 'rgba(0,212,255,0)')
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

const METRICAS = [
  { valor: '+34%', label: 'Tasa de finalización' },
  { valor: '-63%', label: 'Tiempo por tarea' },
  { valor: '9/10', label: 'Criterios WCAG 2.1' },
  { valor: '-66%', label: 'Abandono de flujos' },
]

const TAGS = ['Figma', 'UX/UI', 'WCAG', 'IoT', 'IA', 'Accesibilidad']

function Tag({ label }) {
  return (
    <span style={{
      fontFamily: 'monospace', fontSize: '11px', color: '#00d4ff',
      border: '1px solid rgba(0,212,255,0.35)', backgroundColor: 'rgba(0,212,255,0.06)',
      padding: '3px 10px', letterSpacing: '0.5px',
    }}>{label}</span>
  )
}

function SectionTitle({ numero, titulo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
      <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#00d4ff', opacity: 0.4 }}>
        {String(numero).padStart(2, '0')}
      </span>
      <h2 style={{ fontFamily: 'inherit', fontSize: '15px', fontWeight: 600, color: 'white', letterSpacing: '0.05em', margin: 0 }}>
        {titulo}
      </h2>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(0,212,255,0.12)' }} />
    </div>
  )
}

function SectionText({ children }) {
  return (
    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, marginBottom: '24px', fontFamily: 'inherit' }}>
      {children}
    </p>
  )
}

function MetricaCard({ valor, label }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? 'rgba(242,146,81,0.6)' : 'rgba(0,212,255,0.15)'}`,
        backgroundColor: hovered ? 'rgba(242,146,81,0.08)' : 'rgba(0,212,255,0.04)',
        padding: '12px 14px', borderRadius: '4px',
        boxShadow: hovered ? '0 0 16px rgba(242,146,81,0.2)' : 'none',
        transition: 'all 200ms ease', cursor: 'default',
      }}
    >
      <p style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F29251', margin: '0 0 4px 0', lineHeight: 1 }}>
        {valor}
      </p>
      <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.4 }}>
        {label}
      </p>
    </div>
  )
}

function AppStructure() {
  const mainStyle = {
    backgroundColor: '#F29251', color: 'white', fontWeight: 700,
    fontSize: '12px', padding: '10px 18px', borderRadius: '6px',
    textAlign: 'center', whiteSpace: 'nowrap',
    boxShadow: '0 4px 10px rgba(242,146,81,0.3)',
    fontFamily: "'Inter', sans-serif", flexShrink: 0,
  }
  const secStyle = {
    backgroundColor: '#346BB1', color: 'white', fontWeight: 700,
    fontSize: '12px', padding: '10px 18px', borderRadius: '6px',
    textAlign: 'center', whiteSpace: 'nowrap',
    boxShadow: '0 4px 10px rgba(52,107,177,0.3)',
    fontFamily: "'Inter', sans-serif", flexShrink: 0,
  }
  const hline = () => <div style={{ height: '2px', width: '28px', backgroundColor: 'rgba(255,255,255,0.3)', alignSelf: 'center', flexShrink: 0 }} />
  const vline = (h = '28px') => <div style={{ width: '2px', height: h, backgroundColor: 'rgba(255,255,255,0.3)', margin: '0 auto' }} />
  const arr = (d) => <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', lineHeight: 1, alignSelf: 'center', flexShrink: 0 }}>{d === 'down' ? '↓' : d === 'right' ? '→' : d === 'left' ? '←' : '↔'}</span>

  return (
    <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', padding: '32px 24px' }}>
      <div style={{ display: 'flex', gap: '24px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '3px', backgroundColor: '#F29251' }} />
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>Flujo Principal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '3px', backgroundColor: '#346BB1' }} />
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>Pantalla Extra — Flujo Secundario</span>
        </div>
      </div>
      <p style={{ textAlign: 'center', fontWeight: 700, fontSize: '14px', color: 'white', letterSpacing: '0.15em', marginBottom: '28px', fontFamily: "'Inter', sans-serif" }}>ESTRUCTURA DE LA APP</p>

      {/* Row 1: Flujo de Registro */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={mainStyle}>Flujo de Registro</div>
      </div>

      {/* Smart Dispenser Guide a izq + línea vertical */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', minHeight: '70px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '16px' }}>
          <div style={secStyle}>Guía Smart Dispenser</div>
          {hline()}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {vline('70px')}
        </div>
        <div />
      </div>

      {/* Row 2: Schedule ↔ Pantalla de Inicio ↔ Medication */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={mainStyle}>Flujo de Citas Médicas</div>
        {hline()}{arr('right')}{hline()}
        <div style={mainStyle}>Pantalla de Inicio</div>
        {hline()}{arr('left')}{hline()}
        <div style={mainStyle}>Agenda de Medicación</div>
      </div>

      {/* Línea vertical al centro */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
        {vline('28px')}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>{arr('down')}</div>

      {/* Row 3: Game ← Perfil → Progress */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={secStyle}>Pantalla de Juegos</div>
        {hline()}{arr('left')}{hline()}
        <div style={secStyle}>Perfil</div>
        {hline()}{arr('right')}{hline()}
        <div style={secStyle}>Pantalla de Progreso</div>
      </div>

      {/* Flechas abajo desde Game y Progress */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginTop: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>{arr('down')}</div>
        <div />
        <div style={{ display: 'flex', justifyContent: 'center' }}>{arr('down')}</div>
      </div>

      {/* Row 4: Help & Support → Accessibility ← Smart Dispenser */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={secStyle}>Ayuda y Soporte</div>
        {hline()}{arr('right')}{hline()}
        <div style={secStyle}>Pantalla de Accesibilidad</div>
        {hline()}{arr('left')}{hline()}
        <div style={secStyle}>Pantallas Smart Dispenser</div>
      </div>
    </div>
  )
}

function TablaComparativa() {
  const filas = [
    { metrica: 'Tasa de finalización de tareas', original: '58% (flujo de citas)', rediseno: '92% (flujo de citas)', mejora: '+34%' },
    { metrica: 'Tiempo promedio por tarea', original: '2.1 min (agendar cita)', rediseno: '45 seg (agendar cita)', mejora: '-63%' },
    { metrica: 'Accesibilidad WCAG 2.1', original: 'Cumple 3/10 criterios', rediseno: 'Cumple 9/10 criterios', mejora: '+200%' },
    { metrica: 'Componentes reutilizables', original: '0% (diseño estático)', rediseno: '100% (sistema en Figma)', mejora: '+100%' },
    { metrica: 'Retención a 30 días (sim. IA)', original: '40%', rediseno: '75%', mejora: '+35 pts' },
    { metrica: 'Satisfacción CSAT', original: '3.2/5', rediseno: '4.8/5', mejora: '+1.6' },
  ]
  const thStyle = { padding: '10px 14px', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }
  return (
    <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif" }}>
        <thead>
          <tr style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <th style={{ ...thStyle, color: 'rgba(255,255,255,0.5)' }}>Métrica</th>
            <th style={{ ...thStyle, color: '#F29251' }}>Boost Original</th>
            <th style={{ ...thStyle, color: '#00d4ff' }}>Rediseño</th>
            <th style={{ ...thStyle, color: '#4ade80', textAlign: 'center' }}>Mejora</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((f, i) => (
            <tr key={f.metrica} style={{ backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
              <td style={{ padding: '10px 14px', fontSize: '13px', color: 'rgba(255,255,255,0.75)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{f.metrica}</td>
              <td style={{ padding: '10px 14px', fontSize: '13px', color: 'rgba(242,146,81,0.7)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{f.original}</td>
              <td style={{ padding: '10px 14px', fontSize: '13px', color: 'rgba(0,212,255,0.85)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{f.rediseno}</td>
              <td style={{ padding: '10px 14px', fontSize: '13px', color: '#4ade80', fontWeight: 700, textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{f.mejora}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function DisenoVisual() {
  const filas = [
    { elemento: 'Colores', antes: 'Paleta estridente, anticuada, inaccesible', despues: 'Naranja (#F29251) + Azul (#346BB1) + Verde calmado (#C3DBD6). Cumple WCAG.' },
    { elemento: 'Tipografía', antes: 'Tipografía decorativa, baja legibilidad', despues: 'Inter (alta legibilidad) + Grandstander (toque accesible y amigable).' },
    { elemento: 'Iconos', antes: 'Iconos ambiguos sin etiquetas', despues: 'Iconos acompañados de etiquetas textuales y tooltips explicativos.' },
    { elemento: 'Estética general', antes: 'Anticuada, bordes duros, diseño rígido', despues: 'Estilo moderno con bordes redondeados, mejor espacio negativo y divisiones claras.' },
  ]
  return (
    <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif" }}>
        <thead>
          <tr style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <th style={{ padding: '10px 14px', fontSize: '11px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', textTransform: 'uppercase', letterSpacing: '1px' }}>Elemento</th>
            <th style={{ padding: '10px 14px', fontSize: '11px', fontFamily: 'monospace', color: '#F29251', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', textTransform: 'uppercase', letterSpacing: '1px' }}>Antes</th>
            <th style={{ padding: '10px 14px', fontSize: '11px', fontFamily: 'monospace', color: '#00d4ff', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', textTransform: 'uppercase', letterSpacing: '1px' }}>Rediseño</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((f, i) => (
            <tr key={f.elemento} style={{ backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
              <td style={{ padding: '10px 14px', fontSize: '13px', color: 'white', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.05)', whiteSpace: 'nowrap' }}>{f.elemento}</td>
              <td style={{ padding: '10px 14px', fontSize: '13px', color: 'rgba(242,146,81,0.7)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{f.antes}</td>
              <td style={{ padding: '10px 14px', fontSize: '13px', color: 'rgba(0,212,255,0.85)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{f.despues}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function MockupPair({ mockup, screen, mockupAlt, screenAlt }) {
  return (
    <div style={{ display: 'flex', gap: '64px', alignItems: 'center', justifyContent: 'center' }}>
      <img src={mockup} alt={mockupAlt} style={{ width: '30%', objectFit: 'contain', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }} />
      <img src={screen} alt={screenAlt} style={{ width: '30%', objectFit: 'contain', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }} />
    </div>
  )
}

function Separador({ titulo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '52px 0' }}>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(242,146,81,0.2)' }} />
      <span style={{ fontSize: '16px', fontWeight: 700, color: '#F29251', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{titulo}</span>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(242,146,81,0.2)' }} />
    </div>
  )
}

function BoostCaseStudy({ onClose }) {
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
    <div ref={containerRef} className="boost-case-study" style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: '#050d1a', overflowY: 'auto', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* Circuitos de fondo en toda la página */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <CircuitCanvas reduceMotion={reduceMotion} />
      </div>

      {/* Botones flotantes */}
      {showScroll && (
        <div style={{
          position: 'fixed', bottom: '32px', right: '24px', zIndex: 50,
          display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center',
        }}>
          {/* Subir */}
          <button onClick={scrollToTop} title="Ir al inicio"
            style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(0,212,255,0.4)', backgroundColor: 'rgba(5,13,26,0.9)', backdropFilter: 'blur(8px)', color: '#00d4ff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(0,212,255,0.15)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(0,212,255,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(5,13,26,0.9)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)' }}>
            <MdKeyboardArrowUp size={24} />
          </button>
          {/* Volver a proyectos */}
          <button onClick={onClose} title="Volver a proyectos"
            style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(232,160,144,0.4)', backgroundColor: 'rgba(5,13,26,0.9)', backdropFilter: 'blur(8px)', color: '#e8a090', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(232,160,144,0.15)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(232,160,144,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(5,13,26,0.9)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)' }}>
            <MdHome size={22} />
          </button>
          {/* WhatsApp */}
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" title="WhatsApp"
            style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(37,211,102,0.4)', backgroundColor: 'rgba(5,13,26,0.9)', backdropFilter: 'blur(8px)', color: '#25d366', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(37,211,102,0.15)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(37,211,102,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(5,13,26,0.9)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)' }}>
            <FaWhatsapp size={22} />
          </a>
        </div>
      )}

      {/* Header sticky */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'rgba(5,13,26,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,212,255,0.1)', padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 200ms', fontFamily: 'monospace' }}
            onMouseEnter={e => e.currentTarget.style.color = '#00d4ff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>
            ← Volver a proyectos
          </button>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#F29251', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Boost</span>
        </div>
        <a href="https://www.figma.com/proto/stYvd6qZJqLqMWupuM2dEt/Boost?node-id=223-2266" target="_blank" rel="noopener noreferrer"
          style={{ fontSize: '12px', color: '#e8a090', border: '1px solid rgba(232,160,144,0.4)', padding: '7px 16px', textDecoration: 'none', fontFamily: 'monospace', transition: 'all 200ms', letterSpacing: '0.5px' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(232,160,144,0.1)'; e.currentTarget.style.borderColor = '#e8a090' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(232,160,144,0.4)' }}>
          Ver prototipo en Figma →
        </a>
      </div>

      {/* HERO */}
      <div style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(0,212,255,0.08)', zIndex: 1 }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '64px 32px', display: 'grid', gridTemplateColumns: '0.85fr 1.5fr', gap: '48px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#00d4ff', letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.6, margin: 0 }}>Caso de Estudio · UX/UI · HealthTech</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#F29251', margin: 0, lineHeight: 1.1 }}>BOOST</h1>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.55, margin: 0 }}>Plataforma de Salud Cognitiva Inclusiva con IA e IoT</p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic', lineHeight: 1.7, margin: 0, borderLeft: '2px solid rgba(0,212,255,0.3)', paddingLeft: '12px' }}>
              "Rediseño UX/UI — de 3/10 a 9/10 criterios WCAG para adultos mayores, cuidadores y personas con necesidades especiales"
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {TAGS.map(tag => <Tag key={tag} label={tag} />)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {METRICAS.map((m) => <MetricaCard key={m.label} valor={m.valor} label={m.label} />)}
            </div>
            <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)', margin: 0, lineHeight: 1.5 }}>
              * Métricas proyectadas mediante análisis con IA especializada basado en heurísticas UX y principios WCAG.
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <img src={boostOverview} alt="Boost Project Overview" style={{ width: '100%', display: 'block', borderRadius: '8px', maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 4%, black 94%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 4%, black 94%, transparent 100%)', maskComposite: 'intersect', WebkitMaskComposite: 'destination-in' }} />
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '56px 32px 80px', position: 'relative', zIndex: 1 }}>

        <Separador titulo="Introducción al Proyecto" />

        {/* 1. Introducción */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={1} titulo="Sobre Boost" />
          <SectionText>
            Boost es una app móvil de salud cognitiva diseñada para facilitar la gestión de medicación y mejorar el bienestar mental. Aunque nació pensando en adultos mayores y personas con discapacidad cognitiva, su diseño accesible la hace útil para cualquier persona que necesite mantener su vida médica en orden — desde un paciente con cáncer hasta un universitario con múltiples responsabilidades. Un diseño verdaderamente accesible beneficia a todos.
          </SectionText>

          {/* Público objetivo */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {[
              '👴 Adultos mayores',
              '🧠 Discapacidad cognitiva',
              '🎗️ Enfermedades crónicas',
              '👨‍👩‍👧 Padres con hijos con necesidades especiales',
              '🎓 Universitarios',
              '💼 Personas ocupadas',
              '👨‍👩‍👦 Cuidadores familiares',
            ].map(p => (
              <span key={p} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(242,146,81,0.08)', border: '1px solid rgba(242,146,81,0.2)', borderRadius: '20px', padding: '4px 12px' }}>{p}</span>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '8px' }}>
            {[
              { icon: '🩺', titulo: 'Gestión médica', desc: 'Agenda de medicación, citas con recordatorios y sincronización con Smart Dispenser' },
              { icon: '🧠', titulo: 'Terapia cognitiva', desc: 'Juegos de Memoria, Atención y Lógica con IA adaptativa según progreso médico' },
              { icon: '👥', titulo: 'Soporte cuidadores', desc: 'Notificaciones en tiempo real vía email o WhatsApp para el Partner asignado' },
            ].map(item => (
              <div key={item.titulo} style={{ backgroundColor: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)', borderRadius: '8px', padding: '16px' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>{item.icon}</span>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', margin: '0 0 4px 0' }}>{item.titulo}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. El Problema */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={2} titulo="El Problema" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '32px' }}>
            {[
              { cat: 'Visual', color: '#F29251', items: ['Bordes exagerados y paleta inaccesible', 'Falta de jerarquía visual en información clave'] },
              { cat: 'Funcional', color: '#F29251', items: ['Solo incluía juegos y calendario básico', 'Sección de comunidad riesgosa para usuarios cognitivos'] },
              { cat: 'Flujos Críticos', color: '#e8a090', items: ['Agendar citas requería 7 pasos manuales', 'Sin integración con salud física (medicación)'] },
              { cat: 'Escalabilidad', color: '#e8a090', items: ['Sin notas para devs ni estados de componentes', 'Sin guía de estilo: variables, tipografía, animaciones'] },
            ].map(g => (
              <div key={g.cat} style={{ backgroundColor: 'rgba(242,146,81,0.04)', border: '1px solid rgba(242,146,81,0.15)', borderRadius: '8px', padding: '16px' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: g.color, margin: '0 0 10px 0', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'monospace' }}>{g.cat}</p>
                {g.items.map(item => (
                  <div key={item} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ color: '#F29251', flexShrink: 0, fontSize: '12px' }}>✕</span>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Before / After visual */}
          <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
            // Versión original vs Rediseño
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Antes */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F29251' }} />
                <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#F29251', letterSpacing: '1px', textTransform: 'uppercase' }}>Versión Original</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <img src={boostLandingV1} alt="Boost Landing V1" style={{ width: '45%', borderRadius: '8px', border: '2px solid rgba(242,146,81,0.3)' }} />
                <img src={boostCitasV1} alt="Boost Citas V1" style={{ width: '45%', borderRadius: '8px', border: '2px solid rgba(242,146,81,0.3)' }} />
              </div>
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['Paleta estridente sin contraste WCAG', 'Flujo de citas en 7+ pasos', 'Comunidad sin moderación'].map(p => (
                  <div key={p} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#F29251', fontSize: '12px', flexShrink: 0 }}>✕</span>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{p}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Después */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00d4ff' }} />
                <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#00d4ff', letterSpacing: '1px', textTransform: 'uppercase' }}>Rediseño</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <img src={boostLandingNew} alt="Boost Landing Rediseño" style={{ width: '45%', borderRadius: '8px', border: '2px solid rgba(0,212,255,0.3)' }} />
                <img src={boostAppointmentNew} alt="Boost Citas Rediseño" style={{ width: '45%', borderRadius: '8px', border: '2px solid rgba(0,212,255,0.3)' }} />
              </div>
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['Paleta WCAG 2.1 con contraste 4.5:1', 'Flujo de citas en 3 pasos con IA', 'Comunidad eliminada → notificaciones cuidador'].map(p => (
                  <div key={p} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#00d4ff', fontSize: '12px', flexShrink: 0 }}>✓</span>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Mi Rol y Enfoque */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={3} titulo="Mi Rol y Enfoque" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              { titulo: 'Investigación y Diagnóstico', icon: '🔍', items: ['Testeos con 3 adultos mayores y 3 cuidadores', 'Identifiqué puntos de dolor: 78% abandonaba el flujo de citas', 'Análisis heurístico de la versión original'] },
              { titulo: 'UX/UI Design', icon: '🎨', items: ['Nueva paleta WCAG 2.1 (alto contraste)', 'Componentes reutilizables en Figma', 'Flujos simplificados con happy path + errores'] },
              { titulo: 'Prototipado y Validación', icon: '⚙️', items: ['Prototipo interactivo en Figma', 'Pruebas iterativas con usuarios simulados', 'Ajustes basados en feedback continuo'] },
              { titulo: 'Documentación Técnica', icon: '📋', items: ['Sistema de diseño modular (botones, inputs, cards)', 'Variables para color, tipografía y espaciado', 'Notas para devs: estados hover/error, APIs, validaciones'] },
            ].map(r => (
              <div key={r.titulo} style={{ backgroundColor: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.12)', borderRadius: '8px', padding: '16px' }}>
                <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', margin: '0 0 10px 0' }}>{r.icon} {r.titulo}</p>
                {r.items.map(item => (
                  <div key={item} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ color: '#00d4ff', flexShrink: 0, fontSize: '12px' }}>✓</span>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <Separador titulo="Proceso de Diseño" />

        {/* Diagrama Design Thinking */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={4} titulo="Mi Proceso de Diseño" />
          <SectionText>Apliqué la metodología Design Thinking en 5 fases — desde la investigación con usuarios reales hasta el prototipado y testeo iterativo.</SectionText>
          <svg width="100%" viewBox="0 0 900 460" role="img" aria-label="Proceso de Diseño">
            <defs>
              <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="rgba(255,255,255,0.35)"/>
              </marker>
              <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#346BB1" stopOpacity="0.25"/><stop offset="100%" stopColor="#00d4ff" stopOpacity="0.15"/></linearGradient>
              <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#F29251" stopOpacity="0.22"/><stop offset="100%" stopColor="#e8a090" stopOpacity="0.12"/></linearGradient>
              <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#4ade80" stopOpacity="0.18"/><stop offset="100%" stopColor="#00d4ff" stopOpacity="0.1"/></linearGradient>
              <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#F29251" stopOpacity="0.2"/><stop offset="100%" stopColor="#e8a090" stopOpacity="0.1"/></linearGradient>
              <linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e8a090" stopOpacity="0.22"/><stop offset="100%" stopColor="#346BB1" stopOpacity="0.12"/></linearGradient>
              {/* foco de luz hacia el diagrama */}
              <radialGradient id="spotlight" cx="0%" cy="10%" r="100%" fx="0%" fy="10%">
                <stop offset="0%" stopColor="rgba(255,245,200,0.22)"/>
                <stop offset="50%" stopColor="rgba(255,245,200,0.08)"/>
                <stop offset="100%" stopColor="rgba(255,245,200,0)"/>
              </radialGradient>
            </defs>

            {/* efecto foco de luz apuntando hacia la derecha */}
            <polygon points="0,20 900,100 900,300 0,20" fill="rgba(255,245,180,0.05)"/>
            <polygon points="0,20 900,150 900,250 0,20" fill="rgba(255,245,180,0.04)"/>
            <ellipse cx="100" cy="200" rx="800" ry="200" fill="url(#spotlight)"/>

            {/* linterna apuntando a la derecha */}
            <rect x="2" y="12" width="28" height="16" rx="4" fill="#2a2a2a"/>
            <rect x="26" y="16" width="10" height="8" rx="2" fill="#1a1a1a"/>
            <circle cx="10" cy="20" r="6" fill="#ffe066" fillOpacity="0.9"/>
            <circle cx="10" cy="20" r="3" fill="white"/>

            {/* flechas */}
            <path d="M188 145 Q240 210 272 285" stroke="rgba(0,212,255,0.3)" strokeWidth="1.8" fill="none" markerEnd="url(#arr)"/>
            <path d="M358 295 Q395 210 432 160" stroke="rgba(232,160,144,0.3)" strokeWidth="1.8" fill="none" markerEnd="url(#arr)"/>
            <path d="M522 145 Q558 210 588 278" stroke="rgba(74,222,128,0.3)" strokeWidth="1.8" fill="none" markerEnd="url(#arr)"/>
            <path d="M678 295 Q710 210 742 155" stroke="rgba(242,146,81,0.3)" strokeWidth="1.8" fill="none" markerEnd="url(#arr)"/>

            {/* 1 INVESTIGAR */}
            <circle cx="150" cy="115" r="88" fill="url(#g1)" stroke="#00d4ff" strokeWidth="1.2"/>
            <circle cx="150" cy="78" r="14" fill="none" stroke="#00d4ff" strokeWidth="1.5"/>
            <path d="M143 78 Q150 72 157 78 Q150 84 143 78Z" fill="#00d4ff" fillOpacity="0.4"/>
            <line x1="150" y1="92" x2="150" y2="98" stroke="#00d4ff" strokeWidth="1.5"/>
            <text x="150" y="112" fontSize="11" fontWeight="800" textAnchor="middle" fill="#00d4ff" fontFamily="Inter,sans-serif" letterSpacing="2">INVESTIGAR</text>
            <text x="150" y="128" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">Brainstorming e investigación</text>
            <text x="150" y="141" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">sobre usuarios, mercado</text>
            <text x="150" y="154" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">y competidores.</text>
            <circle cx="195" cy="65" r="10" fill="#00d4ff"/>
            <text x="195" y="69" fontSize="10" fontWeight="700" textAnchor="middle" fill="#050d1a" fontFamily="Inter,sans-serif">1</text>

            {/* 2 EMPATIZAR */}
            <circle cx="315" cy="310" r="88" fill="url(#g2)" stroke="#e8a090" strokeWidth="1.2"/>
            <circle cx="308" cy="272" r="7" fill="none" stroke="#e8a090" strokeWidth="1.5"/>
            <circle cx="322" cy="272" r="7" fill="none" stroke="#e8a090" strokeWidth="1.5"/>
            <path d="M300 287 Q308 282 316 287" stroke="#e8a090" strokeWidth="1.3" fill="none"/>
            <path d="M314 287 Q322 282 330 287" stroke="#e8a090" strokeWidth="1.3" fill="none"/>
            <text x="315" y="302" fontSize="11" fontWeight="800" textAnchor="middle" fill="#e8a090" fontFamily="Inter,sans-serif" letterSpacing="2">EMPATIZAR</text>
            <text x="315" y="318" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">Empatizar con usuarios,</text>
            <text x="315" y="331" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">sus necesidades,</text>
            <text x="315" y="344" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">requerimientos y emociones.</text>
            <circle cx="360" cy="262" r="10" fill="#e8a090"/>
            <text x="360" y="266" fontSize="10" fontWeight="700" textAnchor="middle" fill="#050d1a" fontFamily="Inter,sans-serif">2</text>

            {/* 3 DEFINIR */}
            <circle cx="480" cy="115" r="88" fill="url(#g3)" stroke="#4ade80" strokeWidth="1.2"/>
            <circle cx="480" cy="78" r="14" fill="none" stroke="#4ade80" strokeWidth="1.5"/>
            <circle cx="480" cy="78" r="7" fill="none" stroke="#4ade80" strokeWidth="1.2"/>
            <circle cx="480" cy="78" r="2.5" fill="#4ade80"/>
            <text x="480" y="108" fontSize="11" fontWeight="800" textAnchor="middle" fill="#4ade80" fontFamily="Inter,sans-serif" letterSpacing="2">DEFINIR</text>
            <text x="480" y="124" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">¿Por qué es importante?</text>
            <text x="480" y="137" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">Investigar, observar, entender</text>
            <text x="480" y="150" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">y crear un punto de vista.</text>
            <circle cx="525" cy="65" r="10" fill="#4ade80"/>
            <text x="525" y="69" fontSize="10" fontWeight="700" textAnchor="middle" fill="#050d1a" fontFamily="Inter,sans-serif">3</text>

            {/* 4 IDEAR */}
            <circle cx="645" cy="310" r="88" fill="url(#g4)" stroke="#F29251" strokeWidth="1.2"/>
            <circle cx="645" cy="272" r="10" fill="none" stroke="#F29251" strokeWidth="1.5"/>
            <path d="M641 282 L649 282" stroke="#F29251" strokeWidth="1.3"/>
            <path d="M642 286 L648 286" stroke="#F29251" strokeWidth="1.3"/>
            <line x1="645" y1="262" x2="645" y2="258" stroke="#F29251" strokeWidth="1.3"/>
            <line x1="635" y1="265" x2="632" y2="262" stroke="#F29251" strokeWidth="1.3"/>
            <line x1="655" y1="265" x2="658" y2="262" stroke="#F29251" strokeWidth="1.3"/>
            <text x="645" y="302" fontSize="11" fontWeight="800" textAnchor="middle" fill="#F29251" fontFamily="Inter,sans-serif" letterSpacing="2">IDEAR</text>
            <text x="645" y="318" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">Qué no encuentran en</text>
            <text x="645" y="331" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">apps similares. Qué necesidades</text>
            <text x="645" y="344" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">no están siendo satisfechas.</text>
            <circle cx="690" cy="262" r="10" fill="#F29251"/>
            <text x="690" y="266" fontSize="10" fontWeight="700" textAnchor="middle" fill="#050d1a" fontFamily="Inter,sans-serif">4</text>

            {/* 5 PROTOTIPAR + TESTEAR */}
            <circle cx="810" cy="115" r="88" fill="url(#g5)" stroke="#346BB1" strokeWidth="1.2"/>
            <rect x="796" y="68" width="28" height="20" rx="3" fill="none" stroke="#346BB1" strokeWidth="1.5"/>
            <line x1="810" y1="88" x2="810" y2="94" stroke="#346BB1" strokeWidth="1.5"/>
            <line x1="804" y1="94" x2="816" y2="94" stroke="#346BB1" strokeWidth="1.5"/>
            <text x="810" y="108" fontSize="10" fontWeight="800" textAnchor="middle" fill="#346BB1" fontFamily="Inter,sans-serif" letterSpacing="1">PROTOTIPAR</text>
            <text x="810" y="121" fontSize="8.5" fontWeight="700" textAnchor="middle" fill="#e8a090" fontFamily="Inter,sans-serif">+ TESTEAR</text>
            <text x="810" y="135" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">Wireframes, mockups,</text>
            <text x="810" y="148" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">style guide. Test de</text>
            <text x="810" y="161" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">usabilidad e iteración.</text>
            <circle cx="855" cy="65" r="10" fill="#346BB1"/>
            <text x="855" y="69" fontSize="10" fontWeight="700" textAnchor="middle" fill="white" fontFamily="Inter,sans-serif">5</text>

            <text x="450" y="440" fontSize="10" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontFamily="monospace" letterSpacing="3">PROCESO DE DISEÑO — DESIGN THINKING</text>
          </svg>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={5} titulo="User Personas" />
          <SectionText>Definí dos perfiles basados en investigación real con usuarios — Carmen (usuario principal) y Marcos (cuidador). Estas personas guiaron cada decisión de diseño del rediseño.</SectionText>
          <UserPersonas />
        </div>

        {/* Journey Maps */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={6} titulo="Journey Maps" />
          <SectionText>Documenté el recorrido emocional de Carmen y Marcos antes de Boost — los puntos de frustración que identifiqué aquí justifican cada decisión de diseño del rediseño.</SectionText>

          {/* Carmen Journey Map */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#346BB1', flexShrink: 0 }} />
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#346BB1', margin: 0, fontFamily: 'monospace', letterSpacing: '1px', textTransform: 'uppercase' }}>Carmen — Objetivo: Mejorar su condición de vida</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
              {[
                { accion: 'Reconoce que necesita ayuda', tarea: 'Habla con sus hijos sobre su deseo de mejorar su condición e independencia.', emoji: '💭', color: '#346BB1', nivel: 'neutral' },
                { accion: 'Marcos instala una app', tarea: 'Busca en la tienda, encuentra una app con algunas funciones pero no todas las necesarias.', emoji: '📱', color: '#4ade80', nivel: 'positivo' },
                { accion: 'La app es difícil de usar', tarea: 'Carmen intenta configurar su cuenta pero no entiende el proceso aunque hay un video explicativo.', emoji: '😕', color: '#F29251', nivel: 'negativo' },
                { accion: 'Necesita ayuda y nadie tiene tiempo', tarea: 'Espera asistencia de sus hijos para configurar la app pero nadie tiene tiempo o paciencia.', emoji: '😔', color: '#e8a090', nivel: 'negativo' },
                { accion: 'Abandona la app', tarea: 'Carmen deja de usar la app y no recibe la asistencia que necesita para mejorar su vida.', emoji: '❌', color: '#f87171', nivel: 'critico' },
              ].map((paso, i) => (
                <div key={i} style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: `1px solid ${paso.color}40`, borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '18px' }}>{paso.emoji}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '10px', color: paso.color }}>0{i + 1}</span>
                  </div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: 'white', margin: 0, lineHeight: 1.4 }}>{paso.accion}</p>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.5 }}>{paso.tarea}</p>
                  <div style={{ height: '3px', borderRadius: '2px', backgroundColor: paso.color, opacity: 0.6, marginTop: 'auto' }} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: '10px', padding: '10px 14px', backgroundColor: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '6px' }}>
              <p style={{ fontSize: '12px', color: '#f87171', margin: 0, lineHeight: 1.6 }}>
                <strong>💡 Insight:</strong> Carmen abandona la app por complejidad y falta de soporte. Boost responde con flujos simplificados, tooltips, mensajes de ayuda contextual y configuración asistida desde el registro.
              </p>
            </div>
          </div>

          {/* Marcos Journey Map */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F29251', flexShrink: 0 }} />
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#F29251', margin: 0, fontFamily: 'monospace', letterSpacing: '1px', textTransform: 'uppercase' }}>Marcos — Objetivo: Saber si su madre está bien y tomó su medicación</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
              {[
                { accion: 'Intenta contactar a su madre', tarea: 'Llama a su hermano y escribe a su madre por WhatsApp pero no obtiene respuesta.', emoji: '📞', color: '#4ade80', nivel: 'neutral' },
                { accion: 'Investiga opciones', tarea: 'Busca cómo familiares de personas con deterioro cognitivo pueden saber si tomaron su medicación.', emoji: '🔍', color: '#4ade80', nivel: 'positivo' },
                { accion: 'Encuentra una app', tarea: 'Instala una app de recordatorios disponible en la tienda.', emoji: '📲', color: '#F29251', nivel: 'neutral' },
                { accion: 'La app no cubre sus necesidades', tarea: 'Se frustra porque la app no permite saber si su madre tomó los medicamentos ni ver su ubicación.', emoji: '😤', color: '#e8a090', nivel: 'negativo' },
                { accion: 'No encuentra solución completa', tarea: 'Busca otras apps pero ninguna permite compartir el estado del usuario en tiempo real con un cuidador.', emoji: '❌', color: '#f87171', nivel: 'critico' },
              ].map((paso, i) => (
                <div key={i} style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: `1px solid ${paso.color}40`, borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '18px' }}>{paso.emoji}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '10px', color: paso.color }}>0{i + 1}</span>
                  </div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: 'white', margin: 0, lineHeight: 1.4 }}>{paso.accion}</p>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.5 }}>{paso.tarea}</p>
                  <div style={{ height: '3px', borderRadius: '2px', backgroundColor: paso.color, opacity: 0.6, marginTop: 'auto' }} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: '10px', padding: '10px 14px', backgroundColor: 'rgba(242,146,81,0.08)', border: '1px solid rgba(242,146,81,0.2)', borderRadius: '6px' }}>
              <p style={{ fontSize: '12px', color: '#F29251', margin: 0, lineHeight: 1.6 }}>
                <strong>💡 Insight:</strong> Ninguna app existente permite al cuidador monitorear al usuario en tiempo real. Boost responde con la función Partner, notificaciones vía WhatsApp y el Smart Dispenser con alertas de dosis omitidas.
              </p>
            </div>
          </div>
        </div>

        {/* Competitive Audit */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={7} titulo="Competitive Audit" />
          <SectionText>Analicé 4 competidores directos e indirectos para identificar oportunidades que ninguna app estaba cubriendo. Los hallazgos confirmaron la necesidad de Boost y definieron sus diferenciadores clave.</SectionText>
          <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif", minWidth: '700px' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                  {['Competidor', 'Tipo', 'Fortalezas', 'Debilidades', 'Oportunidad para Boost'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', fontSize: '11px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { nombre: 'Lumosity', tipo: 'Directo', fortalezas: 'Diseño claro, fácil de usar, múltiples idiomas', debilidades: 'User flow atascado, sin estadísticas, sin función de cuidador', oportunidad: 'Flujos simplificados + panel de progreso + Partner' },
                  { nombre: 'CogniFit', tipo: 'Directo', fortalezas: 'Informativo, diseño atractivo, navegación clara', debilidades: 'Tooltips que no funcionan, sin integración IoT, sin cuidador', oportunidad: 'Accesibilidad real + Smart Dispenser + notificaciones' },
                  { nombre: 'Neuronation', tipo: 'Indirecto', fortalezas: 'Excelente accesibilidad, dark mode, modo daltónico', debilidades: 'Sin función de cuidador, sin gestión médica', oportunidad: 'Integrar salud médica + cuidador en un solo lugar' },
                  { nombre: 'GEIST', tipo: 'Directo', fortalezas: 'Identidad de marca fuerte, meditación y sueño', debilidades: 'Sin website, sin dark mode, flujo poco enganchante', oportunidad: 'Experiencia completa web + app + accesibilidad WCAG' },
                ].map((c, i) => (
                  <tr key={c.nombre} style={{ backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                    <td style={{ padding: '10px 14px', fontSize: '13px', color: '#F29251', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{c.nombre}</td>
                    <td style={{ padding: '10px 14px', fontSize: '12px', color: 'rgba(255,255,255,0.5)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontFamily: 'monospace' }}>{c.tipo}</td>
                    <td style={{ padding: '10px 14px', fontSize: '12px', color: 'rgba(0,212,255,0.8)', borderBottom: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.5 }}>{c.fortalezas}</td>
                    <td style={{ padding: '10px 14px', fontSize: '12px', color: 'rgba(248,113,113,0.8)', borderBottom: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.5 }}>{c.debilidades}</td>
                    <td style={{ padding: '10px 14px', fontSize: '12px', color: 'rgba(74,222,128,0.8)', borderBottom: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.5 }}>{c.oportunidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '12px', padding: '12px 16px', backgroundColor: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '6px' }}>
            <p style={{ fontSize: '12px', color: '#4ade80', margin: 0, lineHeight: 1.7 }}>
              <strong>💡 Conclusión:</strong> Ningún competidor combina gestión médica + terapia cognitiva + función de cuidador + IoT en una sola plataforma accesible. Esa brecha es exactamente lo que Boost viene a llenar.
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={8} titulo="Estructura de la App" />
          <SectionText>La app se divide en flujos principales: Registro, Pantalla de Inicio, Agenda de Medicación, Citas Médicas, Juegos Cognitivos, Smart Dispenser y Pantalla de Accesibilidad.</SectionText>
          <AppStructure />
        </div>

        {/* 5. Proceso */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={9} titulo="Wireframes y Prototipo" />
          <SectionText>Partí de wireframes de baja fidelidad para validar la estructura antes de aplicar el sistema visual. El before/after de la Home Screen muestra la evolución: de un menú desorganizado a una jerarquía visual clara con accesos rápidos y progreso visible a primera vista.</SectionText>
          <img src={boostWireframe} alt="Wireframe vs Prototipo" style={{ width: '100%', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '16px', display: 'block' }} />
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', textAlign: 'center', marginBottom: '12px' }}>
            // Flujo de registro — Account Registration User Flow
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
            <img src={boostUserFlow} alt="Registration User Flow" style={{ width: '100%', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { num: '01', titulo: 'Progresión clara', desc: 'Las 4 pantallas muestran un flujo paso a paso sin saltos — el usuario siempre sabe dónde está.' },
                { num: '02', titulo: 'Diseño inclusivo desde el inicio', desc: 'Campos grandes, bien etiquetados y con suficiente espacio táctil — pensado para adultos mayores.' },
                { num: '03', titulo: 'Partner integrado estratégicamente', desc: '"Choose a Partner" aparece en el registro mismo, cuando el usuario todavía tiene ayuda cerca.' },
                { num: '04', titulo: 'Decisión IoT en el momento justo', desc: '"Link a Smart Dispenser" al final del registro — el usuario ya entiende la app y puede decidir informado.' },
                { num: '05', titulo: 'Progressive Disclosure', desc: 'El formulario se llena gradualmente (nombre → fecha → foto → partner → dispensador), nunca abruma.' },
              ].map(p => (
                <div key={p.num} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#F29251', opacity: 0.6, flexShrink: 0, marginTop: '2px' }}>{p.num}</span>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', margin: '0 0 3px 0' }}>{p.titulo}</p>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Diseño Visual */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={10} titulo="Diseño Visual — Antes y Después" />
          <SectionText>El rediseño transformó la estética de la app manteniendo su identidad, pero elevando la accesibilidad y modernidad de cada elemento visual.</SectionText>
          <DisenoVisual />
        </div>

        {/* 7. Juegos Cognitivos */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={11} titulo="Juegos Cognitivos" />
          <SectionText>La sección de juegos no es entretenimiento — es terapia. Dividí las actividades en tres categorías cognitivas: Memoria, Atención y Lógica, que son precisamente las áreas más afectadas en el deterioro cognitivo y en condiciones como el TDAH. Cada categoría tiene un propósito clínico: la memoria trabaja la retención, la atención entrena el enfoque sostenido y la lógica estimula el razonamiento ejecutivo. La IA adapta la dificultad según el progreso médico real del usuario — no es un nivel fijo, es una terapia que evoluciona con la persona.</SectionText>
          <div style={{ display: 'flex', gap: '64px', alignItems: 'center', justifyContent: 'center' }}>
            <img src={boostGameMockup} alt="Games Mockup" style={{ width: '30%', objectFit: 'contain', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }} />
            <img src={boostGame} alt="Games Screen" style={{ width: '30%', objectFit: 'contain', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }} />
          </div>
        </div>

        {/* 8. Tu Progreso */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={12} titulo="Tu Progreso" />
          <SectionText>El panel de progreso fue diseñado pensando en tres audiencias a la vez: el usuario que necesita motivación, el cuidador que necesita tranquilidad y el médico que necesita datos. Los gráficos de barras muestran la adherencia diaria a medicamentos y el avance cognitivo en cada categoría de juego. Un mensaje motivacional acompaña siempre los datos — porque para alguien con deterioro cognitivo, ver números sin contexto puede ser frustrante. La combinación de dato + estímulo positivo no es casual: está basada en lo que observé directamente con mi familia. El médico puede ajustar el tratamiento sin esperar la próxima cita. El cuidador puede actuar antes de que el deterioro avance. El usuario siente que su esfuerzo diario tiene sentido.</SectionText>
          <MockupPair mockup={boostProgressMockup} screen={boostProgress} mockupAlt="Your Progress Mockup" screenAlt="Your Pantalla de Progreso" />
        </div>

        {/* 9. Smart Dispenser */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={13} titulo="Smart Dispenser — IoT" />
          <SectionText>Uno de los mayores problemas que identifiqué en mi investigación fue simple pero crítico: el usuario olvida tomar el medicamento y nadie se entera hasta que el daño ya ocurrió. El Smart Dispenser resuelve exactamente eso. Al sincronizar vía Wi-Fi y Bluetooth con la agenda de medicación, el dispositivo sabe cuándo debía tomarse una dosis y cuándo no ocurrió — y notifica al cuidador en tiempo real. La IA analiza el historial de adherencia y genera recomendaciones personalizadas: no es solo un recordatorio, es inteligencia aplicada al cuidado de la salud. Más aún, permite al médico evaluar qué tan efectivo está siendo el tratamiento con datos reales de ingesta — no con la memoria del paciente, que precisamente es lo que falla.</SectionText>
          <MockupPair mockup={boostDispenserMockup} screen={boostDispenser} mockupAlt="Smart Dispenser Mockup" screenAlt="Smart Dispenser Screen" />
        </div>

        {/* 10. Perfil y Partner */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={14} titulo="Perfil — Usuario y Partner" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '32px', alignItems: 'start' }}>
            <img src={boostProfile} alt="Boost Profile" style={{ width: '100%', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.85, margin: 0 }}>
                El perfil es intencionalmente minimalista — solo nombre, foto y partner. Esta decisión de diseño no es una limitación sino una estrategia de accesibilidad: menos campos significa menos posibilidad de error para usuarios con deterioro cognitivo.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { num: '01', titulo: 'Perfil minimalista por diseño', desc: 'Solo nombre, foto y partner. Previene errores en usuarios con discapacidad cognitiva.' },
                  { num: '02', titulo: 'Partner visible con vínculo afectivo', desc: '"My son - Marcos ❤️" muestra la relación, no solo el nombre. Genera confianza y tranquilidad.' },
                  { num: '03', titulo: 'Recordatorio contextual', desc: 'El banner de medicación aparece incluso en el perfil — refuerzo de adherencia en cada pantalla.' },
                  { num: '04', titulo: 'Notificaciones al Partner', desc: 'Cualquier cambio en la cuenta se notifica vía WhatsApp al cuidador asignado en tiempo real.' },
                ].map(p => (
                  <div key={p.num} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#F29251', opacity: 0.6, flexShrink: 0, marginTop: '2px' }}>{p.num}</span>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', margin: '0 0 2px 0' }}>{p.titulo}</p>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 10b. Pantalla del Cuidador */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={'14b'} titulo="Pensando en los Usuarios" />
          <SectionText>Diseñar para usuarios vulnerables me enseñó que la información debe estar disponible en el momento exacto en que se necesita — no enterrada en menús. Por eso agregué tres pantallas de soporte que van más allá de lo decorativo: Ayuda y Soporte con preguntas frecuentes y guías rápidas para quienes tienen dudas sobre la app; Progreso accesible desde cualquier punto de la navegación para que el cuidador o médico pueda consultarlo sin interrumpir el flujo del usuario; y Accesibilidad con configuración granular de contraste, tamaño de texto, notificaciones y gestos — porque no todos los usuarios tienen las mismas capacidades sensoriales ni tecnológicas. Estas decisiones no fueron adornos: fueron respuestas directas a lo que observé en investigación con usuarios reales.</SectionText>
          <img src={boostForUser} alt="Caregiver Screen" style={{ width: '40%', display: 'block', margin: '0 auto', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }} />
        </div>

        {/* Investigación */}
        <div style={{ marginBottom: '40px', backgroundColor: 'rgba(242,146,81,0.04)', border: '1px solid rgba(242,146,81,0.15)', borderRadius: '12px', padding: '28px' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#F29251', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>// Investigación de Primera Mano</p>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.9, margin: '0 0 16px 0' }}>
            Este proyecto nació de una necesidad real. Mi madre tiene deterioro cognitivo y mis hermanos son sus cuidadores — lo que me dio acceso a experiencias, frustraciones y necesidades que ninguna búsqueda en internet puede replicar. Los entrevisté, observé su rutina diaria y entendí de primera mano cómo el olvido de medicación, la gestión de citas y la comunicación entre cuidadores son problemas cotidianos y críticos.
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.9, margin: '0 0 16px 0' }}>
            También investigué el impacto del deterioro cognitivo a nivel mundial — hoy es uno de los problemas de salud pública más crecientes — y amplié el alcance para incluir padres con hijos con necesidades especiales que requieren medicación regular.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '8px' }}>
            {[
              { icon: '👨‍👩‍👧', dato: 'Entrevistas reales', desc: 'Adultos mayores + cuidadores familiares directos' },
              { icon: '🌍', dato: 'Problema global', desc: 'El deterioro cognitivo es una crisis de salud pública creciente' },
              { icon: '💊', dato: 'Alcance ampliado', desc: 'Padres con hijos con necesidades especiales que toman medicación' },
            ].map(item => (
              <div key={item.dato} style={{ backgroundColor: 'rgba(242,146,81,0.06)', borderRadius: '8px', padding: '14px' }}>
                <span style={{ fontSize: '20px', display: 'block', marginBottom: '6px' }}>{item.icon}</span>
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#F29251', margin: '0 0 4px 0' }}>{item.dato}</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 11. UX Detail — Empty States */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={15} titulo="Detalle UX — Mensajes de Estado Vacío" />
          <SectionText>Un detalle de accesibilidad clave fue diseñar mensajes claros para cuando el usuario aún no tiene datos registrados. Esto reduce la confusión y guía la acción siguiente — especialmente importante para adultos mayores con poca experiencia tecnológica.</SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              { pantalla: 'Agenda de Medicación', mensaje: '"No has agregado ningún medicamento. Agrega uno para recibir recordatorios y mejorar tu adherencia."' },
              { pantalla: 'Citas Médicas', mensaje: '"No tienes citas programadas. Agrega una para hacer seguimiento de tus consultas médicas."' },
              { pantalla: 'Smart Dispenser', mensaje: '"No tienes ningún dispositivo vinculado. Conecta uno para mejorar el seguimiento de tu medicación."' },
              { pantalla: 'Recomendaciones IA', mensaje: '"Las recomendaciones personalizadas aparecerán aquí después de una semana de uso."' },
            ].map(m => (
              <div key={m.pantalla} style={{ backgroundColor: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.1)', borderRadius: '8px', padding: '14px' }}>
                <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#00d4ff', margin: '0 0 8px 0', letterSpacing: '1px', textTransform: 'uppercase' }}>{m.pantalla}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.6, fontStyle: 'italic' }}>{m.mensaje}</p>
              </div>
            ))}
          </div>
        </div>

        <Separador titulo="Resultados" />
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={16} titulo="Comparativa Cuantitativa" />
          <SectionText>Métricas proyectadas mediante análisis con IA especializada, evaluando la interfaz con base en principios de usabilidad, accesibilidad WCAG, eficiencia de flujos y heurísticas UX.</SectionText>
          <TablaComparativa />
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '12px', lineHeight: 1.6 }}>
            * Estas métricas son proyecciones de impacto útiles para validación temprana. No reemplazan tests con usuarios reales en producción.
          </p>
        </div>

        {/* Qué aporté */}
        <div style={{ border: '1px solid rgba(0,212,255,0.18)', backgroundColor: 'rgba(0,212,255,0.03)', padding: '32px', borderRadius: '6px', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '20px', letterSpacing: '0.03em' }}>
            🚀 Qué aporté como diseñadora UX
          </h2>
          {[
            'Capacidad para rediseñar pensando en usuarios vulnerables',
            'Integración de tecnologías avanzadas (IA + IoT) con propósito claro',
            'Documentación clara, escalable y útil para desarrollo técnico',
            'Visión estratégica con enfoque humano y accesible',
            'Cumplimiento de WCAG 2.1 como estándar, no como opcional',
          ].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
              <span style={{ color: '#00d4ff', fontSize: '13px', flexShrink: 0 }}>✅</span>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>

        {/* Usability Study */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={17} titulo="Estudio de Usabilidad" />
          <SectionText>Realicé un estudio de usabilidad no moderado con 5 participantes en Chile y República Dominicana (remoto), de 30 a 50 minutos cada sesión. Los hallazgos impactaron directamente en el rediseño.</SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
            {[
              { num: '5', label: 'Participantes' },
              { num: '2', label: 'Países' },
              { num: '30-50 min', label: 'Por sesión' },
            ].map(s => (
              <div key={s.label} style={{ backgroundColor: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '1.6rem', fontWeight: 700, color: '#00d4ff', margin: '0 0 4px 0' }}>{s.num}</p>
                <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>// Hallazgos y cambios aplicados</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { hallazgo: 'Notificaciones de mensajes', cambio: 'Se implementó badge visual cuando llega un nuevo mensaje al usuario.' },
              { hallazgo: 'Tamaño de fuente insuficiente', cambio: 'Se aumentó el tamaño de fuente en formularios para mejorar la legibilidad.' },
              { hallazgo: 'Link a redes sociales riesgoso', cambio: 'Se eliminó para proteger la privacidad de usuarios con necesidades especiales.' },
            ].map(f => (
              <div key={f.hallazgo} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '14px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#F29251', fontSize: '12px', flexShrink: 0 }}>✕</span>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.5 }}>{f.hallazgo}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#4ade80', fontSize: '12px', flexShrink: 0 }}>✓</span>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.5 }}>{f.cambio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Takeaways */}
        <div style={{ backgroundColor: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.12)', borderRadius: '12px', padding: '28px', marginBottom: '48px' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#00d4ff', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 20px 0' }}>// Aprendizajes</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', margin: '0 0 10px 0' }}>💡 Impacto</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, margin: 0 }}>
                Con Boost trabajé desde la primera idea hasta el diseño final con un propósito claro: crear algo que impacte vidas reales. Para mí no es solo una app — es la posibilidad de ayudar a millones de personas alrededor del mundo que enfrentan el deterioro cognitivo, ya sea como paciente, cuidador o profesional de la salud. Tengo siempre en mente mejorarla, porque mi objetivo es que sea lo más eficiente, accesible e inclusiva posible.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', margin: '0 0 10px 0' }}>📚 Lo que aprendí</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, margin: 0 }}>
                Este proyecto me enseñó que diseñar para personas con dificultades cognitivas requiere entender tres perspectivas a la vez: la del usuario que lucha con su propia mente, la del cuidador que carga con la responsabilidad del otro, y la del profesional de salud que necesita datos confiables para tomar decisiones. Comprender esas tres realidades transformó mi forma de diseñar — ya no pienso en pantallas, pienso en personas, en sus necesidades y en el impacto que cada decisión de diseño tiene en sus vidas.
              </p>
            </div>
          </div>
        </div>

        {/* Video */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(242,146,81,0.2)' }} />
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#F29251', letterSpacing: '0.12em', textTransform: 'uppercase' }}>App en Acción</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(242,146,81,0.2)' }} />
          </div>
          <SectionText>Recorrido por las pantallas principales de Boost — accesibilidad, juegos cognitivos, Smart Dispenser, progreso y ayuda.</SectionText>
          <video
            src={boostVideo}
            controls
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%',
              borderRadius: '12px',
              border: '1px solid rgba(242,146,81,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              display: 'block',
            }}
          />
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="https://www.figma.com/proto/stYvd6qZJqLqMWupuM2dEt/Boost?node-id=223-2266"
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: '#e8a090', color: '#050d1a', fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', padding: '14px 32px', textDecoration: 'none', borderRadius: '6px', transition: 'all 200ms ease', boxShadow: '0 4px 20px rgba(232,160,144,0.3)' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f0b8a8'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(232,160,144,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#e8a090'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(232,160,144,0.3)' }}
          >
            Ver Prototipo Interactivo en Figma →
          </a>
        </div>

      </div>
    </div>
  )
}

export default BoostCaseStudy
