
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      {/* Decorative elements */}
      <div className="absolute left-[10%] top-[20%] w-48 h-48 rounded-full bg-celestial-deep-purple/30 celestial-blur animate-pulse-gentle"></div>
      <div className="absolute right-[5%] bottom-[30%] w-64 h-64 rounded-full bg-primary/20 celestial-blur animate-pulse-gentle"></div>
      
      {/* Animated circle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full opacity-30 circle-orbit animate-rotate-slow"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full opacity-20 circle-orbit animate-rotate-slower"></div>

      {/* Content */}
      <motion.div 
        className="text-center relative z-10 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-white via-celestial-stardust to-celestial-gold bg-clip-text text-transparent leading-tight">
          Celestial Guidance
        </h1>
        <p className="text-lg md:text-xl text-celestial-stardust mb-10 max-w-xl mx-auto font-light">
          Discover your cosmic path through personalized astrological readings that illuminate your journey and reveal the mysteries written in the stars.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Button 
            className="bg-celestial-gold hover:bg-celestial-amber text-black text-lg py-6 px-8 rounded-md group transition-all duration-300"
            onClick={() => {
              const bookingSection = document.getElementById('booking');
              if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span>Book a Reading</span>
            <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
          </Button>
          <Button 
            variant="outline" 
            className="border-celestial-stardust text-celestial-stardust hover:bg-celestial-stardust/10 text-lg py-6 px-8 rounded-md"
            onClick={() => {
              const servicesSection = document.getElementById('services');
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Explore Services
          </Button>
        </div>
        
        {/* Animated icon */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
