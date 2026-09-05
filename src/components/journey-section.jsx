import { practicalExposure } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { BiCoffee } from 'react-icons/bi'

export function JourneySection() {
  return (
    <section id="journey" className="relative z-10 py-12 sm:py-16">
      <SectionHeading
        eyebrow="Learning Journey"
        title="Practical Exposure & Growth"
        description="Hands-on execution, real-world analytical case studies, and continuous technical refinement."
      />
      <div className="grid gap-3.5">
        {practicalExposure.map((item, index) => (
          <div 
            key={index} 
            className="cafe-card pixel-corners flex items-center gap-3.5 rounded-xl p-4 backdrop-blur-md transition-all duration-200 hover:border-accent/40"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#4A2F25] border border-[#6B4535] text-[#E39A73]">
              <BiCoffee className="text-base" />
            </div>
            <p
              className="text-xs sm:text-sm font-sans font-medium leading-relaxed"
              style={{ color: '#FFF1D6' }}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
