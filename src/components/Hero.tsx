import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';

const HERO_VIDEO_URL = "https://res.cloudinary.com/dkpv0eax8/video/upload/v1785168093/Hero_animation_with_particles_202607270900_nrehse.mp4";

export function Hero() {
  const [activeNav, setActiveNav] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const navItems = ['Home', 'About', 'Project', 'Blog', 'Contact'];

  return (
    <section id="hero" className="relative w-full min-h-screen h-screen overflow-hidden bg-black text-white flex flex-col justify-between font-sans select-none">
      {/* Background Video Layer with Ambient Dual-Tone Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          src={HERO_VIDEO_URL}
          className="w-full h-full object-cover object-center scale-[1.08] origin-center filter contrast-[1.05] brightness-[0.98]"
        />

        {/* Top Vignette Gradient for Nav Contrast */}
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />

        {/* Bottom Fade Gradient for Text Readability */}
        <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

        {/* Soft bottom edge glow transition matching reference frame */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/10 to-transparent pointer-events-none backdrop-blur-[1px]" />
      </div>

      {/* Header Navigation Bar */}
      <header id="main-header" className="relative z-20 w-full px-6 sm:px-10 lg:px-16 py-6 sm:py-8 flex items-center justify-between">
        {/* Brand Logo */}
        <motion.a
          id="brand-logo"
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          {/* Custom Geometric Interlocking Polygon Icon */}
          <div className="w-7 h-7 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
            <svg
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-white stroke-current"
            >
              <path
                d="M14 2L24.3923 8V20L14 26L3.6077 20V8L14 2Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M14 7L19.1962 10V16L14 19L8.80385 16V10L14 7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white font-sans">
            Pixlio<span className="text-white font-extrabold">.</span>
          </span>
        </motion.a>

        {/* Desktop Navigation Links */}
        <motion.nav
          id="desktop-nav"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:flex items-center space-x-8 lg:space-x-12"
        >
          {navItems.map((item) => (
            <button
              key={item}
              id={`nav-item-${item.toLowerCase()}`}
              onClick={() => {
                setActiveNav(item);
                if (item === 'Contact') setShowContactModal(true);
              }}
              className={`relative text-sm lg:text-base tracking-wide transition-all duration-200 cursor-pointer ${
                activeNav === item
                  ? 'text-white font-semibold'
                  : 'text-white/85 hover:text-white font-normal'
              }`}
            >
              {item}
              {activeNav === item && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.nav>

        {/* Right CTA Button ("Contact Me") */}
        <motion.div
          id="cta-wrapper"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden sm:flex items-center"
        >
          <button
            id="contact-me-btn"
            onClick={() => setShowContactModal(true)}
            className="group relative flex items-center gap-3 bg-white text-black font-semibold text-sm sm:text-base px-5 py-2.5 rounded-full shadow-lg hover:bg-neutral-100 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span className="w-7 h-7 bg-black rounded-full flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </span>
            <span>Contact Me</span>
          </button>
        </motion.div>

        {/* Mobile Menu Button */}
        <div id="mobile-menu-toggle" className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-white/80 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 right-0 z-30 bg-black/95 backdrop-blur-xl border-b border-white/10 px-8 py-6 flex flex-col gap-5"
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveNav(item);
                  setMobileMenuOpen(false);
                  if (item === 'Contact') setShowContactModal(true);
                }}
                className={`text-left text-lg font-medium py-1 transition-colors ${
                  activeNav === item ? 'text-white font-bold pl-2 border-l-2 border-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowContactModal(true);
              }}
              className="mt-2 flex items-center justify-center gap-3 bg-white text-black font-semibold text-base py-3 rounded-full w-full"
            >
              <span className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span>Contact Me</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Hero Content Area - Bottom Grid */}
      <div id="hero-content" className="relative z-10 w-full px-6 sm:px-10 lg:px-16 pb-12 sm:pb-16 lg:pb-20 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-12">
          
          {/* Main Left Headline */}
          <motion.div
            id="hero-headline"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.03]">
              Crafting Digital
              <br />
              Products.
            </h1>
          </motion.div>

          {/* Right Subtitle Text */}
          <motion.div
            id="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="md:text-right pb-1 sm:pb-2"
          >
            <p className="text-xl sm:text-2xl md:text-2xl text-white/95 font-normal leading-snug tracking-tight max-w-xs sm:max-w-sm">
              I create thoughtful
              <br />
              designs focused on
              <br />
              real user needs.
            </p>
          </motion.div>

        </div>
      </div>

      {/* Interactive Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <div id="contact-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              id="contact-modal-card"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-neutral-900 border border-white/10 rounded-2xl p-6 sm:p-8 text-white shadow-2xl"
            >
              <button
                id="close-modal-btn"
                onClick={() => {
                  setShowContactModal(false);
                  setContactSubmitted(false);
                }}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {contactSubmitted ? (
                <div id="modal-success-state" className="text-center py-6">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="w-6 h-6 rotate-[-45deg]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-white/70 text-sm mb-6">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                  <button
                    id="close-success-btn"
                    onClick={() => {
                      setShowContactModal(false);
                      setContactSubmitted(false);
                    }}
                    className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <div id="modal-form-state">
                  <h3 className="text-2xl font-bold tracking-tight mb-1">Let's Connect</h3>
                  <p className="text-white/60 text-sm mb-6">
                    Have a project in mind? Send a message to get started.
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setContactSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white transition-colors text-white placeholder-white/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@example.com"
                        className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white transition-colors text-white placeholder-white/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                        Message
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Tell me about your product or idea..."
                        className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white transition-colors text-white placeholder-white/30 resize-none"
                      />
                    </div>
                    <button
                      id="submit-contact-form"
                      type="submit"
                      className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 mt-2 cursor-pointer"
                    >
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
