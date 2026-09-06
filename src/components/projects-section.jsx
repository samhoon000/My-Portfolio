import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { FaTimes, FaGithub, FaArrowRight, FaEye } from 'react-icons/fa'

function ProjectActions({ project, onPreview }) {
  const route = project.title.includes('Food Nutrition')
    ? '/project/food-health'
    : project.title.includes('Instacart') ? '/project/instacart' : null

  return (
    <div className="project-actions">
      {route ? (
        <Link to={route} className="button-primary">Explore case study <FaArrowRight /></Link>
      ) : (
        <button type="button" className="button-primary" onClick={() => onPreview(project)}><FaEye /> View dashboard</button>
      )}
      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="button-secondary"><FaGithub /> GitHub</a>
    </div>
  )
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null)
  useEffect(() => {
    const close = (event) => event.key === 'Escape' && setSelectedProject(null)
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [])

  return (
    <section id="projects" className="scene-section gallery-scene">
      <div className="scene-marker" aria-hidden="true"><span>04</span> House gallery</div>
      <SectionHeading eyebrow="Selected work" title="The house specials" description="End-to-end analytics projects, framed around the decision each one helped make." />

      <div className="project-gallery">
        {projects.map((project, index) => (
          <article key={project.title} className={`project-frame ${index < 2 ? 'featured' : 'compact'}`}>
            <div className="project-image-wrap">
              <img src={project.images[0]} alt={`${project.title} dashboard`} loading="lazy" />
              <span>{index < 2 ? 'Featured special' : 'From the archive'}</span>
            </div>
            <div className="project-copy">
              <p className="project-number">No. {String(index + 1).padStart(2, '0')}</p>
              <h3>{project.title}</h3>
              <p>{project.result}</p>
              <div className="tool-line">{project.tools.slice(0, 5).map((tool) => <span key={tool}>{tool}</span>)}</div>
              <ProjectActions project={project} onPreview={setSelectedProject} />
            </div>
          </article>
        ))}
      </div>

      {selectedProject && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-label={`${selectedProject.title} dashboard preview`} onMouseDown={(e) => e.target === e.currentTarget && setSelectedProject(null)}>
          <div className="modal-frame pixel-corners">
            <div className="modal-heading">
              <div><span>Dashboard preview</span><h3>{selectedProject.title}</h3></div>
              <button type="button" onClick={() => setSelectedProject(null)} aria-label="Close preview"><FaTimes /></button>
            </div>
            <div className="modal-gallery">
              {selectedProject.images.map((image, index) => <img key={image} src={image} alt={`${selectedProject.title} preview ${index + 1}`} />)}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
