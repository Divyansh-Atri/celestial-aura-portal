
import React from 'react';
import { Button } from '@/components/ui/button';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <div className="lg:w-2/5 relative">
            <div className="rounded-full w-64 h-64 md:w-80 md:h-80 overflow-hidden border-4 border-celestial-gold/30 shadow-lg relative z-10">
              {/* This would be the astrologer's photo */}
              <div className="w-full h-full bg-gradient-to-br from-celestial-deep-purple to-celestial-midnight flex items-center justify-center">
                <span className="text-celestial-gold text-6xl font-serif">A</span>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-88 md:h-88 rounded-full border border-celestial-stardust/30 animate-rotate-slower"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-celestial-gold/10 celestial-blur"></div>
          </div>
          
          {/* Content */}
          <div className="lg:w-3/5">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 bg-gradient-to-r from-celestial-stardust to-celestial-gold bg-clip-text text-transparent">
              About Your Astrologer
            </h2>
            
            <p className="text-celestial-stardust mb-6 text-lg">
              With over a decade of experience studying the celestial bodies and their influence on human lives, 
              I've dedicated my career to helping people find clarity, purpose, and direction through 
              the ancient wisdom of astrology.
            </p>
            
            <p className="text-celestial-stardust mb-6 text-lg">
              My approach combines traditional astrological techniques with modern psychological insights, 
              offering you a unique perspective on your life's journey. I believe that the stars don't 
              dictate your fate—they illuminate possibilities.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="glass-effect p-4 rounded-lg">
                <p className="font-serif text-celestial-gold text-xl mb-1">10+ Years</p>
                <p className="text-sm text-celestial-stardust">Professional Experience</p>
              </div>
              <div className="glass-effect p-4 rounded-lg">
                <p className="font-serif text-celestial-gold text-xl mb-1">1,000+</p>
                <p className="text-sm text-celestial-stardust">Satisfied Clients</p>
              </div>
              <div className="glass-effect p-4 rounded-lg">
                <p className="font-serif text-celestial-gold text-xl mb-1">5 Stars</p>
                <p className="text-sm text-celestial-stardust">Average Rating</p>
              </div>
              <div className="glass-effect p-4 rounded-lg">
                <p className="font-serif text-celestial-gold text-xl mb-1">Certified</p>
                <p className="text-sm text-celestial-stardust">Professional Astrologer</p>
              </div>
            </div>
            
            <Button className="bg-celestial-gold hover:bg-celestial-amber text-black">
              Learn More About My Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
