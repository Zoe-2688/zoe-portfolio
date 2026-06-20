import { useEffect, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import boostImg from '../../assets/projects/boost.png'
import johnnyRocketsImg from '../../assets/projects/johnny-rockets.png'
import flagshipImg from '../../assets/projects/flagship.png'

const PROJECTS = [
  {
    id: 'boost',
    image: boostImg,
    title: 'Boost',
    description: 'App de Salud Cognitiva con IA e IoT',
    longDescription: 'Rediseño de una app de juegos cognitivos a una plataforma de salud real, con IA e IoT. Flujo simplificado para dos perfiles (usuario y cuidador), pensado para personas con discapacidad cognitiva y adultos mayores.',
    metric: 'Mejora del 34% en la tasa de finalización de tareas (IA + UX Heurísticas)',
    metricIcon: '💡',
    tags: ['Figma', 'UX/UI', 'Accesibilidad', 'WCAG'],
  },
  {
    id: 'johnny-rockets',
    image: johnnyRocketsImg,
    title: 'Johnny Rockets Chile',
    description: 'Rediseño Web + Front-end',
    longDescription: 'Rediseño UX/UI + desarrollo front-end de la landing nacional, integrando navegación clara y elementos culturales como las Fiestas Patrias. Mejoró la accesibilidad y la conexión emocional con el usuario local.',
    metric: 'Diseño responsive con identidad americana y contexto chileno',
    metricIcon: '🇨🇱',
    tags: ['HTML', 'Tailwind CSS', 'JavaScript'],
  },
  {
    id: 'flagship',
    image: flagshipImg,
    title: 'Flagship CMS',
    description: 'Landing Page + Estrategia Digital',
    longDescription: 'El brief pedía solo un folleto en PDF — propuse y diseñé una landing page interactiva + videos promocionales, identificando que el formato estático no comunicaba la innovación del producto.',
    metric: 'Diseño alineado a guías de marca y objetivos comerciales',
    metricIcon: '📘',
    tags: ['Figma', 'Canva', 'B2B'],
  },
]

function CircuitNode({ corner, hovered, reduceMotion }) {
  const cornerStyles = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2',
    'bottom-left': 'bottom-2 left-2',
    'bottom-right': 'bottom-2 right-2',
  }

  return (
    <div className={`absolute ${cornerStyles[corner]} pointer-events-none`}>
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{
          backgroundColor: '#00d4ff',
          opacity: hovered ? 0.9 : 0.5,
          boxShadow: hovered ? '0 0 10px rgba(0,212,255,0.7)' : '0 0 3px rgba(0,212,255,0.3)',
          transition: reduceMotion ? 'none' : 'opacity 300ms ease, box-shadow 300ms ease',
        }}
      />
    </div>
  )
}

function CircuitLines({ hovered, reduceMotion }) {
  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        width: '100%',
        height: '100%',
        opacity: hovered ? 0.6 : 0.25,
        transition: reduceMotion ? 'none' : 'opacity 300ms ease',
      }}
    >
      <line x1="4" y1="4" x2="96" y2="4" stroke="#00d4ff" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
      <line x1="96" y1="4" x2="96" y2="96" stroke="#00d4ff" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
      <line x1="4" y1="96" x2="96" y2="96" stroke="#00d4ff" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
      <line x1="4" y1="4" x2="4" y2="96" stroke="#00d4ff" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function ProjectCard({ project, reduceMotion, isLarge = false }) {
  const [hovered, setHovered] = useState(false)
  const [cmdHovered, setCmdHovered] = useState(false)

  const imageHeight = isLarge ? 'h-80' : 'h-40'
  const titleSize = isLarge ? 'text-[20px]' : 'text-[11px]'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col h-full rounded-lg overflow-hidden"
      style={{
        backgroundColor: 'rgba(0,212,255,0.03)',
        border: `1px solid ${hovered ? 'rgba(0,212,255,0.5)' : 'rgba(0,212,255,0.15)'}`,
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: reduceMotion ? 'none' : 'border-color 300ms ease, transform 300ms ease',
      }}
    >
      <div className={`relative ${imageHeight} overflow-hidden flex-shrink-0`}>
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <CircuitLines hovered={hovered} reduceMotion={reduceMotion} />
        <CircuitNode corner="top-left" hovered={hovered} reduceMotion={reduceMotion} />
        <CircuitNode corner="top-right" hovered={hovered} reduceMotion={reduceMotion} />
        <CircuitNode corner="bottom-left" hovered={hovered} reduceMotion={reduceMotion} />
        <CircuitNode corner="bottom-right" hovered={hovered} reduceMotion={reduceMotion} />
      </div>

      <div className="flex flex-col flex-1 gap-3 p-6">
        <h3
          className={`${titleSize} tracking-widest text-[#e8a090]`}
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          {project.title}
        </h3>

        <p className="text-[11px] text-[#00d4ff]" style={{ opacity: 0.6, fontFamily: 'monospace' }}>
          // {project.description}
        </p>

        {isLarge && project.longDescription && (
          <p className="text-[13px] text-white leading-relaxed" style={{ opacity: 0.75 }}>
            {project.longDescription}
          </p>
        )}

        {isLarge && project.metric && (
          <div
            className="flex items-start gap-2 rounded-md px-3 py-2 mt-1"
            style={{ backgroundColor: 'rgba(232,160,144,0.08)', border: '1px solid rgba(232,160,144,0.2)' }}
          >
            <span style={{ fontSize: '13px' }}>{project.metricIcon}</span>
            <p className="text-[12px] text-[#e8a090] leading-snug" style={{ opacity: 0.9 }}>
              {project.metric}
            </p>
          </div>
        )}

        {!isLarge && project.longDescription && (
          <div
            style={{
              maxHeight: hovered ? '220px' : '0px',
              opacity: hovered ? 1 : 0,
              overflow: 'hidden',
              transition: reduceMotion ? 'none' : 'max-height 350ms ease, opacity 300ms ease',
            }}
          >
            <p className="text-[11px] text-white leading-relaxed" style={{ opacity: 0.8 }}>
              {project.longDescription}
            </p>
            {project.metric && (
              <div
                className="flex items-start gap-2 rounded-md px-2.5 py-1.5 mt-2"
                style={{ backgroundColor: 'rgba(232,160,144,0.08)', border: '1px solid rgba(232,160,144,0.2)' }}
              >
                <span style={{ fontSize: '11px' }}>{project.metricIcon}</span>
                <p className="text-[10px] text-[#e8a090] leading-snug" style={{ opacity: 0.9 }}>
                  {project.metric}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-3 mt-1">
          {project.tags.map((tag, index) => {
            const color = index % 2 === 0 ? '#00d4ff' : '#e8a090'
            return (
              <div
                key={tag}
                className="flex items-center gap-1"
                style={{ fontFamily: 'monospace', fontSize: '9px' }}
              >
                <div
                  className="rounded-full flex-shrink-0"
                  style={{ width: '4px', height: '4px', backgroundColor: color }}
                />
                <div
                  className="flex-shrink-0"
                  style={{ width: '16px', height: '1px', backgroundColor: color, opacity: 0.6 }}
                />
                <span style={{ color, opacity: 0.85 }}>{tag}</span>
              </div>
            )
          })}
        </div>

        <div
          className="self-start mt-auto cursor-pointer"
          style={{
            fontFamily: 'monospace',
            fontSize: '18px',
            fontWeight: 600,
            marginTop: '1rem',
            textShadow: '0 0 6px rgba(0,212,255,0.25), 0 0 10px rgba(0,212,255,0.15)',
          }}
          onMouseEnter={() => setCmdHovered(true)}
          onMouseLeave={() => setCmdHovered(false)}
        >
          <span
            style={{
              transition: reduceMotion ? 'none' : 'color 200ms ease, text-shadow 200ms ease',
              color: cmdHovered ? '#e8a090' : '#00d4ff',
            }}
          >
            <span
              style={{
                textShadow: cmdHovered
                  ? '0 0 8px rgba(232,160,144,0.6), 0 0 16px rgba(232,160,144,0.3)'
                  : '0 0 6px rgba(0,212,255,0.5), 0 0 12px rgba(0,212,255,0.2)',
                transition: reduceMotion ? 'none' : 'color 200ms ease, text-shadow 200ms ease',
              }}
            >
              // ver_caso{' '}
            </span>
            <span
              style={{
                display: 'inline-block',
                transition: reduceMotion ? 'none' : 'transform 200ms ease',
                transform: cmdHovered ? 'translateX(4px)' : 'translateX(0)',
              }}
            >
              →
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const { reduceMotion } = usePortfolio()
  const [visible, setVisible] = useState(() => reduceMotion)

  useEffect(() => {
    if (reduceMotion) return
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [reduceMotion])

  return (
    <section id="projects" className="bg-[#050d1a] py-24 px-6">
      <div
        className="max-w-6xl mx-auto flex flex-col gap-12"
        style={{ opacity: visible ? 1 : 0, transition: reduceMotion ? 'none' : 'opacity 600ms ease' }}
      >
        <div className="flex flex-col items-center text-center gap-2">
          <p className="text-[#00d4ff] text-xs tracking-[4px] uppercase opacity-80">Casos de estudio</p>
          <h2 className="text-white text-3xl md:text-4xl font-semibold">Proyectos</h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{ gridAutoRows: '1fr' }}
        >
          <div className="h-full md:col-span-2 md:row-span-2">
            <ProjectCard project={PROJECTS[0]} reduceMotion={reduceMotion} isLarge />
          </div>
          <div className="h-full">
            <ProjectCard project={PROJECTS[1]} reduceMotion={reduceMotion} />
          </div>
          <div className="h-full">
            <ProjectCard project={PROJECTS[2]} reduceMotion={reduceMotion} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
