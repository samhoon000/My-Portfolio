import { skills } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'

export function SkillsSection() {
  return (
    <section id="skills" className="py-14 sm:py-20 relative">
      <SectionHeading
        eyebrow="Skills"
        title="Core technical stack for analytics & machine learning"
        description="Practical expertise across SQL databases, Python data pipelines, Power BI business intelligence, data modeling, and machine learning."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(skills).map(([category, items]) => (
          <div 
            key={category} 
            className="glass-card rounded-2xl p-6 border border-[#F5E3C8]/15 shadow-[0_12px_36px_rgba(15,9,7,0.65)] hover:border-terracotta/40 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#F5E3C8]/10">
              <h3 className="text-base font-bold font-display text-ivory tracking-wide">{category}</h3>
              <span className="text-[10px] font-pixel text-peach bg-terracotta/15 px-2 py-0.5 rounded border border-terracotta/30">
                {items.length} tools
              </span>
            </div>
            
            <div className="flex flex-col gap-2.5">
              {items.map((skill) => {
                const Icon = skill.icon
                return (
                  <div 
                    key={skill.name} 
                    className="group/item flex items-center gap-3 p-2.5 rounded-xl bg-[#231713]/60 border border-[#F5E3C8]/10 transition-all duration-200 hover:bg-terracotta/20 hover:border-terracotta/40 hover:translate-x-1"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#38241D] text-peach border border-terracotta/30 group-hover/item:text-ivory group-hover/item:border-terracotta group-hover/item:bg-terracotta shadow-sm transition-all duration-200">
                      <Icon className="text-sm" />
                    </div>
                    <span className="text-sm font-medium text-cream group-hover/item:text-ivory transition-colors">
                      {skill.name}
                    </span>
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
