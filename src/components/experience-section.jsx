import { experiences } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { FaGlobe, FaLinkedin } from 'react-icons/fa'

export function ExperienceSection() {
  return (
    <section id="experience" className="py-10 sm:py-12">
      <SectionHeading
        eyebrow="Experience"
        title="Professional Experience"
        description="Gaining hands-on industry experience and collaborating in real-world startup environments."
      />
      <div className="grid gap-6">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl bg-panelSoft p-6 border border-stroke shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-accent/30 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-textPrimary">{exp.role}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-sm">
                  <span className="font-semibold text-accent">{exp.company}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/60">{exp.location}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/60">{exp.period}</span>
                </div>
                
                {/* Company Links */}
                <div className="flex items-center gap-3 mt-3">
                  {exp.companyUrl && (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Company Website"
                      aria-label="Company Website"
                      className="text-white/60 hover:text-accent hover:scale-110 transition-all duration-300"
                    >
                      <FaGlobe className="w-4 h-4" />
                    </a>
                  )}
                  {exp.linkedinUrl && (
                    <a
                      href={exp.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                      aria-label="LinkedIn"
                      className="text-white/60 hover:text-accent hover:scale-110 transition-all duration-300"
                    >
                      <FaLinkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {exp.description.map((bullet, bulletIdx) => (
                <li key={bulletIdx} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <p className="readable-text text-sm text-white/90">{bullet}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
