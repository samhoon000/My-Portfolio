import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export const destinations = [
  { id: 'atrium', label: 'Central Atrium', path: '/museum', number: '00' },
  { id: 'about', label: 'About', path: '/museum/about', number: '01' },
  { id: 'projects', label: 'Projects', path: '/museum/projects', number: '02' },
  { id: 'skills', label: 'Skills Lab', path: '/museum/skills', number: '03' },
  { id: 'experience', label: 'Career Gallery', path: '/museum/experience', number: '04' },
  { id: 'contact', label: 'Contact', path: '/museum/contact', number: '05' },
]

const KEY = 'samhoon-museum-v2'
const MuseumContext = createContext(null)
const readProgress = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    return { rooms: saved?.rooms || [], projects: saved?.projects || [], skills: saved?.skills || [] }
  } catch {
    return { rooms: [], projects: [], skills: [] }
  }
}

export function MuseumProvider({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const timer = useRef([])
  const [progress, setProgress] = useState(readProgress)
  const [transition, setTransition] = useState('idle')

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(progress))
  }, [progress])

  useEffect(() => {
    const room = destinations.find(item => item.path === location.pathname)
    if (room) setProgress(current => current.rooms.includes(room.id) ? current : { ...current, rooms: [...current.rooms, room.id] })
    if (location.pathname.startsWith('/museum/projects/')) {
      const slug = location.pathname.split('/').at(-1)
      setProgress(current => current.projects.includes(slug) ? current : { ...current, projects: [...current.projects, slug] })
    }
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => () => timer.current.forEach(clearTimeout), [])

  const discoverSkill = id => setProgress(current => current.skills.includes(id) ? current : { ...current, skills: [...current.skills, id] })
  const travel = to => {
    if (location.pathname === to) return
    timer.current.forEach(clearTimeout)
    timer.current = []
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navigate(to)
      return
    }
    setTransition('closing')
    timer.current.push(setTimeout(() => {
      navigate(to)
      setTransition('opening')
      timer.current.push(setTimeout(() => setTransition('idle'), 420))
    }, 300))
  }

  return <MuseumContext.Provider value={{ progress, transition, travel, discoverSkill }}>
    {children}
    <div className={`room-transition room-transition--${transition}`} aria-hidden="true"><span className="transition-aperture" /></div>
  </MuseumContext.Provider>
}

export function useMuseum() {
  const value = useContext(MuseumContext)
  if (!value) throw new Error('MuseumProvider is required')
  return value
}

export function DoorLink({ to, children, className = '', ...props }) {
  const { travel } = useMuseum()
  const handleClick = event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    travel(to)
  }
  return <Link to={to} className={className} onClick={handleClick} {...props}>{children}</Link>
}
