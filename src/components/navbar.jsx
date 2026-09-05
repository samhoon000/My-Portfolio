import { useState, useEffect } from 'react'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { navLinks } from '../data/portfolio-data'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Active section detection
      const sections = navLinks.map((l) => document.getElementById(l.id))
      const scrollPosition = window.scrollY + 180

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i]
        if (sec && sec.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-3 sm:py-4 transition-all duration-300">
      <div 
        className={`flex w-full max-w-6xl items-center justify-between rounded-2xl px-5 py-2.5 transition-all duration-300 ${
          isScrolled || isOpen
            ? 'bg-[#2B1D18]/90 backdrop-blur-md border border-[#F5E3C8]/15 shadow-[0_8px_32px_rgba(15,9,7,0.7),0_0_20px_rgba(185,111,89,0.15)]'
            : 'bg-[#2B1D18]/50 backdrop-blur-sm border border-[#F5E3C8]/10 shadow-[0_4px_20px_rgba(15,9,7,0.35)]'
        }`}
      >
        {/* Name / Brand */}
        <Link 
          to="/#home" 
          className="group flex items-center gap-2.5 font-display text-base sm:text-lg font-bold tracking-wide text-ivory transition hover:text-peach"
        >
          <span className="flex h-2 w-2 rounded-full bg-terracotta shadow-[0_0_8px_#B96F59] animate-pulse" />
          <span className="bg-gradient-to-r from-ivory via-cream to-peach bg-clip-text text-transparent group-hover:from-peach group-hover:to-ivory">
            Abdul Samhoon
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 lg:gap-1.5 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <Link
                key={link.id}
                to={`/#${link.id}`}
                className={`relative px-3 py-1.5 text-xs font-medium transition-all duration-200 rounded-lg ${
                  isActive
                    ? 'text-ivory font-semibold bg-terracotta/25 border border-terracotta/40 shadow-[0_0_12px_rgba(185,111,89,0.25)]'
                    : 'text-warmMuted hover:text-ivory hover:bg-[#4A2F25]/40'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-base`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-terracotta rounded-full shadow-[0_0_6px_#B96F59]" />
                )}
              </Link>
            )
          })}

          {/* Resume CTA */}
          <a
            href="/Abdul_Samhoon_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-lg border border-terracotta/50 bg-terracotta/20 px-3.5 py-1.5 text-xs font-semibold text-ivory shadow-[0_0_15px_rgba(185,111,89,0.25)] transition-all duration-200 hover:bg-terracotta hover:text-base hover:shadow-[0_0_20px_rgba(185,111,89,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((state) => !state)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#F5E3C8]/15 bg-[#38241D]/60 text-xl text-ivory transition hover:bg-[#4A2F25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-[calc(100%+6px)] left-4 right-4 z-50 flex flex-col gap-1 rounded-2xl border border-[#F5E3C8]/15 bg-[#2B1D18]/95 p-4 backdrop-blur-xl shadow-[0_16px_40px_rgba(15,9,7,0.85)] md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={`/#${link.id}`}
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3.5 py-2 text-sm font-medium text-cream transition hover:bg-terracotta/20 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/Abdul_Samhoon_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="mt-2 block rounded-lg border border-terracotta/50 bg-terracotta/25 py-2 text-center text-sm font-semibold text-ivory transition hover:bg-terracotta hover:text-base"
          >
            Resume
          </a>
        </div>
      )}
    </header>
  )
}


