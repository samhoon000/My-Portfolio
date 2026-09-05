import { achievements } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { Trophy, Award, Shield, ArrowUpRight } from 'lucide-react'

const iconMap = {
  Trophy: Trophy,
  Award: Award,
  Shield: Shield
}

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Recognition"
        title="Achievements & Hackathons"
        description="Competitive milestones, hackathon awards, and technology innovation events."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => {
          const IconComponent = iconMap[achievement.icon] || Award

          return (
            <article
              key={achievement.title}
              className="cafe-card pixel-corners group flex flex-col justify-between rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                {/* Header Icon + Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4A2F25] border border-[#6B4535] text-[#E39A73] shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="rounded-full border border-[#E39A73]/30 bg-[#E39A73]/10 px-3 py-1 font-pixel text-[11px] font-bold uppercase tracking-wider text-[#E39A73]">
                    {achievement.badge}
                  </span>
                </div>

                <h3 className="font-pixel text-lg font-bold leading-snug text-[#FFF1D6] group-hover:text-[#F0B08A] transition-colors">
                  {achievement.title}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#E39A73]">
                  {achievement.organization}
                </p>

                <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-[#FFF1D6] font-sans">
                  {achievement.description}
                </p>
              </div>

              {achievement.image && (
                <div className="mt-6 pt-4 border-t border-stroke/50">
                  <a
                    href={achievement.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-pixel font-bold text-[#E39A73] transition-colors hover:text-[#FFF1D6]"
                  >
                    <span>View Certificate</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
