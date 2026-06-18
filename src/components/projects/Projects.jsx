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
    tags: ['Figma', 'UX/UI', 'Accesibilidad', 'WCAG'],
  },
  {
    id: 'johnny-rockets',
    image: johnnyRocketsImg,
    title: 'Johnny Rockets Chile',
    description: 'Rediseño Web + Front-end',
    tags: ['HTML', 'Tailwind CSS', 'JavaScript'],
  },
  {
    id: 'flagship',
    image: flagshipImg,
    title: 'Flagship CMS',
    description: 'Landing Page + Estrategia Digital',
    tags: ['Figma', 'Canva', 'B2B'],
  },
]

function ProjectCard({ project, reduceMotion }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col rounded-lg overflow-hidden"
      style={{
        backgroundColor: 'rgba(0,212,255,0.03)',
        border: `1px solid ${hovered ? 'rgba(0,212,255,0.4)' : 'rgba(0,212,255,0.15)'}`,
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: reduceMotion ? 'none' : 'border-color 300ms ease, transform 300ms ease',
      }}
    >
      <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />

      <div className="flex flex-col flex-1 gap-3 p-6">
        <h3 className="text-white text-lg font-semibold">{project.title}</h3>
        <p className="text-white/70 text-sm">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[#00d4ff] text-xs tracking-[0.5px] uppercase px-2 py-1 rounded"
              style={{ backgroundColor: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          className="self-start mt-auto bg-[#e8a090] text-[#050d1a] font-semibold text-xs tracking-[1px] uppercase px-5 py-2.5 rounded-lg transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(232,160,144,0.5)]"
          style={{ marginTop: '1rem' }}
        >
          Ver caso de estudio
        </button>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
