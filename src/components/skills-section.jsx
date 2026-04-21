import { skills } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Skills"
        title="Core technical stack for analytics and dashboarding"
        description="Strong practical skills across SQL, Python ecosystem, BI dashboards, data cleaning, and visualization."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => {
          const Icon = skill.icon
          return (
            <div key={skill.name} className="glass-card group rounded-xl bg-panelSoft p-5 transition hover:-translate-y-1 hover:border-accent">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-lg bg-base p-2 text-accent">
                  <Icon />
                </div>
                <span className="text-xs text-textPrimary">{skill.level}%</span>
              </div>
              <h3 className="text-sm font-semibold text-textPrimary">{skill.name}</h3>
              <div className="mt-3 h-1.5 w-full rounded-full bg-base">
                <div className="h-full rounded-full bg-gradient-to-r from-accent to-accentSoft" style={{ width: `${skill.level}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
