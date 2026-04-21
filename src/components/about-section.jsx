import { SectionHeading } from './section-heading'

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="About"
        title="Analytical mindset focused on business impact"
        description="I am a fresher with strong interest in analytics, dashboarding, and converting raw data into decisions that matter. My approach combines SQL, Python, and BI tools to solve practical business problems."
      />
      <div className="glass-card relative z-10 rounded-2xl bg-panelSoft p-6 text-white shadow-card sm:p-8">
        <p className="readable-text">
          I enjoy breaking down complex datasets, identifying patterns, and presenting insights in ways stakeholders can
          act on quickly. I am actively seeking internship and entry-level data analyst opportunities where I can contribute
          through disciplined analysis, problem solving, and data storytelling.
        </p>
      </div>
    </section>
  )
}
