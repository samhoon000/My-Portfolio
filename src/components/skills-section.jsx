import { motion as Motion, useReducedMotion } from 'framer-motion'
import { Blocks, ChartNoAxesCombined, Rows3 } from 'lucide-react'
import { skills } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'

const conceptIcons = {
  'Data Cleaning': Rows3,
  EDA: ChartNoAxesCombined,
  'Feature Engineering': Blocks,
}

const particles = Array.from({ length: 6 })

function SkillObject({ skill, index, cardIndex, reduceMotion }) {
  const ConceptIcon = conceptIcons[skill.name]

  return (
    <Motion.li
      className={`skill-object skill-object-${index + 1}`}
      style={{ '--object-index': index }}
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: 0.12 + cardIndex * 0.08 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      tabIndex={0}
      aria-label={`${skill.name}: ${skill.description}`}
    >
      <span className="skill-object-glow" aria-hidden="true" />
      <span className={`skill-object-icon ${ConceptIcon ? 'is-concept' : ''}`} aria-hidden="true">
        {ConceptIcon ? (
          <ConceptIcon strokeWidth={1.35} />
        ) : (
          <img src={skill.logo} alt="" loading="lazy" decoding="async" />
        )}
      </span>
      <span className="skill-object-name">{skill.name}</span>
      <span className="skill-object-detail" role="tooltip">{skill.description}</span>
    </Motion.li>
  )
}

function SkillCard({ group, items, index, reduceMotion }) {
  const slug = group.toLowerCase().replaceAll('&', 'and').replaceAll(' ', '-')

  const handlePointerMove = (event) => {
    if (reduceMotion) return
    const card = event.currentTarget
    const bounds = card.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    card.style.setProperty('--card-rx', `${-y * 4}deg`)
    card.style.setProperty('--card-ry', `${x * 5}deg`)
    card.style.setProperty('--pointer-x', `${(x + 0.5) * 100}%`)
    card.style.setProperty('--pointer-y', `${(y + 0.5) * 100}%`)
  }

  const resetTilt = (event) => {
    event.currentTarget.style.setProperty('--card-rx', '0deg')
    event.currentTarget.style.setProperty('--card-ry', '0deg')
    event.currentTarget.style.setProperty('--pointer-x', '50%')
    event.currentTarget.style.setProperty('--pointer-y', '45%')
  }

  return (
    <Motion.article
      className={`skill-card skill-card--${slug}`}
      initial={reduceMotion ? false : { opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="skill-card-surface">
        <div className="skill-card-grid" aria-hidden="true" />
        <div className="skill-card-light" aria-hidden="true" />
        <div className="skill-particles" aria-hidden="true">
          {particles.map((_, particleIndex) => (
            <i key={particleIndex} style={{ '--particle-index': particleIndex }} />
          ))}
        </div>
        <header className="skill-card-header">
          <span className="skill-card-index">0{index + 1}</span>
          <span className="skill-card-kicker">TECH ECOSYSTEM</span>
          <h3>{group}</h3>
          <span className="skill-card-count">{String(items.length).padStart(2, '0')} OBJECTS</span>
        </header>
        {index === 3 && (
          <div className="skill-connections" aria-hidden="true">
            <span className="connection connection-one" />
            <span className="connection connection-two" />
            <span className="connection connection-three" />
          </div>
        )}
        <ul className="skill-object-field">
          {items.map((skill, skillIndex) => (
            <SkillObject key={skill.name} skill={skill} index={skillIndex} cardIndex={index} reduceMotion={reduceMotion} />
          ))}
        </ul>
        <div className="skill-card-floor" aria-hidden="true" />
      </div>
    </Motion.article>
  )
}

export function SkillsSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="skills" className="scene-section skills-scene">
      <div className="scene-marker" aria-hidden="true"><span>05</span> Capabilities</div>
      <SectionHeading
        eyebrow="Technical toolkit"
        title="A connected technical ecosystem."
        description="The languages, analytical tools, and development systems I use to turn raw data into decisions."
      />
      <div className="skill-ecosystem" aria-label="Technical skills by category">
        {Object.entries(skills).map(([group, items], index) => (
          <SkillCard key={group} group={group} items={items} index={index} reduceMotion={reduceMotion} />
        ))}
      </div>
    </section>
  )
}
