import { Hero } from './components/Hero';
import { WorkShowcase } from './components/WorkShowcase';
import { ServicesSection } from './components/ServicesSection';

export default function App() {
  return (
    <main id="app-root" className="min-h-screen bg-black text-white antialiased">
      <Hero />
      <WorkShowcase />
      <ServicesSection />
    </main>
  );
}

