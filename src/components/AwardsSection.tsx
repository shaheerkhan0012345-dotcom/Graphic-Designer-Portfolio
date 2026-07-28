import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Award, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AwardItem {
  id: string;
  title: string;
  description: string;
  year: string;
  featured?: boolean;
  badge?: string;
}

const AWARDS_DATA: AwardItem[] = [
  {
    id: 'red-dot',
    title: 'Red Dot Design Award',
    description: 'Global award for product and communication design excellence.',
    year: '2023',
    featured: true,
    badge: '🏆',
  },
  {
    id: 'if-design',
    title: 'iF Design Award',
    description: 'Recognizes innovation in product, packaging, and service design.',
    year: '2022',
  },
  {
    id: 'awwwards',
    title: 'Awwwards Site of the Day',
    description: 'Celebrates innovative and intuitive web design.',
    year: '2024',
  },
  {
    id: 'ux-awards',
    title: 'UX Awards Gold Winner',
    description: 'Honors excellence in user-centered product experiences.',
    year: '2023',
  },
  {
    id: 'adobe-award',
    title: 'Adobe Achievement Award',
    description: 'Celebrates emerging talent in digital media and design.',
    year: '2021',
  },
];

export function AwardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
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

      // Section Top Line Draw Animation
      const dividerLine = sectionRef.current?.querySelector('.awards-top-line');
      if (dividerLine) {
        gsap.fromTo(
          dividerLine,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: dividerLine,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Rows Stagger Horizontal Slide-In Animation
      const rows = gsap.utils.toArray<HTMLElement>('.gsap-award-row');
      gsap.fromTo(
        rows,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Trophy Badge Floating Motion
      const trophyBadge = sectionRef.current?.querySelector('.trophy-badge');
      if (trophyBadge) {
        gsap.to(trophyBadge, {
          y: -8,
          rotation: 8,
          scale: 1.1,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="awards-section" className="w-full bg-white text-neutral-900 py-16 sm:py-24 px-6 sm:px-10 lg:px-16 font-sans border-t border-neutral-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header Row */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-16 sm:mb-20">
          <div className="space-y-3">
            {/* Eyebrow Label with Red Dot */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-neutral-700 uppercase">
              <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-pulse" />
              <span>AWARDS</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-tight">
              Awards & Industry
              <br />
              Recognition.
            </h2>
          </div>
        </div>

        {/* Awards Table / List */}
        <div className="relative">
          <div className="awards-top-line w-full h-[1px] bg-gradient-to-r from-red-600 via-neutral-300 to-transparent mb-2 origin-left" />

          <div className="divide-y divide-neutral-100 border-b border-neutral-100">
            {AWARDS_DATA.map((award) => (
              <div
                key={award.id}
                id={`award-row-${award.id}`}
                className="gsap-award-row group py-7 sm:py-8 transition-all duration-300 hover:bg-neutral-50/80 px-3 sm:px-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8"
              >
                {/* Award Title (Left Column) */}
                <div className="md:w-1/3 shrink-0">
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-red-600 transition-colors duration-200 flex items-center gap-2">
                    <span>{award.title}</span>
                    {award.featured && (
                      <Trophy className="w-4 h-4 text-amber-500 inline-block md:hidden" />
                    )}
                  </h3>
                </div>

                {/* Award Description & Trophy Icon (Middle Column) */}
                <div className="md:w-1/2 flex items-center justify-between gap-4">
                  <p className="text-neutral-500 text-sm sm:text-base leading-relaxed font-normal">
                    {award.description}
                  </p>

                  {award.badge && (
                    <span className="trophy-badge text-2xl sm:text-3xl shrink-0 inline-block">
                      {award.badge}
                    </span>
                  )}
                </div>

                {/* Award Year (Right Column) */}
                <div className="md:w-1/6 text-left md:text-right shrink-0">
                  <span className="text-lg sm:text-xl font-bold text-neutral-900 font-mono tracking-tight group-hover:text-red-600 group-hover:translate-x-[-4px] inline-block transition-all">
                    {award.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
