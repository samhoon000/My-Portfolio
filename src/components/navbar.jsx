import { useState } from 'react'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { navLinks } from '../data/portfolio-data'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-stroke bg-base">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="font-display text-lg font-semibold tracking-wide text-textPrimary">
          Abdul Samhoon
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-sm text-textPrimary transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setIsOpen((state) => !state)}
          className="text-2xl text-textPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>
      {isOpen ? (
        <div className="border-t border-stroke bg-base px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm text-textPrimary transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  )
}
