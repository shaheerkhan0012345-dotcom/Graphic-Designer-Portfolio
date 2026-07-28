import { useState, ReactNode, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Sparkles, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  features: string[];
  tools: string[];
  deliverables: string;
}

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Stagger 3D Flip reveal service cards
      const cards = gsap.utils.toArray<HTMLElement>('.gsap-service-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 70, rotateX: -25, transformPerspective: 1000 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating ambient motion for SVG icons
      const icons = gsap.utils.toArray<HTMLElement>('.service-icon-wrapper');
      icons.forEach((icon, i) => {
        gsap.to(icon, {
          y: -6,
          rotate: i % 2 === 0 ? 3 : -3,
          duration: 2.5 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services: ServiceItem[] = [
    {
      id: 'product-designer',
      title: 'Product Designer.',
      description: 'I create clean, user-focused interfaces that deliver smooth and engaging digital experiences.',
      features: [
        'User Research & Empathy Mapping',
        'Wireframing & Interactive Prototyping',
        'Design Systems & UI Pattern Libraries',
        'Usability Testing & Iteration Cycle'
      ],
      tools: ['Figma', 'Principle', 'Rive', 'Maze'],
      deliverables: 'Complete end-to-end Figma design files, clickable high-fidelity prototypes, component guidelines, and handoff documentation.',
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-neutral-900" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hexagonal 3D Isometric Mesh Shape */}
          <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="15" y1="30" x2="85" y2="70" stroke="currentColor" strokeWidth="1.5" />
          <line x1="85" y1="30" x2="15" y2="70" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="12" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="28" r="3" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'brand-identity',
      title: 'Brand Identity Design.',
      description: 'A cohesive brand identity crafted to reflect vision, values, and uniqueness.',
      features: [
        'Brand Strategy & Positioning',
        'Logo Design & Visual Assets',
        'Typography & Color Palette Curation',
        'Brand Guidelines & Style Guides'
      ],
      tools: ['Illustrator', 'Photoshop', 'InDesign', 'Glyphs'],
      deliverables: 'Vector logo suites (SVG/EPS), brand guidelines book (PDF), typography hierarchy specs, and digital asset kits.',
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-neutral-900" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Layered Isometric Block Structure */}
          <path d="M25 35 L65 15 L85 25 L45 45 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
          <path d="M25 35 L25 70 L45 80 L45 45 Z" stroke="currentColor" strokeWidth="2" />
          <path d="M45 45 L45 80 L85 60 L85 25 Z" stroke="currentColor" strokeWidth="2" />
          <path d="M25 45 L65 25 L85 35" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="45" y1="25" x2="45" y2="45" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 'web-development',
      title: 'Web Development.',
      description: 'Building fast, responsive, and user-friendly websites for a seamless digital experience.',
      features: [
        'Custom Frontend React / TypeScript',
        'Smooth Motion Animations & Micro-Interactions',
        'SEO Optimization & Performance Tuning',
        'Responsive Across All Device Breakpoints'
      ],
      tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Motion'],
      deliverables: 'Production-ready codebases, clean component hierarchy, fast initial paint times, and full cross-browser compatibility.',
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-neutral-900" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Concentric Tunnel / Vortex Circles */}
          <ellipse cx="50" cy="50" rx="40" ry="28" stroke="currentColor" strokeWidth="2" />
          <ellipse cx="46" cy="50" rx="30" ry="21" stroke="currentColor" strokeWidth="1.75" />
          <ellipse cx="42" cy="50" rx="20" ry="14" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="38" cy="50" rx="10" ry="7" stroke="currentColor" strokeWidth="1.25" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      )
    },
    {
      id: 'ui-ux-designer',
      title: 'UI/UX Designer.',
      description: 'Designing intuitive and engaging digital experiences focused on real user needs.',
      features: [
        'Information Architecture & Site Maps',
        'Interactive User Journey Flows',
        'Accessible (WCAG AA) Color & Typography',
        'Cross-Platform Adaptive Interfaces'
      ],
      tools: ['Figma', 'Protopie', 'Lucidchart', 'Storybook'],
      deliverables: 'Complete UI component specs, user journey maps, interaction handoff guides, and responsive screen flows.',
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-neutral-900" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Fluid Organic 3D Sculpture Cross */}
          <path
            d="M50 15 C60 25, 75 25, 85 35 C75 45, 75 60, 85 70 C75 80, 60 80, 50 90 C40 80, 25 80, 15 70 C25 60, 25 45, 15 35 C25 25, 40 25, 50 15 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="currentColor"
            fillOpacity="0.04"
          />
          <circle cx="50" cy="52.5" r="14" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="52.5" r="4" fill="currentColor" />
        </svg>
      )
    }
  ];

  return (
    <section ref={sectionRef} id="services-section" className="w-full bg-white text-neutral-900 py-16 sm:py-24 px-6 sm:px-10 lg:px-16 font-sans border-t border-neutral-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header Row */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-16 sm:mb-20">
          <div className="space-y-3">
            {/* Eyebrow Label with Red Dot */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-neutral-700 uppercase">
              <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-pulse" />
              <span>SERVICES</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-tight">
              Creative Solutions
              <br />
              That Work.
            </h2>
          </div>
        </div>

        {/* 2x2 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
          {services.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="gsap-service-card group cursor-pointer flex flex-col items-start"
              onClick={() => setSelectedService(service)}
            >
              {/* Abstract Graphic Icon */}
              <div className="service-icon-wrapper mb-6 transform group-hover:scale-110 transition-transform duration-300 ease-out">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3 group-hover:text-red-600 transition-colors duration-200 flex items-center gap-2">
                <span>{service.title}</span>
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-red-600" />
              </h3>

              {/* Subtitle / Description */}
              <p className="text-neutral-500 text-base sm:text-lg leading-relaxed max-w-md font-normal">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl p-6 sm:p-8 text-neutral-900 shadow-2xl"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-neutral-50 rounded-xl border border-neutral-200/80">
                  {selectedService.icon}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>SERVICE CAPABILITIES</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <p className="text-neutral-600 text-base mb-6 leading-relaxed">
                {selectedService.description}
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-3">Key Process & Focus Areas</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedService.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-neutral-700 font-medium bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                        <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-2">Tools & Environment</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.tools.map((tool) => (
                      <span key={tool} className="text-xs font-semibold bg-neutral-900 text-white px-3 py-1.5 rounded-md">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Deliverables</h4>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {selectedService.deliverables}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-neutral-100 pt-5 mt-6">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    // trigger contact smooth scroll or modal
                    const contactBtn = document.getElementById('contact-me-btn');
                    if (contactBtn) contactBtn.click();
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer shadow-md shadow-red-600/20"
                >
                  <span>Inquire About This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
