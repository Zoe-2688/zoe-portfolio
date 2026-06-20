import { useEffect, useState } from 'react'

function RetroLoadingScreen({ reduceMotion, onComplete }) {
  const [filled, setFilled] = useState(0)
  const totalSegments = 10

  useEffect(() => {
    if (reduceMotion) {
      onComplete()
      return undefined
    }
    const interval = setInterval(() => {
      setFilled((prev) => {
        if (prev >= totalSegments - 1) {
          clearInterval(interval)
          setTimeout(onComplete, 150)
          return totalSegments
        }
        return prev + 1
      })
    }, 80)
    return () => clearInterval(interval)
  }, [reduceMotion, onComplete])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: '#050d1a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '16px',
          color: '#00d4ff',
          letterSpacing: '4px',
          marginBottom: '24px',
        }}
      >
        CARGANDO
      </p>
      <div
        style={{
          width: '280px',
          height: '20px',
          border: '2px solid #00d4ff',
          display: 'flex',
          padding: '2px',
          gap: '2px',
        }}
      >
        {Array.from({ length: totalSegments }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: i < filled ? '#e8a090' : 'transparent',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default RetroLoadingScreen
