import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ClientLogo {
  id: string;
  name: string;
  color: string;
  svg: ReactNode;
}

const CLIENT_LOGOS: ClientLogo[] = [
  {
    id: 'client-1',
    name: 'Orbit',
    color: '#3B82F6', // Blue
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="11" stroke="#60A5FA" strokeWidth="4" strokeDasharray="50 15" strokeLinecap="round" />
        <circle cx="16" cy="16" r="4" fill="#3B82F6" />
      </svg>
    ),
  },
  {
    id: 'client-2',
    name: 'Delta',
    color: '#EF4444', // Red
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 6L26 24H6L16 6Z" stroke="#EF4444" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M16 13L20 20H12L16 13Z" fill="#EF4444" />
      </svg>
    ),
  },
  {
    id: 'client-3',
    name: 'Sync',
    color: '#4F46E5', // Indigo/Blue-Purple
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12C8 9.79086 9.79086 8 12 8H20C22.2091 8 24 9.79086 24 12V14C24 16.2091 22.2091 18 20 18H12" stroke="#4F46E5" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M24 20C24 22.2091 22.2091 24 20 24H12C9.79086 24 8 22.2091 8 20V18C8 15.7909 9.79086 14 12 14H20" stroke="#4F46E5" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'client-4',
    name: 'Spark',
    color: '#F97316', // Orange
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="7" width="18" height="18" rx="6" fill="#F97316" />
        <path d="M16 10V22M10 16H22" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'client-5',
    name: 'Infinity Loop',
    color: '#8B5CF6', // Purple
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 16C11 13.2386 13.2386 11 16 11C18.7614 11 21 13.2386 21 16C21 18.7614 23.2386 21 26 21C28.7614 21 31 18.7614 31 16C31 13.2386 28.7614 11 26 11" stroke="#8B5CF6" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M21 16C21 18.7614 18.7614 21 16 21C13.2386 21 11 18.7614 11 16C11 13.2386 8.76142 11 6 11C3.23858 11 1 13.2386 1 16C1 18.7614 3.23858 21 6 21" stroke="#8B5CF6" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'client-6',
    name: 'Target Ring',
    color: '#2563EB', // Blue
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="20" height="20" rx="10" stroke="#2563EB" strokeWidth="3" />
        <rect x="11" y="11" width="10" height="10" rx="5" fill="#2563EB" />
        <circle cx="16" cy="16" r="2" fill="white" />
      </svg>
    ),
  },
  {
    id: 'client-7',
    name: 'Magic Glow',
    color: '#6D28D9', // Deep Purple
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4C16 10.6274 21.3726 16 28 16C21.3726 16 16 21.3726 16 28C16 21.3726 10.6274 16 4 16C10.6274 16 16 10.6274 16 4Z" fill="#6D28D9" />
        <circle cx="25" cy="8" r="2" fill="#A855F7" />
        <circle cx="8" cy="24" r="1.5" fill="#A855F7" />
      </svg>
    ),
  },
  {
    id: 'client-8',
    name: 'Aura Star',
    color: '#C084FC', // Light Purple
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4V28M4 16H28M7.5 7.5L24.5 24.5M24.5 7.5L7.5 24.5" stroke="#C084FC" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
];

// Duplicate list for seamless infinite loop
const DUPLICATED_LOGOS = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

export function ClientsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Continuous infinite horizontal marquee loop
      if (marqueeRef.current) {
        tweenRef.current = gsap.to(marqueeRef.current, {
          xPercent: -33.33333,
          ease: 'none',
          duration: 22,
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      tweenRef.current?.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    tweenRef.current?.pause();
  };

  const handleMouseLeave = () => {
    tweenRef.current?.play();
  };

  return (
    <section
      ref={sectionRef}
      id="clients-section"
      className="w-full bg-white text-neutral-900 py-10 sm:py-14 font-sans border-t border-neutral-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative px-4">
        
        {/* Soft edge gradient fades for smooth visual masking */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Marquee Wrapper Container */}
        <div
          className="overflow-hidden w-full py-3"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={marqueeRef}
            className="flex items-center gap-6 sm:gap-10 w-max"
          >
            {DUPLICATED_LOGOS.map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                id={`client-card-${client.id}-${index}`}
                title={client.name}
                className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-neutral-50 hover:bg-white border border-neutral-200/80 hover:border-neutral-300 shadow-sm hover:shadow-xl hover:shadow-neutral-200/80 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-2 hover:scale-110 cursor-pointer shrink-0"
              >
                {/* SVG Logo Icon with Hover Scale & Glow Effect */}
                <div className="transition-all duration-300 group-hover:scale-125 filter group-hover:drop-shadow-md">
                  {client.svg}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

