import { SectionHeading } from './section-heading'
import { FaFileDownload } from 'react-icons/fa'

export function ResumeSection() {
  return (
    <section id="resume" className="py-14 sm:py-20 relative">
      <SectionHeading
        eyebrow="Resume"
        title="Ready for analytics internships & entry-level roles"
        description="A concise overview of my skills, analytical projects, coursework, and practical experience in business intelligence."
      />
      <div className="glass-card rounded-2xl p-8 sm:p-10 text-center border border-[#F5E3C8]/15 shadow-[0_12px_36px_rgba(15,9,7,0.65)]">
        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-ivory">Download My Resume</h3>
        <p className="readable-text mx-auto mt-3 max-w-xl text-sm sm:text-base text-cream leading-relaxed font-sans">
          Highlights my data analysis projects, technical toolkits (SQL, Python, Power BI), and real-world problem-solving experience.
        </p>
        <a 
          href="/Abdul_Samhoon_Resume.pdf" 
          download="Abdul_Samhoon_Resume.pdf" 
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-terracotta px-6 py-3 text-sm font-semibold text-base transition-all duration-200 hover:bg-accentHover hover:shadow-[0_0_25px_rgba(185,111,89,0.5)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-panelSoft"
        >
          <FaFileDownload />
          <span>Download Resume (PDF)</span>
        </a>
      </div>
    </section>
  )
}
