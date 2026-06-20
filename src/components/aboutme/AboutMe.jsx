import { useEffect, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import {
  SiFigma, SiCanva, SiBlender, SiGithub, SiNpm, SiTrello, SiReact,
  SiHtml5, SiJavascript, SiTailwindcss, SiBootstrap, SiAffinitydesigner,
} from 'react-icons/si'
import { DiIllustrator, DiPhotoshop, DiCss3 } from 'react-icons/di'
import { FiLayout } from 'react-icons/fi'

// Cuando src/assets/profile.jpg esté lista, reemplazar el placeholder circular por:
// import profilePhoto from '../../assets/profile.jpg'
// <img src={profilePhoto} alt="Zoe Mejia Santana" width={280} height={280}
//      className="rounded-full object-cover" style={{ border: '2px solid #00d4ff' }} />

const SKILL_GROUPS = [
  {
    category: 'Diseño UX/UI y Gráfico',
    color: 'cyan',
    skills: [
      'Wireframing', 'Prototipado', 'Diseño Responsivo',
      'Pruebas de Usabilidad', 'Diseño Centrado en el Usuario',
      'Design Thinking', 'Diseño Visual', 'Diseño UI',
      'Branding', 'Ilustración Digital aplicada a Branding',
    ],
  },
  {
    category: 'Desarrollo Front-End',
    color: 'salmon',
    skills: ['HTML', 'CSS', 'React', 'Tailwind CSS', 'Bootstrap', 'JavaScript'],
  },
  {
    category: 'Herramientas y Software',
    color: 'cyan',
    skills: [
      'Figma', 'Adobe XD', 'Illustrator', 'Affinity Designer',
      'Photoshop', 'Canva', 'After Effects', 'Blender',
      'ToonBoom', 'Visual Studio Code', 'GitHub', 'npm', 'Trello',
    ],
  },
  {
    category: 'Metodología y Enfoques',
    color: 'salmon',
    skills: [
      'Design Thinking', 'Diseño Centrado en el Usuario (UCD)',
      'Heurísticas de Usabilidad', 'Evaluación de Interfaces',
    ],
  },
  {
    category: 'Idiomas',
    color: 'cyan',
    skills: ['Español nativo', 'Inglés B2+'],
  },
]

const CHIP_COLORS = {
  cyan: { text: '#00d4ff', bg: 'rgba(0,212,255,0.08)', border: 'rgba(0,212,255,0.2)' },
  salmon: { text: '#e8a090', bg: 'rgba(232,160,144,0.08)', border: 'rgba(232,160,144,0.2)' },
}

// Skills sin ícono de marca disponible (Adobe XD, After Effects, etc.) caen al genérico FiLayout
const SKILL_ICONS = {
  Figma: SiFigma,
  Illustrator: DiIllustrator,
  Photoshop: DiPhotoshop,
  Canva: SiCanva,
  Blender: SiBlender,
  GitHub: SiGithub,
  npm: SiNpm,
  Trello: SiTrello,
  React: SiReact,
  HTML: SiHtml5,
  CSS: DiCss3,
  JavaScript: SiJavascript,
  'Tailwind CSS': SiTailwindcss,
  Bootstrap: SiBootstrap,
  'Affinity Designer': SiAffinitydesigner,
}

function Chip({ color = 'cyan', icon: Icon, children }) {
  const c = CHIP_COLORS[color] ?? CHIP_COLORS.cyan
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs tracking-[0.5px] uppercase px-2 py-1 rounded"
      style={{ color: c.text, backgroundColor: c.bg, border: `1px solid ${c.border}` }}
    >
      <Icon size={14} />
      {children}
    </span>
  )
}

function SkillGroup({ category, color, skills }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-white/70 text-sm tracking-wide">{category}</p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Chip key={skill} color={color} icon={SKILL_ICONS[skill] ?? FiLayout}>
            {skill}
          </Chip>
        ))}
      </div>
    </div>
  )
}

function AboutMe() {
  const { reduceMotion } = usePortfolio()
  const [visible, setVisible] = useState(() => reduceMotion)

  useEffect(() => {
    if (reduceMotion) return
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [reduceMotion])

  return (
    <section id="about" className="bg-[#050d1a] py-24 px-6">
      <div
        className="max-w-6xl mx-auto flex flex-col gap-16"
        style={{ opacity: visible ? 1 : 0, transition: reduceMotion ? 'none' : 'opacity 600ms ease' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h2 className="text-white text-4xl md:text-5xl font-semibold">Sobre mí</h2>

            <p className="text-white text-base leading-relaxed" style={{ opacity: 0.8 }}>
              Soy Zoe, diseñadora UX/UI con base en Santiago. Me especializo en
              crear interfaces que equilibran estética, funcionalidad y accesibilidad
              — desde el wireframe hasta el código.
            </p>

            <p className="text-white text-base leading-relaxed" style={{ opacity: 0.8 }}>
              Trabajo en la intersección del diseño y el front-end, lo que me permite
              tomar decisiones más inteligentes en ambos lados. Cada proyecto es una
              oportunidad de resolver un problema real para personas reales.
            </p>

            <p className="text-[#e8a090] text-lg italic">
              "Creo que la tecnología debe adaptarse a las personas, no al revés."
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div
              className="rounded-full"
              style={{
                width: '280px',
                height: '280px',
                border: '2px solid #00d4ff',
                backgroundColor: 'rgba(0,212,255,0.05)',
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#00d4ff] text-xs tracking-[4px] uppercase opacity-60">Stack & Skills</p>
          <h3 className="text-white text-2xl font-semibold">Habilidades</h3>
        </div>

        <div className="flex flex-col gap-6">
          {SKILL_GROUPS.map((group) => (
            <SkillGroup
              key={group.category}
              category={group.category}
              color={group.color}
              skills={group.skills}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutMe
