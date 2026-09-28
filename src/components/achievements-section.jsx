import { achievements } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { Trophy, Award, Sparkles, ArrowUpRight } from 'lucide-react'
import { SectionReveal } from './section-reveal'

const icons = { Trophy, Award, Shield: Sparkles }

export function AchievementsSection() {
  return (
    <section id="achievements" className="scene-section awards-scene">
      <div className="scene-marker" aria-hidden="true"><span>06</span> Recognition</div>
      <SectionHeading eyebrow="Recognition" title="Proof of momentum." description="A few moments of teamwork, invention, and competitive problem-solving." />
      <div className="award-shelf">
        {achievements.map((item, index) => {
          const Icon = icons[item.icon] || Award
          return (
            <SectionReveal key={item.title} delay={index * .06}>
            <article className="award-frame">
              <span className="award-index">0{index + 1}</span>
              <div className="award-icon"><Icon /></div>
              <p>{item.badge}</p>
              <h3>{item.title}</h3>
              <span>{item.organization}</span>
              <p className="award-description">{item.description}</p>
              {item.image && <a href={item.image} target="_blank" rel="noreferrer">View certificate <ArrowUpRight /></a>}
            </article>
            </SectionReveal>
          )
        })}
      </div>
    </section>
  )
}
