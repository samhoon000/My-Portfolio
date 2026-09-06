import { motion as Motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { FaFileDownload, FaGithub, FaEnvelope, FaChevronDown } from 'react-icons/fa'
import { BiCoffee } from 'react-icons/bi'
import { contactDetails } from '../data/portfolio-data'

export function CinematicCafeHero() {
  const { scrollY } = useScroll()
  const shouldReduceMotion = useReducedMotion()

  // Gracefully fade out hero content as user scrolls down to enter the cafe
  const heroOpacity = useTransform(scrollY, [0, 320], [1, 0])
  const heroY = useTransform(scrollY, [0, 320], [0, shouldReduceMotion ? 0 : -35])

  const handleEnterCafe = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="home" 
      className="hero-scene relative z-10 flex min-h-screen w-full flex-col justify-between px-5 py-20 sm:px-10 md:px-16 lg:px-24"
    >
      {/* Top Tagline / Eyebrow */}
      <Motion.div
        style={{
          opacity: heroOpacity,
          y: heroY,
        }}
        className="relative z-20 pt-7 pointer-events-auto"
      >
        <span className="open-sign inline-flex items-center gap-2 px-3.5 py-2 font-pixel text-[11px] uppercase tracking-wider text-cream">
          <span className="h-1.5 w-1.5 bg-amber" />
          Data Analyst Intern @ Trinetro Labs
        </span>
      </Motion.div>

      {/* Main Hero Information Card */}
      <Motion.div
        style={{
          opacity: heroOpacity,
          y: heroY,
        }}
        className="relative z-20 my-auto max-w-2xl py-8 pointer-events-auto"
      >
        <div className="hero-card pixel-corners p-6 sm:p-9">
          <p className="font-pixel text-xs uppercase tracking-[0.3em] text-[#E39A73]">
            Welcome to my portfolio
          </p>
          
          <h1 className="mt-3 font-pixel text-4xl font-bold tracking-tight text-cream sm:text-6xl lg:text-7xl">
            Abdul Samhoon
          </h1>
          
          <p
            className="mt-3 font-pixel text-sm font-semibold text-cream sm:text-base"
            style={{ color: '#fff0cf' }}
          >
            Data Analyst · Builder · Problem Solver
          </p>
          
          <p
            className="mt-5 max-w-xl text-base leading-relaxed text-creamMuted"
          >
            Turning complex data into clear, strategic decisions. Transforming retail, market intelligence, and nutritional insights into interactive BI dashboards and ML models.
          </p>

          {/* Action Links */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={handleEnterCafe}
              type="button"
              className="button-primary group"
            >
              <BiCoffee className="text-lg transition-transform group-hover:rotate-12" />
              <span>Enter Café</span>
            </button>

            <a
              href="/Abdul_Samhoon_Resume.pdf"
              download="Abdul_Samhoon_Resume.pdf"
              className="button-secondary"
            >
              <FaFileDownload />
              <span>Resume</span>
            </a>

            <a
              href={contactDetails.github}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              <FaGithub />
              <span>GitHub</span>
            </a>

            <a
              href="#contact"
              className="button-secondary"
            >
              <FaEnvelope />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </Motion.div>

      {/* Scroll Down Prompt */}
      <Motion.div
        style={{
          opacity: heroOpacity,
        }}
        className="relative z-20 flex items-center gap-2 pb-2 font-pixel text-xs uppercase tracking-widest text-cream pointer-events-auto"
      >
        <span className="animate-bounce">
          <FaChevronDown className="text-[#E39A73]" />
        </span>
        <span>SCROLL TO EXPLORE ↓</span>
      </Motion.div>
    </section>
  )
}
