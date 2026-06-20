import { useEffect, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import iconRocket from '../../assets/projects/icon rocket.png'
import iconGear from '../../assets/projects/icon gear.png'
import iconBook from '../../assets/projects/icon book.png'
import iconFire from '../../assets/projects/icon fire.png'
import iconBow from '../../assets/projects/icon bow.png'
import iconBalance from '../../assets/projects/icon balance.png'

const BLOCKS = [
  {
    icon: iconRocket,
    label: '// cómo comencé',
    text: 'Mi viaje en el diseño comenzó de forma inesperada. Fue gracias a mi pareja y su experiencia en back-end que descubrí mi pasión por el UX/UI.',
  },
  {
    icon: iconGear,
    label: '// mi enfoque',
    text: 'Fusiono estética y funcionalidad. Diseño soluciones accesibles y centradas en el usuario — útil, simple y eficaz.',
  },
  {
    icon: iconBook,
    label: '// más allá del diseño',
    text: 'Practico front-end porque me apasiona ver cómo el diseño que concebí en UX/UI cobra vida y se vuelve real y útil para las personas.',
  },
  {
    icon: iconFire,
    label: '// lo que me motiva',
    text: 'Crear experiencias que hagan la vida más fácil e impacten positivamente cómo las personas interactúan con la tecnología.',
  },
  {
    icon: iconBow,
    label: '// qué sigue',
    text: 'Seguir creciendo en animación, interactividad avanzada y front-end.',
  },
  {
    icon: iconBalance,
    label: '// cómo lo veo',
    text: 'El diseño debe ser accesible, intuitivo y memorable — equilibrio entre creatividad, usabilidad y tecnología.',
  },
]

function About() {
  const { reduceMotion } = usePortfolio()
  const [visible, setVisible] = useState(() => reduceMotion)

  useEffect(() => {
    if (reduceMotion) return
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [reduceMotion])

  return (
    <section id="proceso" className="bg-[#050d1a] py-24 px-6">
      <div
        className="max-w-6xl mx-auto grid grid-cols-1 gap-12"
        style={{ opacity: visible ? 1 : 0, transition: reduceMotion ? 'none' : 'opacity 600ms ease' }}
      >
        <div className="flex flex-col gap-8">
          <h2 className="text-white text-4xl md:text-5xl font-semibold">Proceso de Diseño</h2>

          <div className="flex flex-col gap-6">
            {BLOCKS.map(({ icon, label, text }) => (
              <div key={label} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <img src={icon} alt="" width={24} height={24} className="rounded" />
                  <p className="text-[#00d4ff] text-sm font-mono opacity-80">{label}</p>
                </div>
                <p className="text-white text-base leading-relaxed" style={{ opacity: 0.8 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
