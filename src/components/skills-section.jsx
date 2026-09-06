import { skills } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'

const menuGroups = [
  { name: 'Coffee bar', subtitle: 'Data & analytics', keys: ['Languages'], extras: ['Power BI'] },
  { name: 'Kitchen', subtitle: 'Models & processing', keys: ['Libraries'], extras: ['Data Cleaning', 'EDA'] },
  { name: 'House specials', subtitle: 'BI & delivery', keys: ['Analytics & BI', 'Development & Cloud'], extras: [] },
]

export function SkillsSection() {
  const allSkills = Object.values(skills).flat()
  return (
    <section id="skills" className="scene-section menu-scene">
      <div className="scene-marker" aria-hidden="true"><span>03</span> Counter menu</div>
      <SectionHeading eyebrow="Skills menu" title="What’s brewing" description="A focused toolkit for taking data from raw source to business-ready insight." align="center" />
      <div className="chalk-menu">
        <div className="menu-rule"><span>Abdul’s analytics café</span></div>
        <div className="grid gap-8 md:grid-cols-3">
          {menuGroups.map((group) => {
            const names = [...group.keys.flatMap((key) => skills[key] || []).map((item) => item.name), ...group.extras]
            const unique = [...new Set(names)].filter((name) => !(group.name === 'House specials' && ['Data Cleaning', 'EDA'].includes(name)))
            return (
              <div key={group.name} className="menu-column">
                <span>{group.subtitle}</span>
                <h3>{group.name}</h3>
                <ul>
                  {unique.slice(0, 7).map((name) => {
                    const item = allSkills.find((skill) => skill.name === name)
                    const Icon = item?.icon
                    return <li key={name}><span>{Icon && <Icon aria-hidden="true" />} {name}</span><i aria-hidden="true" /></li>
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
