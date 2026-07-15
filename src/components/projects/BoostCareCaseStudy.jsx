import { useEffect, useRef, useState } from 'react'
import { useWindowWidth, isMobile, isTablet } from '../../hooks/useWindowWidth'
import { usePortfolio } from '../../context/PortfolioContext'
import { FaWhatsapp } from 'react-icons/fa'
import { MdHome, MdKeyboardArrowUp } from 'react-icons/md'
import imgLanding from '../../assets/projects/LandingBoostCare.png'
import imgMedico from '../../assets/projects/APP DEL MEDICO.png'
import imgCuidador from '../../assets/projects/APP DEL CUIDADOR.png'
import imgFlowCanvas from '../../assets/projects/CapturaFlujoBoostcare.PNG'

/* ============================================================
   BoostCare — Caso de estudio
   Misma estética que BoostCaseStudy (shell cyan/coral, circuitos).
   Acento del proyecto: VERDE de marca BoostCare (#1D9E75 / #0F6E56),
   tomado 1:1 de los design tokens reales (index.css).
   Todos los visuales están hechos en código — coherente con la
   narrativa "del diseño al código".
   ============================================================ */

const LIVE = 'https://boostcare.netlify.app'
const REPO = 'https://github.com/Zoe-2688'
const WHATSAPP = 'https://wa.me/56989774690'

/* Acentos — verdes más brillantes para destacar sobre el fondo azul oscuro */
const ACCENT = '#5DCAA5'        // green-300 (acento principal, buen contraste sobre oscuro)
const ACCENT_SOFT = '#9FE1CB'   // green-200 (acento claro / iconos)
const ACCENT_DEEP = '#0F6E56'   // green-600 (botón real de la app, sobre blanco)
/* Degradado del título (menta → verde marca) */
const TITLE_GRADIENT = 'linear-gradient(90deg, #9FE1CB 0%, #35B58C 55%, #1D9E75 100%)'
/* Coral del portafolio — acento secundario y linaje visual con Boost */
const CORAL = '#e8a090'

/* Tokens reales de BoostCare (para swatches) */
const PRIMITIVES = [
  { name: 'green-50', hex: '#E1F5EE' },
  { name: 'green-100', hex: '#C8EDE0' },
  { name: 'green-300', hex: '#5DCAA5' },
  { name: 'green-500', hex: '#1D9E75' },
  { name: 'green-600', hex: '#0F6E56' },
  { name: 'green-800', hex: '#085041' },
]
const SEMANTIC = [
  { alias: 'action-primary', ref: 'green-600', hex: '#0F6E56' },
  { alias: 'brand-subtle', ref: 'green-50', hex: '#E1F5EE' },
  { alias: 'success', ref: 'green-500', hex: '#1D9E75' },
  { alias: 'danger', ref: 'red-500', hex: '#DC2626' },
  { alias: 'warning', ref: 'amber-500', hex: '#D97706' },
  { alias: 'text-primary', ref: 'neutral-950', hex: '#0F1712' },
]

/* ---------------- Fondo de circuitos (idéntico al de Boost) ---------------- */
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
    if (nodes.length >= 2) circuits.push({ nodes, green: Math.random() < 0.4 })
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
      for (const { nodes, green } of circuitsRef.current) {
        const color = green ? 'rgba(53,181,140,' : 'rgba(0,212,255,'
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
      const col = c.green ? '#35B58C' : '#00d4ff'
      ctx.save()
      const g = ctx.createRadialGradient(x, y, 0, x, y, 5)
      g.addColorStop(0, c.green ? 'rgba(53,181,140,0.8)' : 'rgba(0,212,255,0.8)')
      g.addColorStop(1, c.green ? 'rgba(53,181,140,0)' : 'rgba(0,212,255,0)')
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

/* ---------------- Helpers de UI (misma estética, acento verde) ---------------- */
const TAGS = ['Figma', 'Design Tokens', 'React', 'Tailwind', 'WCAG', 'AI-native']

function Tag({ label }) {
  return <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.35)', backgroundColor: 'rgba(0,212,255,0.06)', padding: '3px 10px', letterSpacing: '0.5px' }}>{label}</span>
}
function SectionTitle({ numero, titulo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
      <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#00d4ff', opacity: 0.4 }}>{String(numero).padStart(2, '0')}</span>
      <h2 style={{ fontFamily: 'inherit', fontSize: '15px', fontWeight: 600, color: CORAL, letterSpacing: '0.05em', margin: 0 }}>{titulo}</h2>
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
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ border: `1px solid ${hov ? 'rgba(53,181,140,0.6)' : 'rgba(0,212,255,0.15)'}`, backgroundColor: hov ? 'rgba(53,181,140,0.08)' : 'rgba(0,212,255,0.04)', padding: '12px 14px', borderRadius: '4px', boxShadow: hov ? '0 0 16px rgba(53,181,140,0.2)' : 'none', transition: 'all 200ms ease', cursor: 'default' }}>
      <p style={{ fontSize: '1.4rem', fontWeight: 700, color: ACCENT, margin: '0 0 4px 0', lineHeight: 1 }}>{valor}</p>
      <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.4 }}>{label}</p>
    </div>
  )
}
function Separador({ titulo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '52px 0' }}>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(53,181,140,0.2)' }} />
      <span style={{ fontSize: '16px', fontWeight: 700, color: ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{titulo}</span>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(53,181,140,0.2)' }} />
    </div>
  )
}

/* ---------------- Mockup de teléfono (frame CSS, contenido en código) ---------------- */
function Phone({ children, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <div style={{ width: '260px', maxWidth: '100%', borderRadius: '30px', border: '8px solid #10201a', backgroundColor: '#ffffff', boxShadow: '0 12px 40px rgba(0,0,0,0.45)', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', width: '70px', height: '5px', borderRadius: '3px', backgroundColor: '#10201a', zIndex: 2 }} />
        <div style={{ padding: '26px 14px 14px', height: '470px', overflow: 'hidden', fontFamily: "'Inter','Segoe UI',sans-serif" }}>{children}</div>
      </div>
      {label && <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>{label}</span>}
    </div>
  )
}

/* Pantalla real recreada: Dashboard del médico */
function DashboardScreen({ isEn }) {
  const c = { ink: '#0F1712', muted: '#55685E', line: '#DCE5E0', subtle: '#E1F5EE', green: '#0F6E56', green500: '#1D9E75', danger: '#DC2626', dangerBg: '#FEE2E2' }
  const Card = ({ children }) => <div style={{ border: `1px solid ${c.line}`, borderRadius: '12px', padding: '10px 12px', marginBottom: '8px' }}>{children}</div>
  return (
    <div>
      <p style={{ textAlign: 'center', fontSize: '9px', color: c.muted, margin: '0 0 10px 0' }}>← {isEn ? 'Demo menu' : 'Menú del demo'}</p>
      <p style={{ fontSize: '16px', fontWeight: 800, color: c.ink, margin: '0 0 2px 0' }}>{isEn ? 'Hi, Dr. Ramírez' : 'Hola, Dra. Ramírez'}</p>
      <p style={{ fontSize: '9.5px', color: c.muted, margin: '0 0 12px 0' }}>{isEn ? 'Monday Jul 13 · 3 patients on alert' : 'Lunes 13 de julio · 3 pacientes en alerta'}</p>
      <div style={{ backgroundColor: c.subtle, borderRadius: '12px', padding: '10px 12px', marginBottom: '14px' }}>
        <p style={{ fontSize: '10px', fontWeight: 700, color: c.green, margin: '0 0 4px 0' }}>✨ {isEn ? 'Day summary' : 'Resumen del día'}</p>
        <p style={{ fontSize: '9.5px', color: c.ink, margin: 0, lineHeight: 1.5 }}>{isEn ? 'Cármen Mercédes is your priority: 40% adherence. Review the treatments that aren\'t working first.' : 'Cármen Mercédes es tu prioridad: 40% de adherencia. Revisa primero los tratamientos que no están funcionando.'}</p>
      </div>
      <p style={{ fontSize: '10px', color: c.muted, margin: '0 0 8px 0' }}>{isEn ? 'Today\'s schedule' : 'Agenda de hoy'}</p>
      {[['09:00', 'Carlos Mendoza', isEn ? 'Cognitive check · In-person' : 'Control cognitivo · Presencial'], ['11:30', 'Ana Torres', isEn ? 'Diabetes check · In-person' : 'Control diabetes · Presencial'], ['16:00', 'María González', isEn ? 'Follow-up · Telemedicine' : 'Seguimiento · Telemedicina']].map(([h, n, d]) => (
        <Card key={n}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', fontWeight: 700, color: c.green, backgroundColor: c.subtle, borderRadius: '6px', padding: '4px 6px' }}>{h}</span>
            <div><p style={{ fontSize: '10px', fontWeight: 700, color: c.ink, margin: 0 }}>{n}</p><p style={{ fontSize: '8.5px', color: c.muted, margin: 0 }}>{d}</p></div>
          </div>
        </Card>
      ))}
      <p style={{ fontSize: '10px', color: c.muted, margin: '10px 0 8px 0' }}>{isEn ? 'Patients at risk (3)' : 'Pacientes en riesgo (3)'}</p>
      <Card>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: c.subtle, color: c.green, fontSize: '9px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>CM</span>
            <div><p style={{ fontSize: '10px', fontWeight: 700, color: c.ink, margin: 0 }}>Cármen Mercédes</p><p style={{ fontSize: '8.5px', color: c.muted, margin: 0 }}>{isEn ? '62 yrs · Frontotemporal dementia' : '62 años · Demencia frontotemporal'}</p></div>
          </div>
          <span style={{ fontSize: '9px', fontWeight: 700, color: c.danger, backgroundColor: c.dangerBg, borderRadius: '6px', padding: '3px 6px', whiteSpace: 'nowrap' }}>✕ 40%</span>
        </div>
      </Card>
      <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: `1px solid ${c.line}`, marginTop: '10px', paddingTop: '8px' }}>
        {[isEn ? 'Home' : 'Inicio', isEn ? 'Patients' : 'Pacientes', isEn ? 'Schedule' : 'Agenda', isEn ? 'Profile' : 'Perfil'].map((t, i) => (
          <span key={t} style={{ fontSize: '8px', color: i === 0 ? c.green : c.muted, fontWeight: i === 0 ? 700 : 400 }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

/* Pantalla real recreada: Receta digital (con validación) */
function RecetaScreen({ isEn }) {
  const c = { ink: '#0F1712', muted: '#55685E', line: '#DCE5E0', subtle: '#E1F5EE', green: '#0F6E56', disabled: '#DCE5E0', disabledTxt: '#71857B' }
  const Field = ({ label, ph }) => (
    <div style={{ marginBottom: '10px' }}>
      <p style={{ fontSize: '9px', fontWeight: 600, color: c.ink, margin: '0 0 4px 0' }}>{label}</p>
      <div style={{ border: `1px solid ${c.line}`, borderRadius: '10px', padding: '8px 10px', fontSize: '9px', color: '#9fb0a8' }}>{ph}</div>
    </div>
  )
  return (
    <div>
      <p style={{ fontSize: '10px', fontWeight: 600, color: c.ink, margin: '0 0 12px 0' }}>← {isEn ? 'New prescription' : 'Nueva receta'}</p>
      <div style={{ border: `1px solid ${c.line}`, borderRadius: '12px', padding: '10px 12px', marginBottom: '14px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: c.subtle, color: c.green, fontSize: '9px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>CM</span>
          <div><p style={{ fontSize: '10px', fontWeight: 700, color: c.ink, margin: 0 }}>Cármen Mercédes</p><p style={{ fontSize: '8.5px', color: c.muted, margin: 0 }}>{isEn ? '62 yrs · Dementia' : '62 años · Demencia'}</p></div>
        </div>
        <span style={{ fontSize: '9px', fontWeight: 700, color: '#DC2626', backgroundColor: '#FEE2E2', borderRadius: '6px', padding: '3px 6px' }}>✕ 40%</span>
      </div>
      <Field label={isEn ? 'Medication' : 'Medicamento'} ph={isEn ? 'Search by name...' : 'Busca por nombre...'} />
      <Field label={isEn ? 'Dose' : 'Dosis'} ph="10 mg" />
      <Field label={isEn ? 'Frequency & instructions' : 'Frecuencia e indicaciones'} ph={isEn ? '1 tablet every 24h, fasting' : '1 comprimido cada 24 h, en ayunas'} />
      <div style={{ backgroundColor: c.subtle, borderRadius: '10px', padding: '8px 10px', marginBottom: '12px' }}>
        <p style={{ fontSize: '9px', color: c.green, margin: 0, lineHeight: 1.5 }}>{isEn ? 'The patient, their caregiver and the pharmacy will see this exact digital prescription.' : 'El paciente, su cuidador y la farmacia verán esta receta digital idéntica.'}</p>
      </div>
      <div style={{ backgroundColor: c.disabled, color: c.disabledTxt, borderRadius: '12px', padding: '10px', textAlign: 'center', fontSize: '10px', fontWeight: 600 }}>{isEn ? 'Sign & send prescription' : 'Firmar y enviar receta'}</div>
      <p style={{ fontSize: '8px', color: c.muted, textAlign: 'center', margin: '6px 0 0 0', fontStyle: 'italic' }}>{isEn ? '↑ disabled until the form is valid' : '↑ deshabilitado hasta que el formulario es válido'}</p>
    </div>
  )
}

/* Pantalla real recreada: Modo cuidador (versión desarrollada + iterada) */
function CuidadorScreen({ isEn }) {
  const c = { ink: '#0F1712', muted: '#55685E', line: '#DCE5E0', subtle: '#E1F5EE', green: '#0F6E56', disabled: '#DCE5E0', disabledTxt: '#71857B' }
  return (
    <div>
      <p style={{ fontSize: '9px', color: c.muted, margin: '0 0 8px 0' }}>← {isEn ? 'Exit caregiver mode' : 'Salir del modo cuidador'}</p>
      <p style={{ fontSize: '15px', fontWeight: 800, color: c.ink, margin: '0 0 2px 0' }}>{isEn ? 'Hi, Marcos' : 'Hola, Marcos'}</p>
      <p style={{ fontSize: '9px', color: c.muted, margin: '0 0 10px 0' }}>{isEn ? 'You care for Cármen Mercédes' : 'Cuidas a Cármen Mercédes'}</p>
      <div style={{ backgroundColor: c.subtle, borderRadius: '10px', padding: '9px 11px', marginBottom: '12px' }}>
        <p style={{ fontSize: '9px', color: c.green, margin: 0, lineHeight: 1.5 }}>{isEn ? 'Your doctor invited you to follow Cármen\'s treatment. Here you see how it\'s going and can notify them if you notice something.' : 'Tu médico te invitó a seguir el tratamiento de Cármen. Aquí ves cómo va y puedes avisarle si notas algo.'}</p>
      </div>
      <div style={{ border: `1px solid ${c.line}`, borderRadius: '12px', padding: '9px 11px', marginBottom: '12px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: c.subtle, color: c.green, fontSize: '9px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>CM</span>
          <div><p style={{ fontSize: '10px', fontWeight: 700, color: c.ink, margin: 0 }}>Cármen Mercédes</p><p style={{ fontSize: '8px', color: c.muted, margin: 0 }}>{isEn ? '62 yrs · Dementia' : '62 años · Demencia'}</p></div>
        </div>
        <span style={{ fontSize: '9px', fontWeight: 700, color: '#DC2626', backgroundColor: '#FEE2E2', borderRadius: '6px', padding: '3px 6px' }}>✕ 40%</span>
      </div>
      <p style={{ fontSize: '10px', color: c.muted, margin: '0 0 6px 0' }}>{isEn ? 'Next dose' : 'Próxima toma'}</p>
      <div style={{ border: `1px solid ${c.line}`, borderRadius: '12px', padding: '9px 11px', marginBottom: '12px' }}>
        <p style={{ fontSize: '10px', fontWeight: 700, color: c.ink, margin: 0 }}>Trazodona 50 mg</p>
        <p style={{ fontSize: '8.5px', color: c.muted, margin: 0 }}>{isEn ? 'Today · 1 tablet · 🌙 22:00' : 'Hoy · 1 comprimido · 🌙 22:00'}</p>
      </div>
      <p style={{ fontSize: '10px', fontWeight: 600, color: c.ink, margin: '0 0 5px 0' }}>{isEn ? 'Notice anything different?' : '¿Notas algo diferente?'}</p>
      <div style={{ border: `1px solid ${c.line}`, borderRadius: '10px', padding: '8px 10px', minHeight: '44px', fontSize: '9px', color: '#9fb0a8', lineHeight: 1.5 }}>{isEn ? 'E.g. She\'s more confused than usual and didn\'t sleep well.' : 'Ej: Está más confundida de lo normal y no durmió bien.'}</div>
      <p style={{ fontSize: '8px', color: c.muted, textAlign: 'right', margin: '3px 0 8px 0' }}>0/200</p>
      <div style={{ backgroundColor: c.disabled, color: c.disabledTxt, borderRadius: '12px', padding: '10px', textAlign: 'center', fontSize: '10px', fontWeight: 600 }}>{isEn ? 'Notify Dr. Ramírez' : 'Avisar a la Dra. Ramírez'}</div>
    </div>
  )
}

/* Especímenes del sistema de diseño — recreados con los tokens reales (Figma → código) */
function BtnSpec({ variant, state }) {
  const deep = '#0F6E56', pressed = '#085041', subtle = '#E1F5EE', disBg = '#DCE5E0', disTxt = '#71857B', disBorder = '#C2CFC8'
  const base = { minHeight: '34px', padding: '7px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: 600, fontFamily: "'Inter',sans-serif", textAlign: 'center', border: '1.5px solid transparent' }
  const map = {
    primary: { default: { backgroundColor: deep, color: '#fff' }, pressed: { backgroundColor: pressed, color: '#fff' }, disabled: { backgroundColor: disBg, color: disTxt } },
    secondary: { default: { color: deep, borderColor: deep }, pressed: { color: deep, borderColor: deep, backgroundColor: subtle }, disabled: { color: disTxt, borderColor: disBorder } },
    ghost: { default: { color: deep }, pressed: { color: deep, backgroundColor: subtle }, disabled: { color: disTxt } },
  }
  return <div style={{ ...base, ...map[variant][state] }}>Continuar</div>
}
function InputSpec({ label, state, hint }) {
  const border = state === 'focus' ? '#0F6E56' : state === 'error' ? '#DC2626' : state === 'disabled' ? '#DCE5E0' : '#DCE5E0'
  return (
    <div>
      <p style={{ fontSize: '10px', fontWeight: 600, color: state === 'error' ? '#DC2626' : '#0F1712', margin: '0 0 4px 0' }}>{label}</p>
      <div style={{ border: `1.5px solid ${border}`, backgroundColor: state === 'disabled' ? '#F7FAF8' : '#fff', borderRadius: '10px', padding: '8px 12px', fontSize: '11px', color: '#9fb0a8' }}>nombre@clinica.com</div>
      {hint && <p style={{ fontSize: '9px', fontWeight: 700, color: '#DC2626', margin: '4px 0 0 0' }}>{hint}</p>}
    </div>
  )
}
function AdherenceBadge({ sym, val, bg, fg }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: bg, color: fg, borderRadius: '8px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, fontFamily: 'monospace' }}>{sym} {val}</span>
}
function DesignSystemSpecimens({ isEn }) {
  const label = { fontFamily: 'monospace', fontSize: '10px', color: '#55685E', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 10px 0' }
  const panel = { backgroundColor: '#FFFFFF', border: '1px solid #DCE5E0', borderRadius: '12px', padding: '18px' }
  return (
    <div style={{ display: 'grid', gap: '14px' }}>
      {/* Buttons 3x3 */}
      <div style={panel}>
        <p style={label}>Button — {isEn ? '3 variants × 3 states' : '3 variantes × 3 estados'}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {['default', 'pressed', 'disabled'].map(st => (
            ['primary', 'secondary', 'ghost'].map(v => <BtnSpec key={v + st} variant={v} state={st} />)
          ))}
        </div>
        <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#71857B', margin: '10px 0 0 0' }}>primary · secondary · ghost  ·  default / pressed / disabled</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {/* Inputs */}
        <div style={panel}>
          <p style={label}>Input — {isEn ? 'states' : 'estados'}</p>
          <div style={{ display: 'grid', gap: '10px' }}>
            <InputSpec label={isEn ? 'Email' : 'Correo electrónico'} state="default" />
            <InputSpec label={isEn ? 'Email' : 'Correo electrónico'} state="focus" />
            <InputSpec label={isEn ? 'Email' : 'Correo electrónico'} state="error" hint={isEn ? 'Invalid email' : 'Correo no válido'} />
          </div>
        </div>
        {/* Badges + PatientCard */}
        <div style={{ display: 'grid', gap: '14px' }}>
          <div style={panel}>
            <p style={label}>{isEn ? 'Adherence badge' : 'Badge de adherencia'}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <AdherenceBadge sym="✓" val="94%" bg="#C8EDE0" fg="#0A5F4B" />
              <AdherenceBadge sym="!" val="71%" bg="#FDEAD1" fg="#92400E" />
              <AdherenceBadge sym="✕" val="43%" bg="#FEE2E2" fg="#B91C1C" />
            </div>
          </div>
          <div style={panel}>
            <p style={label}>PatientCard</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#C8EDE0', color: '#0F6E56', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>MG</span>
                <div><p style={{ fontSize: '11px', fontWeight: 700, color: '#0F1712', margin: 0 }}>María Gonzáles</p><p style={{ fontSize: '9px', color: '#55685E', margin: 0 }}>{isEn ? '72 yrs · Hypertension' : '72 años · Hipertensión'}</p></div>
              </div>
              <AdherenceBadge sym="✓" val="94%" bg="#C8EDE0" fg="#0A5F4B" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Carrusel del hero — cicla entre pantallas con cross-fade + puntos (como el Hero principal) */
function HeroPhoneCarousel({ isEn, reduceMotion }) {
  const screens = [
    { key: 'dash', label: isEn ? 'Doctor · Dashboard' : 'Médico · Dashboard', node: <DashboardScreen isEn={isEn} /> },
    { key: 'receta', label: isEn ? 'Digital prescription' : 'Receta digital', node: <RecetaScreen isEn={isEn} /> },
    { key: 'cuidador', label: isEn ? 'Caregiver mode' : 'Modo cuidador', node: <CuidadorScreen isEn={isEn} /> },
  ]
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setI(p => (p + 1) % screens.length), 3800)
    return () => clearInterval(id)
  }, [reduceMotion, screens.length])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: '260px', maxWidth: '100%', borderRadius: '30px', border: '8px solid #10201a', backgroundColor: '#ffffff', boxShadow: '0 12px 40px rgba(0,0,0,0.45)', overflow: 'hidden', position: 'relative', animation: reduceMotion ? 'none' : 'bcFloat 3s ease-in-out infinite' }}>
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
      <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.45)', letterSpacing: '1px', textAlign: 'center' }}>{screens[i].label} · boostcare.netlify.app</span>
      <style>{`@keyframes bcFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }`}</style>
    </div>
  )
}

export default function BoostCareCaseStudy({ onClose }) {
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
    { valor: '98/100', label: isEn ? 'Accessibility (Lighthouse)' : 'Accesibilidad (Lighthouse)' },
    { valor: '97-99', label: 'Performance (Lighthouse)' },
    { valor: '15', label: isEn ? 'Mobile-first screens' : 'Pantallas mobile-first' },
    { valor: 'Live', label: isEn ? 'Deployed to production' : 'En producción' },
  ]

  const publicoObj = isEn
    ? ['🩺 Doctors', '👨‍👩‍👦 Family caregivers', '🧑‍🦳 Patients', '💊 Pharmacy']
    : ['🩺 Médicos', '👨‍👩‍👦 Cuidadores familiares', '🧑‍🦳 Pacientes', '💊 Farmacia']

  const features = isEn ? [
    { icon: '📅', titulo: 'Clear schedule', desc: 'Where, when and with which patient each consultation is — less mental load.' },
    { icon: '📈', titulo: 'Real-time adherence', desc: 'The doctor sees how well each patient follows their treatment, prioritized automatically.' },
    { icon: '📝', titulo: 'Digital prescriptions', desc: 'No illegible handwriting: patient, caregiver and pharmacy see the exact same thing.' },
  ] : [
    { icon: '📅', titulo: 'Agenda clara', desc: 'Dónde, cuándo y con qué paciente es cada consulta — menos carga mental.' },
    { icon: '📈', titulo: 'Adherencia en tiempo real', desc: 'El médico ve qué tan bien sigue cada paciente su tratamiento, priorizado automáticamente.' },
    { icon: '📝', titulo: 'Recetas digitales', desc: 'Sin letra ilegible: paciente, cuidador y farmacia ven exactamente lo mismo.' },
  ]

  const roles = isEn ? [
    { titulo: 'UX/UI Design', icon: '🎨', items: ['Design system in Figma with token architecture', '15 mobile-first screens', 'Multi-role navigable prototype (doctor / caregiver)'] },
    { titulo: 'Design System', icon: '🧩', items: ['Primitives → semantic tokens', 'Atomic Design (atoms → pages)', 'Single source of truth for every decision'] },
    { titulo: 'Frontend Development', icon: '⚙️', items: ['Built in React + Vite + Tailwind', 'Tokens translated 1:1 from Figma to code', 'Data layer separated from UI (backend-ready)'] },
    { titulo: 'Deploy & Accessibility', icon: '🚀', items: ['Continuous deployment on Netlify (GitHub)', '98/100 accessibility on Lighthouse', 'WCAG: AA contrast, keyboard, symbol + color'] },
  ] : [
    { titulo: 'Diseño UX/UI', icon: '🎨', items: ['Design system en Figma con arquitectura de tokens', '15 pantallas mobile-first', 'Prototipo navegable multi-rol (médico / cuidador)'] },
    { titulo: 'Sistema de Diseño', icon: '🧩', items: ['Tokens primitives → semantic', 'Atomic Design (átomos → páginas)', 'Única fuente de verdad para cada decisión'] },
    { titulo: 'Desarrollo Frontend', icon: '⚙️', items: ['Construido en React + Vite + Tailwind', 'Tokens trasladados 1:1 de Figma a código', 'Capa de datos separada de la UI (lista para backend)'] },
    { titulo: 'Deploy y Accesibilidad', icon: '🚀', items: ['Deploy continuo en Netlify (desde GitHub)', '98/100 en accesibilidad en Lighthouse', 'WCAG: contraste AA, teclado, símbolo + color'] },
  ]

  const problemas = isEn ? [
    { cat: 'The doctor', items: ['Carries the whole schedule in their head', 'No visibility of who is following treatment'] },
    { cat: 'The prescription', items: ['Illegible handwriting → errors', 'Patient, caregiver and pharmacy see different things'] },
    { cat: 'The care circle', items: ['Caregiver has no channel to warn the doctor', 'No shared status between everyone involved'] },
    { cat: 'The origin', items: ['Born from Boost: we care for patient + caregiver...', '...but who helps the doctor care better?'] },
  ] : [
    { cat: 'El médico', items: ['Carga toda la agenda en la cabeza', 'Sin visibilidad de quién sigue el tratamiento'] },
    { cat: 'La receta', items: ['Letra ilegible → errores', 'Paciente, cuidador y farmacia ven cosas distintas'] },
    { cat: 'El círculo de cuidado', items: ['El cuidador no tiene canal para avisar al médico', 'Sin estado compartido entre los involucrados'] },
    { cat: 'El origen', items: ['Nace de Boost: cuidamos al paciente + al cuidador...', '...pero ¿quién ayuda al médico a cuidar mejor?'] },
  ]

  const a11y = isEn ? [
    { t: 'lang & semantics', d: 'lang="es", real landmarks and headings for screen readers.' },
    { t: 'Visible keyboard focus', d: '*:focus-visible with a clear outline on every interactive element.' },
    { t: 'aria-labels on states', d: 'The adherence Badge announces its meaning, not just color.' },
    { t: 'aria-hidden on decorative', d: 'Emojis and checkmarks hidden from the accessibility tree.' },
    { t: 'AA contrast', d: 'Every text/background pair meets WCAG 4.5:1.' },
    { t: 'Symbol + color (1.4.1)', d: 'Risk uses ✕ + red, not color alone — readable for colorblind users.' },
  ] : [
    { t: 'lang y semántica', d: 'lang="es", landmarks y encabezados reales para lectores de pantalla.' },
    { t: 'Foco de teclado visible', d: '*:focus-visible con outline claro en cada elemento interactivo.' },
    { t: 'aria-labels en estados', d: 'El Badge de adherencia anuncia su significado, no solo el color.' },
    { t: 'aria-hidden en decorativos', d: 'Emojis y checkmarks ocultos del árbol de accesibilidad.' },
    { t: 'Contraste AA', d: 'Cada par texto/fondo cumple WCAG 4.5:1.' },
    { t: 'Símbolo + color (1.4.1)', d: 'El riesgo usa ✕ + rojo, no solo color — legible para daltónicos.' },
  ]

  /* Proceso de iteración (del documento de hallazgos real) */
  const iteraciones = isEn ? [
    { h: 'Navigation loop: patient profile ↔ sent prescription pointed at each other, no exit', sev: 'Blocking', fix: 'Replaced navigate(-1) with explicit destinations (→ Dashboard). Rule adopted.' },
    { h: 'Caregiver view had no entry or exit door', sev: 'Major', fix: 'Added access from the welcome screen + "Exit caregiver mode" link.' },
    { h: 'No clear success confirmation when sending a prescription/alert', sev: 'Major', fix: 'Success screens (RecetaEnviada, AvisoEnviado) with visible feedback.' },
    { h: '"Notify the doctor" button worked with an empty note', sev: 'Major', fix: 'Reactive validation: button disabled until there is text (!nota.trim()).' },
  ] : [
    { h: 'Loop de navegación: perfil ↔ receta enviada se apuntaban entre sí, sin salida', sev: 'Bloqueante', fix: 'Cambié navigate(-1) por destinos explícitos (→ Dashboard). Regla adoptada.' },
    { h: 'La vista del cuidador no tenía puerta de entrada ni de salida', sev: 'Alta', fix: 'Agregué acceso desde la bienvenida + link "Salir del modo cuidador".' },
    { h: 'Al enviar receta/aviso no había confirmación clara de éxito', sev: 'Alta', fix: 'Pantallas de éxito (RecetaEnviada, AvisoEnviado) con feedback visible.' },
    { h: 'El botón "Avisar a la doctora" funcionaba con la nota vacía', sev: 'Alta', fix: 'Validación reactiva: botón deshabilitado hasta que hay texto (!nota.trim()).' },
  ]

  /* Feedback informal (usuario en frío) */
  const feedback = isEn ? [
    { q: '"Why does it show some María\'s data?"', fix: 'Welcome screen that explains the role and lets you pick doctor/caregiver.' },
    { q: '"What is adherence?"', fix: 'Contextual definition in the welcome: "adherence (how well they follow treatment)".' },
    { q: '"Wouldn\'t it be better \'Everything you need for your consultation\'?"', fix: 'Rewrote the landing headline to the clearer version.' },
  ] : [
    { q: '"¿Por qué muestra los datos de una tal María?"', fix: 'Pantalla de bienvenida que explica el rol y deja elegir médico/cuidador.' },
    { q: '"¿Qué es adherencia?"', fix: 'Definición contextual en la bienvenida: "adherencia (qué tan bien siguen su tratamiento)".' },
    { q: '"¿No sería mejor \'Todo lo que necesitas para tu consulta\'?"', fix: 'Reescribí el h2 de la landing a la versión más clara.' },
  ]

  /* Hipótesis abiertas (madurez: no adivinar, validar) */
  const hipotesis = isEn ? [
    'Dose format: free text or structured number + unit? → ask real doctors',
    'Caregiver note box: useful, or is a single "notify" button enough?',
    'Depth of the caregiver view: is the current screen enough?',
    'Adherence metric color (red/amber/green): does it help or distract?',
    '"Adherence" as a term: clear for a real doctor, or needs visual support?',
  ] : [
    'Formato de dosis: ¿campo libre o número + unidad estructurados? → preguntar a médicos reales',
    'Caja de nota del cuidador: ¿les sirve, o basta un botón de "avisar"?',
    'Profundidad de la vista del cuidador: ¿la pantalla actual les basta?',
    'Color de la métrica de adherencia (rojo/ámbar/verde): ¿ayuda o distrae?',
    '"Adherencia" como término: ¿claro para un médico real, o requiere apoyo visual?',
  ]

  const lighthouse = isEn ? [
    { m: 'Accessibility', v: '96–98', note: 'WCAG 2.1 techniques applied' },
    { m: 'Performance', v: '97–99', note: 'optimized production build' },
    { m: 'SEO', v: '82–91', note: 'semantic meta + structure' },
    { m: 'Best Practices', v: '77', note: 'in active improvement' },
  ] : [
    { m: 'Accesibilidad', v: '96–98', note: 'técnicas WCAG 2.1 aplicadas' },
    { m: 'Performance', v: '97–99', note: 'build de producción optimizado' },
    { m: 'SEO', v: '82–91', note: 'meta + estructura semántica' },
    { m: 'Best Practices', v: '77', note: 'en mejora activa' },
  ]

  const contribuciones = isEn ? [
    'End-to-end ownership: research → design system → production code → deploy',
    'A design system that lives identically in Figma and in code (single source of truth)',
    'Accessibility as a standard (98/100), not an afterthought',
    'AI-native workflow: built with code agents (Claude Code), keeping design criteria',
    'Separated data layer — ready to connect a real backend without rewriting UI',
  ] : [
    'Propiedad de punta a punta: research → design system → código en producción → deploy',
    'Un design system que vive idéntico en Figma y en código (única fuente de verdad)',
    'Accesibilidad como estándar (98/100), no como opcional',
    'Workflow AI-native: construido con agentes de código (Claude Code), manteniendo criterio de diseño',
    'Capa de datos separada — lista para conectar un backend real sin reescribir la UI',
  ]

  const btnFloat = { width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(5,13,26,0.9)', backdropFilter: 'blur(8px)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }
  const cell = { padding: '10px 14px', fontSize: '13px', borderBottom: '1px solid rgba(255,255,255,0.05)' }
  const th = { padding: '10px 14px', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: 2000, backgroundColor: '#050d1a', overflowY: 'auto', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}><CircuitCanvas reduceMotion={reduceMotion} /></div>

      {showScroll && (
        <div style={{ position: 'fixed', bottom: '32px', right: '24px', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <button onClick={scrollToTop} style={{ ...btnFloat, border: '1px solid rgba(0,212,255,0.4)', color: '#00d4ff' }}><MdKeyboardArrowUp size={24} /></button>
          <button onClick={onClose} style={{ ...btnFloat, border: '1px solid rgba(53,181,140,0.4)', color: ACCENT_SOFT }}><MdHome size={22} /></button>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ ...btnFloat, border: '1px solid rgba(37,211,102,0.4)', color: '#25d366', textDecoration: 'none' }}><FaWhatsapp size={22} /></a>
        </div>
      )}

      {/* Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'rgba(5,13,26,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,212,255,0.1)', padding: mob ? '12px 16px' : '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', fontSize: '13px', fontFamily: 'monospace' }}>{isEn ? 'Back to projects' : 'Volver a proyectos'}</button>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}><span style={{ color: CORAL }}>Boost</span><span style={{ color: ACCENT }}>Care</span></span>
        </div>
        <a href={LIVE} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: ACCENT_SOFT, border: '1px solid rgba(53,181,140,0.4)', padding: '7px 16px', textDecoration: 'none', fontFamily: 'monospace' }}>{isEn ? 'Open live app' : 'Ver app en vivo'} →</a>
      </div>

      {/* HERO */}
      <div style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(0,212,255,0.08)', zIndex: 1 }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: mob ? '40px 20px' : '64px 32px', display: 'grid', gridTemplateColumns: (mob || tab) ? '1fr' : '1.4fr 1fr', gap: (mob || tab) ? '36px' : '48px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#00d4ff', letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.6, margin: 0 }}>{isEn ? 'Case Study · UX/UI + Frontend · HealthTech SaaS' : 'Caso de Estudio · UX/UI + Frontend · HealthTech SaaS'}</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, margin: 0, lineHeight: 1.1, width: 'fit-content' }}>
              <span style={{ color: CORAL }}>BOOST</span>
              <span style={{ backgroundImage: TITLE_GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>CARE</span>
            </h1>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.55, margin: 0 }}>{isEn ? 'Health web app (SaaS) — from the design system in Figma to code in production' : 'Aplicación web (SaaS) de salud — del design system en Figma al código en producción'}</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', alignSelf: 'flex-start', backgroundColor: 'rgba(232,160,144,0.1)', border: `1px solid ${CORAL}55`, borderRadius: '20px', padding: '6px 14px' }}>
              <span style={{ fontSize: '14px' }} aria-hidden="true">⚡</span>
              <span style={{ fontSize: '12.5px', color: CORAL, fontWeight: 600 }}>{isEn ? 'Built with an AI-native workflow — code agents (Claude Code)' : 'Construido con workflow AI-native — agentes de código (Claude Code)'}</span>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic', lineHeight: 1.7, margin: 0, borderLeft: `2px solid ${CORAL}77`, paddingLeft: '12px' }}>
              {isEn ? '"Designed and developed end-to-end: Figma → React → live deploy, with 98/100 accessibility. An AI-native workflow."' : '"Diseñada y desarrollada de principio a fin: Figma → React → deploy en vivo, con 98/100 en accesibilidad. Un flujo AI-native."'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{TAGS.map(t => <Tag key={t} label={t} />)}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>{METRICAS.map(m => <MetricaCard key={m.label} valor={m.valor} label={m.label} />)}</div>
            <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>* {isEn ? 'Lighthouse metrics measured on the production build.' : 'Métricas Lighthouse medidas sobre el build de producción.'}</p>
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div aria-hidden="true" style={{ position: 'absolute', top: '2%', width: '300px', height: '300px', maxWidth: '85%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(53,181,140,0.32), transparent 66%)', filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0 }} />
            <div aria-hidden="true" style={{ position: 'absolute', bottom: '2%', width: '300px', height: '300px', maxWidth: '85%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,160,144,0.30), transparent 66%)', filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1 }}><HeroPhoneCarousel isEn={isEn} reduceMotion={reduceMotion} /></div>
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: mob ? '32px 16px 60px' : '56px 32px 80px', position: 'relative', zIndex: 1 }}>

        <Separador titulo={isEn ? 'Project Introduction' : 'Introducción al Proyecto'} />

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={1} titulo={isEn ? 'About BoostCare' : 'Sobre BoostCare'} />
          <SectionText>
            {isEn ? 'BoostCare is a web SaaS platform that helps doctors manage their schedule, monitor their patients\' medication adherence and issue digital prescriptions — reducing their mental load and improving quality of care. It is the B2B extension of Boost, my cognitive-health project.' : 'BoostCare es una plataforma web SaaS que ayuda a los médicos a gestionar su agenda, monitorear la adherencia a medicación de sus pacientes y emitir recetas digitales — reduciendo su carga mental y mejorando la calidad de la atención. Es la extensión B2B de Boost, mi proyecto de salud cognitiva.'}
          </SectionText>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {publicoObj.map(p => <span key={p} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(53,181,140,0.08)', border: '1px solid rgba(53,181,140,0.2)', borderRadius: '20px', padding: '4px 12px' }}>{p}</span>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : tab ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '12px' }}>
            {features.map(item => (
              <div key={item.titulo} style={{ backgroundColor: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)', borderRadius: '8px', padding: '16px' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>{item.icon}</span>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', margin: '0 0 4px 0' }}>{item.titulo}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <img src={imgLanding} alt={isEn ? 'BoostCare landing page' : 'Landing de BoostCare'} style={{ width: '100%', maxWidth: '300px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }} />
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>// {isEn ? 'Public landing (SaaS)' : 'Landing pública (SaaS)'}</span>
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={2} titulo={isEn ? 'The Problem & Origin' : 'El Problema y el Origen'} />
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: '12px' }}>
            {problemas.map((g, gi) => {
              const isOrigin = gi === 3
              return (
                <div key={g.cat} style={{ backgroundColor: isOrigin ? 'rgba(232,160,144,0.05)' : 'rgba(53,181,140,0.04)', border: `1px solid ${isOrigin ? 'rgba(232,160,144,0.22)' : 'rgba(53,181,140,0.15)'}`, borderRadius: '8px', padding: '16px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: isOrigin ? CORAL : ACCENT, margin: '0 0 10px 0', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'monospace' }}>{g.cat}</p>
                  {g.items.map(item => (
                    <div key={item} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ color: isOrigin ? CORAL : ACCENT_SOFT, flexShrink: 0, fontSize: '12px' }}>›</span>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>{item}</p>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={3} titulo={isEn ? 'My Role — End to End' : 'Mi Rol — De Punta a Punta'} />
          <SectionText>{isEn ? 'BoostCare is the project where I owned the full cycle: I designed it AND developed it AND deployed it. That is exactly what makes it different from a design-only case.' : 'BoostCare es el proyecto donde tomé el ciclo completo: lo diseñé Y lo desarrollé Y lo desplegué. Eso es justo lo que lo diferencia de un caso solo de diseño.'}</SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: '12px' }}>
            {roles.map(r => (
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

        <Separador titulo={isEn ? 'From Design to Code' : 'Del Diseño al Código'} />

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={4} titulo={isEn ? 'Design Tokens' : 'Design Tokens'} />
          <SectionText>{isEn ? 'The system is built on a token architecture: raw primitives that feed semantic aliases. The screens only ever use the semantic names — never a raw hex — exactly like in Figma. Those same tokens live 1:1 as CSS variables and in the Tailwind theme.' : 'El sistema se construye sobre una arquitectura de tokens: primitives crudos que alimentan alias semánticos. Las pantallas usan solo los nombres semánticos — nunca un hex crudo — igual que en Figma. Esos mismos tokens viven 1:1 como variables CSS y en el theme de Tailwind.'}</SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '16px' }}>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', padding: '16px' }}>
              <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#00d4ff', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>// primitives</p>
              {PRIMITIVES.map(p => (
                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '7px' }}>
                  <span style={{ width: '22px', height: '22px', borderRadius: '5px', backgroundColor: p.hex, border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.75)' }}>{p.name}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginLeft: 'auto' }}>{p.hex}</span>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', padding: '16px' }}>
              <p style={{ fontFamily: 'monospace', fontSize: '10px', color: ACCENT, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>// semantic (los alias)</p>
              {SEMANTIC.map(s => (
                <div key={s.alias} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '7px' }}>
                  <span style={{ width: '22px', height: '22px', borderRadius: '5px', backgroundColor: s.hex, border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.75)' }}>{s.alias}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginLeft: 'auto' }}>→ {s.ref}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={5} titulo={isEn ? 'Figma → Code (1:1)' : 'Figma → Código (1:1)'} />
          <SectionText>{isEn ? 'Every Figma property maps directly to a React prop or CSS state. The Button component is the clearest example — no improvisation between design and implementation.' : 'Cada propiedad de Figma mapea directo a una prop de React o un estado CSS. El componente Button es el ejemplo más claro — sin improvisación entre diseño e implementación.'}</SectionText>
          <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '440px' }}>
              <thead><tr style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                <th style={{ ...th, color: '#00d4ff' }}>Figma</th>
                <th style={{ ...th, color: ACCENT }}>{isEn ? 'React / CSS' : 'React / CSS'}</th>
              </tr></thead>
              <tbody>
                {[['prop type (variant)', 'prop `type`'], ['state = pressed', 'pseudo-clase active:'], ['state = disabled', 'disabled + variante disabled:'], ['touch height 44px', 'min-h-11'], ['radius/md (12)', 'rounded-(--radius-md)']].map(([f, r], i) => (
                  <tr key={f} style={{ backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                    <td style={{ ...cell, color: 'rgba(0,212,255,0.85)', fontFamily: 'monospace', fontSize: '12px' }}>{f}</td>
                    <td style={{ ...cell, color: 'rgba(53,181,140,0.9)', fontFamily: 'monospace', fontSize: '12px' }}>{r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>// {isEn ? 'The real components, from the Figma design system' : 'Los componentes reales, del sistema de diseño en Figma'}</p>
          <DesignSystemSpecimens isEn={isEn} />
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={6} titulo={isEn ? 'Architecture' : 'Arquitectura'} />
          <SectionText>{isEn ? 'Data lives separated from the UI (a data/ layer that mimics a real API contract), so the app is ready to connect to a backend without rewriting components. Routing is a React Router SPA, and every push to GitHub auto-deploys on Netlify.' : 'Los datos viven separados de la UI (una capa data/ que simula el contrato de una API real), de modo que la app está lista para conectar a un backend sin reescribir componentes. El ruteo es una SPA con React Router, y cada push a GitHub despliega solo en Netlify.'}</SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(4, 1fr)', gap: '10px' }}>
            {[
              { t: 'Figma', d: isEn ? 'Design system + tokens' : 'Design system + tokens', c: ACCENT },
              { t: 'React + Tailwind', d: isEn ? 'Tokens 1:1 · Atomic Design' : 'Tokens 1:1 · Atomic Design', c: '#00d4ff' },
              { t: 'data/ layer', d: isEn ? 'UI decoupled · backend-ready' : 'UI desacoplada · lista p/ backend', c: '#00d4ff' },
              { t: 'Netlify', d: isEn ? 'Continuous deploy from GitHub' : 'Deploy continuo desde GitHub', c: ACCENT },
            ].map((b, i, arr) => (
              <div key={b.t} style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,0.3)', border: `1px solid ${b.c}33`, borderRadius: '8px', padding: '14px', textAlign: 'center' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: b.c, margin: '0 0 4px 0' }}>{b.t}</p>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.4 }}>{b.d}</p>
                {!mob && i < arr.length - 1 && <span style={{ position: 'absolute', right: '-8px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>→</span>}
              </div>
            ))}
          </div>
        </div>

        <Separador titulo={isEn ? 'The Product' : 'El Producto'} />

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={7} titulo={isEn ? 'The Product · Screens & Prototype' : 'El Producto · Pantallas y Prototipo'} />
          <SectionText>{isEn ? 'Mobile-first, doctor and caregiver flows. The dashboard leads with an AI-assisted daily summary that auto-prioritizes the highest-risk patient. Below: polished core screens, the real Figma screen sets per role, and the navigable multi-role prototype.' : 'Mobile-first, flujos de médico y cuidador. El dashboard abre con un resumen del día asistido por IA que prioriza automáticamente al paciente de mayor riesgo. Abajo: pantallas centrales pulidas, los sets reales de pantallas en Figma por rol, y el prototipo navegable multi-rol.'}</SectionText>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center', marginBottom: '32px' }}>
            <Phone label={isEn ? 'Doctor · Dashboard' : 'Médico · Dashboard'}><DashboardScreen isEn={isEn} /></Phone>
            <Phone label={isEn ? 'Digital prescription' : 'Receta digital'}><RecetaScreen isEn={isEn} /></Phone>
          </div>
          <div style={{ display: 'flex', gap: '10px', backgroundColor: 'rgba(53,181,140,0.06)', border: '1px solid rgba(53,181,140,0.2)', borderRadius: '8px', padding: '14px 16px', marginBottom: '28px' }}>
            <span style={{ fontSize: '16px', flexShrink: 0 }} aria-hidden="true">🧠</span>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.6 }}>
              <strong style={{ color: ACCENT }}>{isEn ? 'AI-assisted daily summary — ' : 'Resumen del día asistido por IA — '}</strong>
              {isEn ? 'the dashboard auto-prioritizes the patient at highest adherence risk, so the doctor knows who to review first. Key decision support in a high-load clinical setting (rule-based today; generative AI via serverless on the roadmap).' : 'el dashboard prioriza automáticamente al paciente con mayor riesgo de adherencia, para que el médico sepa a quién revisar primero. Soporte de decisión clave en un contexto clínico de alta carga (hoy con lógica de reglas; IA generativa vía serverless en el roadmap).'}
            </p>
          </div>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 10px 0' }}>// {isEn ? "Doctor's screens (Figma)" : 'Pantallas del médico (Figma)'}</p>
          <img src={imgMedico} alt={isEn ? 'Doctor screens in Figma' : 'Pantallas del médico en Figma'} style={{ width: '100%', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', display: 'block', marginBottom: '24px' }} />
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 10px 0' }}>// {isEn ? 'Caregiver mode · before (Figma) → after (developed + iterated)' : 'Modo cuidador · antes (Figma) → después (desarrollado + iterado)'}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', alignItems: 'flex-start', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{ flex: '1 1 280px', minWidth: '240px', maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <img src={imgCuidador} alt={isEn ? 'Caregiver design in Figma' : 'Diseño del cuidador en Figma'} style={{ width: '100%', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', display: 'block' }} />
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>{isEn ? 'Before · Figma' : 'Antes · Figma'}</span>
            </div>
            <Phone label={isEn ? 'After · developed + iterated' : 'Después · desarrollado + iterado'}><CuidadorScreen isEn={isEn} /></Phone>
          </div>
          <div style={{ backgroundColor: 'rgba(232,160,144,0.05)', border: `1px solid ${CORAL}33`, borderRadius: '8px', padding: '14px 16px', marginBottom: '24px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '10px', color: CORAL, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 8px 0' }}>// {isEn ? 'What changed after iterating' : 'Qué cambió tras iterar'}</p>
            {(isEn ? ['Context note at the top — so the caregiver understands why they are here and how they arrived', 'Free-text note with a 200-character limit', 'The "Notify the doctor" button only activates once a message is written'] : ['Nota de contexto arriba — para que el cuidador entienda por qué está aquí y cómo llegó', 'Nota de texto libre con límite de 200 caracteres', 'El botón "Avisar a la doctora" solo se activa cuando hay un mensaje escrito']).map(t => (
              <div key={t} style={{ display: 'flex', gap: '8px', marginBottom: '5px' }}>
                <span style={{ color: CORAL, fontSize: '12px', flexShrink: 0 }}>→</span>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.5 }}>{t}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 10px 0' }}>// {isEn ? 'Navigable multi-role prototype (Figma)' : 'Prototipo navegable multi-rol (Figma)'}</p>
          <img src={imgFlowCanvas} alt={isEn ? 'Multi-role prototype flows' : 'Flujos del prototipo multi-rol'} style={{ width: '100%', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', display: 'block' }} />
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', margin: '10px 0 0 0', lineHeight: 1.6 }}>{isEn ? 'Public flow + doctor app + doctor flows + caregiver app, all connected in a single navigable prototype.' : 'Flujo público + app del médico + flujos del médico + app del cuidador, todo conectado en un solo prototipo navegable.'}</p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={8} titulo={isEn ? 'Accessibility (98/100)' : 'Accesibilidad (98/100)'} />
          <SectionText>{isEn ? 'Accessibility was a design constraint from the start, not a final patch. These are the concrete WCAG techniques implemented in code.' : 'La accesibilidad fue una restricción de diseño desde el inicio, no un parche final. Estas son las técnicas WCAG concretas implementadas en código.'}</SectionText>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: '10px' }}>
            {a11y.map(item => (
              <div key={item.t} style={{ display: 'flex', gap: '10px', backgroundColor: 'rgba(53,181,140,0.04)', border: '1px solid rgba(53,181,140,0.14)', borderRadius: '8px', padding: '12px 14px' }}>
                <span style={{ color: ACCENT_SOFT, fontSize: '13px', flexShrink: 0 }}>✓</span>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: 'white', margin: '0 0 2px 0', fontFamily: 'monospace' }}>{item.t}</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.5 }}>{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separador titulo={isEn ? 'Process & Iteration' : 'Proceso e Iteración'} />

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={9} titulo={isEn ? 'Design → Self-test → Feedback → Iterate' : 'Diseño → Auto-testeo → Feedback → Iterar'} />
          <SectionText>{isEn ? 'Before any formal testing, self-testing and informal feedback already revealed several fixes. I logged each finding with its severity and its iteration — the full product loop, not just "pretty screens".' : 'Antes de cualquier testing formal, el auto-testeo y el feedback informal ya revelaron varias mejoras. Registré cada hallazgo con su severidad y su iteración — el ciclo completo de producto, no solo "pantallas bonitas".'}</SectionText>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {iteraciones.map(it => (
              <div key={it.h} style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '14px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: '#f87171', backgroundColor: 'rgba(248,113,113,0.12)', borderRadius: '4px', padding: '2px 7px', flexShrink: 0, fontFamily: 'monospace', textTransform: 'uppercase' }}>{it.sev}</span>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.5 }}>{it.h}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', paddingLeft: '2px' }}>
                  <span style={{ color: ACCENT_SOFT, fontSize: '12px', flexShrink: 0 }}>→</span>
                  <p style={{ fontSize: '12.5px', color: 'rgba(53,181,140,0.85)', margin: 0, lineHeight: 1.5 }}>{it.fix}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>// {isEn ? 'Cold feedback (technical user, non-medical profile)' : 'Feedback en frío (usuario técnico, perfil no-médico)'}</p>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '10px' }}>
            {feedback.map(f => (
              <div key={f.q} style={{ backgroundColor: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.12)', borderRadius: '8px', padding: '14px' }}>
                <p style={{ fontSize: '12px', color: '#00d4ff', margin: '0 0 8px 0', fontStyle: 'italic', lineHeight: 1.5 }}>{f.q}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.5 }}>→ {f.fix}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={10} titulo={isEn ? 'Open Hypotheses (to validate, not guess)' : 'Hipótesis Abiertas (validar, no adivinar)'} />
          <SectionText>{isEn ? 'Decisions I detected but deliberately chose NOT to guess — these get validated with real doctors and caregivers instead of by intuition. Distinguishing assumption from data is a mature design criterion.' : 'Decisiones que detecté pero decidí NO adivinar — se validan con médicos y cuidadores reales, no por intuición. Distinguir suposición de dato es criterio de diseño maduro.'}</SectionText>
          <div style={{ backgroundColor: 'rgba(53,181,140,0.04)', border: '1px solid rgba(53,181,140,0.15)', borderRadius: '10px', padding: '18px' }}>
            {hipotesis.map(h => (
              <div key={h} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: ACCENT_SOFT, fontSize: '13px', flexShrink: 0, marginTop: '1px' }}>◇</span>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6 }}>{h}</p>
              </div>
            ))}
          </div>
        </div>

        <Separador titulo={isEn ? 'Results' : 'Resultados'} />

        <div style={{ marginBottom: '40px' }}>
          <SectionTitle numero={11} titulo={isEn ? 'Lighthouse (production)' : 'Lighthouse (producción)'} />
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '12px' }}>
            {lighthouse.map(l => (
              <div key={l.m} style={{ backgroundColor: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: ACCENT, margin: '0 0 4px 0', lineHeight: 1 }}>{l.v}</p>
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'white', margin: '0 0 4px 0' }}>{l.m}</p>
                <p style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.4 }}>{l.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ border: '1px solid rgba(53,181,140,0.18)', backgroundColor: 'rgba(53,181,140,0.03)', padding: '32px', borderRadius: '6px', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '20px' }}>{isEn ? '🚀 What I contributed' : '🚀 Qué aporté'}</h2>
          {contribuciones.map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
              <span style={{ color: ACCENT_SOFT, fontSize: '13px', flexShrink: 0 }}>✅</span>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '40px' }}>
          <Separador titulo={isEn ? 'Live App' : 'App en Vivo'} />
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, marginBottom: '24px', fontFamily: 'inherit', textAlign: 'center' }}>{isEn ? 'BoostCare is deployed and navigable — explore the demo as a doctor or as a caregiver.' : 'BoostCare está desplegada y navegable — explora la demo como médico o como cuidador.'}</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href={LIVE} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: ACCENT_DEEP, color: '#fff', fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', padding: '14px 32px', textDecoration: 'none', borderRadius: '6px', boxShadow: '0 4px 20px rgba(15,110,86,0.4)' }}>{isEn ? 'Open live app' : 'Ver app en vivo'} →</a>
            <a href={REPO} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'transparent', color: CORAL, border: `1px solid ${CORAL}66`, fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', padding: '14px 32px', textDecoration: 'none', borderRadius: '6px' }}>{isEn ? 'View code (GitHub)' : 'Ver código (GitHub)'} →</a>
          </div>
        </div>

      </div>
    </div>
  )
}
