import { useEffect, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'

function ScrollProgress() {
  const { mode, reduceMotion } = usePortfolio()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!mode) return undefined

    const updateProgress = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const value = maxScroll > 0 ? window.scrollY / maxScroll : 0
      setProgress(Math.min(Math.max(value, 0), 1))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [mode])

  if (!mode) return null

  const isCreative = mode === 'creative'
  const containerHeight = isCreative ? '6px' : '4px'
  const background = isCreative ? 'rgba(0,212,255,0.05)' : 'rgba(0,212,255,0.08)'
  const transitionStyle = reduceMotion ? 'none' : isCreative ? 'none' : 'width 100ms linear'

  if (!isCreative) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: containerHeight,
          background,
          zIndex: 100,
        }}
      >
        <div
          style={{
            position: 'relative',
            height: '100%',
            width: '100%',
          }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #00d4ff, #e8a090)',
              transition: transitionStyle,
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translate(50%, -50%)',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#00d4ff',
                boxShadow: '0 0 8px #00d4ff, 0 0 16px #00d4ff',
                display: progress === 0 ? 'none' : 'block',
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  const segments = 20
  const activeCount = Math.round(progress * segments)

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: containerHeight,
        background,
        zIndex: 100,
        display: 'grid',
        gridTemplateColumns: `repeat(${segments}, 1fr)`,
        gap: '2px',
      }}
    >
      {Array.from({ length: segments }).map((_, index) => (
        <div
          key={index}
          style={{
            height: '100%',
            width: '100%',
            background: index < activeCount ? '#00d4ff' : 'rgba(0,212,255,0.08)',
          }}
        />
      ))}
    </div>
  )
}

export default ScrollProgress
