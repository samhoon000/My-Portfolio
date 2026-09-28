import { useState, useEffect } from 'react'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { navLinks } from '../data/portfolio-data'

export function Navbar() {
  const { pathname } = useLocation()
  const isHomePage = pathname === '/'
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map(({ id }) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: '-35% 0px -55%', threshold: 0 }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const headerBg = isScrolled || isOpen
    ? 'nav-scrolled'
    : 'bg-transparent border-b border-transparent'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-10 ${isScrolled ? 'py-2.5' : 'py-4'}`}>
        <Link 
          to="/#home" 
          className="brand-mark"
        >
          <span aria-hidden="true">A·S</span><strong>Abdul Samhoon</strong><small>Data / AI</small>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-menu hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={`/#${link.id}`}
              className={`nav-item ${isHomePage && activeSection === link.id ? 'is-active' : ''}`}
              aria-current={isHomePage && activeSection === link.id ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/Abdul_Samhoon_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-resume"
          >
            Résumé ↗
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((state) => !state)}
          className="nav-toggle lg:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="mobile-menu mx-4 flex flex-col gap-2 px-4 py-4 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={`/#${link.id}`}
              onClick={() => setIsOpen(false)}
            className="mobile-nav-link"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/Abdul_Samhoon_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="nav-resume mt-2 text-center"
          >
            Résumé ↗
          </a>
        </div>
      )}
    </header>
  )
}
