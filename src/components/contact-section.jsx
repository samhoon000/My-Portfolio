import { useRef, useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { contactDetails } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'

export function ContactSection() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Disable background scroll when modal is open
  useEffect(() => {
    if (showSuccessModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSuccessModal]);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // We use environment variables (import.meta.env) to keep sensitive keys secure.
    // By keeping them out of source code, we prevent exposing them on public GitHub repositories.
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID, 
        import.meta.env.VITE_TEMPLATE_ID, 
        form.current, 
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setShowSuccessModal(true);
          form.current.reset();
          setIsSubmitting(false);
          
          // Auto disappear after 3 seconds
          setTimeout(() => {
            setShowSuccessModal(false);
          }, 3000);
        },
        (error) => {
          alert('Failed to send message.');
          // Error handling completed
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

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <style>
            {`
              @keyframes popIn {
                0% { opacity: 0; transform: scale(0.9); }
                100% { opacity: 1; transform: scale(1); }
              }
              .animate-popIn {
                animation: popIn 0.3s ease-out forwards;
              }
            `}
          </style>
          {/* Blurred Background Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowSuccessModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative z-10 flex flex-col items-center justify-center rounded-2xl bg-panelSoft border border-white/10 p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] animate-popIn max-w-sm w-full text-center">
            {/* Animated Checkmark */}
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
              <svg className="h-10 w-10 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h4 className="text-2xl font-bold text-white">Message Sent Successfully!</h4>
            <p className="mt-3 text-base text-white/70">
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>
            
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="mt-8 w-full rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
