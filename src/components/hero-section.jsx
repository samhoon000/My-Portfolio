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

export function HeroSection() {
  const typed = useTypewriter('Building Data-Driven Solutions with Analytics & Machine Learning')

  return (
    <section id="home" className="relative py-20 sm:py-24">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div>
          <p className="readable-text mb-4 text-sm uppercase tracking-[0.28em] text-accent">AI & Data Science Undergraduate</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-textPrimary sm:text-6xl lg:text-7xl">Abdul Samhoon</h1>
          <h2 className="mt-4 h-20 sm:h-14 font-display text-xl font-semibold animated-gradient-text sm:text-2xl lg:text-3xl">
            {typed}
            <span className="ml-1 animate-pulse text-accent">|</span>
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
        <div className="space-y-6 hidden lg:block">
          <div className="glass-card rounded-2xl bg-panelSoft p-6 shadow-[0_0_30px_rgba(56,189,248,0.15)] border border-accent/20 hover:border-accent/40 transition-colors">
            <p className="readable-text text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">Core Competencies</p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-textPrimary mb-1">
                  <span>Data Analytics & Visualization</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-base overflow-hidden">
                  <div className="h-full w-[90%] rounded-full bg-gradient-to-r from-accent to-blue-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-textPrimary mb-1">
                  <span>Machine Learning</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-base overflow-hidden">
                  <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-textPrimary mb-1">
                  <span>Python & SQL</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-base overflow-hidden">
                  <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-purple-400 to-purple-600" />
                </div>
              </div>
            </div>
          </div>
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
