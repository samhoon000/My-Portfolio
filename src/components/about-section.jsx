import { SectionHeading } from './section-heading'

export function AboutSection() {
  return (
    <section id="about" className="py-14 sm:py-20 relative">
      <SectionHeading
        eyebrow="About"
        title="Engineering data into strategic business insights"
        description="I am an AI & Data Science undergraduate focused on building robust analytical systems and machine learning solutions that drive measurable business value."
      />
      <div className="glass-card relative z-10 rounded-2xl p-6 sm:p-8 border border-[#F5E3C8]/15 shadow-[0_12px_36px_rgba(15,9,7,0.65)]">
        <p className="readable-text text-sm sm:text-base leading-relaxed text-cream font-sans">
          My expertise lies in extracting meaningful patterns from complex datasets and presenting them through intuitive dashboards and predictive models. With hands-on experience in <strong className="text-ivory font-semibold">SQL, Python, and BI tools</strong>, I thrive in hackathons and project environments that demand rapid problem-solving. I am currently gaining practical industry experience as a <strong className="text-ivory font-semibold">Data Analyst Intern at Trinetro Labs</strong>, working with data analytics and AI-powered business intelligence solutions. I am eager to apply my skills in data wrangling, feature engineering, and statistical modeling to solve real-world challenges.
        </p>
      </div>
    </section>
  )
}
