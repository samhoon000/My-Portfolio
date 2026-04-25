import { heroStats } from '../data/portfolio-data'
import { useTypewriter } from '../hooks/use-typewriter'
import { useCountUp } from '../hooks/use-count-up'

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
  const typed = useTypewriter('Turning Raw Data into Meaningful Insights')

  return (
    <section id="home" className="relative py-20 sm:py-24">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="readable-text mb-4 text-sm uppercase tracking-[0.28em] text-white">Aspiring Data Analyst</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-textPrimary sm:text-6xl">Abdul Samhoon</h1>
          <h2 className="mt-4 h-14 font-display text-2xl font-semibold animated-gradient-text sm:text-3xl">
            {typed}
            <span className="ml-1 animate-pulse text-accent">|</span>
          </h2>
          <p className="readable-text mt-6 max-w-xl text-base text-white">
            Fresher passionate about analytics, dashboards, and solving business problems with data-driven decisions.
            Focused on storytelling with data and delivering clear, actionable insights.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-base transition hover:-translate-y-0.5 hover:bg-accentSoft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base">
              View Projects
            </a>
            <a href="/Abdul_Samhoon_Resume.pdf" download="Abdul_Samhoon_Resume.pdf" className="rounded-lg border border-stroke bg-panel px-5 py-3 text-sm font-semibold text-textPrimary transition hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base">
              Download Resume
            </a>
            <a href="#contact" className="rounded-lg border border-stroke bg-panel px-5 py-3 text-sm font-semibold text-textPrimary transition hover:border-accentSoft hover:text-textPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base">
              Contact Me
            </a>
          </div>
        </div>
        <div className="space-y-4">
          <div className="glass-card rounded-2xl bg-panelSoft p-5 shadow-glow">
            <p className="readable-text text-xs uppercase tracking-[0.2em] text-white">Analytics Snapshot</p>
            <div className="mt-4 space-y-3">
              <div className="h-2 w-full rounded-full bg-base">
                <div className="h-full w-[86%] rounded-full bg-accent" />
              </div>
              <div className="h-2 w-full rounded-full bg-base">
                <div className="h-full w-[78%] rounded-full bg-emerald-400" />
              </div>
              <div className="h-2 w-full rounded-full bg-base">
                <div className="h-full w-[92%] rounded-full bg-textSecondary" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {heroStats.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
