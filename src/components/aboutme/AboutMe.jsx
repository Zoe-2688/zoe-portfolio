import { useEffect, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import {
  SiFigma, SiCanva, SiBlender, SiGithub, SiNpm, SiTrello, SiReact,
  SiHtml5, SiJavascript, SiTailwindcss, SiBootstrap, SiCss,
  SiVite, SiGit,
} from 'react-icons/si'
import { FiLayout, FiUser, FiEye, FiSmartphone, FiPackage, FiGlobe, FiPenTool, FiCode } from 'react-icons/fi'
import es from '../../locales/es'
import en from '../../locales/en'

function getSkillGroups(t) {
  const isEn = t === en
  return [
    {
      category: isEn ? 'UX/UI & Graphic Design' : 'Diseño UX/UI y Gráfico',
      color: 'cyan',
      skills: [
        { name: isEn ? 'Wireframing' : 'Wireframing', icon: FiLayout },
        { name: isEn ? 'Prototyping' : 'Prototipado', icon: FiPackage },
        { name: isEn ? 'Responsive Design' : 'Diseño Responsivo', icon: FiSmartphone },
        { name: isEn ? 'Usability Testing' : 'Pruebas de Usabilidad', icon: FiUser },
        { name: isEn ? 'User-Centered Design' : 'Diseño Centrado en el Usuario', icon: FiUser },
        { name: 'Design Thinking', icon: FiEye },
        { name: isEn ? 'Visual Design' : 'Diseño Visual', icon: FiPenTool },
        { name: isEn ? 'UI Design' : 'Diseño UI', icon: FiLayout },
        { name: 'Branding', icon: FiEye },
        { name: isEn ? 'Digital Illustration' : 'Ilustración Digital', icon: FiPenTool },
        { name: isEn ? 'WCAG / Accessibility' : 'WCAG / Accesibilidad', icon: FiEye },
      ],
    },
    {
      category: isEn ? 'Front-End Development' : 'Desarrollo Front-End',
      color: 'salmon',
      skills: [
        { name: 'HTML', icon: SiHtml5, brandColor: '#E34F26' },
        { name: 'CSS', icon: SiCss, brandColor: '#1572B6' },
        { name: 'JavaScript', icon: SiJavascript, brandColor: '#F7DF1E' },
        { name: 'React', icon: SiReact, brandColor: '#61DAFB' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, brandColor: '#06B6D4' },
        { name: 'Bootstrap', icon: SiBootstrap, brandColor: '#7952B3' },
        { name: 'Vite', icon: SiVite, brandColor: '#646CFF' },
        { name: 'Git', icon: SiGit, brandColor: '#F05032' },
      ],
    },
    {
      category: isEn ? 'Tools & Software' : 'Herramientas y Software',
      color: 'cyan',
      skills: [
        { name: 'Figma', icon: SiFigma, brandColor: '#F24E1E' },
        { name: 'Adobe XD', icon: FiPenTool, brandColor: '#FF61F6' },
        { name: 'Adobe Illustrator', icon: FiPenTool, brandColor: '#FF9A00' },
        { name: 'Adobe Photoshop', icon: FiLayout, brandColor: '#31A8FF' },
        { name: 'Affinity Designer', icon: FiPenTool, brandColor: '#1B72BE' },
        { name: 'Canva', icon: SiCanva, brandColor: '#00C4CC' },
        { name: 'After Effects', icon: FiLayout, brandColor: '#9999FF' },
        { name: 'VS Code', icon: FiCode, brandColor: '#007ACC' },
        { name: 'GitHub', icon: SiGithub, brandColor: '#ffffff' },
        { name: 'npm', icon: SiNpm, brandColor: '#CB3837' },
        { name: 'Trello', icon: SiTrello, brandColor: '#0052CC' },
      ],
    },
    {
      category: isEn ? 'Methodology & Approaches' : 'Metodología y Enfoques',
      color: 'salmon',
      skills: [
        { name: 'Design Thinking', icon: FiEye },
        { name: 'UCD', icon: FiUser },
        { name: isEn ? 'Usability Heuristics' : 'Heurísticas de Usabilidad', icon: FiLayout },
        { name: isEn ? 'Interface Evaluation' : 'Evaluación de Interfaces', icon: FiSmartphone },
      ],
    },
    {
      category: isEn ? 'Languages' : 'Idiomas',
      color: 'cyan',
      skills: [
        { name: isEn ? 'Native Spanish' : 'Español nativo', icon: FiGlobe },
        { name: isEn ? 'English B2+' : 'Inglés B2+', icon: FiGlobe },
      ],
    },
  ]
}

function SkillChip({ skill, groupColor, reduceMotion }) {
  const [hovered, setHovered] = useState(false)
  const Icon = skill.icon
  const hasBrand = !!skill.brandColor
  const baseColor = groupColor === 'cyan' ? '#00d4ff' : '#e8a090'
  const iconColor = hasBrand ? skill.brandColor : baseColor
  const bgBase = groupColor === 'cyan' ? 'rgba(0,212,255,0.06)' : 'rgba(232,160,144,0.06)'
  const bgHover = groupColor === 'cyan' ? 'rgba(0,212,255,0.14)' : 'rgba(232,160,144,0.14)'
  const borderBase = groupColor === 'cyan' ? 'rgba(0,212,255,0.18)' : 'rgba(232,160,144,0.18)'
  const borderHover = groupColor === 'cyan' ? 'rgba(0,212,255,0.5)' : 'rgba(232,160,144,0.5)'
  const glowColor = hasBrand ? skill.brandColor : baseColor

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center gap-2 p-3 rounded-xl cursor-default"
      style={{
        backgroundColor: hovered ? bgHover : bgBase,
        border: `1px solid ${hovered ? borderHover : borderBase}`,
        boxShadow: hovered ? `0 0 14px ${glowColor}33, 0 4px 12px rgba(0,0,0,0.2)` : 'none',
        transform: hovered ? (reduceMotion ? 'none' : 'scale(1.08) translateY(-3px)') : 'scale(1) translateY(0)',
        transition: reduceMotion ? 'none' : 'all 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        minWidth: '76px',
      }}
    >
      <Icon size={32} style={{ color: hovered ? iconColor : `${iconColor}99`, filter: hovered ? `drop-shadow(0 0 6px ${glowColor}88)` : 'none', transition: reduceMotion ? 'none' : 'all 200ms ease' }} />
      <span style={{ fontSize: '9px', fontFamily: 'monospace', color: hovered ? '#ffffff' : 'rgba(255,255,255,0.5)', textAlign: 'center', letterSpacing: '0.5px', lineHeight: 1.3, transition: reduceMotion ? 'none' : 'color 200ms ease' }}>
        {skill.name}
      </span>
    </div>
  )
}

function SkillGroup({ category, color, skills, reduceMotion }) {
  const labelColor = color === 'cyan' ? 'rgba(0,212,255,0.6)' : 'rgba(232,160,144,0.6)'
  return (
    <div className="flex flex-col gap-3">
      <p style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: labelColor }}>// {category}</p>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => <SkillChip key={skill.name} skill={skill} groupColor={color} reduceMotion={reduceMotion} />)}
      </div>
    </div>
  )
}

function AboutMe() {
  const { reduceMotion, language } = usePortfolio()
  const t = language === 'en' ? en : es
  const am = t.aboutMe || {}
  const SKILL_GROUPS = getSkillGroups(t)
  const [visible, setVisible] = useState(() => reduceMotion)

  useEffect(() => {
    if (reduceMotion) return
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [reduceMotion])

  return (
    <section id="about" className="bg-[#050d1a] py-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-16" style={{ opacity: visible ? 1 : 0, transition: reduceMotion ? 'none' : 'opacity 600ms ease' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h2 className="text-white text-4xl md:text-5xl font-semibold">{am.title || 'Sobre mí'}</h2>
            <p className="text-white text-base leading-relaxed" style={{ opacity: 0.8 }}>{am.bio1}</p>
            <p className="text-white text-base leading-relaxed" style={{ opacity: 0.8 }}>{am.bio2}</p>
            <p className="text-white text-base leading-relaxed" style={{ opacity: 0.8 }}>{am.bio3}</p>
            <p className="text-[#e8a090] text-lg italic">{am.quote}</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="rounded-full" style={{ width: '280px', height: '280px', border: '2px solid #00d4ff', backgroundColor: 'rgba(0,212,255,0.05)', boxShadow: '0 0 40px rgba(0,212,255,0.1)' }} />
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-1">
            <p className="text-[#00d4ff] text-xs tracking-[4px] uppercase opacity-60">{am.skillsTag || 'Stack & Skills'}</p>
            <h3 className="text-white text-2xl font-semibold">{am.skillsTitle || 'Habilidades'}</h3>
          </div>
          <div className="flex flex-col gap-8">
            {SKILL_GROUPS.map((group) => <SkillGroup key={group.category} category={group.category} color={group.color} skills={group.skills} reduceMotion={reduceMotion} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
