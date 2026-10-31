import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import ContactModal from './components/ContactModal';
import ClickSparkEffect from './components/ClickSparkEffect';
import CustomCursor from './components/CustomCursor';

export const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div
      className="bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit'] min-h-screen w-full relative"
      style={{ overflowX: 'clip' }}
    >
      {/* Dynamic Cyber Click Sparks & Shockwave Animation */}
      <ClickSparkEffect />

      {/* Futuristic Interactive Cursor with Tap Squash & Hover Feedback */}
      <CustomCursor />

      {/* 1. Hero Section */}
      <HeroSection onContactClick={() => setIsContactOpen(true)} />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection onContactClick={() => setIsContactOpen(true)} />

      {/* 4. Services Section */}
      <ServicesSection />

      {/* 5. Projects Section */}
      <ProjectsSection />

      {/* Contact Section & Credentials */}
      <ContactSection />

      {/* Interactive Contact & Message Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};

export default App;

