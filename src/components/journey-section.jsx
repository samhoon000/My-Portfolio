import { practicalExposure } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'

export function JourneySection() {
  return (
    <section id="journey" className="py-14 sm:py-20 relative">
      <SectionHeading
        eyebrow="Learning Journey / Practical Exposure"
        title="Hands-on growth through continuous analytics practice"
        description="As an aspiring data analyst, I focus on practical project execution, deep database wrangling, and continuous skill refinement."
      />
      <div className="grid gap-3.5 sm:gap-4">
        {practicalExposure.map((item, idx) => (
          <div 
            key={item} 
            className="glass-card flex items-start gap-3.5 rounded-xl p-4 sm:p-5 border border-[#F5E3C8]/15 shadow-[0_4px_20px_rgba(15,9,7,0.45)] hover:border-terracotta/40 transition-all duration-200 hover:translate-x-1"
          >
            <div className="flex items-center justify-center h-6 w-6 rounded-md bg-terracotta/20 border border-terracotta/40 text-peach font-pixel text-[11px] font-bold shrink-0 mt-0.5 shadow-[0_0_8px_rgba(185,111,89,0.25)]">
              {idx + 1}
            </div>
            <p className="readable-text text-sm sm:text-base text-cream leading-relaxed font-sans">{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
