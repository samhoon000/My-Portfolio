import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    const id = hash.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      // Small timeout to allow DOM to render and layout settles
      const timer = setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' })
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [pathname, hash])

  return null
}
