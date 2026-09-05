import { useState } from 'react'
import { contactDetails } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa'
import { BiCoffee } from 'react-icons/bi'

export function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setFormState({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="relative z-10 py-12 sm:py-16">
      <SectionHeading
        eyebrow="The Warm Hearth"
        title="Let's Connect & Collaborate"
        description="Open for internships, entry-level data analyst opportunities, and high-impact analytics projects."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contact Info Card */}
        <div className="cafe-card pixel-corners rounded-2xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BiCoffee className="text-xl text-[#E39A73]" />
              <h3 className="font-pixel text-xl font-bold text-[#FFF1D6]">Direct Channels</h3>
            </div>
            
            <p
              className="text-sm font-sans leading-relaxed mb-6"
              style={{ color: '#FFF1D6' }}
            >
              Whether you want to discuss a prospective analytics role, data projects, or just chat about AI and business intelligence over a virtual coffee, feel free to reach out!
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${contactDetails.email}`}
                className="group flex items-center gap-3.5 rounded-xl p-3.5 transition-all duration-200 border border-[#6B4535]/60 bg-[#3A241D]/90 hover:border-[#E39A73]/70 hover:bg-[#4A2F25]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4A2F25] border border-[#6B4535] text-[#E39A73] group-hover:bg-[#E39A73] group-hover:text-[#2B1D18] transition-colors">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="font-pixel text-[11px] text-[#FFF1D6] uppercase">Email</p>
                  <p className="text-sm font-semibold text-[#FFF1D6] group-hover:text-[#E39A73] transition-colors">
                    {contactDetails.email}
                  </p>
                </div>
              </a>

              <a
                href={contactDetails.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 rounded-xl p-3.5 transition-all duration-200 border border-[#6B4535]/60 bg-[#3A241D]/90 hover:border-[#E39A73]/70 hover:bg-[#4A2F25]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4A2F25] border border-[#6B4535] text-[#E39A73] group-hover:bg-[#E39A73] group-hover:text-[#2B1D18] transition-colors">
                  <FaLinkedin />
                </div>
                <div>
                  <p className="font-pixel text-[11px] text-[#FFF1D6] uppercase">LinkedIn</p>
                  <p className="text-sm font-semibold text-[#FFF1D6] group-hover:text-[#E39A73] transition-colors">
                    linkedin.com/in/abdul-samhoon
                  </p>
                </div>
              </a>

              <a
                href={contactDetails.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 rounded-xl p-3.5 transition-all duration-200 border border-[#6B4535]/60 bg-[#3A241D]/90 hover:border-[#E39A73]/70 hover:bg-[#4A2F25]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4A2F25] border border-[#6B4535] text-[#E39A73] group-hover:bg-[#E39A73] group-hover:text-[#2B1D18] transition-colors">
                  <FaGithub />
                </div>
                <div>
                  <p className="font-pixel text-[11px] text-[#FFF1D6] uppercase">GitHub</p>
                  <p className="text-sm font-semibold text-[#FFF1D6] group-hover:text-[#E39A73] transition-colors">
                    github.com/samhoon000
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#6B4535]/50 text-xs text-[#FFF1D6] font-sans">
            📍 Based in India • Open to Global & Remote Opportunities
          </div>
        </div>

        {/* Send a Message Form */}
        <div className="cafe-card pixel-corners rounded-2xl p-6 sm:p-8 backdrop-blur-md">
          <h3 className="font-pixel text-xl font-bold text-[#FFF1D6] mb-2">Send a Message</h3>
          <p
            className="text-xs font-sans mb-5"
            style={{ color: '#FFF1D6' }}
          >
            Leave a note and I will get back to you promptly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-pixel text-xs text-[#FFF1D6] uppercase mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formState.name}
                onChange={handleChange}
                placeholder="Ada Lovelace"
                className="w-full rounded-xl border border-[#6B4535] bg-[#3A241D]/90 px-4 py-2.5 text-sm font-sans text-[#FFF1D6] placeholder:text-[#FFF1D6] focus:border-[#E39A73] focus:outline-none focus:ring-1 focus:ring-[#E39A73]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#FFF1D6] mb-2 font-pixel">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                value={formState.email}
                onChange={handleChange}
                placeholder="ada@example.com"
                className="w-full rounded-xl border border-[#6B4535] bg-[#3A241D]/90 px-4 py-2.5 text-sm font-sans text-[#FFF1D6] placeholder:text-[#FFF1D6] focus:border-[#E39A73] focus:outline-none focus:ring-1 focus:ring-[#E39A73]"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#FFF1D6] mb-2 font-pixel">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={formState.message}
                onChange={handleChange}
                placeholder="Hi Abdul, I'd love to chat about a data analytics role..."
                className="w-full rounded-xl border border-[#6B4535] bg-[#3A241D]/90 px-4 py-2.5 text-sm font-sans text-[#FFF1D6] placeholder:text-[#FFF1D6] focus:border-[#E39A73] focus:outline-none focus:ring-1 focus:ring-[#E39A73]"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E39A73] px-5 py-3 font-pixel text-xs font-bold text-[#2B1D18] shadow-lg shadow-[#E39A73]/20 transition-all duration-200 hover:bg-[#F0B08A] hover:shadow-[#E39A73]/40"
            >
              <FaPaperPlane className="text-xs" />
              <span>{submitted ? 'Message Sent!' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
