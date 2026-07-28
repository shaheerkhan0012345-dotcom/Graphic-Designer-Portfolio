import { useState, useEffect, useRef, FormEvent } from 'react';
import { ArrowRight, Mail, Instagram, Dribbble, Linkedin, Send, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import portraitImg from '../assets/images/footer_portrait_1785219019138.jpg';

gsap.registerPlugin(ScrollTrigger);

export function FooterSection() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const footerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      if (leftColRef.current) {
        tl.fromTo(
          leftColRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
        );
      }

      if (portraitRef.current) {
        tl.fromTo(
          portraitRef.current,
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'back.out(1.4)' },
          '-=0.6'
        );
      }

      if (rightColRef.current) {
        tl.fromTo(
          rightColRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.7'
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactModalOpen(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} id="footer-section" className="w-full bg-white text-neutral-900 pt-16 sm:pt-24 pb-12 px-6 sm:px-10 lg:px-16 font-sans border-t border-neutral-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Footer Layout (Left Info, Center Portrait, Right Headline + CTA) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-center pb-16 border-b border-neutral-100">
          
          {/* Left Column: Email & Social Links */}
          <div ref={leftColRef} className="md:col-span-4 lg:col-span-4 space-y-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              {/* Email Address */}
              <a
                href="mailto:hello@loganfo.ster"
                className="text-lg sm:text-xl font-bold text-neutral-900 hover:text-red-600 transition-colors inline-block tracking-tight"
              >
                hello@loganfo.ster
              </a>

              {/* Social Media Links Stack */}
              <div className="flex flex-col space-y-2 text-sm sm:text-base font-semibold text-neutral-700">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-red-600 transition-colors w-max"
                >
                  Instagram
                </a>
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-red-600 transition-colors w-max"
                >
                  Behance
                </a>
              </div>
            </div>

            {/* Navigation Links at bottom left */}
            <nav className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 pt-6 text-xs sm:text-sm font-semibold text-neutral-800">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-red-600 transition-colors cursor-pointer">
                Home
              </button>
              <button onClick={() => scrollToSection('work-showcase')} className="hover:text-red-600 transition-colors cursor-pointer">
                About
              </button>
              <button onClick={() => scrollToSection('work-showcase')} className="hover:text-red-600 transition-colors cursor-pointer">
                Project
              </button>
              <button onClick={() => scrollToSection('blog-section')} className="hover:text-red-600 transition-colors cursor-pointer">
                Blog
              </button>
              <button onClick={() => setContactModalOpen(true)} className="hover:text-red-600 transition-colors cursor-pointer">
                Contact
              </button>
            </nav>
          </div>

          {/* Center Column: Portrait Photo with Red/Orange Lighting */}
          <div ref={portraitRef} className="md:col-span-3 lg:col-span-3 flex justify-center md:justify-start">
            <div className="relative w-40 sm:w-48 aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 shadow-xl border border-neutral-200/80 group cursor-pointer">
              <img
                src={portraitImg}
                alt="Logan Foster Portrait"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Right Column: Big Headline & Red Pill Contact Button */}
          <div ref={rightColRef} className="md:col-span-5 lg:col-span-5 space-y-8 flex flex-col justify-between">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-none">
              Let’s Create
              <br />
              Together.
            </h2>

            <div>
              <button
                id="footer-contact-btn"
                onClick={() => setContactModalOpen(true)}
                className="group flex items-center gap-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-base sm:text-lg px-7 py-3.5 rounded-full shadow-lg shadow-red-600/20 transition-all duration-200 cursor-pointer"
              >
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-red-600 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
                <span>Contact Me</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer / Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>© {new Date().getFullYear()} Logan Foster. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with precision & motion.</span>
          </p>
        </div>

      </div>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {contactModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 text-neutral-900 shadow-2xl"
            >
              <button
                onClick={() => setContactModalOpen(false)}
                className="absolute top-5 right-5 p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">Message Sent!</h3>
                  <p className="text-neutral-500 text-sm">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 mb-1">
                      <Mail className="w-4 h-4" />
                      <span>LET'S CONNECT</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                      Start a Conversation
                    </h3>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 text-sm focus:outline-none focus:border-red-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 text-sm focus:outline-none focus:border-red-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your project goals..."
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 text-sm focus:outline-none focus:border-red-600 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
