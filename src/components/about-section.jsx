import { SectionHeading } from './section-heading'

export function AboutSection() {
  return (
    <section id="about" className="py-10 sm:py-12">
      <SectionHeading
        eyebrow="About"
        title="Engineering data into strategic insights"
        description="I am an AI & Data Science undergraduate focused on building robust analytical systems and machine learning solutions that drive measurable business value."
      />
      <div className="glass-card relative z-10 rounded-2xl bg-panelSoft p-6 text-white shadow-card sm:p-8 border border-accent/10">
        <p className="readable-text text-base leading-relaxed text-white/90">
          My expertise lies in extracting meaningful patterns from complex datasets and presenting them through intuitive dashboards and predictive models. With hands-on experience in <strong>SQL, Python, and BI tools</strong>, I thrive in hackathons and project environments that demand rapid problem-solving. I am currently seeking data science and analytics opportunities where I can apply my skills in data wrangling, feature engineering, and statistical modeling to solve real-world challenges.
        </p>
      </div>
    </section>
  )
}
