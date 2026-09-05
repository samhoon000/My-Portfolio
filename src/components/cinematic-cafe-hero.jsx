import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
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
      className="relative z-10 flex min-h-screen w-full flex-col justify-between px-6 py-20 sm:px-12 md:px-16 lg:px-24"
    >
      {/* Top Tagline / Eyebrow */}
      <motion.div
        style={{
          opacity: heroOpacity,
          y: heroY,
        }}
        className="relative z-20 pt-6 pointer-events-auto"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E39A73]/40 bg-[#20130e]/90 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#FFF1D6] shadow-sm backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
          Data Analyst Intern @ Trinetro Labs
        </span>
      </motion.div>

      {/* Main Hero Information Card */}
      <motion.div
        style={{
          opacity: heroOpacity,
          y: heroY,
        }}
        className="relative z-20 my-auto max-w-xl py-8 pointer-events-auto"
      >
        <div className="cafe-card pixel-corners rounded-2xl p-6 sm:p-8 backdrop-blur-md">
          <p className="font-pixel text-xs uppercase tracking-[0.3em] text-[#E39A73]">
            Welcome to my portfolio
          </p>
          
          <h1 className="mt-2 font-pixel text-3xl font-bold tracking-tight text-[#FFF1D6] sm:text-5xl lg:text-6xl">
            Abdul Samhoon
          </h1>
          
          <p
            className="mt-2 font-pixel text-sm sm:text-base font-semibold"
            style={{ color: '#FFF1D6' }}
          >
            Data Analyst · Builder · Problem Solver
          </p>
          
          <p
            className="mt-4 font-sans text-sm sm:text-base leading-relaxed"
            style={{ color: '#FFF1D6' }}
          >
            Turning complex data into clear, strategic decisions. Transforming retail, market intelligence, and nutritional insights into interactive BI dashboards and ML models.
          </p>

          {/* Action Links */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={handleEnterCafe}
              type="button"
              className="group flex items-center gap-2 rounded-xl bg-[#E39A73] px-5 py-3 text-xs sm:text-sm font-bold text-[#2B1D18] shadow-lg shadow-[#E39A73]/25 transition-all duration-300 hover:bg-[#F0B08A] hover:shadow-[#E39A73]/40 focus:outline-none focus:ring-2 focus:ring-[#E39A73]"
            >
              <BiCoffee className="text-lg transition-transform group-hover:rotate-12" />
              <span>Enter Café</span>
            </button>

            <a
              href="/Abdul_Samhoon_Resume.pdf"
              download="Abdul_Samhoon_Resume.pdf"
              className="flex items-center gap-2 rounded-xl border border-[#6B4535] bg-[#3A241D]/90 px-4 py-3 text-xs sm:text-sm font-semibold text-[#FFF1D6] transition-all duration-300 hover:border-[#E39A73] hover:bg-[#4A2F25] hover:text-[#F0B08A]"
            >
              <FaFileDownload />
              <span>Resume</span>
            </a>

            <a
              href={contactDetails.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-[#6B4535] bg-[#3A241D]/90 px-4 py-3 text-xs sm:text-sm font-semibold text-[#FFF1D6] transition-all duration-300 hover:border-[#E39A73] hover:bg-[#4A2F25] hover:text-[#F0B08A]"
            >
              <FaGithub />
              <span>GitHub</span>
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 rounded-xl border border-[#6B4535] bg-[#3A241D]/90 px-4 py-3 text-xs sm:text-sm font-semibold text-[#FFF1D6] transition-all duration-300 hover:border-[#E39A73] hover:bg-[#4A2F25] hover:text-[#F0B08A]"
            >
              <FaEnvelope />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Scroll Down Prompt */}
      <motion.div
        style={{
          opacity: heroOpacity,
        }}
        className="relative z-20 flex items-center gap-2 text-xs font-pixel uppercase tracking-widest text-[#FFF1D6] pointer-events-auto"
      >
        <span className="animate-bounce">
          <FaChevronDown className="text-[#E39A73]" />
        </span>
        <span>SCROLL TO EXPLORE ↓</span>
      </motion.div>
    </section>
  )
}
