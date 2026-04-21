import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      setWidth((scrollTop / scrollHeight) * 100)
    }

    update()
    window.addEventListener('scroll', update)
    return () => window.removeEventListener('scroll', update)
  }, [])

  return <div className="fixed left-0 top-0 z-[60] h-1 bg-gradient-to-r from-sky-400 to-emerald-400" style={{ width: `${width}%` }} />
}
