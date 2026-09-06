import { achievements } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { Trophy, Award, Sparkles, ArrowUpRight } from 'lucide-react'

const icons = { Trophy, Award, Shield: Sparkles }

export function AchievementsSection() {
  return (
    <section id="achievements" className="scene-section awards-scene">
      <div className="scene-marker" aria-hidden="true"><span>05</span> Awards wall</div>
      <SectionHeading eyebrow="Recognition" title="Pinned on the café wall" description="A few moments of teamwork, invention, and competitive problem-solving." />
      <div className="award-shelf">
        {achievements.map((item, index) => {
          const Icon = icons[item.icon] || Award
          return (
            <article key={item.title} className={`award-frame tilt-${index + 1}`}>
              <span className="frame-pin" aria-hidden="true" />
              <div className="award-icon"><Icon /></div>
              <p>{item.badge}</p>
              <h3>{item.title}</h3>
              <span>{item.organization}</span>
              <p className="award-description">{item.description}</p>
              {item.image && <a href={item.image} target="_blank" rel="noreferrer">View certificate <ArrowUpRight /></a>}
            </article>
          )
        })}
      </div>
    </section>
  )
}
