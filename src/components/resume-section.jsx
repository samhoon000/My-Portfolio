import { SectionHeading } from './section-heading'
import { FaFileDownload } from 'react-icons/fa'
import { BiCoffee } from 'react-icons/bi'

export function ResumeSection() {
  return (
    <section id="resume" className="relative z-10 py-12 sm:py-16">
      <SectionHeading
        eyebrow="Resume"
        title="Ready for Data Analyst Roles"
        description="A comprehensive summary of my analytics skills, practical internships, hackathons, and certifications."
      />
      <div className="cafe-card pixel-corners rounded-2xl p-8 text-center backdrop-blur-md">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4A2F25] border border-[#6B4535] text-[#E39A73] shadow-sm mb-4">
          <BiCoffee className="text-2xl" />
        </div>
        <h3 className="font-pixel text-2xl font-bold text-[#FFF1D6]">Download My Resume</h3>
        <p
          className="mx-auto mt-2 max-w-lg text-sm font-sans leading-relaxed"
          style={{ color: '#FFF1D6' }}
        >
          Details regarding my experience at Trinetro Labs, data analysis pipelines, and proven ML project results.
        </p>
        <a
          href="/Abdul_Samhoon_Resume.pdf"
          download="Abdul_Samhoon_Resume.pdf"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#E39A73] px-6 py-3.5 font-pixel text-xs font-bold text-[#2B1D18] shadow-lg shadow-[#E39A73]/20 transition-all duration-300 hover:bg-[#F0B08A] hover:shadow-[#E39A73]/40"
        >
          <FaFileDownload />
          <span>Download Resume (PDF)</span>
        </a>
      </div>
    </section>
  )
}
