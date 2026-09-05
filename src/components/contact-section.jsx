import { contactDetails } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa'

export function ContactSection() {
  return (
    <section id="contact" className="py-14 sm:py-20 relative">
      <SectionHeading
        eyebrow="Contact"
        title="Let us connect for analytics opportunities"
        description="Open to internships, entry-level data analyst roles, and collaborative business intelligence projects."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contact Information Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-[#F5E3C8]/15 shadow-[0_12px_36px_rgba(15,9,7,0.65)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_10px_#E5A93C] animate-pulse" />
              <h3 className="text-xl font-bold font-display text-ivory">Contact Details</h3>
            </div>
            
            <p className="readable-text text-sm text-cream leading-relaxed font-sans mb-6">
              Feel free to reach out directly for internships, full-time opportunities, or data collaboration.
            </p>

            <div className="space-y-3.5 font-sans text-sm">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#231713]/60 border border-[#F5E3C8]/10">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-terracotta/20 text-peach border border-terracotta/30 shrink-0">
                  <FaEnvelope className="text-sm" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-warmMuted uppercase tracking-wider">Email</p>
                  <a 
                    href={`mailto:${contactDetails.email}`}
                    className="font-medium text-ivory hover:text-peach transition-colors"
                  >
                    {contactDetails.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#231713]/60 border border-[#F5E3C8]/10">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#294B50]/40 text-peach border border-peach/30 shrink-0">
                  <FaLinkedin className="text-sm" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-warmMuted uppercase tracking-wider">LinkedIn</p>
                  <a 
                    href={contactDetails.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-medium text-peach hover:text-ivory transition-colors"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#231713]/60 border border-[#F5E3C8]/10">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#38241D] text-goldSoft border border-gold/30 shrink-0">
                  <FaGithub className="text-sm" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-warmMuted uppercase tracking-wider">GitHub</p>
                  <a 
                    href={contactDetails.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-medium text-peach hover:text-ivory transition-colors"
                  >
                    GitHub Profile
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-[#F5E3C8]/10 text-xs text-warmMuted font-pixel">
            <span>✦ Café Workspace • Ready for high-impact analytics</span>
          </div>
        </div>

        {/* Message Form Card */}
        <form className="glass-card rounded-2xl p-6 sm:p-8 border border-[#F5E3C8]/15 shadow-[0_12px_36px_rgba(15,9,7,0.65)]">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2.5 w-2.5 rounded-full bg-terracotta shadow-[0_0_10px_#B96F59]" />
            <h3 className="text-xl font-bold font-display text-ivory">Send a Message</h3>
          </div>
          
          <div className="mt-4 grid gap-3.5">
            <div>
              <label className="block text-xs font-mono text-cream mb-1">Your Name</label>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full rounded-xl border border-[#F5E3C8]/15 bg-[#1B120E]/90 px-3.5 py-2.5 text-sm font-medium text-ivory placeholder:text-warmMuted/60 outline-none transition-all focus:border-terracotta focus:ring-2 focus:ring-terracotta/25" 
              />
            </div>
            
            <div>
              <label className="block text-xs font-mono text-cream mb-1">Your Email</label>
              <input 
                type="email" 
                placeholder="your.email@example.com" 
                className="w-full rounded-xl border border-[#F5E3C8]/15 bg-[#1B120E]/90 px-3.5 py-2.5 text-sm font-medium text-ivory placeholder:text-warmMuted/60 outline-none transition-all focus:border-terracotta focus:ring-2 focus:ring-terracotta/25" 
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-cream mb-1">Message</label>
              <textarea 
                rows="4" 
                placeholder="Tell me about your project, team, or opportunity..." 
                className="w-full rounded-xl border border-[#F5E3C8]/15 bg-[#1B120E]/90 px-3.5 py-2.5 text-sm font-medium leading-relaxed text-ivory placeholder:text-warmMuted/60 outline-none transition-all focus:border-terracotta focus:ring-2 focus:ring-terracotta/25" 
              />
            </div>

            <button 
              type="button" 
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-terracotta px-5 py-3 text-sm font-semibold text-base transition-all duration-200 hover:bg-accentHover hover:shadow-[0_0_20px_rgba(185,111,89,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              <FaPaperPlane className="text-xs" />
              <span>Send Message</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
