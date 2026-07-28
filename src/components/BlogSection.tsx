import { useState, useEffect, useRef, MouseEvent } from 'react';
import { ArrowRight, X, Clock, Tag, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import laptopMockupImg from '../assets/images/blog_laptop_mockup_1785218425740.jpg';
import phoneMockupImg from '../assets/images/blog_phone_mockup_1785218443150.jpg';
import neonLaptopImg from '../assets/images/blog_laptop_neon_1785218462778.jpg';

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
  content: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'why-ux-matters',
    title: 'Freelance Why UX Matters.',
    date: 'Jan 12, 2025',
    readTime: '5 min read',
    category: 'UX Strategy',
    image: laptopMockupImg,
    featured: true,
    content: [
      'In today\'s crowded digital ecosystem, user experience is no longer a luxury feature—it is the core engine driving customer acquisition and long-term brand equity.',
      'When freelancing or partnering with high-growth startups, focusing purely on visual flair without grounding interface decisions in real user behaviors often results in high bounce rates and low conversion velocity.',
      'By implementing systematic usability tests, clear content hierarchies, and frictionless interaction micro-states, products convert casual site visitors into passionate brand advocates.'
    ]
  },
  {
    id: 'my-design-process',
    title: 'My Design Process.',
    date: 'Feb 2, 2025',
    readTime: '4 min read',
    category: 'Workflow',
    image: phoneMockupImg,
    content: [
      'Great design is an iterative loop of discovery, prototype, validation, and refine. It begins with empathy mapping to uncover genuine user friction points.',
      'Moving rapidly from low-fidelity wireframe sketches in Figma to high-fidelity motion prototypes allows stakeholders to feel the product interactions before a single line of code is committed.'
    ]
  },
  {
    id: 'top-5-ux-mistakes',
    title: 'Top 5 UX Mistakes.',
    date: 'Mar 18, 2025',
    readTime: '6 min read',
    category: 'Best Practices',
    image: neonLaptopImg,
    content: [
      '1. Overcomplicating Navigation: Users shouldn\'t need a manual to find your core value proposition.',
      '2. Ignoring Mobile Touch Targets: Buttons must be at least 44px to accommodate natural tap gestures.',
      '3. Poor Color Contrast Ratio: Accessible typography builds trust with every single visitor.',
      '4. Unnecessary Form Fields: Cut conversion barrier friction by asking only for essential data upfront.'
    ]
  }
];

export function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [viewAllModalOpen, setViewAllModalOpen] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
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

      // Stagger Cards scale & reveal
      const cards = gsap.utils.toArray<HTMLElement>('.gsap-blog-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 800,
    });
  };

  const handleCardMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <section ref={sectionRef} id="blog-section" className="w-full bg-white text-neutral-900 py-16 sm:py-24 px-6 sm:px-10 lg:px-16 font-sans border-t border-neutral-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header Row with Red Dot Eyebrow, Main Title & "View All" Red Pill Button */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3">
            {/* Eyebrow Label with Red Dot */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-neutral-700 uppercase">
              <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-pulse" />
              <span>BLOGS</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-tight">
              From My Desk: Blogs
              <br />
              & Creative Notes.
            </h2>
          </div>

          {/* Red Pill Button ("View All") */}
          <div className="self-start md:self-end">
            <button
              id="view-all-blogs-btn"
              onClick={() => setViewAllModalOpen(true)}
              className="group flex items-center gap-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-sm sm:text-base px-6 py-2.5 rounded-full shadow-md shadow-red-600/20 transition-all duration-200 cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-red-600 transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span>View All</span>
            </button>
          </div>
        </div>

        {/* 3 Blog Cards Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Featured Large Left Card (Takes 6 cols) */}
          {BLOG_POSTS.slice(0, 1).map((post) => (
            <div
              key={post.id}
              id={`blog-card-${post.id}`}
              className="gsap-blog-card lg:col-span-6 group cursor-pointer"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black mb-4 shadow-sm border border-neutral-200/80 group-hover:shadow-xl transition-shadow duration-300">
                <img
                  src={post.image}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-medium text-neutral-400 font-mono tracking-tight">
                  {post.date}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 group-hover:text-red-600 transition-colors duration-200 leading-snug">
                  {post.title}
                </h3>
              </div>
            </div>
          ))}

          {/* Right 2 Smaller Cards Stack (Each takes 3 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {BLOG_POSTS.slice(1).map((post) => (
              <div
                key={post.id}
                id={`blog-card-${post.id}`}
                className="gsap-blog-card group cursor-pointer"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black mb-4 shadow-sm border border-neutral-200/80 group-hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-neutral-400 font-mono tracking-tight">
                    {post.date}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 group-hover:text-red-600 transition-colors duration-200 leading-snug">
                    {post.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Blog Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6 sm:p-8 text-neutral-900 shadow-2xl"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-5 right-5 p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 bg-neutral-100">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-neutral-500 mb-3">
                <span className="flex items-center gap-1 bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md">
                  <Tag className="w-3 h-3 text-red-600" />
                  {selectedPost.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedPost.readTime}
                </span>
                <span>• {selectedPost.date}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4 leading-tight">
                {selectedPost.title}
              </h2>

              <div className="space-y-4 text-neutral-600 text-base leading-relaxed border-t border-neutral-100 pt-4">
                {selectedPost.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="flex items-center justify-end border-t border-neutral-100 pt-5 mt-6">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="bg-neutral-900 hover:bg-black text-white font-semibold text-sm px-6 py-2.5 rounded-full cursor-pointer transition-all"
                >
                  Done Reading
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View All Articles Modal */}
      <AnimatePresence>
        {viewAllModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl p-6 sm:p-8 text-neutral-900 shadow-2xl"
            >
              <button
                onClick={() => setViewAllModalOpen(false)}
                className="absolute top-5 right-5 p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 mb-1">
                <Sparkles className="w-4 h-4" />
                <span>ALL ARTICLES & NOTES</span>
              </div>
              <h3 className="text-3xl font-bold text-neutral-900 mb-6">
                From My Desk Archive
              </h3>

              <div className="divide-y divide-neutral-100">
                {BLOG_POSTS.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => {
                      setViewAllModalOpen(false);
                      setSelectedPost(post);
                    }}
                    className="py-5 flex items-center justify-between gap-4 group cursor-pointer hover:bg-neutral-50 p-3 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-xs text-neutral-400 font-mono">{post.date}</span>
                        <h4 className="text-lg font-bold text-neutral-900 group-hover:text-red-600 transition-colors">
                          {post.title}
                        </h4>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
