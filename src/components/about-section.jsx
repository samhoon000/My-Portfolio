import { SectionHeading } from './section-heading'
import { FaLaptopCode, FaChartPie, FaChartLine } from 'react-icons/fa'
import { SectionReveal } from './section-reveal'

const details = [
  { label: 'Role', value: 'Data Analyst Intern', Icon: FaLaptopCode },
  { label: 'Education', value: 'B.E. in AI & Data Science', Icon: FaChartPie },
  { label: 'Focus', value: 'BI & Machine Learning', Icon: FaChartLine },
]

export function AboutSection() {
  return (
    <section id="about" className="scene-section about-scene">
      <div className="scene-marker" aria-hidden="true"><span>02</span> About</div>
      <SectionReveal className="about-layout">
        <SectionHeading
          eyebrow="Profile"
          title="Finding the signal inside the noise."
          description="AI & Data Science undergraduate and Data Analyst Intern, turning complicated questions into useful decisions."
        />
        <div className="profile-panel">
          <div className="panel-label"><span>Approach</span><span>01—03</span></div>
          <p className="profile-intro">
            I build clear analytical stories from messy, real-world data—using <strong>SQL</strong>, <strong>Python</strong>, <strong>Power BI</strong>, and <strong>machine learning</strong> to connect technical work with business impact.
          </p>
          <div className="profile-details">
            {details.map((detail) => (
              <div key={detail.label} className="data-cell">
                <detail.Icon aria-hidden="true" />
                <span>{detail.label}</span>
                <strong>{detail.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
