import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches || reducedMotion.matches) return undefined

    const cursor = cursorRef.current
    const label = labelRef.current
    let frame = 0
    const current = { x: -100, y: -100 }
    const target = { x: -100, y: -100 }

    const render = () => {
      current.x += (target.x - current.x) * 0.22
      current.y += (target.y - current.y) * 0.22
      cursor.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
      frame = requestAnimationFrame(render)
    }

    const onMove = (event) => {
      target.x = event.clientX
      target.y = event.clientY
      cursor.dataset.visible = 'true'
    }
    const onOver = (event) => {
      const interactive = event.target.closest('a, button, [data-cursor]')
      cursor.dataset.active = interactive ? 'true' : 'false'
      label.textContent = interactive?.dataset.cursor || (interactive ? '+' : '·')
    }
    const onLeave = () => { cursor.dataset.visible = 'false' }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true"><span ref={labelRef}>·</span></div>
}
