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
    <div className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-[#160E0B]/40 pointer-events-none">
      <div 
        className="relative h-full bg-gradient-to-r from-terracotta via-peach to-gold shadow-[0_0_12px_rgba(185,111,89,0.7)] transition-all duration-75 ease-out" 
        style={{ width: `${width}%` }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-ivory shadow-[0_0_8px_#FFF4DE]" />
      </div>
    </div>
  )
}
