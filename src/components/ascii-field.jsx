import { useEffect, useRef } from 'react'

const GLYPHS = ' .,:;+*#%@'

export function AsciiField({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d', { alpha: true })
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let lastFrame = 0
    let width = 0
    let height = 0
    let columns = 0
    let rows = 0
    let isVisible = true
    let cellWidth = 13
    let cellHeight = 17
    const pointer = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * ratio))
      canvas.height = Math.max(1, Math.floor(height * ratio))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      cellWidth = width < 640 ? 15 : 13
      cellHeight = width < 640 ? 20 : 17
      columns = Math.ceil(width / cellWidth)
      rows = Math.ceil(height / cellHeight)
      if (reducedMotion) requestAnimationFrame(() => draw())
    }

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height)
      context.font = `${width < 640 ? 12 : 11}px "IBM Plex Mono", monospace`
      context.textAlign = 'center'
      context.textBaseline = 'middle'

      pointer.x += (pointer.targetX - pointer.x) * 0.085
      pointer.y += (pointer.targetY - pointer.y) * 0.085
      const tick = reducedMotion ? 0 : time * 0.00045

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = column * cellWidth + cellWidth / 2
          const y = row * cellHeight + cellHeight / 2
          const dx = x - pointer.x
          const dy = y - pointer.y
          const distance = Math.hypot(dx, dy)
          const ripple = Math.max(0, 1 - distance / 190)
          const wave = Math.sin(column * 0.31 + tick * 5) + Math.cos(row * 0.43 - tick * 4)
          const diagonal = Math.sin((column + row) * 0.19 - tick * 7)
          const value = (wave + diagonal + 3) / 6 + ripple * 0.7
          const glyph = GLYPHS[Math.min(GLYPHS.length - 1, Math.floor(value * GLYPHS.length))]

          const edgeFade = Math.min(1, x / 170, (width - x) / 170, y / 140, (height - y) / 140)
          const alpha = Math.max(0, edgeFade) * (0.11 + value * 0.35 + ripple * 0.34)
          context.fillStyle = ripple > 0.2
            ? `rgba(255, 174, 66, ${alpha})`
            : `rgba(82, 214, 255, ${alpha})`
          context.fillText(glyph, x + Math.sin(row + tick) * ripple * 7, y + Math.cos(column - tick) * ripple * 5)
        }
      }
    }

    const loop = (time) => {
      if (isVisible && time - lastFrame > 40) {
        draw(time)
        lastFrame = time
      }
      frame = requestAnimationFrame(loop)
    }

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointer.targetX = event.clientX - rect.left
      pointer.targetY = event.clientY - rect.top
    }

    const onPointerLeave = () => {
      pointer.targetX = width * 0.72
      pointer.targetY = height * 0.38
    }

    const onVisibilityChange = () => {
      cancelAnimationFrame(frame)
      if (!document.hidden && !reducedMotion) frame = requestAnimationFrame(loop)
    }

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    }, { threshold: 0.01 })

    resize()
    pointer.x = width * 0.72
    pointer.y = height * 0.38
    pointer.targetX = pointer.x
    pointer.targetY = pointer.y
    draw()
    if (!reducedMotion) frame = requestAnimationFrame(loop)

    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('mouseleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibilityChange)
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('mouseleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      observer.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className={`ascii-field ${className}`} aria-hidden="true" />
}
