import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import sarahLeeImg from '../assets/images/client_sarah_lee_1785217431998.jpg';
import marcusVanceImg from '../assets/images/client_marcus_vance_1785217455119.jpg';
import elenaRostovaImg from '../assets/images/client_elena_rostova_1785217473618.jpg';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'sarah-lee',
    quote: '"Working with this designer transformed our product approach. From research to UI, everything was clean, functional, and well-executed. Communication was great and timelines were always met."',
    author: 'Sarah Lee',
    role: 'Founder at GlowUp',
    avatar: sarahLeeImg,
  },
  {
    id: 'marcus-vance',
    quote: '"The attention to micro-interactions and typographic hierarchy was unmatched. Our app conversion jumped by 42% within two weeks of launching the new interface."',
    author: 'Marcus Vance',
    role: 'Head of Product at Aura',
    avatar: marcusVanceImg,
  },
  {
    id: 'elena-rostova',
    quote: '"Brought a rare combination of high-end editorial aesthetics and practical design systems to our platform. A true craftsman who delivers far beyond expectations."',
    author: 'Elena Rostova',
    role: 'Creative Director at Lumiere',
    avatar: elenaRostovaImg,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header scroll animation
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

      // Content scroll animation with elastic avatar expansion & quote wipe
      if (contentRef.current) {
        const avatar = contentRef.current.querySelector('.client-avatar-wrapper');
        const quote = contentRef.current.querySelector('blockquote');
        const authorDetails = contentRef.current.querySelector('.author-details');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        if (avatar) {
          tl.fromTo(
            avatar,
            { scale: 0.75, opacity: 0, rotate: -6 },
            { scale: 1, opacity: 1, rotate: 0, duration: 0.9, ease: 'back.out(1.6)' }
          );
        }

        if (quote) {
          tl.fromTo(
            quote,
            { opacity: 0, x: 40, filter: 'blur(6px)' },
            { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
            '-=0.6'
          );
        }

        if (authorDetails) {
          tl.fromTo(
            authorDetails,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.5'
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
          );
        },
      });
    } else {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }
  };

  const handlePrev = () => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        x: 20,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
          );
        },
      });
    } else {
      setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    }
  };

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section ref={sectionRef} id="testimonials-section" className="w-full bg-white text-neutral-900 py-16 sm:py-24 px-6 sm:px-10 lg:px-16 font-sans border-t border-neutral-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header Row with Eyebrow, Title and Navigation Buttons */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3">
            {/* Eyebrow Label with Red Dot */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-neutral-700 uppercase">
              <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-pulse" />
              <span>TESTIMONIALS</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-tight">
              Kind Words from
              <br />
              Happy Clients.
            </h2>
          </div>

          {/* Slider Navigation Arrow Buttons */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              id="prev-testimonial-btn"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <button
              id="next-testimonial-btn"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-lg bg-neutral-900 hover:bg-black text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 shadow-md"
            >
              <ArrowRight className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Testimonial Content Block */}
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Avatar Image Column */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="client-avatar-wrapper relative w-48 h-48 sm:w-56 sm:h-56 md:w-full md:aspect-square rounded-2xl overflow-hidden bg-neutral-100 shadow-md border border-neutral-200/80">
              <img
                src={activeTestimonial.avatar}
                alt={activeTestimonial.author}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter contrast-[1.03]"
              />
            </div>
          </div>

          {/* Quote & Author Details Column */}
          <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-between space-y-6 sm:space-y-8">
            <blockquote className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 leading-snug sm:leading-tight">
              {activeTestimonial.quote}
            </blockquote>

            <div className="author-details pt-2">
              <h4 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                {activeTestimonial.author}
              </h4>
              <p className="text-sm text-neutral-500 font-medium mt-0.5">
                {activeTestimonial.role}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
