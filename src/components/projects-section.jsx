import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { FaTimes } from 'react-icons/fa'

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null)

  const openModal = (project) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="py-10 sm:py-12">
      <SectionHeading
        eyebrow="Projects"
        title="Case-study style analytics projects"
        description="Each project demonstrates business context, analytical workflow, and the decision-level insights delivered."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className={`glass-card rounded-2xl bg-panelSoft p-6 shadow-card transition hover:-translate-y-1 ${project.themeClasses?.cardHover || 'hover:border-accent'}`}
          >
            <div className="mb-4 rounded-xl border border-stroke bg-gradient-to-br from-panel to-base p-5">
              <p className="readable-text text-xs uppercase tracking-wider text-white">Project Preview</p>
              <p className="mt-2 font-display text-xl text-textPrimary">{project.imageLabel}</p>
            </div>
            <h3 className="text-xl font-semibold text-textPrimary">{project.title}</h3>
            <div className="mt-4 space-y-3">
              <p className="readable-text text-sm text-white/90 text-justify">
                <span className="font-bold text-accent">Problem: </span>
                {project.problem}
              </p>
              {project.approach && (
                <p className="readable-text text-sm text-white/90 text-justify">
                  <span className="font-bold text-accent">Approach: </span>
                  {project.approach}
                </p>
              )}
              {project.result && (
                <p className="readable-text text-sm text-white/90 text-justify">
                  <span className="font-bold text-accent">Result: </span>
                  {project.result}
                </p>
              )}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="readable-text rounded-full border border-stroke bg-panel px-3 py-1 text-xs text-white">
                  {tool}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.githubUrl && project.githubUrl !== '#' && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="rounded-md border border-stroke bg-panel px-4 py-2 text-xs font-medium text-textPrimary transition hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
                >
                  GitHub
                </a>
              )}
              {project.title === 'Food Nutrition & Health Risk Analytics System' ? (
                <Link 
                  to="/project/food-health"
                  className={`inline-block rounded-md border px-4 py-2 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base ${project.themeClasses?.button || 'border-accent bg-accent/10 text-accent hover:bg-accent hover:text-base focus-visible:ring-accent shadow-[0_0_10px_rgba(56,189,248,0.2)] hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]'}`}
                >
                  Explore Project
                </Link>
              ) : project.demoUrl && project.demoUrl !== '#' ? (
                <a 
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block rounded-md border px-4 py-2 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base ${project.themeClasses?.button || 'border-accent bg-accent/10 text-accent hover:bg-accent hover:text-base focus-visible:ring-accent shadow-[0_0_10px_rgba(56,189,248,0.2)] hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]'}`}
                >
                  {project.buttonText || 'View'}
                </a>
              ) : (
                <button 
                  onClick={() => openModal(project)}
                  className={`rounded-md border px-4 py-2 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base ${project.themeClasses?.button || 'border-accent bg-accent/10 text-accent hover:bg-accent hover:text-base focus-visible:ring-accent shadow-[0_0_10px_rgba(56,189,248,0.2)] hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]'}`}
                >
                  {project.buttonText || 'View'}
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Image Modal Gallery */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-base/90 p-4 sm:p-6 md:p-8 backdrop-blur-sm transition-all duration-300">
          <div className="relative max-h-full w-full max-w-6xl rounded-2xl border border-stroke bg-panel p-5 sm:p-8 shadow-[0_0_40px_rgba(56,189,248,0.15)] flex flex-col animate-scaleIn">
            <button 
              onClick={closeModal}
              className="absolute right-4 top-4 sm:right-6 sm:top-6 z-10 rounded-full bg-base/80 p-2 text-textSecondary transition hover:bg-accent hover:text-base focus:outline-none shadow-md"
              aria-label="Close modal"
            >
              <FaTimes size={20} />
            </button>
            
            <h3 className="mb-6 text-xl sm:text-2xl font-semibold text-textPrimary pr-12">{selectedProject.title}</h3>
            
            <div className="relative flex-1 overflow-y-auto rounded-xl bg-base border border-stroke/50 p-4 sm:p-6 flex items-center justify-center">
              {selectedProject.images && selectedProject.images.length > 0 ? (
                <div className={`grid gap-6 sm:gap-8 items-center justify-items-center w-full ${selectedProject.images.length === 1 ? 'grid-cols-1 max-w-4xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
                  {selectedProject.images.map((img, idx) => (
                    <div 
                      key={idx} 
                      className={`group relative overflow-hidden rounded-xl bg-panelSoft border border-stroke transition-all duration-300 hover:-translate-y-1 flex items-center justify-center ${selectedProject.themeClasses?.imageHover || 'hover:border-accentSoft hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]'}`}
                    >
                      <img 
                        src={img} 
                        alt={`${selectedProject.title} screenshot ${idx + 1}`}
                        className="max-h-[55vh] sm:max-h-[60vh] lg:max-h-[65vh] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[40vh] text-textSecondary">
                  <p>Images coming soon for this project.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
