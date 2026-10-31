import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import mohitAvatar from '../assets/mohit_avatar.png';

interface HeroSectionProps {
  onContactClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none">
      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-20">
        <nav className="w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
          {["About", "Services", "Projects", "Contact"].map((item) => {
            const targetId = item.toLowerCase();
            return (
              <motion.button
                key={item}
                type="button"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                onClick={() => {
                  if (item === "Contact" && onContactClick) {
                    onContactClick();
                  } else {
                    scrollTo(targetId);
                  }
                }}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
              >
                {item}
              </motion.button>
            );
          })}
        </nav>
      </FadeIn>


      {/* 2. Hero Heading */}
      <div className="w-full overflow-hidden text-center z-0 flex-shrink-0">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5">
            Hi, i&apos;m mohit
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero Portrait with Magnet effect */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <div className="relative group">
              <img
                src={mohitAvatar}
                alt="MD Mohit Khan - AI & Robotics Creator"
                className="w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)] filter brightness-100 contrast-105 pointer-events-none select-none"
                loading="eager"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#0C0C0C]/80 border border-[#D7E2EA]/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-xs text-[#D7E2EA] font-medium tracking-widest uppercase">
                AI/ML Engineer & Robotics
              </div>
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom bar */}
      <div className="w-full flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 z-20 mt-auto pointer-events-auto">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[280px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            an ai/ml engineer & robotics creator crafting intelligent, hardware-driven solutions
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton
            onClick={() => {
              if (onContactClick) {
                onContactClick();
              } else {
                scrollTo('contact');
              }
            }}
          />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
