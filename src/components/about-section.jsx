import { useRef } from 'react'
import { BriefcaseBusiness, GraduationCap, ChartNoAxesCombined } from 'lucide-react'
import { SectionReveal } from './section-reveal'

const details = [
  { label: 'ROLE', value: 'Data Analyst Intern', Icon: BriefcaseBusiness },
  { label: 'EDUCATION', value: 'B.E. in AI & Data Science', Icon: GraduationCap },
  { label: 'FOCUS', value: 'BI & Machine Learning', Icon: ChartNoAxesCombined },
]

export function AboutSection() {
  const cardRef = useRef(null)
  const frameRef = useRef(null)

  const handlePointerMove = (event) => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(hover: none), (pointer: coarse)').matches
    ) return

    const card = cardRef.current
    if (!card) return

    const bounds = card.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height

    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      card.style.setProperty('--card-rotate-x', `${(0.5 - y) * 5}deg`)
      card.style.setProperty('--card-rotate-y', `${(x - 0.5) * 6}deg`)
      card.style.setProperty('--light-x', `${x * 100}%`)
      card.style.setProperty('--light-y', `${y * 100}%`)
    })
  }

  const handlePointerLeave = () => {
    const card = cardRef.current
    if (!card) return

    card.style.setProperty('--card-rotate-x', '0deg')
    card.style.setProperty('--card-rotate-y', '0deg')
    card.style.setProperty('--light-x', '50%')
    card.style.setProperty('--light-y', '0%')
  }

  return (
    <section id="about" className="scene-section about-scene">
      <SectionReveal className="about-layout">
        <div className="about-profile">
          <p className="about-eyebrow">PROFILE</p>
          <h2>Finding the signal inside the noise.</h2>
          <p className="about-description">
            AI &amp; Data Science undergraduate and Data Analyst Intern, turning complicated questions into useful decisions.
          </p>
        </div>
        <div className="profile-panel">
          <div className="panel-label"><span>APPROACH</span><span>01—03</span></div>
          <p className="profile-intro">
            I build clear analytical stories from messy, real-world data—using SQL, Python, Power BI, and machine learning to connect technical work with business impact.
          </p>
          <div className="profile-card-stage">
            <div
              ref={cardRef}
              className="profile-details"
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
            >
              {details.map((detail) => (
                <div key={detail.label} className="data-cell">
                  <detail.Icon aria-hidden="true" strokeWidth={1.35} />
                  <span>{detail.label}</span>
                  <strong>{detail.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
