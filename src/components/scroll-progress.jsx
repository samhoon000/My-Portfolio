import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight > 0) {
        setWidth((scrollTop / scrollHeight) * 100)
      }
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-1 bg-gradient-to-r from-accent via-accentSoft to-accentHover shadow-[0_0_10px_rgba(216,149,120,0.5)]"
      style={{ width: `${width}%` }}
    />
  )
}
