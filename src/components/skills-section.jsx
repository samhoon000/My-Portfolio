import { useState } from 'react'
import { skills } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { SectionReveal } from './section-reveal'

export function SkillsSection() {
  const groups = Object.entries(skills)
  const [activeGroup, setActiveGroup] = useState(groups[0][0])

  return (
    <section id="skills" className="scene-section skills-scene">
      <div className="scene-marker" aria-hidden="true"><span>05</span> Capabilities</div>
      <SectionHeading eyebrow="Technical toolkit" title="One connected practice." description="A focused toolkit for taking data from raw source to business-ready insight." />
      <SectionReveal className="skill-ecosystem">
        <div className="skill-orbit" aria-hidden="true">
          <div className="orbit-ring orbit-one" />
          <div className="orbit-ring orbit-two" />
          <div className="orbit-core"><small>Focus</small><strong>{activeGroup}</strong></div>
          {groups.map(([group], index) => (
            <button key={group} type="button" className={`orbit-node orbit-node-${index + 1} ${activeGroup === group ? 'is-active' : ''}`} tabIndex={-1}>0{index + 1}</button>
          ))}
        </div>
        <div className="skill-groups">
          {groups.map(([group, items], index) => (
            <button key={group} type="button" className={`skill-group ${activeGroup === group ? 'is-active' : ''}`} onMouseEnter={() => setActiveGroup(group)} onFocus={() => setActiveGroup(group)} onClick={() => setActiveGroup(group)} aria-pressed={activeGroup === group}>
              <span>0{index + 1}</span>
              <div><h3>{group}</h3><p>{items.map((item) => item.name).join(' · ')}</p></div>
            </button>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}
