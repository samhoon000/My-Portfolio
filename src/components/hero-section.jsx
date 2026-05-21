import { useState, useEffect } from 'react'
import { heroStats } from '../data/portfolio-data'
import { useTypewriter } from '../hooks/use-typewriter'
import { useCountUp } from '../hooks/use-count-up'
import { FaGithub, FaFileDownload, FaEnvelope, FaProjectDiagram } from 'react-icons/fa'

function StatCard({ label, value }) {
  const count = useCountUp(value)
  return (
    <div className="glass-card rounded-xl p-4 shadow-card">
      <p className="text-xl font-bold text-textPrimary">{count}+</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-textPrimary">{label}</p>
    </div>
  )
}

function TerminalSkills() {
  const skills = [
    "> Loading technical skills...",
    "✓ Python for Data Analysis",
    "✓ SQL & Database Querying",
    "✓ Power BI Visualization",
    "✓ Data Cleaning & EDA",
    "✓ Machine Learning Basics",
    "✓ Pandas & NumPy",
    "✓ Git & GitHub"
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
      }, 5000)
      return () => clearTimeout(resetTimeout)
    }

    const currentFullText = skills[currentLineIdx]

    if (typedText.length < currentFullText.length) {
      const charTimeout = setTimeout(() => {
        setTypedText(currentFullText.slice(0, typedText.length + 1))
      }, 35)
      return () => clearTimeout(charTimeout)
    } else {
      const lineTimeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentFullText])
        setCurrentLineIdx((prev) => prev + 1)
        setTypedText('')
      }, 300)
      return () => clearTimeout(lineTimeout)
    }
  }, [currentLineIdx, typedText, skills])

  const renderLine = (lineText, key, isTyping = false) => {
    if (lineText.startsWith('>')) {
      return (
        <div key={key} className="font-mono text-xs sm:text-sm text-zinc-300 leading-normal min-h-[1.5rem] flex items-start">
          <div className="inline-block text-accent mr-2 font-bold select-none">&gt;</div>
          <div className="inline font-semibold text-zinc-300">
            {lineText.substring(1).trimStart()}
            {isTyping && <div className="inline-block w-1.5 h-3.5 bg-accent ml-1 animate-pulse align-middle" />}
          </div>
        </div>
      )
    }
    if (lineText.startsWith('✓')) {
      return (
        <div key={key} className="font-mono text-xs sm:text-sm text-zinc-100 leading-normal min-h-[1.5rem] flex items-start">
          <div className="inline-block text-emerald mr-2 font-bold select-none">✓</div>
          <div className="inline font-medium text-zinc-100">
            {lineText.substring(1).trimStart()}
            {isTyping && <div className="inline-block w-1.5 h-3.5 bg-accent ml-1 animate-pulse align-middle" />}
          </div>
        </div>
      )
    }
    return (
      <div key={key} className="font-mono text-xs sm:text-sm text-zinc-300 leading-normal min-h-[1.5rem] flex items-start">
        <div className="inline text-zinc-300">
          {lineText}
          {isTyping && <div className="inline-block w-1.5 h-3.5 bg-accent ml-1 animate-pulse align-middle" />}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="font-display text-lg font-bold text-textPrimary tracking-tight">Technical Toolkit</h3>
        <div className="font-sans text-xs text-white/60 mt-1">
          Technologies and tools I use to solve data problems.
        </div>
      </div>

      <div className="glass-card rounded-2xl bg-panelSoft overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.12)] border border-accent/20 hover:border-accent/40 transition-all duration-300">
        <div className="flex items-center justify-between px-4 py-3 bg-[#121212] border-b border-stroke/40">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-[11px] font-mono text-white/40 tracking-wider select-none pr-8">
            skills.sh
          </div>
          <div />
        </div>

        <div className="p-5 bg-[#0d0d0d] h-[260px] max-h-[260px] overflow-hidden flex flex-col justify-start gap-1.5 font-mono select-text text-left">
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
  const typed = useTypewriter('Building Data-Driven Solutions with Analytics & Machine Learning')

  return (
    <section id="home" className="relative py-20 sm:py-24">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div>
          <p className="readable-text mb-4 text-sm uppercase tracking-[0.28em] text-accent">AI & Data Science Undergraduate</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-textPrimary sm:text-6xl lg:text-7xl">Abdul Samhoon</h1>
          <h2 className="mt-4 min-h-[4.5rem] sm:min-h-[4rem] lg:min-h-[5.5rem] font-display text-xl font-semibold animated-gradient-text sm:text-2xl lg:text-3xl leading-snug lg:leading-normal">
            {typed}
            <span className="inline-block ml-1 animate-pulse text-accent">|</span>
          </h2>
          <p className="readable-text mt-6 max-w-xl text-base text-white/80 leading-relaxed">
            I specialize in transforming complex data into strategic business intelligence. Proficient in <strong>Python, SQL, Power BI,</strong> and <strong>Machine Learning</strong>, I focus on building analytical pipelines and models that drive real-world impact.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className="flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-base transition hover:-translate-y-0.5 hover:bg-accentSoft hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base">
              <FaProjectDiagram /> Explore Projects
            </a>
            <a href="/Abdul_Samhoon_Resume.pdf" download="Abdul_Samhoon_Resume.pdf" className="flex items-center gap-2 rounded-lg border border-stroke bg-panel px-6 py-3 text-sm font-semibold text-textPrimary transition hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base">
              <FaFileDownload /> Resume
            </a>
            <a href="https://github.com/samhoon000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-stroke bg-panel px-6 py-3 text-sm font-semibold text-textPrimary transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base">
              <FaGithub /> GitHub
            </a>
            <a href="#contact" className="flex items-center gap-2 rounded-lg border border-stroke bg-panel px-6 py-3 text-sm font-semibold text-textPrimary transition hover:-translate-y-0.5 hover:border-emerald-500 hover:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base">
              <FaEnvelope /> Contact
            </a>
          </div>
        </div>
        <div className="space-y-6 w-full mt-8 lg:mt-0">
          <TerminalSkills />
          <div className="grid grid-cols-3 gap-4">
            {heroStats.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
