import { skills } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'

export function SkillsSection() {
  return (
    <section id="skills" className="py-10 sm:py-12">
      <SectionHeading
        eyebrow="Skills"
        title="Core technical stack for analytics and machine learning"
        description="Strong practical skills across SQL, Python ecosystem, BI dashboards, data engineering, and machine learning."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="glass-card rounded-2xl bg-panelSoft p-6 border border-stroke shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-accent/30 transition-colors">
            <h3 className="text-lg font-bold text-textPrimary mb-6 pb-2 border-b border-stroke/50">{category}</h3>
            <div className="flex flex-col gap-4">
              {items.map((skill) => {
                const Icon = skill.icon
                return (
                  <div key={skill.name} className="group flex items-center gap-3 transition-transform hover:translate-x-1">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-base text-accent group-hover:bg-accent/10 group-hover:text-accentSoft transition-colors shadow-sm">
                      <Icon className="text-lg" />
                    </div>
                    <span className="text-sm font-semibold text-textPrimary group-hover:text-white transition-colors">{skill.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
