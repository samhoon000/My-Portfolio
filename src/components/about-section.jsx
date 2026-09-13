import { SectionHeading } from './section-heading'
import { BiCoffeeTogo } from 'react-icons/bi'
import { FaLaptopCode, FaChartPie } from 'react-icons/fa'

const details = [
  { label: 'Role', value: 'Data Analyst Intern', Icon: FaLaptopCode },
  { label: 'Education', value: 'B.E. in AI & Data Science', Icon: FaChartPie },
  { label: 'Focus', value: 'BI & Machine Learning', Icon: BiCoffeeTogo },
]

export function AboutSection() {
  return (
    <section id="about" className="scene-section about-scene">
      <div className="scene-marker" aria-hidden="true"><span>01</span> Profile overview</div>
      <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <SectionHeading
          eyebrow="About me"
          title="Engineering data into strategic business insights."
          description="AI & Data Science undergraduate and Data Analyst Intern, turning complicated questions into useful decisions."
        />
        <div className="wood-panel pixel-corners p-6 sm:p-8">
          <p className="text-lg leading-relaxed text-cream">
            I build clear analytical stories from messy, real-world data—using <strong>SQL</strong>, <strong>Python</strong>, <strong>Power BI</strong>, and <strong>machine learning</strong> to connect technical work with business impact.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {details.map((detail) => (
              <div key={detail.label} className="table-sign">
                <detail.Icon aria-hidden="true" />
                <span>{detail.label}</span>
                <strong>{detail.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
