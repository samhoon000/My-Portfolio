import { achievements } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { Trophy, Award, Shield, ArrowUpRight } from 'lucide-react'

const iconMap = {
  Trophy: Trophy,
  Award: Award,
  Shield: Shield
}

const badgeStyles = {
  '2nd Place': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  '9th National Rank': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  'Participant': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
}

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Recognition"
          title="Achievements & Hackathons"
          description="Recognition for innovation, technical excellence, and problem-solving through hackathons and competitive technology events."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch max-w-6xl mx-auto mt-10">
          {achievements.map((achievement) => {
            const IconComponent = iconMap[achievement.icon] || Award
            const badgeClass = badgeStyles[achievement.badge] || 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
            
            return (
              <article 
                key={achievement.title} 
                className="glass-card flex flex-col justify-between rounded-2xl bg-panelSoft/50 backdrop-blur-sm p-6 border border-white/5 hover:border-accent/30 shadow-[0_12px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_0_30px_rgba(56,189,248,0.12)] transition-all duration-300 hover:-translate-y-1.5 group"
              >
                <div>
                  {/* Top section: circular background for icon, and badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent/10 border border-accent/20 text-accent group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
                      <IconComponent className="w-5.5 h-5.5" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider border uppercase ${badgeClass}`}>
                      {achievement.badge}
                    </span>
                  </div>

                  {/* Title and Organization */}
                  <h3 className="text-lg font-bold leading-snug text-textPrimary group-hover:text-accent transition-colors duration-300">
                    {achievement.title}
                  </h3>
                  <div className="mt-1.5 text-xs font-semibold text-textMuted uppercase tracking-wider">
                    {achievement.organization}
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-xs text-textSecondary leading-relaxed font-sans">
                    {achievement.description}
                  </p>
                </div>

                {/* Footer with action button */}
                {achievement.image && (
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <a
                      href={achievement.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-semibold text-accent bg-accent/10 border border-accent/25 rounded-lg hover:bg-accent hover:text-base shadow-sm hover:shadow-[0_0_12px_rgba(56,189,248,0.25)] transition-all duration-300"
                    >
                      <span>View Certificate</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
