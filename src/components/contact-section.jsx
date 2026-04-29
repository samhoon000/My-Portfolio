import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { contactDetails } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'

export function ContactSection() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm('service_i1yo2i8', 'template_pvdcple', form.current, {
        publicKey: 'sD6O9i__1q1QVagJ3',
      })
      .then(
        () => {
          alert('Message sent successfully!');
          form.current.reset();
          setIsSubmitting(false);
        },
        (error) => {
          alert('Failed to send message.');
          console.error(error);
          setIsSubmitting(false);
        },
      );
  };

  return (
    <section id="contact" className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Contact"
        title="Let us connect for analytics opportunities"
        description="Open to internships, entry-level data analyst roles, and collaborative analytics projects."
      />
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="glass-card flex flex-col justify-center rounded-2xl bg-panelSoft p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,255,255,0.05)]">
          <h3 className="mb-6 text-2xl font-bold tracking-tight text-white">Contact Details</h3>
          <div className="readable-text flex flex-col gap-5 text-base text-white/80">
            <p className="flex items-center gap-3">
              <span className="font-semibold text-blue-400 min-w-[70px]">Email:</span> 
              <a href={`mailto:${contactDetails.email}`} className="truncate transition-colors hover:text-blue-300">
                {contactDetails.email}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <span className="font-semibold text-blue-400 min-w-[70px]">LinkedIn:</span>
              <a href={contactDetails.linkedin} target="_blank" rel="noopener noreferrer" className="truncate transition-colors hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-panelSoft">
                {contactDetails.linkedin}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <span className="font-semibold text-blue-400 min-w-[70px]">GitHub:</span>
              <a href={contactDetails.github} target="_blank" rel="noopener noreferrer" className="truncate transition-colors hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-panelSoft">
                {contactDetails.github}
              </a>
            </p>
          </div>
        </div>
        
        <form ref={form} onSubmit={sendEmail} className="glass-card flex flex-col rounded-2xl bg-panelSoft p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,255,255,0.05)]">
          <h3 className="mb-6 text-2xl font-bold tracking-tight text-white">Send a Message</h3>
          <div className="grid gap-5">
            <div>
              <input 
                type="text" 
                name="user_name" 
                required
                placeholder="Your Name" 
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-medium text-white placeholder:text-white/40 outline-none transition-all focus:border-blue-500 focus:bg-black/60 focus-visible:ring-2 focus-visible:ring-blue-500/50" 
              />
            </div>
            <div>
              <input 
                type="email" 
                name="user_email" 
                required
                placeholder="Your Email" 
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-medium text-white placeholder:text-white/40 outline-none transition-all focus:border-blue-500 focus:bg-black/60 focus-visible:ring-2 focus-visible:ring-blue-500/50" 
              />
            </div>
            <div>
              <textarea 
                rows="4" 
                name="message" 
                required
                placeholder="Your Message" 
                className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-medium leading-relaxed text-white placeholder:text-white/40 outline-none transition-all focus:border-blue-500 focus:bg-black/60 focus-visible:ring-2 focus-visible:ring-blue-500/50" 
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`mt-2 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold tracking-wide text-white shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-panelSoft ${
                isSubmitting 
                  ? 'opacity-70 cursor-not-allowed' 
                  : 'hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
