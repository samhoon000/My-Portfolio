import { achievements } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { Trophy, Award, Shield, ArrowUpRight } from 'lucide-react'

const iconMap = {
  Trophy: Trophy,
  Award: Award,
  Shield: Shield
}

const badgeStyles = {
  '2nd Place': 'bg-gold/15 text-goldSoft border-gold/30 shadow-[0_0_12px_rgba(229,169,60,0.2)]',
  '9th National Rank': 'bg-peach/15 text-peach border-peach/30 shadow-[0_0_12px_rgba(216,149,120,0.2)]',
  'Participant': 'bg-emerald/15 text-emeraldLight border-emerald/30 shadow-[0_0_12px_rgba(58,131,103,0.2)]'
}

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-14 sm:py-20 relative">
      <SectionHeading
        eyebrow="Recognition"
        title="Achievements & Hackathons"
        description="Recognition for innovation, analytical problem-solving, and rapid prototyping in competitive tech hackathons."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {achievements.map((achievement) => {
          const IconComponent = iconMap[achievement.icon] || Award
          const badgeClass = badgeStyles[achievement.badge] || 'bg-[#38241D] text-cream border-[#F5E3C8]/20'
          
          return (
            <article 
              key={achievement.title} 
              className="glass-card flex flex-col justify-between rounded-2xl p-6 border border-[#F5E3C8]/15 shadow-[0_12px_36px_rgba(15,9,7,0.65)] hover:border-terracotta/40 transition-all duration-300 hover:-translate-y-1.5 group"
            >
              <div>
                {/* Top section: circular background for icon, and badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-terracotta/15 border border-terracotta/30 text-peach group-hover:scale-105 group-hover:bg-terracotta/25 transition-all duration-300 shadow-[0_0_12px_rgba(185,111,89,0.2)]">
                    <IconComponent className="w-5 h-5 text-terracotta" />
                  </div>
                  <span className={`px-3 py-1 rounded-md text-[10px] font-pixel font-bold tracking-wider border uppercase ${badgeClass}`}>
                    {achievement.badge}
                  </span>
                </div>

                {/* Title and Organization */}
                <h3 className="text-lg font-bold font-display text-ivory group-hover:text-peach transition-colors duration-300 leading-snug">
                  {achievement.title}
                </h3>
                <div className="mt-1.5 text-xs font-mono font-medium text-warmMuted uppercase tracking-wider">
                  {achievement.organization}
                </div>

                {/* Description */}
                <p className="mt-4 text-xs sm:text-sm text-cream leading-relaxed font-sans">
                  {achievement.description}
                </p>
              </div>

              {/* Footer with action button */}
              {achievement.image && (
                <div className="mt-6 pt-4 border-t border-[#F5E3C8]/10">
                  <a
                    href={achievement.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-ivory bg-terracotta/20 border border-terracotta/40 rounded-lg hover:bg-terracotta hover:text-base shadow-sm hover:shadow-[0_0_15px_rgba(185,111,89,0.35)] transition-all duration-200"
                  >
                    <span>View Certificate</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
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
