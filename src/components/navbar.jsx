import { useState, useEffect } from 'react'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { BiCoffee } from 'react-icons/bi'
import { navLinks } from '../data/portfolio-data'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerBg = isScrolled || isOpen
    ? 'bg-panel/90 backdrop-blur-md border-b border-stroke/70 shadow-[0_8px_24px_rgba(10,5,3,0.6)]'
    : 'bg-transparent border-b border-transparent'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8 ${isScrolled ? 'py-2.5' : 'py-4'}`}>
        <Link 
          to="/#home" 
          className="group flex items-center gap-2 font-pixel text-lg font-bold tracking-wide text-[#FFF1D6] transition-colors hover:text-[#E39A73]"
        >
          <BiCoffee className="text-xl text-[#E39A73] transition-transform group-hover:rotate-12" />
          <span>Abdul Samhoon</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={`/#${link.id}`}
              className="text-xs uppercase tracking-wider font-semibold text-[#FFF1D6] transition-colors hover:text-[#E39A73] focus:outline-none focus:text-[#E39A73]"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/Abdul_Samhoon_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-[#6B4535] bg-[#3A241D] px-3.5 py-1.5 font-pixel text-xs font-bold text-[#FFF1D6] transition-all hover:border-[#E39A73] hover:bg-[#4A2F25] hover:text-[#F0B08A] shadow-sm"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((state) => !state)}
          className="rounded-lg border border-[#6B4535] bg-[#3A241D] p-2 text-xl text-[#FFF1D6] transition-colors hover:border-[#E39A73] hover:text-[#E39A73] md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="border-t border-[#6B4535]/70 bg-[#20130e]/95 px-6 py-5 backdrop-blur-xl md:hidden flex flex-col gap-3 shadow-2xl">
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
