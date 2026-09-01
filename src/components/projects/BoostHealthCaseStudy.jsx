import { useEffect, useRef, useState } from 'react'
import { useWindowWidth, isMobile, isTablet } from '../../hooks/useWindowWidth'
import { usePortfolio } from '../../context/PortfolioContext'
import { FaWhatsapp } from 'react-icons/fa'
import { MdHome, MdKeyboardArrowUp, MdClose } from 'react-icons/md'

/* ---------------- Capturas reales del sistema ---------------- */
import shLanding      from '../../assets/projects/Landing.png'
import shLandingV1    from '../../assets/projects/Landing2.png'
import shIngreso      from '../../assets/projects/Loging-Registro · 01Ingreso.png'
import shCodigo       from '../../assets/projects/Login-Registro · 02 Verificación.png'
import shPerfil       from '../../assets/projects/Login-Registro · 03 Completar perfil.png'
import shBienvenida   from '../../assets/projects/Login-Registro · 04 Confirmación.png'
import shNoCodigo     from '../../assets/projects/Loging-Registro · No pudimos verificar.png'
import shRecuperar    from '../../assets/projects/Recuperar contraseña · Ingresa correo.png'
import shRevisaCorreo from '../../assets/projects/Revisa tu correo (confirmación).png'
import shRestablecer  from '../../assets/projects/Restablecer contraseña.png'
import shPaso1        from '../../assets/projects/Especialidad y médico.png'
import shPaso2        from '../../assets/projects/Fecha y hora.png'
import shPaso4        from '../../assets/projects/Confirma tu reserva.png'
import shConfirmada   from '../../assets/projects/Reserva confirmada.png'
import shIdentifica   from '../../assets/projects/Identificación.png'
import shMisCitas     from '../../assets/projects/DashboardPaciente.png'
import shSinCitas     from '../../assets/projects/DashboardPaciente - No citas.png'
import shSageHome     from '../../assets/projects/Sage.png'
import shSageChat     from '../../assets/projects/Sage conversación.png'
import shLoginAdmin   from '../../assets/projects/LoginAdmin.png'
import shLoginError   from '../../assets/projects/LoginAdminError.png'
import shOnb1         from '../../assets/projects/Paso 1 de 3 — Tu marca.png'
import shOnb2         from '../../assets/projects/Paso 2 de 3 — Tu clínica.png'
import shOnb3         from '../../assets/projects/Paso 3 de 3 — Contenido.png'
import shProcesando   from '../../assets/projects/Configuración — Procesando.png'
import shOnbListo     from '../../assets/projects/Configuración completa.png'
import shAdmin        from '../../assets/projects/Admin Dashboard.png'
import shSkeleton     from '../../assets/projects/Skeleton.png'
import shAnalytics    from '../../assets/projects/Analytics Dashboard Sage.png'
import shUsuarios     from '../../assets/projects/Configuración · Usuarios.png'
import shModales      from '../../assets/projects/Modales.png'
import shEmpty        from '../../assets/projects/EmptyState.png'
import shFlujos       from '../../assets/projects/BH-Flujos.png'
import shComponentes  from '../../assets/projects/BH-Componentes.png'

/* ============================================================
   BoostHealth — Caso de estudio
   Misma estética que BoostCare / Boost (shell cyan/coral, circuitos).
   Acento del proyecto: CORAL de marca BoostHealth (#D85A30 / #F09978),
   para diferenciarlo de BoostCare, que lidera con verde.
   Ambos comparten la familia de tokens.
   Todas las pantallas están recreadas en código.
   ============================================================ */

const FIGMA = 'https://www.figma.com/proto/CzV30dw4EsbBblZkNE314D/Boost-Health-%E2%80%93-Design-System?node-id=4001-125'
const REPO = 'https://github.com/Zoe-2688'
const WHATSAPP = 'https://wa.me/56989774690'

/* Acentos — coral BoostHealth, calibrados para fondo oscuro */
/* El verde es el color del producto — action/primary del sistema real.
   El coral queda reservado a lo que en BoostHealth es coral: destructivo y advertencia. */
const ACCENT = '#5DCAA5'        // verde claro — acento principal sobre oscuro
const ACCENT_SOFT = '#A7E3CD'   // verde pálido — detalles y subrayados
const ACCENT_DEEP = '#0F6E56'   // action/primary real del sistema
const GREEN = '#5DCAA5'
const GREEN_DEEP = '#0F6E56'
const CORAL = '#F09978'         // solo destructivo / advertencia
const CORAL_DEEP = '#D85A30'
const TITLE_GRADIENT = 'linear-gradient(90deg, #A7E3CD 0%, #5DCAA5 45%, #0F6E56 100%)'
const CYAN = '#00d4ff'

/* Tokens reales de BoostHealth */
const PRIMITIVES = [
  { name: 'green-50', hex: '#E1F5EE' },
  { name: 'green-600', hex: '#0F6E56' },
  { name: 'green-800', hex: '#085041' },
  { name: 'green-900', hex: '#04342C' },
  { name: 'coral-400', hex: '#D85A30' },
  { name: 'coral-600', hex: '#993C1D' },
]
const SEMANTIC = [
  { alias: 'action-primary', ref: 'green-600', hex: '#0F6E56' },
  { alias: 'accent-default', ref: 'coral-400', hex: '#D85A30' },
  { alias: 'nav-bg', ref: 'green-900', hex: '#04342C' },
  { alias: 'bg-inverse', ref: 'green-900', hex: '#04342C' },
  { alias: 'text-primary', ref: 'neutral-950', hex: '#0F1712' },
  { alias: 'danger', ref: 'red-500', hex: '#DC2626' },
]

/* ---------------- Fondo de circuitos ---------------- */
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
      const nx = x + dx * len, ny = y + dy * len
      if (nx < 0 || nx > w || ny < 0 || ny > h) break
      x = nx; y = ny; nodes.push({ x, y })
      dir = (dir + (Math.random() > 0.5 ? 1 : 3)) % 4
    }
    if (nodes.length >= 2) circuits.push({ nodes, coral: Math.random() < 0.4 })
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
      for (const { nodes, coral } of circuitsRef.current) {
        const color = coral ? 'rgba(93,202,165,' : 'rgba(0,212,255,'
        ctx.lineWidth = 1; ctx.strokeStyle = `${color}0.07)`
        ctx.beginPath(); ctx.moveTo(nodes[0].x, nodes[0].y)
        for (let i = 1; i < nodes.length; i++) ctx.lineTo(nodes[i].x, nodes[i].y)
        ctx.stroke()
        for (const { x, y } of nodes) { ctx.fillStyle = `${color}0.18)`; ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill() }
      }
      ctx.restore()
    }
    const makeP = () => { const ci = Math.floor(Math.random() * circuitsRef.current.length); return { ci, si: 0, t: Math.random(), speed: 0.004 + Math.random() * 0.006 } }
    const drawP = p => {
      const c = circuitsRef.current[p.ci]
      if (!c || p.si >= c.nodes.length - 1) return
      const n1 = c.nodes[p.si], n2 = c.nodes[p.si + 1]
      const x = n1.x + (n2.x - n1.x) * p.t, y = n1.y + (n2.y - n1.y) * p.t
      const col = c.coral ? '#D85A30' : '#00d4ff'
      ctx.save()
      const g = ctx.createRadialGradient(x, y, 0, x, y, 5)
      g.addColorStop(0, c.coral ? 'rgba(93,202,165,0.8)' : 'rgba(0,212,255,0.8)')
      g.addColorStop(1, c.coral ? 'rgba(93,202,165,0)' : 'rgba(0,212,255,0)')
      ctx.shadowBlur = 6; ctx.shadowColor = col; ctx.fillStyle = g
      ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
    }
    resize(); rebuild()
    const particles = Array.from({ length: 8 }, makeP)
    const drawFrame = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); drawCircuits() }
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); drawCircuits()
      for (const p of particles) {
        p.t += p.speed
        if (p.t >= 1) { p.si++; p.t = 0; const c = circuitsRef.current[p.ci]; if (!c || p.si >= c.nodes.length - 1) { p.ci = Math.floor(Math.random() * circuitsRef.current.length); p.si = 0 } }
        drawP(p)
      }
      animId = requestAnimationFrame(tick)
    }
    if (reduceMotion) drawFrame(); else tick()
    const ro = new ResizeObserver(() => { resize(); rebuild(); if (reduceMotion) drawFrame() })
    ro.observe(canvas)
    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [reduceMotion])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

/* ---------------- Helpers de UI ---------------- */
const TAGS = ['Figma', 'Design Tokens', 'Design System', 'WCAG 2.1', 'Handoff', 'AI Product']

function Tag({ label }) {
  return <span style={{ fontFamily: 'monospace', fontSize: '11px', color: CYAN, border: '1px solid rgba(0,212,255,0.35)', backgroundColor: 'rgba(0,212,255,0.06)', padding: '3px 10px', letterSpacing: '0.5px' }}>{label}</span>
}
function SectionTitle({ numero, titulo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
      <span style={{ fontFamily: 'monospace', fontSize: '11px', color: CYAN, opacity: 0.4 }}>{String(numero).padStart(2, '0')}</span>
      <h2 style={{ fontFamily: 'inherit', fontSize: '15px', fontWeight: 600, color: ACCENT, letterSpacing: '0.05em', margin: 0 }}>{titulo}</h2>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(0,212,255,0.12)' }} />
    </div>
  )
}
function SectionText({ children }) {
  return <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, marginBottom: '24px', fontFamily: 'inherit' }}>{children}</p>
}
function MetricaCard({ valor, label }) {
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ border: `1px solid ${hov ? 'rgba(93,202,165,0.6)' : 'rgba(0,212,255,0.15)'}`, backgroundColor: hov ? 'rgba(15,110,86,0.10)' : 'rgba(0,212,255,0.04)', padding: '12px 14px', borderRadius: '4px', boxShadow: hov ? '0 0 16px rgba(93,202,165,0.25)' : 'none', transition: 'all 200ms ease', cursor: 'default' }}>
      <p style={{ fontSize: '1.4rem', fontWeight: 700, color: ACCENT, margin: '0 0 4px 0', lineHeight: 1 }}>{valor}</p>
      <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.4 }}>{label}</p>
    </div>
  )
}
function Separador({ titulo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '52px 0' }}>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(93,202,165,0.25)' }} />
      <span style={{ fontSize: '16px', fontWeight: 700, color: ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{titulo}</span>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(93,202,165,0.25)' }} />
    </div>
  )
}
function Quote({ children, autor }) {
  return (
    <div style={{ borderLeft: `3px solid ${ACCENT_DEEP}`, paddingLeft: '18px', margin: '24px 0' }}>
      <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>{children}</p>
      {autor && <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', margin: '8px 0 0 0', letterSpacing: '1px' }}>{autor}</p>}
    </div>
  )
}

/* ---------------- Mockup de teléfono ---------------- */
function Phone({ children, label, height = '470px' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <div style={{ width: '260px', maxWidth: '100%', borderRadius: '30px', border: '8px solid #10201a', backgroundColor: '#ffffff', boxShadow: '0 12px 40px rgba(0,0,0,0.45)', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', width: '70px', height: '5px', borderRadius: '3px', backgroundColor: '#10201a', zIndex: 2 }} />
        <div style={{ padding: '26px 14px 14px', height, overflow: 'hidden', fontFamily: "'Inter','Segoe UI',sans-serif" }}>{children}</div>
      </div>
      {label && <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textAlign: 'center' }}>{label}</span>}
    </div>
  )
}

/* ============================================================
   PANTALLA CLAVE — La conversación con Sage
   Es el corazón del proyecto: la IA que sabe cuándo detenerse.
   ============================================================ */
function SageChatScreen({ isEn }) {
  const c = { ink: '#0F1712', muted: '#55685E', line: '#DCE5E0', subtle: '#E1F5EE', green: '#0F6E56', coral: '#993C1D' }
  const Bubble = ({ user, children }) => (
    <div style={{
      alignSelf: user ? 'flex-end' : 'flex-start',
      backgroundColor: user ? c.subtle : '#F7FAF8',
      border: user ? 'none' : `1px solid ${c.line}`,
      borderRadius: user ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
      padding: '9px 12px', fontSize: '9.5px', color: c.ink, maxWidth: '86%', lineHeight: 1.55, marginBottom: '8px',
    }}>{children}</div>
  )
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <p style={{ fontSize: '11px', fontWeight: 700, color: c.green, margin: '0 0 2px 0' }}>Sage</p>
      <p style={{ fontSize: '8px', color: c.muted, margin: '0 0 12px 0' }}>{isEn ? 'Clínica San Rafael assistant' : 'Asistente de Clínica San Rafael'}</p>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Bubble user>{isEn ? 'Should I fast before my ECG on Thursday?' : '¿Debo ir en ayunas a mi electrocardiograma el jueves?'}</Bubble>
        <Bubble>
          {isEn ? 'For your ECG on Thursday you don\'t need to fast. We do ask you to avoid coffee and tea 3 hours before.' : 'Para tu electrocardiograma del jueves no necesitas ayuno. Te pedimos evitar café y té 3 horas antes.'}
          <span style={{ display: 'block', marginTop: '7px', fontSize: '8px', color: c.muted, borderTop: `1px solid ${c.line}`, paddingTop: '5px' }}>
            <span style={{ color: c.coral }}>▣</span> {isEn ? 'Exam preparation · Updated Jul 15' : 'Preparación de exámenes · Actualizado 15 jul'}
          </span>
        </Bubble>
        <Bubble user>{isEn ? 'Is this dizziness normal?' : '¿Estos mareos son normales?'}</Bubble>
        <Bubble>
          <strong style={{ color: c.green }}>{isEn ? 'I can\'t assess symptoms — that\'s your doctor\'s job.' : 'No puedo evaluar síntomas — eso lo hace tu médico.'}</strong>{' '}
          {isEn ? 'If you\'d like, I can help you move your appointment earlier.' : 'Si quieres, te ayudo a adelantar tu hora.'}
        </Bubble>
      </div>
      <div style={{ borderTop: `1px solid ${c.line}`, paddingTop: '8px', marginTop: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', border: `1px solid ${c.line}`, borderRadius: '999px', padding: '6px 10px' }}>
          <span style={{ fontSize: '10px', color: c.coral }}>◉</span>
          <span style={{ fontSize: '8.5px', color: '#9fb0a8' }}>{isEn ? 'Type your question' : 'Escríbeme tu pregunta'}</span>
        </div>
        <p style={{ fontSize: '7.5px', color: c.muted, margin: '7px 0 0 0', textAlign: 'center' }}>
          {isEn ? 'Talk to reception · +56 2 2345 6789' : 'Hablar con recepción · +56 2 2345 6789'}
        </p>
      </div>
    </div>
  )
}

/* Pantalla — Paso 4 del flujo de reserva (confirmación) */
function ReservaScreen({ isEn }) {
  const c = { ink: '#0F1712', muted: '#55685E', line: '#DCE5E0', subtle: '#E1F5EE', green: '#0F6E56' }
  const Row = ({ k, v }) => (
    <div style={{ display: 'flex', gap: '6px', marginBottom: '5px' }}>
      <span style={{ fontSize: '9px', color: c.muted, minWidth: '52px' }}>{k}</span>
      <span style={{ fontSize: '9px', fontWeight: 600, color: c.ink }}>{v}</span>
    </div>
  )
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '14px' }}>
        <span style={{ fontSize: '26px', color: c.green }}>✓</span>
        <p style={{ fontSize: '13px', fontWeight: 800, color: c.ink, margin: '6px 0 2px 0' }}>{isEn ? 'Your appointment is booked' : 'Tu cita quedó agendada'}</p>
        <p style={{ fontSize: '8.5px', color: c.muted, margin: 0 }}>{isEn ? 'Details sent to maria@correo.com' : 'Te enviamos los detalles a maria@correo.com'}</p>
      </div>
      <div style={{ backgroundColor: c.subtle, border: `1px solid ${c.green}33`, borderRadius: '12px', padding: '11px 12px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '9px' }}>
          <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#C8EDE0', color: c.green, fontSize: '9px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>CR</span>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 700, color: c.ink, margin: 0 }}>Dra. Carolina Ramírez</p>
            <p style={{ fontSize: '8px', color: c.muted, margin: 0 }}>{isEn ? 'Geriatrics · Neurology' : 'Geriatría · Neurología'}</p>
          </div>
        </div>
        <Row k={isEn ? 'Date' : 'Fecha'} v={isEn ? 'Thursday Jul 30' : 'Jueves 30 de julio'} />
        <Row k={isEn ? 'Time' : 'Hora'} v="15:30" />
        <Row k={isEn ? 'Room' : 'Consultorio'} v="205 · Piso 2" />
      </div>
      <p style={{ fontSize: '8.5px', color: c.muted, textAlign: 'center', margin: '0 0 12px 0', lineHeight: 1.5 }}>
        {isEn ? 'Arrive 15 minutes early and bring your ID.' : 'Llega 15 minutos antes y trae tu carnet de identidad.'}
      </p>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
        <div style={{ flex: 1, border: `1.5px solid ${c.green}`, color: c.green, borderRadius: '10px', padding: '8px', textAlign: 'center', fontSize: '9px', fontWeight: 600 }}>{isEn ? 'Add to calendar' : 'Agregar al calendario'}</div>
        <div style={{ flex: 1, backgroundColor: c.green, color: '#fff', borderRadius: '10px', padding: '8px', textAlign: 'center', fontSize: '9px', fontWeight: 600 }}>{isEn ? 'My appointments' : 'Ver mis citas'}</div>
      </div>
      <p style={{ fontSize: '8px', color: c.muted, textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
        {isEn ? 'Need to change it? Call +56 2 2345 6789' : '¿Necesitas cambiarla? Llama al +56 2 2345 6789'}<br />
        {isEn ? 'Mon to Fri, 8:00 to 20:00' : 'Lunes a viernes, 8:00 a 20:00'}
      </p>
    </div>
  )
}

/* Pantalla — El error que no deja al usuario atrapado */
function ErrorScreen({ isEn }) {
  const c = { ink: '#0F1712', muted: '#55685E', line: '#DCE5E0', subtle: '#F7FAF8', green: '#0F6E56' }
  return (
    <div>
      <p style={{ fontSize: '9px', color: c.green, margin: '0 0 14px 0' }}>← {isEn ? 'Back' : 'Volver'}</p>
      <p style={{ fontSize: '14px', fontWeight: 800, color: c.ink, margin: '0 0 6px 0', lineHeight: 1.25 }}>{isEn ? 'We couldn\'t send your code' : 'No pudimos enviarte el código'}</p>
      <p style={{ fontSize: '9px', color: c.muted, margin: '0 0 16px 0', lineHeight: 1.6 }}>
        {isEn ? 'The email or phone we have on record may be out of date.' : 'El correo o teléfono que tenemos registrado puede estar desactualizado.'}
      </p>
      <div style={{ backgroundColor: c.subtle, borderRadius: '12px', padding: '11px 12px', marginBottom: '12px' }}>
        <p style={{ fontSize: '10px', fontWeight: 700, color: c.ink, margin: '0 0 6px 0' }}>{isEn ? 'Come to reception' : 'Acércate a recepción'}</p>
        <p style={{ fontSize: '8.5px', color: c.muted, margin: '0 0 3px 0' }}>Av. Providencia 1234, Santiago</p>
        <p style={{ fontSize: '8.5px', color: c.muted, margin: '0 0 3px 0' }}>{isEn ? 'Mon to Fri, 8:00 to 20:00' : 'Lunes a viernes, 8:00 a 20:00'}</p>
        <p style={{ fontSize: '8.5px', color: c.muted, margin: 0 }}>{isEn ? 'Bring your ID' : 'Lleva tu carnet de identidad'}</p>
      </div>
      <div style={{ border: `1.5px solid ${c.green}`, color: c.green, borderRadius: '12px', padding: '10px', textAlign: 'center', fontSize: '10px', fontWeight: 600, marginBottom: '10px' }}>
        {isEn ? 'Call the clinic' : 'Llamar a la clínica'}
      </div>
      <p style={{ fontSize: '9px', color: c.green, textAlign: 'center', margin: 0, textDecoration: 'underline' }}>{isEn ? 'Ask Sage' : 'Preguntar a Sage'}</p>
      <p style={{ fontSize: '7.5px', color: c.muted, textAlign: 'center', margin: '16px 0 0 0', fontStyle: 'italic', lineHeight: 1.5 }}>
        {isEn ? '↑ three ways out, none of them a dead end' : '↑ tres salidas, ninguna sin retorno'}
      </p>
    </div>
  )
}

/* ============================================================
   FLUJO DE RESERVA — los cuatro pasos
   ============================================================ */
const C = { ink: '#0F1712', muted: '#55685E', line: '#DCE5E0', subtle: '#E1F5EE', green: '#0F6E56', coral: '#993C1D', surf: '#F7FAF8', danger: '#DC2626', warn: '#D97706' }

function Progress({ step, total = 4 }) {
  return (
    <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', backgroundColor: i < step ? C.green : '#DCE5E0' }} />
      ))}
    </div>
  )
}

function PasoEspecialidad({ isEn }) {
  const esp = [['♥', 'Cardiología'], ['⚕', 'Med. General'], ['◔', 'Pediatría'], ['◈', 'Nutrición'], ['◉', 'Salud Cognitiva'], ['◇', 'Dermatología']]
  return (
    <div>
      <p style={{ fontSize: '8.5px', color: C.muted, textAlign: 'center', margin: '0 0 5px 0' }}>{isEn ? 'Step 1 of 4' : 'Paso 1 de 4'}</p>
      <Progress step={1} />
      <p style={{ fontSize: '13px', fontWeight: 800, color: C.ink, margin: '0 0 2px 0' }}>{isEn ? 'What do you need?' : '¿Qué necesitas?'}</p>
      <p style={{ fontSize: '8px', color: C.muted, margin: '0 0 10px 0' }}>{isEn ? 'Pick a speciality, then your doctor' : 'Elige la especialidad y luego tu médico'}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '5px', marginBottom: '12px' }}>
        {esp.map(([ic, n], i) => (
          <div key={n} style={{ border: `1px solid ${i === 4 ? C.green : C.line}`, backgroundColor: i === 4 ? C.subtle : '#fff', borderRadius: '8px', padding: '8px 3px', textAlign: 'center' }}>
            <span style={{ fontSize: '13px', color: C.coral, display: 'block' }}>{ic}</span>
            <span style={{ fontSize: '6.5px', color: C.ink, display: 'block', marginTop: '3px', lineHeight: 1.2 }}>{n}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '9px', fontWeight: 700, color: C.ink, margin: '0 0 6px 0' }}>{isEn ? 'Specialists' : 'Especialistas'}</p>
      {[['CR', 'Dra. Carolina Ramírez', isEn ? 'Today 15:30' : 'Hoy 15:30', C.green], ['GG', 'Dr. Gustavo Gonzáles', isEn ? 'Today 16:30' : 'Hoy 16:30', C.green], ['LS', 'Dra. Lorena Smith', isEn ? 'Tomorrow 15:30' : 'Mañana 15:30', C.coral]].map(([ini, n, h, col]) => (
        <div key={n} style={{ border: `1px solid ${C.line}`, borderRadius: '9px', padding: '7px 9px', marginBottom: '5px', display: 'flex', gap: '7px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#C8EDE0', color: C.green, fontSize: '7.5px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ini}</span>
            <div>
              <p style={{ fontSize: '8.5px', fontWeight: 700, color: C.ink, margin: 0 }}>{n}</p>
              <p style={{ fontSize: '7px', color: col, margin: 0 }}>{h}</p>
            </div>
          </div>
          <span style={{ fontSize: '8px', fontWeight: 700, color: C.ink }}>$45.000</span>
        </div>
      ))}
    </div>
  )
}

function PasoFechaHora({ isEn }) {
  const dias = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  return (
    <div>
      <p style={{ fontSize: '8.5px', color: C.muted, textAlign: 'center', margin: '0 0 5px 0' }}>{isEn ? 'Step 2 of 4' : 'Paso 2 de 4'}</p>
      <Progress step={2} />
      <p style={{ fontSize: '13px', fontWeight: 800, color: C.ink, margin: '0 0 2px 0' }}>{isEn ? 'When suits you?' : '¿Cuándo te acomoda?'}</p>
      <p style={{ fontSize: '7.5px', color: C.muted, margin: '0 0 10px 0' }}>Dra. Carolina Ramírez · {isEn ? 'Cognitive Health' : 'Salud Cognitiva'}</p>
      <div style={{ border: `1px solid ${C.line}`, borderRadius: '10px', padding: '9px', marginBottom: '11px' }}>
        <p style={{ fontSize: '9px', fontWeight: 700, color: C.ink, textAlign: 'center', margin: '0 0 7px 0' }}>{isEn ? 'July 2026' : 'Julio 2026'}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px', marginBottom: '4px' }}>
          {dias.map((d, i) => <span key={i} style={{ fontSize: '6px', color: C.muted, textAlign: 'center', fontWeight: 600 }}>{d}</span>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px' }}>
          {Array.from({ length: 28 }).map((_, i) => {
            const d = i + 1
            const sel = d === 30 - 6
            const dis = d < 10
            return <span key={i} style={{ fontSize: '6.5px', textAlign: 'center', padding: '2px 0', borderRadius: '50%', color: sel ? '#fff' : dis ? '#C2CFC8' : C.ink, backgroundColor: sel ? C.green : 'transparent' }}>{d}</span>
          })}
        </div>
      </div>
      <p style={{ fontSize: '8px', color: C.muted, margin: '0 0 5px 0' }}>{isEn ? 'Morning' : 'Mañana'}</p>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
        {['09:00', '09:30', '10:00', '11:30'].map(h => <span key={h} style={{ flex: 1, border: `1px solid ${C.line}`, borderRadius: '6px', padding: '4px 0', fontSize: '7px', textAlign: 'center', color: C.ink }}>{h}</span>)}
      </div>
      <p style={{ fontSize: '8px', color: C.muted, margin: '0 0 5px 0' }}>{isEn ? 'Afternoon' : 'Tarde'}</p>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '9px' }}>
        {['15:00', '15:30', '16:00', '17:30'].map((h, i) => <span key={h} style={{ flex: 1, border: `1px solid ${i === 1 ? C.green : C.line}`, backgroundColor: i === 1 ? C.subtle : '#fff', borderRadius: '6px', padding: '4px 0', fontSize: '7px', textAlign: 'center', color: C.ink, fontWeight: i === 1 ? 700 : 400 }}>{h}</span>)}
      </div>
      <div style={{ backgroundColor: C.surf, borderRadius: '7px', padding: '6px 8px' }}>
        <p style={{ fontSize: '6.5px', color: C.muted, margin: 0, lineHeight: 1.45 }}>
          {isEn ? 'Appointments are booked 12 hours in advance so the medical team can prepare your visit.' : 'Las horas se agendan con 12 horas de anticipación para que el equipo médico prepare tu atención.'}
        </p>
      </div>
    </div>
  )
}

function DashboardPacienteScreen({ isEn }) {
  return (
    <div>
      <p style={{ fontSize: '13px', fontWeight: 800, color: C.ink, margin: '0 0 1px 0' }}>{isEn ? 'My appointments' : 'Mis citas'}</p>
      <p style={{ fontSize: '8px', color: C.muted, margin: '0 0 11px 0' }}>{isEn ? 'Hi, María González.' : 'Hola, María González.'}</p>
      <p style={{ fontSize: '9px', fontWeight: 700, color: C.ink, margin: '0 0 6px 0' }}>{isEn ? 'Your next appointment.' : 'Tu próxima cita.'}</p>
      <div style={{ backgroundColor: C.subtle, border: `1px solid ${C.green}44`, borderRadius: '11px', padding: '9px 10px', marginBottom: '9px' }}>
        <div style={{ display: 'flex', gap: '7px', alignItems: 'center', marginBottom: '7px' }}>
          <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#C8EDE0', color: C.green, fontSize: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>CR</span>
          <div>
            <p style={{ fontSize: '9px', fontWeight: 700, color: C.ink, margin: 0 }}>Dra. Carolina Ramírez</p>
            <p style={{ fontSize: '7px', color: C.muted, margin: 0 }}>{isEn ? 'Geriatrics · Neurology' : 'Geriatría · Neurología'}</p>
          </div>
        </div>
        {[[isEn ? 'Date' : 'Fecha', isEn ? 'Thu Jul 30' : 'Jueves 30 de julio'], [isEn ? 'Time' : 'Hora', '15:30'], [isEn ? 'Room' : 'Consultorio', '205 · Piso 2']].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', gap: '5px', marginBottom: '2px' }}>
            <span style={{ fontSize: '7.5px', color: C.muted, minWidth: '42px' }}>{k} :</span>
            <span style={{ fontSize: '7.5px', fontWeight: 600, color: C.ink }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '11px' }}>
        <div style={{ flex: 1, backgroundColor: C.green, color: '#fff', borderRadius: '9px', padding: '7px', textAlign: 'center', fontSize: '8px', fontWeight: 600 }}>{isEn ? 'Reschedule' : 'Reprogramar'}</div>
        <div style={{ flex: 1, border: `1.5px solid ${C.green}`, color: C.green, borderRadius: '9px', padding: '7px', textAlign: 'center', fontSize: '8px', fontWeight: 600 }}>{isEn ? 'Cancel' : 'Cancelar'}</div>
      </div>
      <p style={{ fontSize: '9px', fontWeight: 700, color: C.ink, margin: '0 0 6px 0' }}>{isEn ? 'Past appointments' : 'Citas anteriores'}</p>
      {[['CR', 'Dra. Carolina Ramírez', isEn ? 'Geriatrics' : 'Geriatría', isEn ? 'Jun 30' : '30 jun'], ['GG', 'Dr. Gustavo Gonzáles', isEn ? 'Cardiology' : 'Cardiología', isEn ? 'May 12' : '12 may'], ['LS', 'Dra. Lorena Smith', isEn ? 'General Med.' : 'Med. General', isEn ? 'Apr 3' : '3 abr']].map(([ini, n, e, f]) => (
        <div key={n} style={{ border: `1px solid ${C.line}`, borderRadius: '9px', padding: '6px 8px', marginBottom: '4px', display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: C.surf, color: C.muted, fontSize: '7px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ini}</span>
            <div>
              <p style={{ fontSize: '7.5px', fontWeight: 600, color: C.ink, margin: 0 }}>{n}</p>
              <p style={{ fontSize: '6.5px', color: C.muted, margin: 0 }}>{e}</p>
            </div>
          </div>
          <span style={{ fontSize: '7px', color: C.muted }}>{f}</span>
        </div>
      ))}
    </div>
  )
}

function AdminDashboardScreen({ isEn }) {
  return (
    <div>
      <p style={{ fontSize: '12px', fontWeight: 800, color: C.ink, margin: '0 0 1px 0' }}>Dashboard</p>
      <p style={{ fontSize: '7.5px', color: C.muted, margin: '0 0 11px 0' }}>{isEn ? 'Welcome, Dr. Luis Shmid' : 'Bienvenido, Dr. Luis Shmid'}</p>
      <p style={{ fontSize: '9px', fontWeight: 700, color: C.ink, margin: '0 0 6px 0' }}>{isEn ? 'Sage status' : 'Estado de Sage'}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '5px', marginBottom: '11px' }}>
        {[['1,247', isEn ? 'Answered' : 'Respondidas', '↑12%'], ['156', isEn ? 'Active users' : 'Usuarios', '↑8%'], ['94%', isEn ? 'Verified' : 'Verificadas', '↑12%']].map(([v, l, d]) => (
          <div key={l} style={{ border: `1px solid ${C.line}`, borderRadius: '9px', padding: '7px 5px' }}>
            <p style={{ fontSize: '13px', fontWeight: 800, color: C.ink, margin: 0, lineHeight: 1 }}>{v}</p>
            <p style={{ fontSize: '6px', color: C.green, margin: '3px 0 1px 0' }}>{d}</p>
            <p style={{ fontSize: '6px', color: C.muted, margin: 0, lineHeight: 1.2 }}>{l}</p>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '9px', fontWeight: 700, color: C.ink, margin: '0 0 6px 0' }}>{isEn ? 'Settings' : 'Configuraciones'}</p>
      {[[isEn ? 'Brand identity' : 'Identidad de marca', isEn ? 'Logo, colours, clinic data' : 'Logo, colores y datos'], [isEn ? 'Users' : 'Usuarios', isEn ? 'Roles, permissions' : 'Roles, permisos'], [isEn ? 'Knowledge base' : 'Base de Conocimiento', isEn ? 'Documents and Q&A' : 'Documentos y Q&A']].map(([t, d]) => (
        <div key={t} style={{ border: `1px solid ${C.line}`, borderRadius: '9px', padding: '8px 9px', marginBottom: '5px' }}>
          <p style={{ fontSize: '8.5px', fontWeight: 700, color: C.ink, margin: '0 0 2px 0' }}>{t}</p>
          <p style={{ fontSize: '7px', color: C.muted, margin: '0 0 4px 0' }}>{d}</p>
          <p style={{ fontSize: '7px', color: C.green, margin: 0, fontWeight: 600 }}>{isEn ? 'Go' : 'Ir'} →</p>
        </div>
      ))}
      <div style={{ backgroundColor: C.green, borderRadius: '9px', padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <div>
          <p style={{ fontSize: '8.5px', fontWeight: 700, color: '#fff', margin: 0 }}>{isEn ? 'Full analytics' : 'Analytics completo'}</p>
          <p style={{ fontSize: '6.5px', color: '#C8EDE0', margin: 0 }}>{isEn ? 'Last 30 days' : 'Últimos 30 días'}</p>
        </div>
        <span style={{ fontSize: '8px', color: '#fff' }}>{isEn ? 'View' : 'Ver'} →</span>
      </div>
    </div>
  )
}

function AnalyticsScreen({ isEn }) {
  const bars = [145, 148, 142, 201, 189, 234, 215]
  const rows = [
    [isEn ? 'Do I need to fast?' : '¿Debo ir en ayunas?', '187', true, isEn ? 'Exam prep' : 'Preparación exámenes'],
    [isEn ? 'What does it cost?' : '¿Cuál es el costo?', '156', false, '—'],
    [isEn ? 'What documents?' : '¿Qué documentos?', '143', true, isEn ? 'Admission' : 'Requisitos'],
  ]
  return (
    <div>
      <p style={{ fontSize: '12px', fontWeight: 800, color: C.ink, margin: '0 0 1px 0' }}>Analytics — Sage</p>
      <p style={{ fontSize: '7.5px', color: C.muted, margin: '0 0 11px 0' }}>{isEn ? 'Last 30 days' : 'Últimos 30 días'}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginBottom: '11px' }}>
        {[['2,847', isEn ? 'Answered' : 'Respondidas'], ['342', isEn ? 'Unique users' : 'Usuarios únicos'], ['94%', isEn ? 'With source' : 'Con fuente'], ['8.3', isEn ? 'Avg. per user' : 'Prom. usuario']].map(([v, l]) => (
          <div key={l} style={{ border: `1px solid ${C.line}`, borderRadius: '9px', padding: '7px 8px' }}>
            <p style={{ fontSize: '13px', fontWeight: 800, color: C.ink, margin: 0, lineHeight: 1 }}>{v}</p>
            <p style={{ fontSize: '6.5px', color: C.muted, margin: '3px 0 0 0' }}>{l}</p>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '8px', fontWeight: 700, color: C.ink, margin: '0 0 6px 0' }}>{isEn ? 'Questions per day' : 'Preguntas por día'}</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '46px', marginBottom: '11px' }}>
        {bars.map((b, i) => <div key={i} style={{ flex: 1, height: `${(b / 234) * 100}%`, backgroundColor: i > 3 ? C.green : '#9FE1CB', borderRadius: '2px 2px 0 0' }} />)}
      </div>
      <p style={{ fontSize: '8px', fontWeight: 700, color: C.ink, margin: '0 0 2px 0' }}>{isEn ? 'Most frequent questions' : 'Preguntas más frecuentes'}</p>
      <p style={{ fontSize: '6.5px', color: C.muted, margin: '0 0 6px 0' }}>{isEn ? '1 with no source in your knowledge base' : '1 sin fuente en tu base de conocimiento'}</p>
      <div style={{ border: `1px solid ${C.line}`, borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', backgroundColor: C.surf, padding: '5px 7px' }}>
          <span style={{ fontSize: '6px', color: C.muted, flex: 1 }}>{isEn ? 'Question' : 'Pregunta'}</span>
          <span style={{ fontSize: '6px', color: C.muted, width: '22px', textAlign: 'right' }}>N°</span>
          <span style={{ fontSize: '6px', color: C.muted, width: '52px', textAlign: 'right' }}>{isEn ? 'Source' : 'Fuente'}</span>
        </div>
        {rows.map(([q, n, ok, src]) => (
          <div key={q} style={{ display: 'flex', padding: '5px 7px', borderTop: `1px solid ${C.line}`, alignItems: 'center' }}>
            <span style={{ fontSize: '6.5px', color: C.ink, flex: 1 }}>{q}</span>
            <span style={{ fontSize: '6.5px', color: C.ink, width: '22px', textAlign: 'right' }}>{n}</span>
            <span style={{ fontSize: '6px', color: ok ? C.muted : C.warn, width: '52px', textAlign: 'right', fontWeight: ok ? 400 : 700 }}>{ok ? src : (isEn ? 'No source' : 'Sin fuente')}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function EstadosScreen({ isEn }) {
  return (
    <div>
      <p style={{ fontSize: '11px', fontWeight: 800, color: C.ink, margin: '0 0 10px 0' }}>{isEn ? 'What the screen shows when something fails' : 'Qué muestra la pantalla cuando algo falla'}</p>
      <p style={{ fontSize: '7px', color: C.muted, margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{isEn ? 'Empty' : 'Vacío'}</p>
      <div style={{ border: `1px solid ${C.line}`, borderRadius: '10px', padding: '14px 10px', textAlign: 'center', marginBottom: '11px' }}>
        <span style={{ fontSize: '18px' }}>🗓</span>
        <p style={{ fontSize: '9px', fontWeight: 700, color: C.ink, margin: '5px 0 2px 0' }}>{isEn ? 'No upcoming appointments' : 'No tienes citas próximas'}</p>
        <p style={{ fontSize: '7px', color: C.muted, margin: '0 0 7px 0' }}>{isEn ? 'Book in under 2 minutes' : 'Reserva en menos de 2 minutos'}</p>
        <span style={{ display: 'inline-block', backgroundColor: C.green, color: '#fff', fontSize: '7.5px', padding: '5px 14px', borderRadius: '8px', fontWeight: 600 }}>{isEn ? 'Book now' : 'Reservar hora'}</span>
      </div>
      <p style={{ fontSize: '7px', color: C.muted, margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{isEn ? 'Loading · skeleton' : 'Carga · skeleton'}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '4px', marginBottom: '6px' }}>
        {[0, 1, 2].map(i => <div key={i} style={{ height: '30px', borderRadius: '7px', backgroundColor: '#E8EEEB' }} />)}
      </div>
      <div style={{ display: 'grid', gap: '4px', marginBottom: '11px' }}>
        {[0, 1].map(i => <div key={i} style={{ height: '18px', borderRadius: '6px', backgroundColor: '#E8EEEB' }} />)}
      </div>
      <p style={{ fontSize: '7px', color: C.muted, margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{isEn ? 'Destructive confirmation' : 'Confirmación destructiva'}</p>
      <div style={{ border: `1px solid ${C.line}`, borderRadius: '10px', padding: '10px' }}>
        <p style={{ fontSize: '8.5px', fontWeight: 700, color: C.ink, margin: '0 0 3px 0' }}>{isEn ? 'Cancel appointment with Dr. Carolina?' : '¿Cancelar cita con Dra. Carolina?'}</p>
        <p style={{ fontSize: '7px', color: C.muted, margin: '0 0 8px 0' }}>{isEn ? 'Jul 30 at 15:30. You can cancel up to 24h before.' : 'El 30 de julio a las 15:30. Puedes cancelar hasta 24h antes.'}</p>
        <div style={{ display: 'flex', gap: '5px', marginBottom: '7px' }}>
          <span style={{ flex: 1, border: `1px solid ${C.line}`, color: C.ink, fontSize: '7.5px', padding: '5px', textAlign: 'center', borderRadius: '7px' }}>{isEn ? 'No, go back' : 'No, volver'}</span>
          <span style={{ flex: 1, backgroundColor: C.danger, color: '#fff', fontSize: '7.5px', padding: '5px', textAlign: 'center', borderRadius: '7px', fontWeight: 600 }}>{isEn ? 'Cancel it' : 'Cancelar cita'}</span>
        </div>
        <p style={{ fontSize: '6.5px', color: C.muted, textAlign: 'center', margin: 0, borderTop: `1px solid ${C.line}`, paddingTop: '6px' }}>
          {isEn ? 'Rather talk to someone? +56 2 2345 6789' : '¿Prefieres hablar con alguien? +56 2 2345 6789'}
        </p>
      </div>
    </div>
  )
}

/* Especímenes del sistema — el par etiqueta/valor y el contraste */
function TypographySpec({ isEn }) {
  const panel = { backgroundColor: '#FFFFFF', border: '1px solid #DCE5E0', borderRadius: '12px', padding: '18px' }
  const label = { fontFamily: 'monospace', fontSize: '10px', color: '#55685E', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px 0' }
  return (
    <div style={panel}>
      <p style={label}>{isEn ? 'Label / value pair — clinical data' : 'Par etiqueta / valor — dato clínico'}</p>
      <div style={{ display: 'grid', gap: '8px' }}>
        {[[isEn ? 'Date' : 'Fecha', isEn ? 'Thursday Jul 30' : 'Jueves 30 de julio'], [isEn ? 'Time' : 'Hora', '15:30'], [isEn ? 'Room' : 'Consultorio', '205 · Piso 2']].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
            <span style={{ fontSize: '15px', fontWeight: 400, color: '#0F1712', fontFamily: "'Inter',sans-serif" }}>{k} :</span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#0F1712', fontFamily: "'Inter',sans-serif" }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid #DCE5E0', marginTop: '14px', paddingTop: '12px', display: 'grid', gap: '6px' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#55685E', margin: 0 }}>
          <span style={{ color: '#0F6E56' }}>body/md</span> · 16 · Regular → {isEn ? 'label' : 'etiqueta'}
        </p>
        <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#55685E', margin: 0 }}>
          <span style={{ color: '#D85A30' }}>body/md-emphasis</span> · 16 · SemiBold → {isEn ? 'value' : 'valor'}
        </p>
      </div>
    </div>
  )
}

function ContrastSpec({ isEn }) {
  const rows = [
    { c: 'green/900 + white', r: '13.70', ok: true, n: isEn ? 'sidebar default' : 'sidebar default' },
    { c: 'coral/600 + white', r: '6.96', ok: true, n: 'hover Dashboard' },
    { c: 'green/400 + white', r: '2.58', ok: false, n: isEn ? 'FAILED — fixed' : 'FALLABA — corregido' },
    { c: 'green/800 + white', r: '9.40', ok: true, n: isEn ? 'the fix (ΔE 13.4)' : 'la corrección (ΔE 13.4)' },
    { c: 'action/primary on bg/inverse', r: '2.21', ok: false, n: isEn ? 'FAILED — new variant' : 'FALLABA — variante nueva' },
    { c: 'Button/inverse', r: '13.70', ok: true, n: isEn ? 'added to the system' : 'agregado al sistema' },
  ]
  return (
    <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', padding: '16px' }}>
      <p style={{ fontFamily: 'monospace', fontSize: '10px', color: CYAN, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>// {isEn ? 'contrast verified (WCAG 2.1)' : 'contraste verificado (WCAG 2.1)'}</p>
      {rows.map(r => (
        <div key={r.c} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '7px' }}>
          <span style={{ fontSize: '11px', color: r.ok ? GREEN : '#f87171', flexShrink: 0, width: '12px' }}>{r.ok ? '✓' : '✕'}</span>
          <span style={{ fontFamily: 'monospace', fontSize: '10.5px', color: 'rgba(255,255,255,0.7)', flex: 1 }}>{r.c}</span>
          <span style={{ fontFamily: 'monospace', fontSize: '10.5px', color: r.ok ? GREEN : '#f87171', fontWeight: 700 }}>{r.r}:1</span>
          <span style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(255,255,255,0.35)', minWidth: '110px', textAlign: 'right' }}>{r.n}</span>
        </div>
      ))}
    </div>
  )
}

/* Carrusel del hero */
function HeroPhoneCarousel({ isEn, reduceMotion }) {
  const screens = [
    { key: 'sage', label: isEn ? 'Sage · the limit' : 'Sage · el límite', node: <SageChatScreen isEn={isEn} /> },
    { key: 'reserva', label: isEn ? 'Booking confirmed' : 'Reserva confirmada', node: <ReservaScreen isEn={isEn} /> },
    { key: 'error', label: isEn ? 'Error with three ways out' : 'Error con tres salidas', node: <ErrorScreen isEn={isEn} /> },
  ]
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setI(p => (p + 1) % screens.length), 4200)
    return () => clearInterval(id)
  }, [reduceMotion, screens.length])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: '260px', maxWidth: '100%', borderRadius: '30px', border: '8px solid #10201a', backgroundColor: '#ffffff', boxShadow: '0 12px 40px rgba(0,0,0,0.45)', overflow: 'hidden', position: 'relative', animation: reduceMotion ? 'none' : 'bhFloat 3s ease-in-out infinite' }}>
        <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', width: '70px', height: '5px', borderRadius: '3px', backgroundColor: '#10201a', zIndex: 3 }} />
        <div style={{ position: 'relative', height: '470px' }}>
          {screens.map((s, idx) => (
            <div key={s.key} style={{ position: 'absolute', inset: 0, padding: '26px 14px 14px', overflow: 'hidden', fontFamily: "'Inter','Segoe UI',sans-serif", opacity: i === idx ? 1 : 0, transition: reduceMotion ? 'none' : 'opacity 800ms ease', pointerEvents: i === idx ? 'auto' : 'none' }}>{s.node}</div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        {screens.map((s, idx) => (
          <button key={s.key} type="button" onClick={() => setI(idx)} aria-label={s.label} style={{ width: '10px', height: '10px', borderRadius: '50%', border: 'none', padding: 0, cursor: 'pointer', backgroundColor: i === idx ? ACCENT : 'rgba(255,255,255,0.3)', transition: 'background-color 200ms' }} />
        ))}
      </div>
      <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.45)', letterSpacing: '1px', textAlign: 'center' }}>{screens[i].label}</span>
      <style>{`@keyframes bhFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }`}</style>
    </div>
  )
}

/* ---------------- Diagrama B2B2C ---------------- */
function DiagramaB2B2C({ isEn, mob }) {
  const box = (x, y, w, h, fill, stroke) => ({ x, y, width: w, height: h, rx: 8, fill, stroke, strokeWidth: 1 })
  return (
    <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', padding: mob ? '16px 8px' : '24px', marginBottom: '22px' }}>
      <svg viewBox="0 0 760 250" style={{ width: '100%', height: 'auto', display: 'block' }} role="img"
        aria-label={isEn ? 'Diagram: the clinic configures the system, the patient uses it, and the questions return to the clinic as analytics' : 'Diagrama: la clínica configura el sistema, el paciente lo usa, y las preguntas vuelven a la clínica como analítica'}>
        <defs>
          <marker id="bhArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="rgba(255,255,255,0.35)" />
          </marker>
          <marker id="bhArrowG" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#5DCAA5" />
          </marker>
        </defs>

        {/* Clínica */}
        <rect {...box(10, 60, 190, 110, 'rgba(15,110,86,0.10)', 'rgba(93,202,165,0.4)')} />
        <text x="105" y="52" textAnchor="middle" fill="#F09978" fontSize="11" fontFamily="monospace" letterSpacing="1.5">
          {isEn ? 'PAYS' : 'PAGA'}
        </text>
        <text x="105" y="95" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="700">Dr. Shmid</text>
        <text x="105" y="118" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="11.5">
          {isEn ? 'Clinic administrator' : 'Administrador de clínica'}
        </text>
        <text x="105" y="142" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10.5">
          {isEn ? 'brand · content · users' : 'marca · contenido · usuarios'}
        </text>

        {/* Sistema */}
        <rect {...box(285, 55, 190, 120, 'rgba(15,110,86,0.14)', 'rgba(93,202,165,0.4)')} />
        <text x="380" y="90" textAnchor="middle" fill="#5DCAA5" fontSize="14" fontWeight="700">BoostHealth</text>
        <text x="380" y="112" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10.5">
          {isEn ? 'white-label system' : 'sistema white-label'}
        </text>
        <text x="380" y="136" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10.5">
          {isEn ? 'booking · Sage · analytics' : 'reservas · Sage · analítica'}
        </text>

        {/* Paciente */}
        <rect {...box(560, 60, 190, 110, 'rgba(0,212,255,0.06)', 'rgba(0,212,255,0.3)')} />
        <text x="655" y="52" textAnchor="middle" fill="#00d4ff" fontSize="11" fontFamily="monospace" letterSpacing="1.5">
          {isEn ? 'USES' : 'USA'}
        </text>
        <text x="655" y="95" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="700">María</text>
        <text x="655" y="118" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="11.5">
          {isEn ? 'Patient · and Daniel, caregiver' : 'Paciente · y Daniel, cuidador'}
        </text>
        <text x="655" y="142" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10.5">
          {isEn ? 'books · asks Sage' : 'reserva · pregunta a Sage'}
        </text>

        {/* Flechas ida */}
        <line x1="203" y1="115" x2="278" y2="115" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" markerEnd="url(#bhArrow)" />
        <text x="240" y="106" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10">
          {isEn ? 'configures' : 'configura'}
        </text>
        <line x1="478" y1="115" x2="553" y2="115" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" markerEnd="url(#bhArrow)" />
        <text x="516" y="106" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10">
          {isEn ? 'serves' : 'atiende'}
        </text>

        {/* Retorno */}
        <path d="M 655 175 L 655 212 L 105 212 L 105 175" fill="none" stroke="#5DCAA5" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#bhArrowG)" />
        <text x="380" y="232" textAnchor="middle" fill="#5DCAA5" fontSize="11">
          {isEn ? 'what patients ask comes back as analytics' : 'lo que preguntan los pacientes vuelve como analítica'}
        </text>
      </svg>
    </div>
  )
}

/* ---------------- Árbol de decisión de Sage ---------------- */
function ArbolSage({ isEn }) {
  const nodos = isEn ? [
    { q: 'Is it an emergency?', y: 'Hands off to a human. Does not answer.', c: '#f87171' },
    { q: 'Is it in the clinic\'s documents?', n: 'Says it doesn\'t have it + phone number.', c: '#facc15' },
    { q: 'Is it clinical judgement?', y: 'States the limit + offers the next step.', c: '#F09978' },
  ] : [
    { q: '¿Es urgencia?', y: 'Deriva a un humano. No responde.', c: '#f87171' },
    { q: '¿Está en los documentos de la clínica?', n: 'Dice que no la tiene + teléfono.', c: '#facc15' },
    { q: '¿Es criterio clínico?', y: 'Declara el límite + ofrece el siguiente paso.', c: '#F09978' },
  ]
  return (
    <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', padding: '20px', marginBottom: '22px' }}>
      <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 18px 0' }}>
        {isEn ? '// a question arrives' : '// llega una pregunta'}
      </p>
      {nodos.map((nd, i) => (
        <div key={nd.q} style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '7px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ fontSize: '13.5px', color: 'white', fontWeight: 600 }}>{nd.q}</span>
          </div>
          <div style={{ marginLeft: '26px', paddingLeft: '14px', borderLeft: `2px solid ${nd.c}` }}>
            <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.55 }}>
              <span style={{ fontFamily: 'monospace', fontSize: '11px', color: nd.c, marginRight: '8px' }}>{nd.y ? (isEn ? 'YES' : 'SÍ') : (isEn ? 'NO' : 'NO')}</span>
              {nd.y || nd.n}
            </p>
          </div>
        </div>
      ))}
      <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ color: '#5DCAA5', fontSize: '13px' }}>→</span>
        <p style={{ fontSize: '13px', color: '#5DCAA5', margin: 0, fontWeight: 600 }}>
          {isEn ? 'Only then does it answer — citing the source and its date.' : 'Recién entonces responde — citando la fuente y su fecha.'}
        </p>
      </div>
    </div>
  )
}

/* ---------------- Cadena de tokens ---------------- */
function CadenaTokens({ isEn, mob }) {
  const filas = [
    { p: 'green-600', hex: '#0F6E56', s: 'action/primary', c: 'Button · primary' },
    { p: 'coral-400', hex: '#D85A30', s: 'danger', c: 'Button · destructive' },
    { p: 'green-900', hex: '#04342C', s: 'bg/inverse', c: 'Sage section' },
  ]
  const col = { flex: 1, minWidth: 0 }
  return (
    <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', padding: '18px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        {[isEn ? 'primitive' : 'primitivo', isEn ? 'semantic' : 'semántico', isEn ? 'component' : 'componente'].map(h => (
          <p key={h} style={{ ...col, fontFamily: 'monospace', fontSize: '9.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>{h}</p>
        ))}
      </div>
      {filas.map(f => (
        <div key={f.p} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '9px' }}>
          <div style={{ ...col, display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: f.hex, border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'monospace', fontSize: mob ? '9.5px' : '11px', color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.p}</span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px' }}>→</span>
          <span style={{ ...col, fontFamily: 'monospace', fontSize: mob ? '9.5px' : '11px', color: '#F09978', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.s}</span>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px' }}>→</span>
          <span style={{ ...col, fontSize: mob ? '9.5px' : '11px', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.c}</span>
        </div>
      ))}
      <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, margin: '16px 0 0 0', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        {isEn ? 'A clinic changing its brand only touches the first column. The second and third never move — which is why nothing breaks.' : 'Una clínica que cambia su marca solo toca la primera columna. La segunda y la tercera no se mueven — por eso nada se rompe.'}
      </p>
    </div>
  )
}

/* ---------------- Antes / después del landing ---------------- */
function LandingAntesDespues({ isEn, mob }) {
  const cambios = isEn ? [
    { t: 'The hero stopped talking about the clinic', a: '"Here we know you by name" — warm, but it doesn\'t say what the site does.', b: '"Here medical care starts before the appointment" — names the product\'s promise.' },
    { t: 'Sage moved to a dark section', a: 'A loose photo on a light background. It read as one more block.', b: 'Inverted background and a real conversation — including a question Sage refuses to answer.' },
    { t: 'Search appeared', a: 'To book you had to scroll to the specialities.', b: 'A search bar plus frequent reasons, at the top. For people who don\'t know which speciality they need.' },
    { t: 'Ecosystem was removed', a: 'Four cards presenting the platform\'s products.', b: 'Gone. Three of the four addressed the clinic that buys, not the patient who books.' },
    { t: 'Trust arrived', a: 'No testimonials, no location, no accreditations.', b: 'Reviews — including a 3-star one — map, transport and parking.' },
  ] : [
    { t: 'El hero dejó de hablar de la clínica', a: '"Aquí te conocemos por tu nombre" — cálido, pero no dice qué hace el sitio.', b: '"Aquí la atención médica comienza antes de la consulta" — nombra la promesa del producto.' },
    { t: 'Sage pasó a una sección oscura', a: 'Una foto suelta sobre fondo claro. Se leía como un bloque más.', b: 'Fondo invertido y una conversación real — incluida una pregunta que Sage se niega a responder.' },
    { t: 'Apareció la búsqueda', a: 'Para reservar había que bajar hasta las especialidades.', b: 'Barra de búsqueda y motivos frecuentes, arriba. Para quien no sabe qué especialidad necesita.' },
    { t: 'Se quitó Ecosistema', a: 'Cuatro tarjetas presentando los productos de la plataforma.', b: 'Eliminado. Tres de las cuatro le hablaban a la clínica que compra, no al paciente que agenda.' },
    { t: 'Llegó la confianza', a: 'Sin testimonios, sin ubicación, sin acreditaciones.', b: 'Reseñas — incluida una de 3 estrellas — mapa, transporte y estacionamiento.' },
  ]
  const marco = { borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', backgroundColor: '#fff' }
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
        <div>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
            // {isEn ? 'first version' : 'primera versión'} · ago 4
          </p>
          <div style={{ ...marco, height: mob ? '260px' : '340px' }}>
            <img src={shLandingV1} alt={isEn ? 'First version of the landing' : 'Primera versión del landing'} loading="lazy" style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
        </div>
        <div>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: ACCENT, letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
            // {isEn ? 'current version' : 'versión actual'} · ago 31
          </p>
          <div style={{ ...marco, height: mob ? '260px' : '340px', borderColor: 'rgba(93,202,165,0.4)' }}>
            <img src={shLanding} alt={isEn ? 'Current version of the landing' : 'Versión actual del landing'} loading="lazy" style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gap: '9px' }}>
        {cambios.map((c, i) => (
          <div key={c.t} style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '13px 15px' }}>
            <p style={{ fontSize: '12.5px', fontWeight: 700, color: 'white', margin: '0 0 8px 0' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginRight: '9px' }}>{String(i + 1).padStart(2, '0')}</span>
              {c.t}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? '6px' : '14px' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.42)', margin: 0, lineHeight: 1.55 }}>{c.a}</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.55, borderLeft: mob ? 'none' : `2px solid ${ACCENT_DEEP}`, paddingLeft: mob ? 0 : '12px' }}>{c.b}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

/* ---------------- Galería de capturas reales ---------------- */
function Galeria({ isEn, mob }) {
  const [abierta, setAbierta] = useState(null)

  const grupos = [
    {
      t: isEn ? 'Public' : 'Público',
      items: [
        { src: shLanding, l: isEn ? 'Landing · current' : 'Landing · actual' },
        { src: shLandingV1, l: isEn ? 'Landing · first version' : 'Landing · primera versión' },
      ],
    },
    {
      t: isEn ? 'Access · patient' : 'Acceso · paciente',
      items: [
        { src: shIngreso, l: isEn ? 'Enter or create account' : 'Ingresa o crea tu cuenta' },
        { src: shCodigo, l: isEn ? 'Verification code' : 'Código de verificación' },
        { src: shPerfil, l: isEn ? 'Only your name is missing' : 'Solo falta tu nombre' },
        { src: shBienvenida, l: isEn ? 'Account created' : 'Cuenta creada' },
        { src: shNoCodigo, l: isEn ? 'We couldn\'t send the code' : 'No pudimos enviarte el código' },
        { src: shRecuperar, l: isEn ? 'Recover password' : 'Recuperar contraseña' },
        { src: shRevisaCorreo, l: isEn ? 'Instructions sent' : 'Instrucciones enviadas' },
        { src: shRestablecer, l: isEn ? 'Reset password' : 'Restablecer contraseña' },
      ],
    },
    {
      t: isEn ? 'Booking flow' : 'Flujo de reserva',
      items: [
        { src: shPaso1, l: isEn ? 'Step 1 · speciality and doctor' : 'Paso 1 · especialidad y médico' },
        { src: shPaso2, l: isEn ? 'Step 2 · date and time' : 'Paso 2 · fecha y hora' },
        { src: shIdentifica, l: isEn ? 'Step 3 · identify yourself' : 'Paso 3 · identifícate' },
        { src: shPaso4, l: isEn ? 'Step 4 · confirm' : 'Paso 4 · confirma' },
        { src: shConfirmada, l: isEn ? 'Appointment booked' : 'Cita agendada' },
      ],
    },
    {
      t: isEn ? 'Patient' : 'Paciente',
      items: [
        { src: shMisCitas, l: isEn ? 'My appointments' : 'Mis citas' },
        { src: shSinCitas, l: isEn ? 'My appointments · empty' : 'Mis citas · sin citas' },
        { src: shSageHome, l: isEn ? 'Sage · entry' : 'Sage · entrada' },
        { src: shSageChat, l: isEn ? 'Sage · conversation' : 'Sage · conversación' },
      ],
    },
    {
      t: isEn ? 'Clinic onboarding' : 'Onboarding de clínica',
      items: [
        { src: shOnb1, l: isEn ? 'Step 1 · brand' : 'Paso 1 · marca' },
        { src: shOnb2, l: isEn ? 'Step 2 · clinic data' : 'Paso 2 · datos de la clínica' },
        { src: shOnb3, l: isEn ? 'Step 3 · content' : 'Paso 3 · contenido' },
        { src: shProcesando, l: isEn ? 'Processing' : 'Procesando' },
        { src: shOnbListo, l: isEn ? 'Setup complete' : 'Configuración completa' },
      ],
    },
    {
      t: isEn ? 'Administration' : 'Administración',
      items: [
        { src: shLoginAdmin, l: isEn ? 'Admin login' : 'Login admin' },
        { src: shLoginError, l: isEn ? 'Login · error state' : 'Login · estado de error' },
        { src: shAdmin, l: 'Dashboard' },
        { src: shSkeleton, l: isEn ? 'Dashboard · loading' : 'Dashboard · cargando' },
        { src: shAnalytics, l: 'Analytics' },
        { src: shUsuarios, l: isEn ? 'Users' : 'Usuarios' },
      ],
    },
    {
      t: isEn ? 'System components' : 'Componentes del sistema',
      items: [
        { src: shComponentes, l: isEn ? 'Component library · 11 families' : 'Librería de componentes · 11 familias' },
        { src: shModales, l: isEn ? 'Modals · one pattern, six cases' : 'Modales · un patrón, seis casos' },
        { src: shEmpty, l: isEn ? 'Empty states' : 'Estados vacíos' },
        { src: shFlujos, l: isEn ? 'Flow map · 7 flows' : 'Mapa de flujos · 7 flujos' },
      ],
    },
  ]

  const todas = grupos.flatMap(g => g.items)
  const idx = abierta === null ? -1 : todas.findIndex(i => i.src === abierta.src)
  const nav = (d) => {
    const n = (idx + d + todas.length) % todas.length
    setAbierta(todas[n])
  }

  useEffect(() => {
    if (abierta === null) return
    const h = (e) => {
      if (e.key === 'Escape') setAbierta(null)
      if (e.key === 'ArrowRight') nav(1)
      if (e.key === 'ArrowLeft') nav(-1)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [abierta, idx])

  return (
    <>
      {grupos.map(g => (
        <div key={g.t} style={{ marginBottom: '28px' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: ACCENT, letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
            // {g.t} <span style={{ color: 'rgba(255,255,255,0.3)' }}>· {g.items.length}</span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '10px' }}>
            {g.items.map(it => (
              <button
                key={it.l}
                onClick={() => setAbierta(it)}
                style={{ padding: 0, border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.02)', cursor: 'zoom-in', display: 'block', textAlign: 'left' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(93,202,165,0.55)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
              >
                <div style={{ height: mob ? '110px' : '130px', overflow: 'hidden', backgroundColor: '#fff' }}>
                  <img src={it.src} alt={it.l} loading="lazy" style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <p style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.6)', margin: 0, padding: '8px 10px', lineHeight: 1.35 }}>{it.l}</p>
              </button>
            ))}
          </div>
        </div>
      ))}

      {abierta && (
        <div
          onClick={() => setAbierta(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 3000, backgroundColor: 'rgba(3,8,16,0.94)', backdropFilter: 'blur(6px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: mob ? '16px' : '40px', cursor: 'zoom-out' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1100px', marginBottom: '12px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: ACCENT_SOFT, letterSpacing: '1px' }}>{abierta.l}</span>
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{idx + 1} / {todas.length}</span>
          </div>
          <img
            src={abierta.src}
            alt={abierta.l}
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '100%', maxHeight: '78vh', objectFit: 'contain', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'default', backgroundColor: '#fff' }}
          />
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => nav(-1)} style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: 'white', borderRadius: '6px', padding: '8px 18px', cursor: 'pointer', fontSize: '12px', fontFamily: 'monospace' }}>←</button>
            <button onClick={() => setAbierta(null)} style={{ backgroundColor: 'rgba(93,202,165,0.18)', border: '1px solid rgba(93,202,165,0.45)', color: ACCENT_SOFT, borderRadius: '6px', padding: '8px 18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontFamily: 'monospace' }}><MdClose size={15} /> Esc</button>
            <button onClick={() => nav(1)} style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: 'white', borderRadius: '6px', padding: '8px 18px', cursor: 'pointer', fontSize: '12px', fontFamily: 'monospace' }}>→</button>
          </div>
        </div>
      )}
    </>
  )
}

export default function BoostHealthCaseStudy({ onClose }) {
  const { reduceMotion, language } = usePortfolio()
  const isEn = language === 'en'
  const w = useWindowWidth()
  const mob = isMobile(w)
  const tab = isTablet(w)
  const containerRef = useRef(null)
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = '' } }, [])
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handler = () => setShowScroll(el.scrollTop > 300)
    el.addEventListener('scroll', handler)
    return () => el.removeEventListener('scroll', handler)
  }, [])
  const scrollToTop = () => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })

  const METRICAS = [
    { valor: '28', label: isEn ? 'Screens + states' : 'Pantallas + estados' },
    { valor: '12', label: isEn ? 'Specification documents' : 'Documentos de especificación' },
    { valor: '23', label: isEn ? 'Contrast pairs verified' : 'Pares de contraste verificados' },
    { valor: 'AA', label: isEn ? 'WCAG 2.1 across the system' : 'WCAG 2.1 en todo el sistema' },
  ]

  const publicoObj = isEn
    ? ['🧑‍🦳 Patients (many 60+)', '🏥 Clinic administrators', '🩺 Medical staff', '💬 Reception']
    : ['🧑‍🦳 Pacientes (muchos 60+)', '🏥 Administradores de clínica', '🩺 Equipo médico', '💬 Recepción']

  const usuarios = isEn ? [
    {
      n: 'Dr. Shmid',
      r: 'Clinic administrator',
      d: 'Runs a clinic, not a design team. Configures the brand once, uploads documents, and comes back monthly to check whether Sage is answering well. He is not going to read a manual.',
      k: 'He is why the system validates instead of trusting, and why onboarding is three steps.',
    },
    {
      n: 'María, 71',
      r: 'Patient',
      d: 'Books her own appointments. Reads from a phone, sometimes standing at the clinic door. Doesn\'t remember which room she was seen in last time, and doesn\'t want to admit it. Uses email once a month; reads every SMS.',
      k: 'Every decision about type weight, 24-hour format and redundant data exists because of her.',
    },
    {
      n: 'Daniel, 44',
      r: 'Son · caregiver',
      d: 'Books for his mother from the office. He is not her legal representative and doesn\'t need to see her medical record — he needs the date, the address and what she has to bring.',
      k: 'He is why the flow can\'t assume that whoever books is whoever attends.',
    },
  ] : [
    {
      n: 'Dr. Shmid',
      r: 'Administrador de clínica',
      d: 'Dirige una clínica, no un equipo de diseño. Configura la marca una vez, sube documentos, y vuelve una vez al mes a revisar si Sage está respondiendo bien. No va a leer un manual.',
      k: 'Por él el sistema valida en vez de confiar, y el onboarding son tres pasos.',
    },
    {
      n: 'María, 71',
      r: 'Paciente',
      d: 'Agenda sus propias horas. Lee desde el teléfono, a veces parada en la puerta de la clínica. No recuerda en qué consultorio la atendieron la última vez, y no quiere admitirlo. Usa el correo una vez al mes; lee todos los SMS.',
      k: 'Cada decisión sobre peso tipográfico, formato 24h y datos redundantes existe por ella.',
    },
    {
      n: 'Daniel, 44',
      r: 'Hijo · cuidador',
      d: 'Reserva para su madre desde la oficina. No es su representante legal y no necesita ver su ficha clínica — necesita la fecha, la dirección y qué tiene que llevar.',
      k: 'Por él el flujo no puede asumir que quien reserva es quien se atiende.',
    },
  ]

  const roles = isEn ? [
    { titulo: 'Product Design', icon: '🧭', items: ['Defined what the AI should refuse to do', 'Patient and admin flows end to end', 'Removed a section aimed at the wrong audience'] },
    { titulo: 'Design System', icon: '🧩', items: ['Primitives → semantic tokens (2 layers)', 'Usage rules written into each token', 'Dark mode by architecture, not by duplication'] },
    { titulo: 'Accessibility', icon: '♿', items: ['23 contrast pairs calculated (WCAG 2.1)', 'A typographic token for low vision', 'Symbol + colour, never colour alone'] },
    { titulo: 'Specification', icon: '📐', items: ['12 documents: flows, data contracts, edge cases', 'Declared gaps with risk and proposal', 'API contracts written from the design backwards'] },
  ] : [
    { titulo: 'Diseño de Producto', icon: '🧭', items: ['Definí qué debe negarse a hacer la IA', 'Flujos de paciente y admin de punta a punta', 'Quité una sección dirigida a la audiencia equivocada'] },
    { titulo: 'Sistema de Diseño', icon: '🧩', items: ['Primitivos → tokens semánticos (2 capas)', 'Reglas de uso escritas dentro de cada token', 'Modo oscuro por arquitectura, no por duplicación'] },
    { titulo: 'Accesibilidad', icon: '♿', items: ['23 pares de contraste calculados (WCAG 2.1)', 'Un token tipográfico para baja visión', 'Símbolo + color, nunca color solo'] },
    { titulo: 'Especificación', icon: '📐', items: ['12 documentos: flujos, contratos de datos, casos límite', 'Huecos declarados con riesgo y propuesta', 'Contratos de API escritos desde el diseño hacia atrás'] },
  ]

  const equipo = isEn ? [
    { rol: 'Product Design · UX · UI · Front-end', quien: 'Me', d: 'Product decisions, flows, design system, specification, and the React implementation.' },
    { rol: 'Backend', quien: 'Development partner', d: 'Node.js + Express, data model and Sage integration. I write the API contracts from the design side; he implements and pushes back when something isn\'t viable.' },
    { rol: 'AI-assisted method', quien: 'Tooling', d: 'Claude for documentation, consistency review and auditing the system against its own rules. Used to write and verify — never to generate facts.' },
  ] : [
    { rol: 'Product Design · UX · UI · Front-end', quien: 'Yo', d: 'Decisiones de producto, flujos, sistema de diseño, especificación, y la implementación en React.' },
    { rol: 'Backend', quien: 'Socio de desarrollo', d: 'Node.js + Express, modelo de datos e integración de Sage. Yo escribo los contratos de API desde el lado del diseño; él implementa y me contradice cuando algo no es viable.' },
    { rol: 'Método asistido por IA', quien: 'Herramienta', d: 'Claude para documentación, revisión de consistencia y auditoría del sistema contra sus propias reglas. Se usa para escribir y verificar — nunca para generar hechos.' },
  ]

  const reglasSage = isEn ? [
    { t: 'Answers only from approved documents', d: 'No improvising, no interpreting, no generalising from general knowledge.' },
    { t: 'Every answer shows its source', d: 'Which document it came from and when it was updated. The patient can calibrate how much to trust.' },
    { t: 'Faced with a symptom, it stops', d: 'It says it can\'t, says who can, and offers the action that is within its reach.' },
  ] : [
    { t: 'Responde solo desde documentos aprobados', d: 'No improvisa, no interpreta, no generaliza desde conocimiento general.' },
    { t: 'Cada respuesta muestra su fuente', d: 'De qué documento salió y cuándo se actualizó. El paciente puede calibrar cuánto confiar.' },
    { t: 'Ante un síntoma, se detiene', d: 'Dice que no puede, dice quién sí puede, y ofrece la acción que sí está a su alcance.' },
  ]

  const sintomas = isEn ? [
    { s: 'Mild allergy', d: 'Dermatology' },
    { s: 'Jaundice', d: 'Hepatology — urgent' },
    { s: 'Cyanosis', d: 'Emergency room, now' },
  ] : [
    { s: 'Alergia leve', d: 'Dermatología' },
    { s: 'Ictericia', d: 'Hepatología — urgente' },
    { s: 'Cianosis', d: 'Urgencias, ahora' },
  ]

  const ecosistema = isEn ? [
    { card: 'The digital clinic', ok: false, why: 'the software the clinic bought' },
    { card: 'Patient app', ok: null, why: 'only if a downloadable app exists' },
    { card: 'Professional portal', ok: false, why: 'the patient will never use it' },
    { card: 'The assistant', ok: true, why: 'but it already has its own section' },
  ] : [
    { card: 'La clínica digital', ok: false, why: 'es el software que compró la clínica' },
    { card: 'App del paciente', ok: null, why: 'solo si existe app descargable' },
    { card: 'Portal del profesional', ok: false, why: 'el paciente nunca lo va a usar' },
    { card: 'El asistente', ok: true, why: 'pero ya tiene su sección propia' },
  ]

  const auditoria = isEn ? [
    { h: 'Duplicated naming: text/primary and texto/primario coexisted as different variables — in one case inside the same text block', fix: 'Migrated everything to English. Without this, duplicated CSS variables and changes that only reach half the UI.' },
    { h: 'A navigation hover gave 2.58:1 against white text. WCAG AA requires 4.5:1', fix: 'Calculated the alternatives and took it to 9.40:1, verifying the change stayed perceptible (Delta E 13.4).' },
    { h: 'The SemiBold on clinical data was applied by hand, not tokenised', fix: 'The decision was right but lived only in my head. It became body/md-emphasis.' },
    { h: 'On the dark section, the CTA dropped to 2.21:1', fix: 'Not a screen bug — a missing variant. Added bg/inverse and Button/inverse to Foundations.' },
  ] : [
    { h: 'Nomenclatura duplicada: text/primary y texto/primario coexistían como variables distintas — en un caso, dentro del mismo bloque de texto', fix: 'Migré todo a inglés. Sin esto, variables CSS duplicadas y cambios que solo alcanzan la mitad de la interfaz.' },
    { h: 'Un hover de navegación daba 2.58:1 con texto blanco. WCAG AA exige 4.5:1', fix: 'Calculé las alternativas y lo llevé a 9.40:1, verificando que el cambio siguiera siendo perceptible (Delta E 13.4).' },
    { h: 'El SemiBold de los datos clínicos estaba aplicado a mano, sin tokenizar', fix: 'La decisión era correcta pero vivía solo en mi cabeza. Se convirtió en body/md-emphasis.' },
    { h: 'En la sección oscura, el CTA caía a 2.21:1', fix: 'No era un error de esa pantalla: era una variante que faltaba. Agregué bg/inverse y Button/inverse a Foundations.' },
  ]

  const siguiente = isEn ? [
    { t: 'Testing with five real users', d: 'Decisions about older adults are grounded in accessibility literature, not in sessions with people. Five is enough to validate or dismantle several — including the one I already reversed on my own.' },
    { t: 'The patient side, on mobile', d: 'The admin panel stays desktop-first — that was the right call. What is missing is the mobile spec for the patient flow, which is where a clinic actually gets booked.' },
    { t: 'Design guidance, not just validation', d: 'Today the system rejects a colour that fails contrast and proposes a compliant one. The next step is for it to recommend — palettes and typefaces evaluated with AI. A clinic administrator is not a designer, and how the page looks affects how the service is perceived. Rejecting a bad choice protects accessibility; recommending a good one protects the clinic.' },
    { t: 'Booking on behalf of someone else', d: 'Daniel books for his mother, but the current flow assumes whoever books is whoever attends. That breaks reconciliation with the clinical record. The fix isn\'t giving the caregiver full access — it\'s separating who books from who attends, and limiting what the former can see.' },
    { t: 'A QA checklist before, not after', d: 'The same date appeared as "Tuesday 30 July" on one screen and "Thursday 30 July" on the next. Three doctors shared the same avatar initials. None of it was a criteria problem — it was the absence of a verification layer while moving fast.' },
  ] : [
    { t: 'Testing con cinco usuarios reales', d: 'Las decisiones sobre adultos mayores están fundamentadas en literatura de accesibilidad, no en sesiones con personas. Cinco alcanzan para validar o desmontar varias — incluida la que ya reversé por mi cuenta.' },
    { t: 'El lado paciente, en móvil', d: 'El panel admin se queda desktop-first — esa decisión fue correcta. Lo que falta es la especificación móvil del flujo de paciente, que es donde realmente se agenda una clínica.' },
    { t: 'Recomendación de diseño, no solo validación', d: 'Hoy el sistema rechaza un color que no cumple contraste y propone uno que sí. El siguiente paso es que recomiende — paletas y tipografías evaluadas con IA. Un administrador de clínica no es diseñador, y cómo se ve la página influye en cómo se percibe el servicio. Rechazar una mala elección protege la accesibilidad; recomendar una buena protege a la clínica.' },
    { t: 'Reservar para otra persona', d: 'Daniel reserva para su madre, pero el flujo actual asume que quien reserva es quien se atiende. Eso rompe la conciliación con la ficha clínica. La solución no es dar acceso completo al cuidador — es separar quién agenda de quién se atiende, y limitar lo que el primero puede ver.' },
    { t: 'Un checklist de QA antes, no después', d: 'La misma fecha apareció como "Martes 30 de julio" en una pantalla y "Jueves 30 de julio" en la siguiente. Tres médicos compartían las mismas iniciales de avatar. Nada de eso fue un problema de criterio — fue la ausencia de una capa de verificación trabajando rápido.' },
  ]

  const contribuciones = isEn ? [
    'Defined the boundary of a medical AI — and made that boundary feel like care, not a closed door',
    'A two-layer token system with usage rules written in, so the rules survive without me',
    'Audited the system against its own documentation and found three inconsistencies before they reached development',
    'Handoff that states what is verified, what is assumed, and what is still open',
    'Removed a section — with argument — because it addressed the wrong audience',
  ] : [
    'Definí el límite de una IA médica — y logré que ese límite se sienta como cuidado, no como una puerta cerrada',
    'Un sistema de tokens de dos capas con reglas de uso escritas, para que las reglas sobrevivan sin mí',
    'Audité el sistema contra su propia documentación y encontré tres inconsistencias antes de que llegaran a desarrollo',
    'Handoff que declara qué está verificado, qué es supuesto y qué sigue abierto',
    'Quité una sección — con argumento — porque le hablaba a la audiencia equivocada',
  ]

  const btnFloat = { width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(5,13,26,0.9)', backdropFilter: 'blur(8px)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: 2000, backgroundColor: '#050d1a', overflowY: 'auto', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}><CircuitCanvas reduceMotion={reduceMotion} /></div>

      {showScroll && (
        <div style={{ position: 'fixed', bottom: '32px', right: '24px', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <button onClick={scrollToTop} style={{ ...btnFloat, border: '1px solid rgba(0,212,255,0.4)', color: CYAN }}><MdKeyboardArrowUp size={24} /></button>
          <button onClick={onClose} style={{ ...btnFloat, border: '1px solid rgba(93,202,165,0.45)', color: ACCENT_SOFT }}><MdHome size={22} /></button>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ ...btnFloat, border: '1px solid rgba(37,211,102,0.4)', color: '#25d366', textDecoration: 'none' }}><FaWhatsapp size={22} /></a>
        </div>
      )}

      {/* Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'rgba(5,13,26,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,212,255,0.1)', padding: mob ? '12px 16px' : '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', fontSize: '13px', fontFamily: 'monospace' }}>{isEn ? 'Back to projects' : 'Volver a proyectos'}</button>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}><span style={{ color: GREEN }}>Boost</span><span style={{ color: ACCENT }}>Health</span></span>
        </div>
        <a href={FIGMA} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: ACCENT_SOFT, border: '1px solid rgba(93,202,165,0.45)', padding: '7px 16px', textDecoration: 'none', fontFamily: 'monospace' }}>{isEn ? 'Open Figma prototype' : 'Ver prototipo en Figma'} →</a>
      </div>

      {/* HERO */}
      <div style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(0,212,255,0.08)', zIndex: 1 }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: mob ? '40px 20px' : '64px 32px', display: 'grid', gridTemplateColumns: (mob || tab) ? '1fr' : '1.4fr 1fr', gap: (mob || tab) ? '36px' : '48px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '11px', color: CYAN, letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.6, margin: 0 }}>{isEn ? 'Case Study · Product Design · HealthTech + AI' : 'Caso de Estudio · Diseño de Producto · HealthTech + IA'}</p>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)', fontWeight: 800, margin: 0, lineHeight: 1.15, width: 'fit-content' }}>
              <span style={{ backgroundImage: TITLE_GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>
                {isEn ? 'One product that many clinics sell as their own' : 'Un solo producto que muchas clínicas venden como propio'}
              </span>
            </h1>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.55, margin: 0 }}>
              {isEn ? 'BoostHealth — medical booking, an admin panel, and an assistant that answers only from each clinic\'s own documents' : 'BoostHealth — reservas médicas, panel de administración, y un asistente que responde solo desde los documentos de cada clínica'}
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', alignSelf: 'flex-start', backgroundColor: 'rgba(15,110,86,0.14)', border: `1px solid ${ACCENT_DEEP}55`, borderRadius: '20px', padding: '6px 14px' }}>
              <span style={{ fontSize: '14px' }} aria-hidden="true">🧭</span>
              <span style={{ fontSize: '12.5px', color: ACCENT, fontWeight: 600 }}>{isEn ? 'In development · design and system complete' : 'En desarrollo · diseño y sistema completos'}</span>
            </div>
            <div>
              <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
                {isEn ? '// three decisions defined the project' : '// tres decisiones definieron el proyecto'}
              </p>
              {(isEn ? [
                'What a medical assistant must refuse to answer',
                'How you build something someone else is going to change',
                'What someone who doesn\'t remember where she was seen actually needs',
              ] : [
                'Qué debe negarse a responder un asistente médico',
                'Cómo se construye algo que otro va a cambiar',
                'Qué necesita alguien que no recuerda dónde la atendieron',
              ]).map((t, i) => (
                <div key={t} style={{ display: 'flex', gap: '11px', alignItems: 'baseline', marginBottom: '7px' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '11px', color: ACCENT, fontWeight: 700, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                  <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.72)', margin: 0, lineHeight: 1.6 }}>{t}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{TAGS.map(t => <Tag key={t} label={t} />)}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>{METRICAS.map(m => <MetricaCard key={m.label} valor={m.valor} label={m.label} />)}</div>
            <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>* {isEn ? 'Own project, in development. Design and front-end are mine; backend is built with a development partner.' : 'Proyecto propio, en desarrollo. El diseño y el front-end son míos; el backend se construye con un socio de desarrollo.'}</p>
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div aria-hidden="true" style={{ position: 'absolute', top: '2%', width: '300px', height: '300px', maxWidth: '85%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(15,110,86,0.35), transparent 66%)', filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0 }} />
            <div aria-hidden="true" style={{ position: 'absolute', bottom: '2%', width: '300px', height: '300px', maxWidth: '85%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(53,181,140,0.28), transparent 66%)', filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1 }}><HeroPhoneCarousel isEn={isEn} reduceMotion={reduceMotion} /></div>
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: mob ? '32px 16px 60px' : '56px 32px 80px', position: 'relative', zIndex: 1 }}>

        <Separador titulo={isEn ? 'The Project' : 'El Proyecto'} />

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={1} titulo={isEn ? 'About BoostHealth' : 'Sobre BoostHealth'} />
          <SectionText>
            {isEn ? 'BoostHealth is a booking platform with an AI assistant, sold to clinics. Patients book appointments and resolve doubts with Sage, an assistant trained only on their clinic\'s own documents. Administrators configure their brand, upload content and measure what people are asking.' : 'BoostHealth es una plataforma de reservas con asistente de IA, que se vende a clínicas. Los pacientes agendan horas y resuelven dudas con Sage, un asistente entrenado solo con los documentos de su clínica. Los administradores configuran su marca, cargan contenido y miden qué está preguntando la gente.'}
          </SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
            {(isEn ? [
              { k: 'SaaS · multi-tenant', d: 'One codebase serving many clinics. Each one\'s data is isolated from the rest.' },
              { k: 'White-label', d: 'Every clinic sells it as their own product. Their logo, their colours, their content — the vendor\'s brand never appears.' },
              { k: 'B2B2C', d: 'The clinic buys it; the patient uses it. Two audiences with opposite needs inside one system.' },
            ] : [
              { k: 'SaaS · multi-tenant', d: 'Un solo código sirviendo a muchas clínicas. Los datos de cada una están aislados del resto.' },
              { k: 'White-label', d: 'Cada clínica lo vende como producto propio. Su logo, sus colores, su contenido — la marca del proveedor no aparece.' },
              { k: 'B2B2C', d: 'La clínica compra; el paciente usa. Dos audiencias con necesidades opuestas dentro de un mismo sistema.' },
            ]).map(x => (
              <div key={x.k} style={{ backgroundColor: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.14)', borderRadius: '8px', padding: '13px 15px' }}>
                <p style={{ fontFamily: 'monospace', fontSize: '10.5px', fontWeight: 700, color: CYAN, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 7px 0' }}>{x.k}</p>
                <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.62)', margin: 0, lineHeight: 1.55 }}>{x.d}</p>
              </div>
            ))}
          </div>
          <SectionText>
            {isEn ? 'I designed the full product — patient and admin flows, the design system, and the specification for development. The three terms above are not labels: each one forced a design decision that shows up later in this case study.' : 'Diseñé el producto completo — flujos de paciente y administrador, sistema de diseño y especificación para desarrollo. Los tres términos de arriba no son etiquetas: cada uno forzó una decisión de diseño que aparece más adelante en este case study.'}
          </SectionText>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {publicoObj.map(p => <span key={p} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(15,110,86,0.10)', border: '1px solid rgba(93,202,165,0.25)', borderRadius: '20px', padding: '4px 12px' }}>{p}</span>)}
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={2} titulo={isEn ? 'The Challenge' : 'El Reto'} />
          <SectionText>
            {isEn ? 'A clinic receives the same questions every day. Should I fast? How much does it cost? What documents do I bring? Each one consumes reception time, and every unanswered call is an appointment that doesn\'t get booked. An AI assistant seems like the obvious solution. And that\'s where the problem starts.' : 'Una clínica recibe las mismas preguntas todos los días. ¿Debo ir en ayunas? ¿Cuánto cuesta? ¿Qué documentos llevo? Cada una consume tiempo de recepción, y cada llamada sin responder es una hora que no se agenda. Un asistente de IA parece la solución obvia. Y ahí empieza el problema.'}
          </SectionText>
          <Quote>
            {isEn ? 'If a patient asks "is this dizziness normal?", any answer other than "consult your doctor" is a clinical and legal risk. But if the assistant just says "I can\'t help you", the product is useless.' : 'Si un paciente pregunta "¿estos mareos son normales?", cualquier respuesta que no sea "consulta a tu médico" es un riesgo clínico y legal. Pero si el asistente se limita a decir "no puedo ayudarte", el producto no sirve para nada.'}
          </Quote>
          <p style={{ fontSize: '15px', color: ACCENT, fontWeight: 600, lineHeight: 1.7, margin: 0 }}>
            {isEn ? 'The design work wasn\'t in the screens. It was in defining the limit.' : 'El trabajo de diseño no estaba en las pantallas. Estaba en definir el límite.'}
          </p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={3} titulo={isEn ? 'Who this is for' : 'Para quién es esto'} />
          <SectionText>
            {isEn ? 'Three people use this product, and they don\'t overlap. Almost every decision in this case study traces back to one of them.' : 'Tres personas usan este producto, y no se parecen entre sí. Casi toda decisión de este case study se explica por alguna de ellas.'}
          </SectionText>
          <DiagramaB2B2C isEn={isEn} mob={mob} />
          <div style={{ borderLeft: `3px solid ${CYAN}`, paddingLeft: '16px', marginBottom: '22px' }}>
            <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, margin: '0 0 8px 0' }}>
              <strong style={{ color: CYAN }}>{isEn ? 'And they come in order. ' : 'Y vienen en orden. '}</strong>
              {isEn ? 'This is B2B2C: the clinic buys, the patient uses. Nothing exists for María until Dr. Shmid has configured his brand, uploaded his documents and seen that Sage answers correctly.' : 'Esto es B2B2C: la clínica compra, el paciente usa. Nada existe para María hasta que el Dr. Shmid configuró su marca, subió sus documentos y comprobó que Sage responde bien.'}
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0 }}>
              {isEn ? 'That is why the system was specified desktop-first: the administrator is the first user, and nobody configures a clinic from a phone. The patient flow inherits the same system — but its mobile spec is still pending, and that is the honest gap.' : 'Por eso el sistema se especificó desktop-first: el administrador es el primer usuario, y nadie configura una clínica desde el teléfono. El flujo de paciente hereda el mismo sistema — pero su especificación móvil sigue pendiente, y esa es la brecha honesta.'}
            </p>
          </div>
          <div style={{ display: 'grid', gap: '10px', marginBottom: '40px' }}>
            {usuarios.map(u => (
              <div key={u.n} style={{ backgroundColor: 'rgba(15,110,86,0.06)', border: '1px solid rgba(93,202,165,0.20)', borderRadius: '8px', padding: '16px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap', marginBottom: '7px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>{u.n}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '10.5px', color: ACCENT, letterSpacing: '1px', textTransform: 'uppercase' }}>{u.r}</span>
                </div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: '0 0 9px 0', lineHeight: 1.65 }}>{u.d}</p>
                <p style={{ fontSize: '12.5px', color: ACCENT_SOFT, margin: 0, lineHeight: 1.6, borderLeft: `2px solid ${ACCENT_DEEP}`, paddingLeft: '10px' }}>{u.k}</p>
              </div>
            ))}
          </div>

          <SectionTitle numero={4} titulo={isEn ? 'How I worked' : 'Cómo trabajé'} />
          <SectionText>
            {isEn ? 'This isn\'t a solo project. The design and front-end are mine; the backend is built with a development partner. The division matters because it changed how I document: writing API contracts for someone who will actually implement them is not the same as writing them for a portfolio.' : 'Este no es un proyecto en solitario. El diseño y el front-end son míos; el backend se construye con un socio de desarrollo. La división importa porque cambió cómo documento: escribir contratos de API para alguien que sí los va a implementar no es lo mismo que escribirlos para un portafolio.'}
          </SectionText>
          <div style={{ display: 'grid', gap: '10px', marginBottom: '24px' }}>
            {equipo.map(e => (
              <div key={e.rol} style={{ display: 'flex', gap: '14px', flexWrap: mob ? 'wrap' : 'nowrap', backgroundColor: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.12)', borderRadius: '8px', padding: '14px 16px' }}>
                <div style={{ minWidth: mob ? '100%' : '190px' }}>
                  <p style={{ fontSize: '12.5px', fontWeight: 700, color: 'white', margin: '0 0 2px 0' }}>{e.rol}</p>
                  <p style={{ fontFamily: 'monospace', fontSize: '10px', color: CYAN, letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>{e.quien}</p>
                </div>
                <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.6 }}>{e.d}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, margin: 0 }}>
            {isEn ? 'BoostHealth didn\'t start from a blank page. It inherits the token architecture and the accessibility standard from two earlier products of mine — Boost and BoostCare. That is why there are no early wireframes here: the foundations were already decided and tested. What was new was the white-label layer and the AI.' : 'BoostHealth no partió de una página en blanco. Hereda la arquitectura de tokens y el estándar de accesibilidad de dos productos míos anteriores — Boost y BoostCare. Por eso aquí no hay wireframes tempranos: las bases ya estaban decididas y probadas. Lo nuevo era la capa white-label y la IA.'}
          </p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={5} titulo={isEn ? 'My Role' : 'Mi Rol'} />
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: '12px' }}>
            {roles.map(r => (
              <div key={r.titulo} style={{ backgroundColor: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.12)', borderRadius: '8px', padding: '16px' }}>
                <p style={{ fontFamily: 'monospace', fontSize: '10.5px', fontWeight: 700, color: CYAN, letterSpacing: '1.2px', textTransform: 'uppercase', margin: '0 0 11px 0' }}>{r.titulo}</p>
                {r.items.map(item => (
                  <div key={item} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ color: CYAN, flexShrink: 0, fontSize: '12px' }}>✓</span>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <Separador titulo={isEn ? 'Product Decisions' : 'Decisiones de Producto'} />

        {/* DECISIÓN 1 — Qué no hace Sage */}
        <div style={{ marginBottom: '48px' }}>
          <SectionTitle numero={6} titulo={isEn ? 'What Sage does not do' : 'Qué no hace Sage'} />
          <SectionText>{isEn ? 'Before answering anything, Sage runs through three questions. The limit isn\'t a canned response — it is a sequence.' : 'Antes de responder cualquier cosa, Sage pasa por tres preguntas. El límite no es una respuesta enlatada — es una secuencia.'}</SectionText>
          <ArbolSage isEn={isEn} />
          <SectionText>{isEn ? 'And three rules hold that sequence up.' : 'Y tres reglas sostienen esa secuencia.'}</SectionText>
          <div style={{ display: 'grid', gap: '10px', marginBottom: '28px' }}>
            {reglasSage.map((r, i) => (
              <div key={r.t} style={{ display: 'flex', gap: '12px', backgroundColor: 'rgba(15,110,86,0.06)', border: '1px solid rgba(93,202,165,0.20)', borderRadius: '8px', padding: '14px 16px' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '12px', color: ACCENT, flexShrink: 0, fontWeight: 700 }}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', margin: '0 0 3px 0' }}>{r.t}</p>
                  <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.55 }}>{r.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <Phone label={isEn ? 'The conversation that defines the product' : 'La conversación que define el producto'}><SageChatScreen isEn={isEn} /></Phone>
            <div style={{ flex: '1 1 300px', minWidth: '260px', maxWidth: '440px' }}>
              <Quote autor={isEn ? '// the second exchange' : '// el segundo intercambio'}>
                {isEn ? '"I can\'t assess symptoms — that\'s your doctor\'s job. If you\'d like, I can help you move your appointment earlier."' : '"No puedo evaluar síntomas — eso lo hace tu médico. Si quieres, te ayudo a adelantar tu hora."'}
              </Quote>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, margin: '0 0 14px 0' }}>
                {isEn ? 'Three things in two lines: it says it can\'t, says who can, and offers the action within its reach.' : 'Tres cosas en dos líneas: dice que no puede, dice quién sí puede, y ofrece la acción que sí está a su alcance.'}
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: 0 }}>
                {isEn ? 'An "I can\'t help you" leaves the patient where they were. Offering to move the appointment turns the limit into service. The AI doesn\'t diagnose, but it does solve the real problem — that this person needs to see someone sooner.' : 'Un "no puedo ayudarte" deja al paciente donde estaba. Ofrecer adelantar la hora convierte el límite en servicio. La IA no diagnostica, pero sí resuelve el problema real — que esa persona necesita ver a alguien antes.'}
              </p>
            </div>
          </div>
        </div>

        {/* DECISIÓN 2 — Criterio clínico */}
        <div style={{ marginBottom: '48px' }}>
          <SectionTitle numero={7} titulo={isEn ? 'A shortcut I chose not to build' : 'Un atajo que decidí no construir'} />
          <SectionText>
            {isEn ? 'The landing has a search section with "reasons for consultation" — shortcuts for people who don\'t know which speciality they need. While designing it the obvious question came up: why not put the symptoms directly? Dizziness → Neurology. Headache → Neurology. Seems useful.' : 'El landing tiene una sección de búsqueda con "motivos de consulta" — atajos para quien no sabe qué especialidad necesita. Al diseñarla apareció la pregunta obvia: ¿por qué no poner los síntomas directamente? Mareos → Neurología. Dolor de cabeza → Neurología. Parece útil.'}
          </SectionText>
          <p style={{ fontSize: '15px', color: ACCENT, fontWeight: 600, lineHeight: 1.7, margin: '0 0 20px 0' }}>
            {isEn ? 'I didn\'t, and that was the decision.' : 'No lo hice, y esa fue la decisión.'}
          </p>
          <SectionText>
            {isEn ? 'A chip that maps a symptom to a speciality is doing clinical triage — exactly what Sage refuses to do two sections below. The case that makes it clear:' : 'Un chip que mapea un síntoma a una especialidad está haciendo triage clínico — exactamente lo que Sage se niega a hacer dos secciones más abajo. El caso que lo deja claro:'}
          </SectionText>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(248,113,113,0.2)', padding: '18px', marginBottom: '20px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#f87171', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 14px 0' }}>
              {isEn ? '// "skin discolouration" can be' : '// "coloración de piel" puede ser'}
            </p>
            {sintomas.map((s, i) => (
              <div key={s.s} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.65)', minWidth: '110px' }}>{s.s}</span>
                <span style={{ color: 'rgba(255,255,255,0.25)' }}>→</span>
                <span style={{ fontSize: '12.5px', color: i === 2 ? '#f87171' : 'rgba(255,255,255,0.75)', fontWeight: i === 2 ? 700 : 400 }}>{s.d}</span>
              </div>
            ))}
          </div>
          <SectionText>
            {isEn ? 'A chip gives one answer. To route correctly you have to ask more: since when, with what other symptoms, what medication. What stayed in the chips: only administrative reasons or already-diagnosed conditions. Symptoms go to Sage, which can re-ask, detect urgency signals, and say "I can\'t evaluate this".' : 'Un chip da una respuesta. Para derivar bien hay que preguntar más: desde cuándo, con qué otros síntomas, qué medicamentos. Lo que quedó en los chips: solo motivos administrativos o condiciones ya diagnosticadas. Los síntomas van a Sage, que sí puede repreguntar, detectar señales de urgencia, y decir "esto no lo puedo evaluar".'}
          </SectionText>
          <div style={{ borderLeft: `3px solid ${GREEN}`, paddingLeft: '16px' }}>
            <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, margin: 0 }}>
              {isEn ? 'If the AI refuses to assess symptoms but the landing maps them to specialities, the protection is useless. The user ends up in the same place through another door.' : 'Si la IA se niega a evaluar síntomas pero el landing los mapea a especialidades, la protección no sirve de nada. El usuario llega al mismo lugar por otra puerta.'}
            </p>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, margin: '18px 0 0 0' }}>
            {isEn ? 'So the rule couldn\'t live only inside Sage. I applied the same criterion across the whole product: anywhere the user describes what they feel, the system does not decide for them. It either asks more — which only Sage can do — or hands it over to a person.' : 'Así que la regla no podía vivir solo dentro de Sage. Apliqué el mismo criterio en todo el producto: donde el usuario describa lo que siente, el sistema no decide por él. O pregunta más — que es algo que solo Sage puede hacer — o lo pasa a una persona.'}
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, margin: '14px 0 0 0' }}>
            {isEn ? 'It cost the landing a shortcut that would have looked useful. But a shortcut that guesses wrong in health doesn\'t cost a click — it costs a wrong appointment, or a delay in something that couldn\'t wait.' : 'Le costó al landing un atajo que se habría visto útil. Pero un atajo que se equivoca en salud no cuesta un clic — cuesta una cita mal derivada, o una demora en algo que no podía esperar.'}
          </p>
        </div>

        {/* DECISIÓN 3 — Accesibilidad */}
        <div style={{ marginBottom: '48px' }}>
          <SectionTitle numero={8} titulo={isEn ? 'Designing for people who can\'t see well' : 'Diseñar para quien no ve bien'} />
          <SectionText>
            {isEn ? 'A significant share of a clinic\'s users are older adults. In a label/value pair, the label is context and the value is the data the person came to read. Both go at 16px and in the same colour — text/primary, the highest contrast in the system (18.24:1). I couldn\'t raise the size without breaking the layout, nor darken the colour because it was already at the maximum.' : 'Una parte importante de los usuarios de una clínica son adultos mayores. En un par etiqueta/valor, la etiqueta es contexto y el valor es el dato que la persona vino a leer. Ambos van a 16px y en el mismo color — text/primary, el de máximo contraste del sistema (18.24:1). No podía subir el tamaño sin romper el layout, ni oscurecer más el color porque ya estaba al tope.'}
          </SectionText>
          <p style={{ fontSize: '15px', color: ACCENT, fontWeight: 600, lineHeight: 1.7, margin: '0 0 20px 0' }}>
            {isEn ? 'Weight was the only variable left.' : 'El peso era la única variable disponible.'}
          </p>
          <div style={{ marginBottom: '20px' }}>
            <TypographySpec isEn={isEn} />
          </div>
          <SectionText>
            {isEn ? 'That it exists as a token and not as a manual tweak is what makes the decision survive: anyone adding a new clinical data point finds the token and applies it the same way.' : 'Que exista como token y no como un ajuste manual es lo que hace que la decisión sobreviva: cualquiera que agregue un dato clínico nuevo encuentra el token y lo aplica igual.'}
          </SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              { t: isEn ? 'Redundancy is scaffolding, not clutter' : 'La redundancia es andamiaje, no ruido', d: isEn ? 'Past appointments keep the room number and address. A minimalist heuristic says to remove them — but for someone with memory decline, seeing the address written is confirmation.' : 'Las citas pasadas conservan consultorio y dirección. Una heurística minimalista diría quitarlos — pero para alguien con memoria disminuida, ver la dirección escrita es confirmación.' },
              { t: isEn ? '24-hour format, always' : 'Formato 24 horas, siempre' , d: isEn ? 'AM/PM confusion is a documented cause of medication errors. It is not a style preference.' : 'La confusión AM/PM es una causa documentada de errores de medicación. No es una preferencia de estilo.' },
            ].map(item => (
              <div key={item.t} style={{ backgroundColor: 'rgba(15,110,86,0.06)', border: '1px solid rgba(93,202,165,0.18)', borderRadius: '8px', padding: '14px 16px' }}>
                <p style={{ fontSize: '12.5px', fontWeight: 700, color: 'white', margin: '0 0 5px 0' }}>{item.t}</p>
                <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.55 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DECISIÓN 4 — Quitar Ecosistema */}
        <div style={{ marginBottom: '48px' }}>
          <SectionTitle numero={9} titulo={isEn ? 'Removing an entire section' : 'Quitar una sección completa'} />
          <SectionText>
            {isEn ? 'The landing had a section called Ecosystem: four cards presenting the platform products. I removed it — and the reason wasn\'t aesthetic. This landing belongs to Clínica San Rafael, not to BoostHealth. Whoever arrives is a patient who wants to book an appointment.' : 'El landing tenía una sección llamada Ecosistema: cuatro tarjetas presentando los productos de la plataforma. La quité — y la razón no fue estética. Este landing pertenece a Clínica San Rafael, no a BoostHealth. Quien llega es un paciente que quiere agendar una hora.'}
          </SectionText>
          <div style={{ borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', marginBottom: '20px' }}>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', padding: '10px 16px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: CYAN, letterSpacing: '1px', textTransform: 'uppercase' }}>{isEn ? 'Card' : 'Tarjeta'}</span>
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: ACCENT, letterSpacing: '1px', textTransform: 'uppercase' }}>{isEn ? 'Useful to the patient?' : '¿Le sirve al paciente?'}</span>
            </div>
            {ecosistema.map((e, i) => (
              <div key={e.card} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 16px', backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                <span style={{ fontSize: '13px', color: e.ok === true ? GREEN : e.ok === false ? '#f87171' : '#facc15', width: '14px', flexShrink: 0 }}>{e.ok === true ? '✓' : e.ok === false ? '✕' : '~'}</span>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', flex: 1 }}>{e.card}</span>
                <span style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.45)', textAlign: 'right' }}>{e.why}</span>
              </div>
            ))}
          </div>
          <SectionText>
            {isEn ? 'Three of four addressed the clinic that buys the software, not the patient who books. And in a white-label product that matters twice over: the clinic pays for its own brand to be seen. Devoting half a screen to explaining the vendor\'s ecosystem works against that purpose.' : 'Tres de cuatro le hablaban a la clínica que compra el software, no al paciente que agenda. Y en un producto white-label eso importa el doble: la clínica paga para que se vea su marca. Dedicar media pantalla a explicar el ecosistema del proveedor trabaja en contra de ese propósito.'}
          </SectionText>
          <div style={{ borderLeft: `3px solid ${ACCENT_DEEP}`, paddingLeft: '16px' }}>
            <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, margin: 0 }}>
              {isEn ? 'They are two different landings: one B2B for clinics — where the ecosystem is the sales argument — and one B2C for patients. They were mixed together.' : 'Son dos landings distintos: uno B2B para clínicas —donde el ecosistema sí es el argumento de venta— y uno B2C para pacientes. Estaban mezclados.'}
            </p>
          </div>
        </div>

        {/* DECISIÓN 5 — Salida humana */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={10} titulo={isEn ? 'A phone number is always visible' : 'Un teléfono siempre visible'} />
          <SectionText>
            {isEn ? 'At every point where the user can get stuck, the reception phone number is visible without having to ask for it: in Sage\'s chat, in the cancel-appointment modal, in the booking confirmation, and in the empty state of "My appointments". It always sits below the digital action, in a smaller size — available without competing with it.' : 'En cada punto donde el usuario puede quedar bloqueado, el teléfono de recepción está visible sin tener que pedirlo: en el chat de Sage, en el modal de cancelar cita, en la confirmación de reserva, y en el estado vacío de "Mis citas". Siempre va debajo de la acción digital y en tamaño menor — disponible sin competir con ella.'}
          </SectionText>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <Phone label={isEn ? 'Error screen · three ways out' : 'Pantalla de error · tres salidas'}><ErrorScreen isEn={isEn} /></Phone>
            <div style={{ flex: '1 1 300px', minWidth: '260px', maxWidth: '440px' }}>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, margin: '0 0 14px 0' }}>
                {isEn ? 'When the verification code fails to send, the screen doesn\'t say "Error 400" or "verification failed". It says what happened, why it may have happened, and gives three ways out: go to reception with the address and hours, call, or ask Sage.' : 'Cuando falla el envío del código de verificación, la pantalla no dice "Error 400" ni "verificación fallida". Dice qué pasó, por qué pudo pasar, y da tres salidas: ir a recepción con dirección y horario, llamar, o preguntar a Sage.'}
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: 0 }}>
                <strong style={{ color: ACCENT }}>{isEn ? 'The criterion: ' : 'El criterio: '}</strong>
                {isEn ? 'a blocked user doesn\'t need to know what failed technically. They need to know what to do now. And in a product used by older people, "call this number" is a legitimate way out, not a failure of digital design.' : 'un usuario bloqueado no necesita saber qué falló técnicamente. Necesita saber qué hacer ahora. Y en un producto usado por gente mayor, "llama a este número" es una salida legítima, no un fracaso del diseño digital.'}
              </p>
            </div>
          </div>
        </div>

        {/* DECISIÓN 6 — Permisos de cuidador */}
        {/* DECISIÓN 7 — Validación de contraste */}
        <div style={{ marginBottom: '48px' }}>
          <SectionTitle numero={11} titulo={isEn ? 'The client cannot break their own product' : 'El cliente no puede romper su propio producto'} />
          <SectionText>
            {isEn ? 'White-label means each clinic picks its own colours. Which means a clinic can pick a light yellow because it is their brand — and hand their patients an interface they cannot read.' : 'White-label significa que cada clínica elige sus colores. Lo que significa que una clínica puede elegir un amarillo claro porque es su marca — y entregarle a sus pacientes una interfaz que no pueden leer.'}
          </SectionText>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(93,202,165,0.25)', padding: '18px', marginBottom: '20px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '11px', color: ACCENT, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
              {isEn ? '// onboarding · colour rejected' : '// onboarding · color rechazado'}
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, margin: 0 }}>
              {isEn ? '"This colour doesn\'t have enough contrast with the white text on buttons. We suggest #0F6E56, which keeps your tone and does comply."' : '"Este color no tiene suficiente contraste con el texto blanco de los botones. Te proponemos #0F6E56, que mantiene tu tono y sí cumple."'}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
            {(isEn ? [
              { t: 'Rejected, not warned', d: 'A warning you can dismiss gets dismissed. An admin picking their brand colour is not evaluating legibility.' },
              { t: 'Validated in the backend', d: 'If it only lived in the client, a direct API call would bypass it. Accessibility cannot depend on the client cooperating.' },
            ] : [
              { t: 'Se rechaza, no se advierte', d: 'Una advertencia que se puede ignorar se ignora. Un admin eligiendo su color de marca no está evaluando legibilidad.' },
              { t: 'Se valida en el backend', d: 'Si viviera solo en el cliente, una petición directa lo saltaría. La accesibilidad no puede depender de que el cliente coopere.' },
            ]).map(x => (
              <div key={x.t} style={{ backgroundColor: 'rgba(15,110,86,0.06)', border: '1px solid rgba(93,202,165,0.18)', borderRadius: '8px', padding: '14px 16px' }}>
                <p style={{ fontSize: '12.5px', fontWeight: 700, color: 'white', margin: '0 0 5px 0' }}>{x.t}</p>
                <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.55 }}>{x.d}</p>
              </div>
            ))}
          </div>
          <div style={{ borderLeft: `3px solid ${GREEN}`, paddingLeft: '16px' }}>
            <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, margin: 0 }}>
              {isEn ? 'A clinic administrator picking their brand colour is not thinking about legibility — they are thinking about their logo. Letting them choose freely is not flexibility: it hands them a responsibility they never asked for, and the patients pay for it.' : 'Un administrador de clínica eligiendo su color de marca no está pensando en legibilidad — está pensando en su logo. Dejarlo elegir libremente no es flexibilidad: le traslada una responsabilidad que nunca pidió, y la pagan sus pacientes.'}
            </p>
          </div>
        </div>

        {/* DECISIÓN 8 — Concurrencia */}
        <div style={{ marginBottom: '48px' }}>
          <SectionTitle numero={12} titulo={isEn ? 'Two people book the same slot' : 'Dos personas reservan la misma hora'} />
          <SectionText>
            {isEn ? 'Two patients pick 15:30 on Thursday with the same doctor. One confirms first. What the second one sees is a design decision, not a technical detail.' : 'Dos pacientes eligen las 15:30 del jueves con la misma médica. Una confirma primero. Lo que ve la segunda es una decisión de diseño, no un detalle técnico.'}
          </SectionText>
          <div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
            {(isEn ? [
              { n: '01', t: 'Back to step 2, not step 1', d: 'Speciality and doctor are still valid decisions. Sending her to the start would make her repeat two choices that didn\'t change.' },
              { n: '02', t: 'The day stays selected', d: 'Only the time became invalid. The grid reloads without it.' },
              { n: '03', t: 'After three collisions, a phone number', d: '"This agenda is in high demand. Would you rather we call you?" Three failures in a row is a problem the interface cannot solve.' },
            ] : [
              { n: '01', t: 'Vuelve al paso 2, no al 1', d: 'Especialidad y médico siguen siendo decisiones válidas. Devolverla al inicio la obligaría a repetir dos elecciones que no cambiaron.' },
              { n: '02', t: 'El día queda preseleccionado', d: 'Lo único que se invalidó fue la hora. La grilla se recarga sin ella.' },
              { n: '03', t: 'A la tercera colisión, un teléfono', d: '"Esta agenda tiene mucha demanda. ¿Prefieres que te llamemos?" Tres fracasos seguidos son un problema que la interfaz no resuelve.' },
            ]).map(x => (
              <div key={x.n} style={{ display: 'flex', gap: '12px', backgroundColor: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.12)', borderRadius: '8px', padding: '14px 16px' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '12px', color: CYAN, flexShrink: 0, fontWeight: 700 }}>{x.n}</span>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', margin: '0 0 3px 0' }}>{x.t}</p>
                  <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.55 }}>{x.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, margin: 0 }}>
            <strong style={{ color: ACCENT }}>{isEn ? 'Why it is in the spec: ' : 'Por qué está en el spec: '}</strong>
            {isEn ? 'a conflict that only exists under simultaneous load never shows up while designing screens. Writing it down is what lets the developer implement the database-level protection instead of discovering it in production.' : 'un conflicto que solo existe bajo carga simultánea no aparece diseñando pantallas. Dejarlo escrito es lo que permite al desarrollador implementar la protección a nivel de base de datos en vez de descubrirla en producción.'}
          </p>
        </div>

        <Separador titulo={isEn ? 'The Product' : 'El Producto'} />

        {/* FLUJO DE RESERVA */}
        <div style={{ marginBottom: '48px' }}>
          <SectionTitle numero={13} titulo={isEn ? 'The booking flow · 4 steps' : 'El flujo de reserva · 4 pasos'} />
          <SectionText>
            {isEn ? 'Four steps, and at each one you can see where you came from: in "date and time" the chosen doctor appears; in "identify yourself", the full card with date and time. The user never has to remember anything. And you only decide one thing at a time: in step 1 you pick a speciality, and the doctors appear afterwards — so you never face 30 professionals at once.' : 'Cuatro pasos, y en cada uno se ve de dónde vienes: en "fecha y hora" aparece la médica elegida; en "identifícate", la tarjeta completa con fecha y hora. El usuario nunca tiene que recordar nada. Y decides una cosa a la vez: en el paso 1 solo eliges especialidad, y los médicos aparecen después — así nunca te enfrentas a 30 profesionales de golpe.'}
          </SectionText>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center', marginBottom: '24px' }}>
            <Phone label={isEn ? 'Step 1 · speciality and doctor' : 'Paso 1 · especialidad y médico'}><PasoEspecialidad isEn={isEn} /></Phone>
            <Phone label={isEn ? 'Step 2 · date and time' : 'Paso 2 · fecha y hora'}><PasoFechaHora isEn={isEn} /></Phone>
            <Phone label={isEn ? 'Step 4 · confirmed' : 'Paso 4 · confirmada'}><ReservaScreen isEn={isEn} /></Phone>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '12px' }}>
            {(isEn ? [
              { t: 'Grouped time slots', d: 'Morning / Afternoon instead of eight loose chips. Less scanning.' },
              { t: 'Colour marks urgency', d: '"Tomorrow 15:30" in coral vs "Today" in green — the difference is read before the text.' },
              { t: 'The rule where it matters', d: '"Booked 12 hours in advance so the team can prepare your visit" appears when choosing the time, not before.' },
            ] : [
              { t: 'Horarios agrupados', d: 'Mañana / Tarde en vez de ocho chips sueltos. Menos escaneo.' },
              { t: 'El color marca urgencia', d: '"Mañana 15:30" en coral vs "Hoy" en verde — la diferencia se lee antes que el texto.' },
              { t: 'La regla donde importa', d: '"Se agenda con 12 horas de anticipación para que el equipo prepare tu atención" aparece al elegir hora, no antes.' },
            ]).map(x => (
              <div key={x.t} style={{ backgroundColor: 'rgba(15,110,86,0.06)', border: '1px solid rgba(93,202,165,0.18)', borderRadius: '8px', padding: '14px 16px' }}>
                <p style={{ fontSize: '12.5px', fontWeight: 700, color: 'white', margin: '0 0 5px 0' }}>{x.t}</p>
                <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.55 }}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PACIENTE Y ADMIN */}
        <div style={{ marginBottom: '48px' }}>
          <SectionTitle numero={14} titulo={isEn ? 'What patients ask goes back to the clinic' : 'Lo que preguntan los pacientes vuelve a la clínica'} />
          <SectionText>
            {isEn ? 'The diagram at the start showed the return arrow: what patients ask comes back to the clinic. This is where that happens. And it only works if the data arrives as a decision, not as a number.' : 'El diagrama del inicio mostraba la flecha de retorno: lo que preguntan los pacientes vuelve a la clínica. Aquí es donde ocurre. Y solo funciona si el dato llega como decisión, no como número.'}
          </SectionText>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center', marginBottom: '24px' }}>
            <Phone label={isEn ? 'Patient · my appointments' : 'Paciente · mis citas'}><DashboardPacienteScreen isEn={isEn} /></Phone>
            <Phone label={isEn ? 'Admin · dashboard' : 'Admin · dashboard'}><AdminDashboardScreen isEn={isEn} /></Phone>
            <Phone label={isEn ? 'Admin · Sage analytics' : 'Admin · analytics de Sage'}><AnalyticsScreen isEn={isEn} /></Phone>
          </div>
          <div style={{ borderLeft: `3px solid ${GREEN}`, paddingLeft: '16px' }}>
            <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: GREEN }}>{isEn ? 'The analytics table is a to-do list. ' : 'La tabla de analytics es una lista de tareas. '}</strong>
              {isEn ? 'Rows without a source are exactly the questions the clinic\'s Sage cannot answer well. With a subtitle stating how many there are, the table stops being data and starts being work to do.' : 'Las filas sin fuente son exactamente las preguntas que el Sage de la clínica no sabe responder bien. Con un subtítulo que dice cuántas son, la tabla deja de ser un dato y pasa a ser trabajo pendiente.'}
            </p>
          </div>
        </div>

        {/* ESTADOS */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={15} titulo={isEn ? 'What the screen shows when something fails' : 'Qué muestra la pantalla cuando algo falla'} />
          <SectionText>
            {isEn ? 'Empty, loading and error states are usually improvised during development. Here they were designed: four empty states with real copy, a documented skeleton pattern with its animation spec, and destructive confirmations that always include the phone number.' : 'Los estados vacíos, de carga y de error suelen improvisarse en desarrollo. Aquí se diseñaron: cuatro estados vacíos con copy real, un patrón de skeleton documentado con su especificación de animación, y confirmaciones destructivas que siempre incluyen el teléfono.'}
          </SectionText>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <Phone label={isEn ? 'Empty · loading · destructive' : 'Vacío · carga · destructivo'} height="520px"><EstadosScreen isEn={isEn} /></Phone>
            <div style={{ flex: '1 1 300px', minWidth: '260px', maxWidth: '420px', display: 'grid', gap: '10px' }}>
              {(isEn ? [
                { t: 'Two different empty states', d: 'A new user has no appointments and no history. Someone who already attended has history but no upcoming appointment — deleting the history there would be a mistake.' },
                { t: 'Skeleton, not spinner', d: 'The skeleton preserves the layout shape, so the page doesn\'t jump when data arrives. A centred spinner leaves the screen blank and feels slower even if it takes the same time.' },
                { t: 'No CTA if there is no action', d: 'Sage analytics with no data has no button — offering an action that leads nowhere is worse than offering none.' },
              ] : [
                { t: 'Dos estados vacíos distintos', d: 'Un usuario nuevo no tiene citas ni historial. Alguien que ya se atendió tiene historial pero no cita próxima — borrar el historial ahí sería un error.' },
                { t: 'Skeleton, no spinner', d: 'El skeleton preserva la forma del layout, así la página no salta cuando llegan los datos. Un spinner centrado deja la pantalla en blanco y se siente más lento aunque tarde igual.' },
                { t: 'Sin CTA si no hay acción', d: 'Analytics de Sage sin datos no lleva botón — ofrecer una acción que no lleva a ningún lado es peor que no ofrecer ninguna.' },
              ]).map(x => (
                <div key={x.t} style={{ backgroundColor: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.12)', borderRadius: '8px', padding: '13px 15px' }}>
                  <p style={{ fontSize: '12.5px', fontWeight: 700, color: 'white', margin: '0 0 5px 0' }}>{x.t}</p>
                  <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.55 }}>{x.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LANDING */}
        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={16} titulo={isEn ? 'Iterating on the landing' : 'Iterar sobre el landing'} />
          <SectionText>
            {isEn ? 'The first version had all the right elements and none of them worked. It was the most useful review exercise of the project — and it went through several rounds before landing where it is now.' : 'La primera versión tenía todos los elementos correctos y ninguno funcionaba. Fue el ejercicio de revisión más útil del proyecto — y pasó por varias rondas antes de llegar a donde está ahora.'}
          </SectionText>
          <LandingAntesDespues isEn={isEn} mob={mob} />
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '26px 0 12px 0' }}>
            // {isEn ? 'and what the review found' : 'y lo que encontró la revisión'}
          </p>
          <div style={{ display: 'grid', gap: '10px', marginBottom: '24px' }}>
            {(isEn ? [
              { p: 'White headline over a light photo, no overlay', w: 'The main text failed the contrast the rest of the system did require' },
              { p: 'Four testimonials with the same name and text', w: 'Detected in two seconds — it undermines the whole page' },
              { p: 'Hero with a large image → Sage section with another large image', w: 'No breathing room between two heavy visual blocks' },
              { p: '"Ecosystem" section with empty cards', w: 'Read as an unfinished placeholder' },
            ] : [
              { p: 'Titular blanco sobre foto clara, sin overlay', w: 'El texto principal no cumplía el contraste que el resto del sistema sí exigía' },
              { p: 'Cuatro testimonios con el mismo nombre y el mismo texto', w: 'Se detecta en dos segundos y resta credibilidad a toda la página' },
              { p: 'Hero con imagen grande → sección Sage con otra imagen grande', w: 'Sin respiro entre dos bloques de peso visual' },
              { p: 'Sección "Ecosistema" con tarjetas vacías', w: 'Se leía como un placeholder sin terminar' },
            ]).map(x => (
              <div key={x.p} style={{ display: 'flex', gap: '10px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '12px 15px' }}>
                <span style={{ color: '#f87171', fontSize: '12px', flexShrink: 0 }}>✕</span>
                <div>
                  <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.75)', margin: '0 0 3px 0' }}>{x.p}</p>
                  <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.5 }}>{x.w}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>// {isEn ? 'three changes that solved it' : 'tres cambios que lo resolvieron'}</p>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
            {(isEn ? [
              { n: '01', t: 'A search section', d: 'Not decorative: it solved a real friction — people don\'t know which speciality they need — and cut the run of images.' },
              { n: '02', t: 'A headline that says something', d: '"Here medical care begins before the consultation" instead of a phrase any clinic could use.' },
              { n: '03', t: 'Vertical rhythm', d: 'Alternating light and dark backgrounds, content contained at 1200px. The eye finally has somewhere to rest.' },
            ] : [
              { n: '01', t: 'Una sección de búsqueda', d: 'No decorativa: resolvía una fricción real —la gente no sabe qué especialidad necesita— y cortaba la sucesión de imágenes.' },
              { n: '02', t: 'Un titular que dice algo', d: '"Aquí la atención médica comienza antes de la consulta" en vez de una frase que podría usar cualquier clínica.' },
              { n: '03', t: 'Ritmo vertical', d: 'Alternar fondos claros y oscuros, contenido contenido a 1200px. El ojo por fin encuentra dónde detenerse.' },
            ]).map(x => (
              <div key={x.n} style={{ backgroundColor: 'rgba(15,110,86,0.06)', border: '1px solid rgba(93,202,165,0.20)', borderRadius: '8px', padding: '14px 16px' }}>
                <p style={{ fontFamily: 'monospace', fontSize: '11px', color: ACCENT, margin: '0 0 6px 0', fontWeight: 700 }}>{x.n}</p>
                <p style={{ fontSize: '12.5px', fontWeight: 700, color: 'white', margin: '0 0 5px 0' }}>{x.t}</p>
                <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.55 }}>{x.d}</p>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: `1px solid ${ACCENT_DEEP}33`, padding: '18px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '10px', color: ACCENT, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 10px 0' }}>// {isEn ? 'a finding that went back into the system' : 'un hallazgo que volvió al sistema'}</p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, margin: 0 }}>
              {isEn ? 'Giving the Sage section a dark background dropped the CTA to 2.21:1 — practically invisible. It wasn\'t a bug on that screen: it was a variant the system was missing. Any CTA over a dark surface would have the same problem. Two additions came out of it: ' : 'Al darle fondo oscuro a la sección de Sage, el CTA quedó en 2.21:1 — prácticamente invisible. No era un error de esa pantalla: era una variante que le faltaba al sistema. Cualquier CTA sobre superficie oscura tendría el mismo problema. De ahí salieron dos adiciones: '}
              <span style={{ fontFamily: 'monospace', color: GREEN }}>bg/inverse</span> {isEn ? 'and' : 'y'} <span style={{ fontFamily: 'monospace', color: GREEN }}>Button/inverse</span> {isEn ? '(13.7:1).' : '(13.7:1).'}
            </p>
          </div>
        </div>

        <Separador titulo={isEn ? 'The System' : 'El Sistema'} />

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={17} titulo={isEn ? 'Changing the brand without breaking anything' : 'Cambiar la marca sin romper nada'} />
          <SectionText>
            {isEn ? 'No component references a primitive directly. That indirection has a concrete consequence: dark mode is implemented by reassigning the semantic layer, without touching a single component.' : 'Ningún componente referencia un primitivo directamente. Esa indirección tiene una consecuencia concreta: el modo oscuro se implementa reasignando la capa semántica, sin tocar un solo componente.'}
          </SectionText>
          <CadenaTokens isEn={isEn} mob={mob} />
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '24px 0 12px 0' }}>
            // {isEn ? '11 component families, all built on those tokens' : '11 familias de componentes, todas construidas sobre esos tokens'}
          </p>
          <div style={{ borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', backgroundColor: '#fff', marginBottom: '20px' }}>
            <img src={shComponentes} alt={isEn ? 'Component library: eleven families' : 'Librería de componentes: once familias'} loading="lazy" style={{ width: '100%', display: 'block' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', padding: '16px' }}>
              <p style={{ fontFamily: 'monospace', fontSize: '10px', color: CYAN, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>// primitives</p>
              {PRIMITIVES.map(p => (
                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '7px' }}>
                  <span style={{ width: '22px', height: '22px', borderRadius: '5px', backgroundColor: p.hex, border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.75)' }}>{p.name}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginLeft: 'auto' }}>{p.hex}</span>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', padding: '16px' }}>
              <p style={{ fontFamily: 'monospace', fontSize: '10px', color: ACCENT, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>// semantic ({isEn ? 'the aliases' : 'los alias'})</p>
              {SEMANTIC.map(s => (
                <div key={s.alias} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '7px' }}>
                  <span style={{ width: '22px', height: '22px', borderRadius: '5px', backgroundColor: s.hex, border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.75)' }}>{s.alias}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginLeft: 'auto' }}>→ {s.ref}</span>
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>// {isEn ? 'each token carries its usage rule' : 'cada token lleva escrita su regla de uso'}</p>
          <div style={{ display: 'grid', gap: '8px', marginBottom: '20px' }}>
            {[
              { t: 'danger', r: isEn ? 'Alerts and errors only — never decorative' : 'Solo alertas y errores — nunca decorativo' },
              { t: 'success', r: isEn ? 'Always accompanied by a symbol (✓)' : 'Siempre acompañado de símbolo (✓)' },
              { t: 'action/primary', r: isEn ? 'Never small text over dark backgrounds' : 'Nunca texto pequeño sobre fondos oscuros' },
            ].map(x => (
              <div key={x.t} style={{ display: 'flex', gap: '12px', alignItems: 'baseline', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '6px', padding: '9px 14px' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '11.5px', color: ACCENT, minWidth: '110px' }}>{x.t}</span>
                <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.65)' }}>{x.r}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, margin: 0 }}>
            {isEn ? 'In a product that cancels medical appointments and revokes access, red has to mean one single thing. If it decorates any badge, it stops reading as an alert the day it actually is one. And the success rule isn\'t aesthetic: it is what sustains accessibility when colour alone is not enough for colourblind users.' : 'En un producto donde se cancelan citas médicas y se revocan accesos, el rojo tiene que significar una sola cosa. Si decora un badge cualquiera, deja de leerse como alerta el día que sí lo sea. Y la regla de success no es estética: es la que sostiene la accesibilidad cuando el color solo no alcanza para usuarios daltónicos.'}
          </p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={18} titulo={isEn ? 'I reviewed my own system and found four errors' : 'Revisé mi propio sistema y encontré cuatro errores'} />
          <SectionText>{isEn ? 'I reviewed the system component by component against its own documentation. Four findings that would have generated technical debt:' : 'Revisé el sistema componente por componente contra su propia documentación. Cuatro hallazgos que habrían generado deuda técnica:'}</SectionText>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {auditoria.map(it => (
              <div key={it.h} style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '14px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ color: '#f87171', fontSize: '12px', flexShrink: 0 }}>✕</span>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.5 }}>{it.h}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', paddingLeft: '2px' }}>
                  <span style={{ color: GREEN, fontSize: '12px', flexShrink: 0 }}>→</span>
                  <p style={{ fontSize: '12.5px', color: 'rgba(93,202,165,0.85)', margin: 0, lineHeight: 1.5 }}>{it.fix}</p>
                </div>
              </div>
            ))}
          </div>
          <ContrastSpec isEn={isEn} />
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, margin: '20px 0 0 0' }}>
            <strong style={{ color: ACCENT }}>{isEn ? 'The pattern that repeated: ' : 'El patrón que se repitió: '}</strong>
            {isEn ? 'a concrete visual problem reveals a gap in the system. Solving it only on that screen would have left the trap set for the next one.' : 'un problema visual concreto revela un hueco del sistema. Resolverlo solo en esa pantalla habría dejado la trampa puesta para la siguiente.'}
          </p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={19} titulo={isEn ? 'Writing it so someone else can build it' : 'Escribirlo para que otro pueda construirlo'} />
          <SectionText>
            {isEn ? 'Two separate documents, following the same logic as the system: Foundations (colour, typography, spacing, accessibility, theming, and the CSS token file ready to copy) and Components (the 12 frames with measurements, variants, states, and the Auto Layout → Flexbox translation). Components references Foundations, never the other way round — the same one-directional dependency that makes theming possible.' : 'Dos documentos separados, siguiendo la misma lógica que el sistema: Foundations (color, tipografía, spacing, accesibilidad, theming, y el archivo de tokens CSS listo para copiar) y Components (los 12 frames con medidas, variantes, estados y la traducción de Auto Layout a Flexbox). Components referencia a Foundations, nunca al revés — la misma dependencia unidireccional que hace posible el theming.'}
          </SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '12px' }}>
            {(isEn ? [
              { t: 'Open issues, written down', d: 'A document that hides what is missing is useless — the dev discovers the gaps mid-sprint.' },
              { t: 'Traceability', d: 'What is verified, what is assumed, and how to close the difference.' },
              { t: 'The why, not just the value', d: 'disabled and loading look different but both block the click; the document explains why they must not be merged.' },
            ] : [
              { t: 'Los pendientes, escritos', d: 'Un documento que oculta lo que falta no sirve — el dev descubre los huecos a mitad del sprint.' },
              { t: 'Trazabilidad', d: 'Qué está verificado, qué es supuesto, y cómo cerrar la diferencia.' },
              { t: 'El porqué de cada decisión', d: 'disabled y loading se ven distinto pero ambos bloquean el click; el documento explica por qué no deben unificarse.' },
            ]).map(x => (
              <div key={x.t} style={{ backgroundColor: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.12)', borderRadius: '8px', padding: '14px 16px' }}>
                <p style={{ fontSize: '12.5px', fontWeight: 700, color: 'white', margin: '0 0 5px 0' }}>{x.t}</p>
                <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.55 }}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '48px' }}>
          <SectionTitle numero={20} titulo={isEn ? 'The decision I reversed' : 'La decisión que reversé'} />
          <SectionText>
            {isEn ? 'Past appointments showed doctor, date, time, room number and address. I removed the room and the address applying a standard heuristic: strip everything that isn\'t essential to the action. Nobody needs to know which floor they went to back in April.' : 'Las citas pasadas mostraban médico, fecha, hora, consultorio y dirección. Quité el consultorio y la dirección aplicando una heurística estándar: eliminar todo lo que no sea esencial para la acción. Nadie necesita saber a qué piso fue en abril.'}
          </SectionText>
          <p style={{ fontSize: '15px', color: ACCENT, fontWeight: 600, lineHeight: 1.7, margin: '0 0 20px 0' }}>
            {isEn ? 'The heuristic assumes a user who can reconstruct context from memory. Mine can\'t.' : 'La heurística asume un usuario que puede reconstruir el contexto de memoria. La mía no puede.'}
          </p>
          <SectionText>
            {isEn ? 'Then I remembered who reads this screen. María doesn\'t remember which room she was seen in, and she isn\'t going to admit it out loud. For her, redundancy is not clutter — it is scaffolding. Seeing "310 · Floor 3" written confirms she is going to the place she already knows. Arriving somewhere unfamiliar is one of the things that generates most anxiety at that age, and that one line removes it.' : 'Entonces recordé quién lee esta pantalla. María no se acuerda en qué consultorio la atendieron, y no lo va a decir en voz alta. Para ella la redundancia no es ruido — es andamiaje. Ver "310 · Piso 3" escrito le confirma que va al lugar que ya conoce. Llegar a un sitio desconocido es de las cosas que más ansiedad generan a esa edad, y esa línea lo elimina.'}
          </SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: 'rgba(248,113,113,0.04)', border: '1px solid rgba(248,113,113,0.16)', borderRadius: '8px', padding: '14px 16px' }}>
              <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#f87171', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 8px 0' }}>{isEn ? '// what I got wrong' : '// en qué me equivoqué'}</p>
              <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.55 }}>{isEn ? 'The problem was never the amount of data. It was that all of it carried the same visual weight — five identical rows competing with the action.' : 'El problema nunca fue la cantidad de datos. Era que todos pesaban igual — cinco filas idénticas compitiendo con la acción.'}</p>
            </div>
            <div style={{ backgroundColor: 'rgba(93,202,165,0.04)', border: '1px solid rgba(93,202,165,0.16)', borderRadius: '8px', padding: '14px 16px' }}>
              <p style={{ fontFamily: 'monospace', fontSize: '10px', color: GREEN, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 8px 0' }}>{isEn ? '// the fix' : '// la corrección'}</p>
              <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.55 }}>{isEn ? 'Everything stays, with hierarchy: doctor and relative date up front, room and address in a quieter support line, action last.' : 'Todo se queda, con jerarquía: médico y fecha relativa arriba, consultorio y dirección en una línea de apoyo más discreta, la acción al final.'}</p>
            </div>
          </div>
          <div style={{ borderLeft: `3px solid ${GREEN}`, paddingLeft: '16px' }}>
            <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, margin: 0 }}>
              {isEn ? 'Simplicity isn\'t measured in how few elements are on screen. It is measured in how much mental effort you save the person reading. Sometimes that means keeping more, better organised.' : 'La simplicidad no se mide en cuántos elementos hay en pantalla. Se mide en cuánto esfuerzo mental le ahorras a quien está leyendo. A veces eso significa dejar más, mejor ordenado.'}
            </p>
          </div>
        </div>

        <Separador titulo={isEn ? 'The Full System' : 'El Sistema Completo'} />

        <div style={{ marginBottom: '48px' }}>
          <SectionTitle numero={21} titulo={isEn ? 'How the whole thing connects' : 'Cómo se conecta todo'} />
          <SectionText>
            {isEn ? 'Seven flows, twenty-eight screens. Three of them belong to the patient, three to the clinic administrator, and one is shared: password recovery. Nothing dead-ends — every screen has a way forward and a way back.' : 'Siete flujos, veintiocho pantallas. Tres son del paciente, tres del administrador de la clínica, y uno es compartido: recuperar contraseña. Nada termina en callejón — cada pantalla tiene salida hacia adelante y hacia atrás.'}
          </SectionText>
          <div style={{ borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', backgroundColor: '#fff', marginBottom: '18px', maxWidth: mob ? '100%' : '620px', marginLeft: 'auto', marginRight: 'auto' }}>
            <img src={shFlujos} alt={isEn ? 'Flow map: seven flows connecting twenty-eight screens' : 'Mapa de flujos: siete flujos conectando veintiocho pantallas'} loading="lazy" style={{ width: '100%', display: 'block' }} />
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, margin: 0 }}>
            {isEn ? 'Drawing it out is what surfaced the gaps: a booking that gets interrupted by registration and has to come back, a speciality with no available doctors, a slot taken while someone was confirming it. None of those show up screen by screen — they only appear once you see the whole thing connected.' : 'Dibujarlo es lo que sacó a la luz los huecos: una reserva que se interrumpe por el registro y tiene que volver, una especialidad sin médicos disponibles, una hora tomada mientras alguien la confirmaba. Nada de eso aparece pantalla por pantalla — solo aparece cuando ves todo conectado.'}
          </p>
        </div>

        <div style={{ marginBottom: '48px' }}>
          <SectionTitle numero={22} titulo={isEn ? 'Every screen, every state' : 'Cada pantalla, cada estado'} />
          <SectionText>
            {isEn ? 'The screens above are recreated in code so they stay responsive and light. These are the real Figma exports — the complete system, including the states that never make it into a portfolio: loading, empty, error, and destructive confirmation.' : 'Las pantallas de arriba están recreadas en código para que sigan siendo responsivas y ligeras. Estas son las exportaciones reales de Figma — el sistema completo, incluyendo los estados que nunca llegan a un portafolio: cargando, vacío, error y confirmación destructiva.'}
          </SectionText>
          <p style={{ fontFamily: 'monospace', fontSize: '10.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '1px', margin: '0 0 24px 0' }}>
            {isEn ? '// click any screen to enlarge · arrows to navigate' : '// clic en cualquier pantalla para ampliar · flechas para navegar'}
          </p>
          <Galeria isEn={isEn} mob={mob} />
        </div>

        <Separador titulo={isEn ? 'Closing' : 'Cierre'} />

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={23} titulo={isEn ? 'What comes next' : 'Qué sigue'} />
          <div style={{ display: 'grid', gap: '10px' }}>
            {siguiente.map(x => (
              <div key={x.t} style={{ backgroundColor: 'rgba(93,202,165,0.04)', border: '1px solid rgba(93,202,165,0.16)', borderRadius: '8px', padding: '14px 16px' }}>
                <p style={{ fontSize: '13px', fontWeight: 700, color: GREEN, margin: '0 0 5px 0' }}>{x.t}</p>
                <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.62)', margin: 0, lineHeight: 1.6 }}>{x.d}</p>
              </div>
            ))}
          </div>

        </div>

        <div style={{ border: '1px solid rgba(93,202,165,0.22)', backgroundColor: 'rgba(15,110,86,0.05)', padding: '32px', borderRadius: '6px', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '20px' }}>{isEn ? '🚀 What I contributed' : '🚀 Qué aporté'}</h2>
          {contribuciones.map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
              <span style={{ color: ACCENT_SOFT, fontSize: '13px', flexShrink: 0 }}>✅</span>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>


        <div style={{ marginBottom: '40px' }}>
          <Quote autor={isEn ? '// what I take away' : '// lo que me llevo'}>
            {isEn ? 'A project this size is teamwork, and looking at it from other people\'s perspectives is what widened mine the most. Designing for healthcare is delicate — but it gives the work meaning. Applying accessibility standards stopped being a checklist and became the point: I built something that reaches the people who actually need it.' : 'Un proyecto de este tamaño es trabajo en equipo, y ver las cosas desde otras perspectivas es lo que más me amplió el criterio. Diseñar para medicina es delicado — pero le da sentido al trabajo. Aplicar estándares de accesibilidad dejó de ser un checklist y pasó a ser el punto: construí algo que alcanza a quienes realmente lo necesitan.'}
          </Quote>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <Separador titulo={isEn ? 'Explore' : 'Explorar'} />
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href={FIGMA} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: ACCENT_DEEP, color: '#fff', fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', padding: '14px 32px', textDecoration: 'none', borderRadius: '6px', boxShadow: '0 4px 20px rgba(93,202,165,0.4)' }}>{isEn ? 'Open Figma prototype' : 'Ver prototipo en Figma'} →</a>
            <a href={REPO} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'transparent', color: GREEN, border: `1px solid ${GREEN}66`, fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', padding: '14px 32px', textDecoration: 'none', borderRadius: '6px' }}>GitHub →</a>
          </div>
        </div>

      </div>
    </div>
  )
}
