import { skills } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'

export function SkillsSection() {
  return (
    <section id="skills" className="relative z-10 py-12 sm:py-16">
      <SectionHeading
        eyebrow="Technical Stack"
        title="Tools & Technologies"
        description="Comprehensive technical toolkit spanning SQL querying, Python data ecosystems, BI dashboards, and ML modeling."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(skills).map(([category, items]) => (
          <div 
            key={category} 
            className="pixel-corners rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 bg-[#2B1D18]/95 border border-[#6B4535] shadow-[0_16px_36px_rgba(10,5,3,0.6)]"
          >
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-[#6B4535]/60">
              <span className="h-2 w-2 rounded-none bg-[#E39A73]" />
              <h3 className="font-pixel text-lg font-bold text-[#FFF1D6]">{category}</h3>
            </div>
            
            <div className="flex flex-col gap-3">
              {items.map((skill) => {
                const Icon = skill.icon
                return (
                  <div 
                    key={skill.name} 
                    className="group flex items-center gap-3 rounded-xl p-2.5 transition-all duration-200 border border-[#6B4535]/60 bg-[#3A241D]/90 hover:border-[#E39A73]/70 hover:bg-[#4A2F25]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4A2F25] border border-[#6B4535] text-[#FFF1D6] group-hover:border-[#E39A73]/60 transition-colors shadow-sm">
                      <Icon className="text-xl text-[#FFF1D6]" />
                    </div>
                    <span className="text-sm font-medium text-[#FFF1D6] group-hover:text-[#FFF1D6] transition-colors font-sans">
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
