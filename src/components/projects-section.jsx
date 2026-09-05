import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { FaTimes, FaGithub, FaArrowRight, FaEye } from 'react-icons/fa'
import { BiCoffee } from 'react-icons/bi'

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null)

  const openModal = (project) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Portfolio Projects"
        title="Discovering Work in the Café"
        description="End-to-end analytics case studies highlighting business problem framing, rigorous data workflows, and decision-level insights."
      />
      
      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="cafe-card pixel-corners group rounded-2xl p-6 sm:p-7 backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
          >
            <div>
              {/* Project Preview Header Banner */}
              <div className="mb-4 rounded-xl border border-[#6B4535]/60 bg-[#3A241D]/90 p-4 sm:p-5 flex items-center justify-between">
                <div>
                  <span className="font-pixel text-[11px] uppercase tracking-wider text-[#E39A73]">
                    Featured Case Study
                  </span>
                  <h4 className="mt-1 font-pixel text-lg font-bold text-[#FFF1D6]">
                    {project.imageLabel || project.title}
                  </h4>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4A2F25] border border-[#6B4535] text-[#E39A73]">
                  <BiCoffee className="text-xl" />
                </div>
              </div>

              <h3 className="font-pixel text-xl sm:text-2xl font-bold text-[#FFF1D6] leading-snug">
                {project.title}
              </h3>

              {/* Problem / Approach / Result */}
              <div className="mt-4 space-y-3 font-sans text-xs sm:text-sm text-[#FFF1D6] leading-relaxed">
                <p>
                  <strong className="text-[#E39A73] font-semibold">Problem: </strong>
                  {project.problem}
                </p>
                {project.approach && (
                  <p>
                    <strong className="text-[#E39A73] font-semibold">Approach: </strong>
                    {project.approach}
                  </p>
                )}
                {project.result && (
                  <p>
                    <strong className="text-[#E39A73] font-semibold">Result: </strong>
                    {project.result}
                  </p>
                )}
              </div>

              {/* Tools Badges */}
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-lg border border-[#6B4535]/60 bg-[#3A241D]/90 px-3 py-1 font-sans text-xs font-medium text-[#FFF1D6]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Project CTA Links */}
            <div className="mt-7 pt-5 border-t border-[#6B4535]/50 flex flex-wrap items-center gap-3">
              {project.githubUrl && project.githubUrl !== '#' && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-[#6B4535] bg-[#3A241D]/90 px-4 py-2.5 text-xs font-semibold text-[#FFF1D6] transition-all duration-200 hover:border-[#E39A73] hover:bg-[#4A2F25] hover:text-[#F0B08A]"
                >
                  <FaGithub className="text-sm" />
                  <span>GitHub</span>
                </a>
              )}

              {project.title === 'Food Nutrition & Health Risk Analytics System' ? (
                <Link
                  to="/project/food-health"
                  className="flex items-center gap-2 rounded-xl bg-[#E39A73] px-4 py-2.5 font-pixel text-xs font-bold text-[#2B1D18] shadow-md shadow-[#E39A73]/20 transition-all duration-200 hover:bg-[#F0B08A] hover:shadow-[#E39A73]/40"
                >
                  <span>Explore Case Study</span>
                  <FaArrowRight className="text-xs" />
                </Link>
              ) : project.title === 'Instacart Customer Analytics Dashboard' ? (
                <Link
                  to="/project/instacart"
                  className="flex items-center gap-2 rounded-xl bg-[#E39A73] px-4 py-2.5 font-pixel text-xs font-bold text-[#2B1D18] shadow-md shadow-[#E39A73]/20 transition-all duration-200 hover:bg-[#F0B08A] hover:shadow-[#E39A73]/40"
                >
                  <span>Explore Case Study</span>
                  <FaArrowRight className="text-xs" />
                </Link>
              ) : (
                <button
                  onClick={() => openModal(project)}
                  type="button"
                  className="flex items-center gap-2 rounded-xl bg-[#E39A73] px-4 py-2.5 font-pixel text-xs font-bold text-[#2B1D18] shadow-md shadow-[#E39A73]/20 transition-all duration-200 hover:bg-[#F0B08A] hover:shadow-[#E39A73]/40"
                >
                  <FaEye className="text-xs" />
                  <span>{project.buttonText || 'Preview Dashboard'}</span>
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Modal Screenshot Gallery for Visual Projects */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-base/90 p-4 sm:p-6 md:p-8 backdrop-blur-md transition-all duration-300">
          <div className="cafe-card pixel-corners relative max-h-[90vh] w-full max-w-5xl rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col">
            <div className="flex items-start justify-between pb-4 border-b border-stroke/60">
              <div>
                <span className="font-pixel text-xs text-accentSoft uppercase tracking-wider">Dashboard Preview</span>
                <h3 className="font-pixel text-xl sm:text-2xl font-bold text-textPrimary">{selectedProject.title}</h3>
              </div>
              <button
                onClick={closeModal}
                className="rounded-xl border border-stroke bg-panel p-2.5 text-textSecondary transition hover:border-accent hover:text-accentSoft"
                aria-label="Close modal"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <div className="mt-6 flex-1 overflow-y-auto space-y-6 pr-2">
              {selectedProject.images && selectedProject.images.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 items-center">
                  {selectedProject.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="overflow-hidden rounded-xl border border-stroke bg-panel/80 p-2 shadow-lg"
                    >
                      <img
                        src={img}
                        alt={`${selectedProject.title} preview ${idx + 1}`}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center text-textMuted">
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
