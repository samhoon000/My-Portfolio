import { achievements } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { FaExternalLinkAlt } from 'react-icons/fa'

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-10 sm:py-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Achievements & Hackathons"
          title="Competitive programming and innovation"
          description="Proven ability to build AI and data solutions under pressure, collaborating with teams in high-stakes environments."
        />

        <div className="max-w-4xl mx-auto space-y-6">
          {achievements.map((achievement, index) => (
            <article 
              key={achievement.title} 
              className="glass-card flex flex-col sm:flex-row gap-6 rounded-2xl bg-panelSoft/50 backdrop-blur-sm p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 border border-white/5 hover:border-accent/30 shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] group"
            >
              <div className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-2xl bg-base border border-stroke text-4xl group-hover:scale-110 transition-transform duration-500">
                {achievement.icon}
              </div>
              
              <div className="flex flex-col flex-grow justify-center">
                <h3 className="text-xl font-bold leading-tight text-textPrimary group-hover:text-accent transition-colors">
                  {achievement.title}
                </h3>
                <div className="mt-2 text-sm font-medium text-accent">
                  {achievement.organization}
                </div>
                <p className="mt-3 text-sm text-white/80 leading-relaxed">
                  {achievement.description}
                </p>
                {achievement.image && (
                  <div className="mt-5">
                    <a
                      href={achievement.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/70 bg-white/5 border border-white/10 rounded-lg hover:text-accent hover:bg-accent/10 hover:border-accent/30 transition-all duration-300"
                    >
                      <span>View Certificate</span>
                      <FaExternalLinkAlt className="w-3 h-3 opacity-70" />
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
