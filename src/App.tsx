import { Hero } from './components/Hero';
import { WorkShowcase } from './components/WorkShowcase';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AwardsSection } from './components/AwardsSection';
import { BlogSection } from './components/BlogSection';
import { ClientsSection } from './components/ClientsSection';

export default function App() {
  return (
    <main id="app-root" className="min-h-screen bg-black text-white antialiased">
      <Hero />
      <WorkShowcase />
      <ServicesSection />
      <TestimonialsSection />
      <AwardsSection />
      <BlogSection />
      <ClientsSection />
    </main>
  );
}


