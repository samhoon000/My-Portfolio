import { contactDetails } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'

export function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Contact"
        title="Let us connect for analytics opportunities"
        description="Open to internships, entry-level data analyst roles, and collaborative analytics projects."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-xl bg-panelSoft p-6">
          <h3 className="text-lg font-semibold text-textPrimary">Contact Details</h3>
          <div className="readable-text mt-4 space-y-3 text-sm text-white">
            <p>Email: {contactDetails.email}</p>
            <p>
              LinkedIn:{' '}
              <a href={contactDetails.linkedin} className="text-accent hover:text-accentSoft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panelSoft">
                {contactDetails.linkedin}
              </a>
            </p>
            <p>
              GitHub:{' '}
              <a href={contactDetails.github} className="text-accent hover:text-accentSoft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panelSoft">
                {contactDetails.github}
              </a>
            </p>
          </div>
        </div>
        <form className="glass-card rounded-xl bg-panelSoft p-6">
          <h3 className="text-lg font-semibold text-textPrimary">Send a Message</h3>
          <div className="mt-4 grid gap-3">
            <input type="text" placeholder="Your Name" className="rounded-md border border-stroke bg-base px-3 py-2 text-sm font-medium text-white placeholder:text-white outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent" />
            <input type="email" placeholder="Your Email" className="rounded-md border border-stroke bg-base px-3 py-2 text-sm font-medium text-white placeholder:text-white outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent" />
            <textarea rows="4" placeholder="Your Message" className="rounded-md border border-stroke bg-base px-3 py-2 text-sm font-medium leading-relaxed text-white placeholder:text-white outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent" />
            <button type="button" className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-base transition hover:bg-accentSoft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panelSoft">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
