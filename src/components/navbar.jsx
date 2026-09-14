import { useState, useEffect } from 'react'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { BiCoffee } from 'react-icons/bi'
import { navLinks } from '../data/portfolio-data'

export function Navbar() {
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
          className="group flex items-center gap-2 font-pixel text-lg font-bold tracking-wide text-[#FFF1D6] transition-colors hover:text-[#E39A73]"
        >
          <BiCoffee className="text-xl text-[#E39A73] transition-transform group-hover:rotate-12" />
          <span>Abdul Samhoon</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="cafe-menu hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={`/#${link.id}`}
              className={`nav-item ${activeSection === link.id ? 'is-active' : ''}`}
              aria-current={activeSection === link.id ? 'page' : undefined}
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
            Resume
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((state) => !state)}
          className="rounded-sm border border-copper/50 bg-espresso/90 p-2 text-xl text-cream transition-colors hover:border-accent hover:text-accent md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="mobile-menu mx-4 flex flex-col gap-2 px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={`/#${link.id}`}
              onClick={() => setIsOpen(false)}
              className="block py-1.5 text-sm font-semibold uppercase tracking-wider text-[#FFF1D6] hover:text-[#E39A73]"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/Abdul_Samhoon_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="mt-2 text-center rounded-xl border border-[#6B4535] bg-[#3A241D] px-4 py-2.5 font-pixel text-xs font-bold text-[#FFF1D6] hover:bg-[#4A2F25] hover:text-[#F0B08A] shadow-md"
          >
            Download Resume
          </a>
        </div>
      )}
    </header>
  )
}
