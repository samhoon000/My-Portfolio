import { useState, useEffect } from 'react'
import { heroStats } from '../data/portfolio-data'
import { useTypewriter } from '../hooks/use-typewriter'
import { useCountUp } from '../hooks/use-count-up'
import { FaGithub, FaFileDownload, FaEnvelope, FaProjectDiagram } from 'react-icons/fa'
import { ChevronDown } from 'lucide-react'

function StatCard({ label, value }) {
  const count = useCountUp(value)
  return (
    <div className="glass-card rounded-xl p-3.5 border border-[#F5E3C8]/10 text-center transition-all duration-300 hover:border-terracotta/40 hover:-translate-y-1">
      <p className="text-2xl font-bold font-display text-ivory drop-shadow-[0_0_10px_rgba(185,111,89,0.35)]">{count}+</p>
      <p className="mt-1 text-[10px] uppercase tracking-wider text-warmMuted font-medium">{label}</p>
    </div>
  )
}

function TerminalSkills() {
  const skills = [
    "> Initializing analytics toolkit...",
    "✓ Python & Pandas Data Pipelines",
    "✓ SQL Database Querying & Modeling",
    "✓ Power BI Interactive Dashboards",
    "✓ Exploratory Data Analysis & KPIs",
    "✓ Machine Learning (Supervised)",
    "✓ Git Version Control & GitHub",
  ]

  const [displayedLines, setDisplayedLines] = useState([])
  const [currentLineIdx, setCurrentLineIdx] = useState(0)
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    if (currentLineIdx >= skills.length) {
      const resetTimeout = setTimeout(() => {
        setDisplayedLines([])
        setCurrentLineIdx(0)
        setTypedText('')
      }, 6000)
      return () => clearTimeout(resetTimeout)
    }

    const currentFullText = skills[currentLineIdx]

    if (typedText.length < currentFullText.length) {
      const charTimeout = setTimeout(() => {
        setTypedText(currentFullText.slice(0, typedText.length + 1))
      }, 30)
      return () => clearTimeout(charTimeout)
    } else {
      const lineTimeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentFullText])
        setCurrentLineIdx((prev) => prev + 1)
        setTypedText('')
      }, 250)
      return () => clearTimeout(lineTimeout)
    }
  }, [currentLineIdx, typedText, skills])

  const renderLine = (lineText, key, isTyping = false) => {
    if (lineText.startsWith('>')) {
      return (
        <div key={key} className="font-mono text-xs sm:text-sm text-peach leading-normal min-h-[1.4rem] flex items-start">
          <div className="inline-block text-terracotta mr-2 font-bold select-none">&gt;</div>
          <div className="inline font-semibold text-peach">
            {lineText.substring(1).trimStart()}
            {isTyping && <div className="inline-block w-1.5 h-3.5 bg-terracotta ml-1 animate-pulse align-middle" />}
          </div>
        </div>
      )
    }
    if (lineText.startsWith('✓')) {
      return (
        <div key={key} className="font-mono text-xs sm:text-sm text-emeraldLight leading-normal min-h-[1.4rem] flex items-start">
          <div className="inline-block text-emeraldLight mr-2 font-bold select-none">✓</div>
          <div className="inline font-medium text-ivory">
            {lineText.substring(1).trimStart()}
            {isTyping && <div className="inline-block w-1.5 h-3.5 bg-terracotta ml-1 animate-pulse align-middle" />}
          </div>
        </div>
      )
    }
    return (
      <div key={key} className="font-mono text-xs sm:text-sm text-cream leading-normal min-h-[1.4rem] flex items-start">
        <div className="inline text-cream">
          {lineText}
          {isTyping && <div className="inline-block w-1.5 h-3.5 bg-terracotta ml-1 animate-pulse align-middle" />}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-2.5 flex items-center justify-between">
        <h3 className="font-display text-sm font-bold text-ivory tracking-wide flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
          Technical Toolkit
        </h3>
        <span className="text-[10px] font-mono text-peach/80">skills.sh</span>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-[#F5E3C8]/15 shadow-[0_8px_30px_rgba(15,9,7,0.7),0_0_20px_rgba(185,111,89,0.1)] hover:border-terracotta/40 transition-all duration-300">
        <div className="flex items-center justify-between px-4 py-2 bg-[#231713]/90 border-b border-[#F5E3C8]/10">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#B96F59]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5A93C]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#3A8367]" />
          </div>
          <div className="text-[10px] font-mono text-warmMuted tracking-wider select-none">
            data-analyst@workspace: ~
          </div>
          <div />
        </div>

        <div className="p-4 bg-[#1B120E]/90 h-[225px] max-h-[225px] overflow-hidden flex flex-col justify-start gap-1 font-mono select-text text-left">
          {displayedLines.map((line, idx) => {
            const isLastLineAndFinished = currentLineIdx >= skills.length && idx === skills.length - 1
            return renderLine(line, `line-${idx}`, isLastLineAndFinished)
          })}
          {currentLineIdx < skills.length && renderLine(typedText, 'line-current', true)}
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const typed = useTypewriter('Turning data into decisions through analytics & machine learning')

  return (
    <section id="home" className="relative pt-16 pb-14 sm:pt-24 sm:pb-20">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div>
          {/* Eyebrow Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-terracotta/40 bg-terracotta/15 px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-peach shadow-[0_0_15px_rgba(185,111,89,0.2)]">
            <span className="h-2 w-2 rounded-full bg-terracotta animate-ping" />
            <span>Data Analyst Intern @ Trinetro Labs • Final-Year AI & Data Science</span>
          </div>

          <h1 className="font-display text-4xl font-extrabold tracking-tight text-ivory sm:text-6xl lg:text-7xl drop-shadow-[0_4px_16px_rgba(15,9,7,0.85)]">
            Abdul Samhoon
          </h1>

          <p className="mt-2 font-pixel text-xs sm:text-sm tracking-wider text-peach font-medium">
            Data Analyst · Builder · Problem Solver
          </p>

          <h2 className="mt-4 min-h-[4rem] sm:min-h-[3.5rem] lg:min-h-[4.5rem] font-display text-xl font-semibold animated-gradient-text sm:text-2xl lg:text-3xl leading-snug lg:leading-normal">
            {typed}
            <span className="inline-block ml-1 animate-pulse text-terracotta">|</span>
          </h2>

          <div className="glass-card mt-3 rounded-xl p-4 sm:p-5 border border-[#F5E3C8]/10 shadow-lg">
            <p className="readable-text text-sm sm:text-base text-cream leading-relaxed font-sans">
              I specialize in transforming raw data into strategic business intelligence. Currently working as a <strong className="text-ivory font-semibold">Data Analyst Intern at Trinetro Labs</strong> and pursuing my final year in <strong className="text-ivory font-semibold">AI & Data Science</strong>, I build analytical pipelines, SQL data models, and dashboards that drive measurable impact.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <a 
              href="#projects" 
              className="flex items-center gap-2 rounded-lg bg-terracotta px-5 py-2.5 text-sm font-semibold text-base transition-all duration-200 hover:-translate-y-0.5 hover:bg-accentHover hover:shadow-[0_0_20px_rgba(185,111,89,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              <FaProjectDiagram /> Explore Projects
            </a>
            <a 
              href="/Abdul_Samhoon_Resume.pdf" 
              download="Abdul_Samhoon_Resume.pdf" 
              className="flex items-center gap-2 rounded-lg border border-[#F5E3C8]/15 bg-[#2B1D18]/80 px-5 py-2.5 text-sm font-semibold text-ivory transition-all duration-200 hover:-translate-y-0.5 hover:border-terracotta hover:bg-terracotta/20 hover:shadow-[0_0_15px_rgba(185,111,89,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              <FaFileDownload /> Resume
            </a>
            <a 
              href="https://github.com/samhoon000" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 rounded-lg border border-[#F5E3C8]/15 bg-[#2B1D18]/80 px-5 py-2.5 text-sm font-semibold text-ivory transition-all duration-200 hover:-translate-y-0.5 hover:border-peach hover:bg-peach/15 hover:shadow-[0_0_15px_rgba(216,149,120,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              <FaGithub /> GitHub
            </a>
            <a 
              href="#contact" 
              className="flex items-center gap-2 rounded-lg border border-[#F5E3C8]/15 bg-[#2B1D18]/80 px-5 py-2.5 text-sm font-semibold text-ivory transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald hover:bg-emerald/20 hover:shadow-[0_0_15px_rgba(58,131,103,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              <FaEnvelope /> Contact
            </a>
          </div>
        </div>

        {/* Right Side: Terminal and Stats */}
        <div className="space-y-5 w-full mt-4 lg:mt-0">
          <TerminalSkills />
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {heroStats.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </div>

      {/* Gentle Scroll Hint */}
      <div className="mt-14 hidden sm:flex flex-col items-center justify-center text-center opacity-85 hover:opacity-100 transition-opacity">
        <span className="font-pixel text-xs text-peach tracking-widest uppercase">Scroll to explore the café & discover my work ↓</span>
        <ChevronDown className="w-5 h-5 text-terracotta animate-bounce mt-1" />
      </div>
    </section>
  )
}
