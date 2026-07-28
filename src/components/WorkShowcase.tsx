import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ExternalLink, X, Sparkles } from 'lucide-react';

import beautyBrandImg from '../assets/images/project_beauty_brand_1785216705577.jpg';
import fintechAppImg from '../assets/images/project_fintech_app_1785216727205.jpg';
import onlineLearningImg from '../assets/images/project_online_learning_1785216747445.jpg';
import productivityAppImg from '../assets/images/project_productivity_app_1785216766407.jpg';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  year: string;
  client: string;
  deliverables: string[];
  overview: string;
}

const PROJECTS: Project[] = [
  {
    id: 'beauty-brand',
    title: 'Beauty Brand Website.',
    description: 'Elegant website showcasing beauty products with a clean, modern look.',
    image: beautyBrandImg,
    category: 'E-Commerce / Branding',
    year: '2026',
    client: 'Lumiere Cosmetics',
    deliverables: ['UI/UX Design', 'Design System', '3D Product Rendering', 'Interactive Prototype'],
    overview: 'Designed a high-converting digital storefront for Lumiere Cosmetics. Focused on tactile micro-interactions, seamless product discovery, and elevated editorial typography.',
  },
  {
    id: 'fintech-app',
    title: 'Fintech App UI Design.',
    description: 'Clean and user-friendly UI for modern financial apps.',
    image: fintechAppImg,
    category: 'Mobile Application',
    year: '2026',
    client: 'Aura Financial',
    deliverables: ['iOS App Design', 'Design System', 'Data Visualization', 'User Testing'],
    overview: 'Reimagined personal asset management with real-time portfolio analytics, frictionless peer transfers, and customizable financial goal tracking.',
  },
  {
    id: 'online-learning',
    title: 'Online Learning Platform.',
    description: 'A simple and engaging platform for online learning.',
    image: onlineLearningImg,
    category: 'SaaS Platform',
    year: '2025',
    client: 'EduPulse Technologies',
    deliverables: ['Web App Architecture', 'Instructor Dashboard', 'Course Builder', 'Gamification UI'],
    overview: 'Built an intuitive learning management ecosystem enabling interactive live sessions, student community channels, and automated progress certifications.',
  },
  {
    id: 'productivity-app',
    title: 'Productivity App Redesign.',
    description: 'A clean redesign to enhance focus and productivity.',
    image: productivityAppImg,
    category: 'Productivity Tool',
    year: '2025',
    client: 'Krono Studio',
    deliverables: ['Desktop App UX', 'Keyboard Shortcuts System', 'Dark & Light Themes', 'User Flow Optimization'],
    overview: 'Streamlined task execution for creative directors and developers by replacing bloated menus with command-line fast interactions and distraction-free workspace modes.',
  },
];

export function WorkShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewAllModalOpen, setViewAllModalOpen] = useState(false);

  return (
    <section id="work-showcase" className="w-full bg-white text-neutral-900 py-16 sm:py-24 px-6 sm:px-10 lg:px-16 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3">
            {/* Eyebrow Label with Red Dot */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-neutral-700 uppercase">
              <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-pulse" />
              <span>WORK SHOWCASE</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-tight">
              A Selection of My
              <br />
              Best Work.
            </h2>
          </div>

          {/* Top Right "View All" Button */}
          <button
            id="view-all-projects-btn"
            onClick={() => setViewAllModalOpen(true)}
            className="self-start md:self-end bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-sm px-5 py-2.5 rounded-full flex items-center gap-2.5 shadow-md shadow-red-600/20 transition-all duration-200 cursor-pointer group"
          >
            <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </span>
            <span>View All</span>
          </button>
        </div>

        {/* Projects List */}
        <div className="space-y-12 sm:space-y-16">
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.id}
              id={`project-card-${project.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image Banner */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-2xl overflow-hidden bg-neutral-100 mb-5 shadow-sm border border-neutral-200/80 group-hover:shadow-xl transition-all duration-500">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              {/* Title, Description & Action Button Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 group-hover:text-red-600 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-neutral-500 text-sm sm:text-base mt-1 font-normal">
                    {project.description}
                  </p>
                </div>

                <button
                  id={`view-work-btn-${project.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  className="self-start sm:self-center shrink-0 bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-900 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full border border-neutral-200/80 flex items-center gap-2 transition-all duration-200 cursor-pointer group/btn"
                >
                  <span className="w-5 h-5 bg-neutral-900 text-white group-hover/btn:bg-white group-hover/btn:text-neutral-900 rounded-full flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                  </span>
                  <span>View Work</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6 sm:p-8 text-neutral-900 shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-600 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{selectedProject.category}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                {selectedProject.title}
              </h2>
              <p className="text-neutral-600 text-base mb-6">
                {selectedProject.description}
              </p>

              <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-6 bg-neutral-100">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-neutral-50 rounded-xl mb-6 text-sm">
                <div>
                  <span className="block text-xs font-semibold uppercase text-neutral-400">Client</span>
                  <span className="font-semibold text-neutral-800">{selectedProject.client}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase text-neutral-400">Year</span>
                  <span className="font-semibold text-neutral-800">{selectedProject.year}</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="block text-xs font-semibold uppercase text-neutral-400">Category</span>
                  <span className="font-semibold text-neutral-800">{selectedProject.category}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="text-lg font-bold text-neutral-900">Project Overview</h4>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                  {selectedProject.overview}
                </p>

                <h4 className="text-lg font-bold text-neutral-900 pt-2">Deliverables</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.deliverables.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-semibold bg-neutral-100 text-neutral-700 px-3 py-1.5 rounded-lg"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-neutral-100 pt-5">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => alert(`Launching prototype view for ${selectedProject.title}`)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View All Projects Modal */}
      <AnimatePresence>
        {viewAllModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl p-6 sm:p-8 text-neutral-900 shadow-2xl"
            >
              <button
                onClick={() => setViewAllModalOpen(false)}
                className="absolute top-5 right-5 p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-600 mb-1">
                <span>FULL ARCHIVE</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Complete Portfolio Index</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {PROJECTS.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => {
                      setViewAllModalOpen(false);
                      setSelectedProject(project);
                    }}
                    className="group border border-neutral-200 rounded-xl p-4 hover:border-neutral-900 transition-all cursor-pointer bg-neutral-50/50 hover:bg-white shadow-xs hover:shadow-md"
                  >
                    <div className="w-full aspect-[16/9] rounded-lg overflow-hidden bg-neutral-100 mb-3">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-xs font-bold text-red-600 uppercase">{project.category}</span>
                    <h4 className="font-bold text-lg text-neutral-900 group-hover:text-red-600 transition-colors">{project.title}</h4>
                    <p className="text-xs text-neutral-500 line-clamp-2 mt-1">{project.description}</p>
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
