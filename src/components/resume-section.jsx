import { SectionHeading } from './section-heading'

export function ResumeSection() {
  return (
    <section id="resume" className="py-10 sm:py-12">
      <SectionHeading
        eyebrow="Resume"
        title="Ready for internships and entry-level analyst roles"
        description="“A concise overview of my skills, projects, and achievements in data analysis."
      />
      <div className="glass-card rounded-2xl bg-panelSoft p-7 text-center">
        <h3 className="font-display text-2xl font-semibold text-textPrimary">Download My Resume</h3>
        <p className="readable-text mx-auto mt-3 max-w-xl text-sm text-white">
          Highlights my data analysis projects, technical skills, and real-world problem-solving experience.
        </p>
        <a href="/Abdul_Samhoon_Resume.pdf" download="Abdul_Samhoon_Resume.pdf" className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-base transition hover:bg-accentSoft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panelSoft">
          Download Resume
        </a>
      </div>
    </section>
  )
}
