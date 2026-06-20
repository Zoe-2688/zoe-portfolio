import { useEffect, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'

const linkClass = 'text-[#00d4ff] hover:text-[#e8a090] transition-colors duration-200 text-sm'

function Footer() {
  const { reduceMotion } = usePortfolio()
  const [visible, setVisible] = useState(() => reduceMotion)

  useEffect(() => {
    if (reduceMotion) return
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [reduceMotion])

  return (
    <footer className="bg-[#050d1a] py-16 px-6" style={{ borderTop: '1px solid rgba(0,212,255,0.15)' }}>
      <div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10"
        style={{ opacity: visible ? 1 : 0, transition: reduceMotion ? 'none' : 'opacity 600ms ease' }}
      >
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-2xl font-semibold">¿Hablamos?</h3>
          <a href="mailto:zoe.mejia.ux@gmail.com" className={linkClass}>
            zoe.mejia.ux@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/zoe-mejia"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            linkedin.com/in/zoe-mejia
          </a>
          <a
            href="https://github.com/Zoe-2688"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            github.com/Zoe-2688
          </a>
          <p className="text-white/70 text-sm">Santiago, Chile</p>
        </div>

        <div className="flex flex-col items-end justify-end text-right">
          <p style={{ color: 'rgba(255,255,255,0.3)' }} className="text-xs tracking-wide">
            Diseñado y desarrollado por Zoe Mejia Santana · 2026
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
