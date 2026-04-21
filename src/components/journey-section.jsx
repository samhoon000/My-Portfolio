import { practicalExposure } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'

export function JourneySection() {
  return (
    <section id="experience" className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Learning Journey / Practical Exposure"
        title="Hands-on growth through real analytics practice"
        description="As a fresher, I focus on practical project execution and continuous skill development."
      />
      <div className="grid gap-3">
        {practicalExposure.map((item) => (
          <div key={item} className="glass-card flex items-start gap-3 rounded-xl bg-panelSoft p-4">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" />
            <p className="readable-text text-sm text-white">{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
