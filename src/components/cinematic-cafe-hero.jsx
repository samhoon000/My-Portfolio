import { useEffect, useMemo, useRef, useState } from 'react'
import { motion as Motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { FaFileDownload, FaGithub, FaLinkedin, FaChevronDown, FaArrowRight } from 'react-icons/fa'
import { contactDetails } from '../data/portfolio-data'

function seededRandom(seed) {
  const value = Math.sin(seed * 999.91) * 43758.5453
  return value - Math.floor(value)
}

function createSnowflakes(count) {
  return Array.from({ length: count }, (_, index) => {
    // Keep the intended depth mix at every responsive particle count.
    const depth = (index + 0.5) / count
    const tiny = depth < 0.6
    const medium = depth >= 0.6 && depth < 0.9
    const size = tiny
      ? 1.2 + seededRandom(index + 11) * 0.8
      : medium
        ? 2.1 + seededRandom(index + 21)
        : 3.4 + seededRandom(index + 31) * 1.1
    const drift = -26 + seededRandom(index + 41) * 52
    const x = seededRandom(index + 51) * 100
    const brightness = 0.3 + seededRandom(index + 61) * 0.27

    return {
      id: index,
      x,
      size,
      opacity: Math.min(0.62, brightness + (x < 50 ? 0.05 : 0)),
      duration: 9 + seededRandom(index + 71) * 7,
      delay: -(seededRandom(index + 81) * 16),
      sway: drift * -0.45,
      drift,
      blur: tiny ? 0 : medium ? 0.15 : 1.2,
    }
  })
}

function HeroSnowfall() {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(true)
  const [particleCount, setParticleCount] = useState(() => {
    if (typeof window === 'undefined') return 72
    if (window.innerWidth < 640) return 30
    if (window.innerWidth < 1024) return 48
    return 72
  })

  useEffect(() => {
    const updateParticleCount = () => {
      setParticleCount(window.innerWidth < 640 ? 30 : window.innerWidth < 1024 ? 48 : 72)
    }

    window.addEventListener('resize', updateParticleCount, { passive: true })
    return () => window.removeEventListener('resize', updateParticleCount)
  }, [])

  useEffect(() => {
    const element = containerRef.current
    if (!element || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.01 }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [shouldReduceMotion])

  const flakes = useMemo(() => createSnowflakes(particleCount), [particleCount])

  if (shouldReduceMotion) return null

  return (
    <div
      ref={containerRef}
      className="hero-snowfall pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="hero-snowflake"
          style={{
            '--snow-x': `${flake.x}%`,
            '--snow-size': `${flake.size}px`,
            '--snow-opacity': flake.opacity,
            '--snow-duration': `${flake.duration}s`,
            '--snow-delay': `${flake.delay}s`,
            '--snow-sway': `${flake.sway}px`,
            '--snow-drift': `${flake.drift}px`,
            '--snow-blur': `${flake.blur}px`,
            animationPlayState: isVisible ? 'running' : 'paused',
          }}
        />
      ))}
    </div>
  )
}

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
      className="hero-scene relative z-10 flex min-h-screen w-full flex-col justify-between overflow-hidden px-5 py-20 sm:px-10 md:px-16 lg:px-24"
    >
      <HeroSnowfall />

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
          Data Analyst Intern · Trinetro Labs
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
            Abdul Samhoon · Data Analyst
          </p>
          
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.045em] text-cream sm:text-6xl lg:text-7xl">
            Turning complex data into clear decisions.
          </h1>
          
          <p
            className="mt-5 max-w-xl text-base leading-relaxed text-creamMuted"
          >
            I transform retail, market intelligence, and nutritional data into interactive BI dashboards, analytical systems, and decision-ready insight.
          </p>

          {/* Action Links */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={handleEnterCafe}
              type="button"
              className="button-primary group"
            >
              <span>View selected work</span>
              <FaArrowRight />
            </button>

            <a
              href="/Abdul_Samhoon_Resume.pdf"
              download="Abdul_Samhoon_Resume.pdf"
              className="button-secondary"
            >
              <FaFileDownload />
              <span>Download resume</span>
            </a>
          </div>
          <div className="hero-socials" aria-label="Profile links">
            <a href={contactDetails.github} target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub</a>
            <a href={contactDetails.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</a>
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
