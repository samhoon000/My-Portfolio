import { projects } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Projects"
        title="Case-study style analytics projects"
        description="Each project demonstrates business context, analytical workflow, and the decision-level insights delivered."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="glass-card rounded-2xl bg-panelSoft p-6 shadow-card transition hover:-translate-y-1 hover:border-accent"
          >
            <div className="mb-4 rounded-xl border border-stroke bg-gradient-to-br from-panel to-base p-5">
              <p className="readable-text text-xs uppercase tracking-wider text-white">Project Preview</p>
              <p className="mt-2 font-display text-xl text-textPrimary">{project.imageLabel}</p>
            </div>
            <h3 className="text-xl font-semibold text-textPrimary">{project.title}</h3>
            <p className="readable-text mt-3 text-sm text-white">
              <span className="font-semibold text-textPrimary">Business Problem: </span>
              {project.problem}
            </p>
            <p className="readable-text mt-3 text-sm text-white">
              <span className="font-semibold text-textPrimary">Key Insights: </span>
              {project.insights}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="readable-text rounded-full border border-stroke bg-panel px-3 py-1 text-xs text-white">
                  {tool}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={project.githubUrl} className="rounded-md border border-stroke bg-panel px-4 py-2 text-xs font-medium text-textPrimary transition hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base">
                GitHub
              </a>
              <a href={project.demoUrl} className="rounded-md border border-stroke bg-panel px-4 py-2 text-xs font-medium text-textPrimary transition hover:border-accentSoft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base">
                Live Demo
              </a>
              <a href={project.caseStudyUrl} className="rounded-md border border-stroke bg-panel px-4 py-2 text-xs font-medium text-textPrimary transition hover:border-textSecondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base">
                Case Study
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
