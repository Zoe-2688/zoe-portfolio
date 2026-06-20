import { useEffect, useRef, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'

const lerp = (start, end, amount) => start + (end - start) * amount
const isClickableTarget = (target) => {
  if (!(target instanceof Element)) {
    target = target?.parentElement
  }
  return !!target?.closest('button, a')
}

const pixelArrowShadow = `
  0px 0px 0 0 currentColor,
  0px 3px 0 0 currentColor,
  3px 3px 0 0 currentColor,
  0px 6px 0 0 currentColor,
  3px 6px 0 0 currentColor,
  6px 6px 0 0 currentColor,
  0px 9px 0 0 currentColor,
  3px 9px 0 0 currentColor,
  6px 9px 0 0 currentColor,
  9px 9px 0 0 currentColor,
  0px 12px 0 0 currentColor,
  3px 12px 0 0 currentColor,
  6px 12px 0 0 currentColor,
  9px 12px 0 0 currentColor,
  12px 12px 0 0 currentColor,
  0px 15px 0 0 currentColor,
  3px 15px 0 0 currentColor,
  6px 15px 0 0 currentColor,
  0px 18px 0 0 currentColor,
  6px 18px 0 0 currentColor,
  9px 18px 0 0 currentColor
`

function CustomCursor() {
  const { reduceMotion, mode } = usePortfolio()
  const [isDesktop, setIsDesktop] = useState(false)
  const [hovered, setHovered] = useState(false)
  const hoveredRef = useRef(false)
  const smallRef = useRef(null)
  const bigRef = useRef(null)
  const pixelRef = useRef(null)
  const targetRef = useRef({ x: -100, y: -100 })
  const currentRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef(null)

  useEffect(() => {
    const updateIsDesktop = () => {
      setIsDesktop(window.innerWidth > 768)
    }

    updateIsDesktop()
    window.addEventListener('resize', updateIsDesktop)
    return () => window.removeEventListener('resize', updateIsDesktop)
  }, [])

  useEffect(() => {
    if (reduceMotion || !isDesktop || !mode) return

    const previousCursor = document.body.style.cursor
    document.body.style.cursor = 'none'

    const isProfessional = mode === 'professional'
    const isCreative = mode === 'creative'
    const smallEl = smallRef.current
    const bigEl = bigRef.current
    const pixelEl = pixelRef.current

    const handleMouseMove = (event) => {
      const { clientX: x, clientY: y, target } = event
      targetRef.current = { x, y }
      hoveredRef.current = isClickableTarget(target)
      setHovered(hoveredRef.current)

      if (isProfessional && smallEl) {
        smallEl.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`
      }

      if (isCreative && pixelEl) {
        pixelEl.style.transform = `translate3d(${x - 8}px, ${y - 8}px, 0)`
      }
    }

    let animationFrame = null

    const animateProfessional = () => {
      if (!bigEl) return
      const { x: targetX, y: targetY } = targetRef.current
      const { x: currentX, y: currentY } = currentRef.current
      const nextX = lerp(currentX, targetX, 0.15)
      const nextY = lerp(currentY, targetY, 0.15)
      currentRef.current = { x: nextX, y: nextY }
      const size = hoveredRef.current ? 48 : 32
      bigEl.style.width = `${size}px`
      bigEl.style.height = `${size}px`
      bigEl.style.borderColor = hoveredRef.current ? 'rgba(232, 160, 144, 0.3)' : 'rgba(0, 212, 255, 0.3)'
      bigEl.style.transform = `translate3d(${nextX - size / 2}px, ${nextY - size / 2}px, 0)`
      animationFrame = requestAnimationFrame(animateProfessional)
    }

    window.addEventListener('mousemove', handleMouseMove)
    if (isProfessional) {
      animationFrame = requestAnimationFrame(animateProfessional)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrame) cancelAnimationFrame(animationFrame)
      document.body.style.cursor = previousCursor
    }
  }, [reduceMotion, isDesktop, mode])

  if (reduceMotion || !isDesktop || !mode) {
    return null
  }

  const isProfessional = mode === 'professional'
  const isCreative = mode === 'creative'

  return (
    <>
      {isProfessional && (
        <>
          <div
            ref={smallRef}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: '8px',
              height: '8px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(0, 212, 255, 0.6)',
              pointerEvents: 'none',
              zIndex: 9999,
              transform: 'translate3d(-999px, -999px, 0)',
              willChange: 'transform'
            }}
          />
          <div
            ref={bigRef}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: '32px',
              height: '32px',
              borderRadius: '9999px',
              border: '2px solid rgba(0, 212, 255, 0.3)',
              backgroundColor: 'transparent',
              pointerEvents: 'none',
              zIndex: 9999,
              transform: 'translate3d(-999px, -999px, 0)',
              willChange: 'transform, width, height'
            }}
          />
        </>
      )}
      {isCreative && (
        <div
          ref={pixelRef}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '3px',
            height: '3px',
            color: hovered ? '#e8a090' : '#00d4ff',
            boxShadow: pixelArrowShadow,
            pointerEvents: 'none',
            zIndex: 9999,
            transform: 'translate3d(-999px, -999px, 0)',
            imageRendering: 'pixelated',
            willChange: 'transform'
          }}
        />
      )}
    </>
  )
}

export default CustomCursor
