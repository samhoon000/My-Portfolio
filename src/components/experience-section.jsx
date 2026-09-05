import { experiences } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { FaGlobe, FaLinkedin, FaBriefcase } from 'react-icons/fa'

export function ExperienceSection() {
  return (
    <section id="experience" className="relative z-10 py-12 sm:py-16">
      <SectionHeading
        eyebrow="Experience"
        title="Professional Experience"
        description="Hands-on industry experience building analytics solutions and collaborating in fast-paced startup environments."
      />
      <div className="grid gap-6">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="cafe-card pixel-corners rounded-2xl p-6 sm:p-8 backdrop-blur-md"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E39A73]/20 border border-[#E39A73]/30 text-[#E39A73] shadow-sm">
                  <FaBriefcase className="text-xl" />
                </div>
                <div>
                  <h3 className="font-pixel text-xl sm:text-2xl font-bold text-[#FFF1D6]">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs sm:text-sm">
                    <span className="font-semibold text-[#E39A73]">{exp.company}</span>
                    <span className="text-[#FFF1D6]">•</span>
                    <span className="text-[#FFF1D6]">{exp.location}</span>
                    <span className="text-[#FFF1D6]">•</span>
                    <span className="rounded-full bg-[#E39A73]/15 px-2.5 py-0.5 text-xs font-medium text-[#FFF1D6] border border-[#E39A73]/25">
                      {exp.period}
                    </span>
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
                        className="flex items-center gap-1.5 text-xs text-[#FFF1D6] hover:text-[#E39A73] transition-colors"
                      >
                        <FaGlobe className="w-3.5 h-3.5" />
                        <span>Website</span>
                      </a>
                    )}
                    {exp.linkedinUrl && (
                      <a
                        href={exp.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn Profile"
                        aria-label="LinkedIn Profile"
                        className="flex items-center gap-1.5 text-xs text-[#FFF1D6] hover:text-[#E39A73] transition-colors"
                      >
                        <FaLinkedin className="w-3.5 h-3.5" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <ul className="mt-6 space-y-3 border-t border-[#6B4535]/50 pt-5">
              {exp.description.map((bullet, bulletIdx) => (
                <li key={bulletIdx} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-none bg-[#E39A73]" />
                  <p
                    className="text-sm sm:text-base font-sans leading-relaxed"
                    style={{ color: '#FFF1D6' }}
                  >
                    {bullet}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
