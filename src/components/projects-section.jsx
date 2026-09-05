import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { FaTimes, FaGithub, FaExternalLinkAlt, FaImages, FaLaptopCode } from 'react-icons/fa'

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null)

  const openModal = (project) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="py-14 sm:py-20 relative">
      {/* Workspace Bridge Pill */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-terracotta/40 bg-[#2B1D18]/80 px-4 py-1.5 text-xs font-mono text-peach shadow-[0_0_15px_rgba(185,111,89,0.25)]">
        <FaLaptopCode className="text-terracotta" />
        <span className="font-pixel uppercase tracking-wider">Workspace Station • Select a Project</span>
      </div>

      <SectionHeading
        eyebrow="My Work / Case Studies"
        title="Featured analytics projects & business intelligence"
        description="Each project demonstrates end-to-end analytical rigor: problem definition, data pipelines, interactive dashboards, and actionable business insights."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="glass-card rounded-2xl p-6 sm:p-7 shadow-[0_12px_36px_rgba(15,9,7,0.65)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between border border-[#F5E3C8]/15 hover:border-terracotta/50"
          >
            <div>
              {/* Project Preview Header Pill */}
              <div className="mb-4 rounded-xl border border-[#F5E3C8]/10 bg-gradient-to-r from-[#231713] to-[#38241D] p-4 flex items-center justify-between shadow-inner">
                <div>
                  <p className="font-pixel text-[11px] uppercase tracking-wider text-peach">Project Destination</p>
                  <p className="mt-0.5 font-display text-base sm:text-lg font-bold text-ivory">{project.imageLabel}</p>
                </div>
                {project.images && project.images.length > 0 && (
                  <div className="flex items-center gap-1.5 rounded-md border border-[#F5E3C8]/15 bg-[#1B120E]/70 px-2.5 py-1 text-[11px] font-mono text-cream">
                    <FaImages className="text-terracotta" />
                    <span>{project.images.length} {project.images.length === 1 ? 'Preview' : 'Previews'}</span>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold font-display text-ivory">{project.title}</h3>

              <div className="mt-4 space-y-3">
                <p className="readable-text text-sm text-cream text-justify leading-relaxed">
                  <span className="font-bold text-peach">Problem: </span>
                  {project.problem}
                </p>
                {project.approach && (
                  <p className="readable-text text-sm text-cream text-justify leading-relaxed">
                    <span className="font-bold text-goldSoft">Approach: </span>
                    {project.approach}
                  </p>
                )}
                {project.result && (
                  <p className="readable-text text-sm text-cream text-justify leading-relaxed">
                    <span className="font-bold text-emeraldLight">Result: </span>
                    {project.result}
                  </p>
                )}
              </div>

              {/* Tools Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span 
                    key={tool} 
                    className="font-mono text-xs rounded-md border border-[#F5E3C8]/10 bg-[#231713]/60 px-2.5 py-1 text-cream font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-5 border-t border-[#F5E3C8]/10 flex flex-wrap items-center gap-3">
              {project.githubUrl && project.githubUrl !== '#' && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 rounded-lg border border-[#F5E3C8]/15 bg-[#2B1D18]/80 px-3.5 py-2 text-xs font-semibold text-cream transition-all hover:border-peach hover:bg-peach/15 hover:text-ivory"
                >
                  <FaGithub className="text-peach" />
                  <span>GitHub</span>
                </a>
              )}
              
              {project.title === 'Food Nutrition & Health Risk Analytics System' ? (
                <Link 
                  to="/project/food-health"
                  className="flex items-center gap-1.5 rounded-lg border border-terracotta/50 bg-terracotta/25 px-4 py-2 text-xs font-semibold text-ivory shadow-[0_0_15px_rgba(185,111,89,0.25)] transition-all hover:bg-terracotta hover:text-base hover:shadow-[0_0_20px_rgba(185,111,89,0.5)]"
                >
                  <span>Explore Case Study</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </Link>
              ) : project.title === 'Instacart Customer Analytics Dashboard' ? (
                <Link 
                  to="/project/instacart"
                  className="flex items-center gap-1.5 rounded-lg border border-terracotta/50 bg-terracotta/25 px-4 py-2 text-xs font-semibold text-ivory shadow-[0_0_15px_rgba(185,111,89,0.25)] transition-all hover:bg-terracotta hover:text-base hover:shadow-[0_0_20px_rgba(185,111,89,0.5)]"
                >
                  <span>Explore Case Study</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </Link>
              ) : project.demoUrl && project.demoUrl !== '#' ? (
                <a 
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-terracotta/50 bg-terracotta/25 px-4 py-2 text-xs font-semibold text-ivory shadow-[0_0_15px_rgba(185,111,89,0.25)] transition-all hover:bg-terracotta hover:text-base"
                >
                  <span>{project.buttonText || 'View Project'}</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>
              ) : (
                <button 
                  onClick={() => openModal(project)}
                  className="flex items-center gap-1.5 rounded-lg border border-terracotta/50 bg-terracotta/25 px-4 py-2 text-xs font-semibold text-ivory shadow-[0_0_15px_rgba(185,111,89,0.25)] transition-all hover:bg-terracotta hover:text-base"
                >
                  <span>{project.buttonText || 'View Visuals'}</span>
                  <FaImages className="text-[11px]" />
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Image Modal Gallery */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#160E0B]/90 p-4 sm:p-6 md:p-8 backdrop-blur-md transition-all duration-300">
          <div className="relative max-h-full w-full max-w-6xl rounded-2xl border border-[#F5E3C8]/15 bg-[#231713] p-5 sm:p-8 shadow-[0_0_50px_rgba(185,111,89,0.25)] flex flex-col animate-scaleIn">
            <button 
              onClick={closeModal}
              className="absolute right-4 top-4 sm:right-6 sm:top-6 z-10 rounded-full bg-[#38241D] p-2.5 text-cream transition hover:bg-terracotta hover:text-base focus:outline-none shadow-md"
              aria-label="Close modal"
            >
              <FaTimes size={18} />
            </button>
            
            <h3 className="mb-6 text-xl sm:text-2xl font-bold font-display text-ivory pr-12">{selectedProject.title}</h3>
            
            <div className="relative flex-1 overflow-y-auto rounded-xl bg-[#1B120E] border border-[#F5E3C8]/10 p-4 sm:p-6 flex items-center justify-center">
              {selectedProject.images && selectedProject.images.length > 0 ? (
                <div className={`grid gap-6 sm:gap-8 items-center justify-items-center w-full ${selectedProject.images.length === 1 ? 'grid-cols-1 max-w-4xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
                  {selectedProject.images.map((img, idx) => (
                    <div 
                      key={idx} 
                      className="group relative overflow-hidden rounded-xl bg-[#2B1D18] border border-[#F5E3C8]/10 transition-all duration-300 hover:-translate-y-1 hover:border-terracotta/50 flex items-center justify-center shadow-lg"
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
                <div className="flex flex-col items-center justify-center min-h-[40vh] text-warmMuted">
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
