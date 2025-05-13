
import React, { useState, useEffect } from 'react';
import CelestialBackground from '@/components/CelestialBackground';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BookingSection from '@/components/BookingSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import MobileMenu from '@/components/MobileMenu';
import { ChevronUp, Star } from 'lucide-react';

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  // Handle scroll events for navbar styling and section tracking
  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled for navbar styling
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section
      const sections = ['hero', 'about', 'services', 'testimonials', 'booking'];
      const scrollPosition = window.scrollY + 300; // Offset for better UX
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Navigation sections
  const navSections = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'booking', label: 'Book a Reading' },
  ];
  
  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="relative">
      {/* Animated background */}
      <CelestialBackground />
      
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-celestial-midnight/90 backdrop-blur-md shadow-md' : 'py-6'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center space-x-2 group">
              <Star className="w-6 h-6 text-celestial-gold group-hover:text-white transition-colors" />
              <span className="text-2xl font-serif font-bold text-celestial-gold">
                Celestial Guidance
              </span>
            </a>
            
            <nav className="hidden md:flex items-center space-x-8">
              {navSections.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-celestial-gold relative ${
                    activeSection === item.id ? 'text-celestial-gold' : 'text-celestial-stardust'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-celestial-gold rounded-full"></span>
                  )}
                </button>
              ))}
              
              <Button 
                onClick={() => scrollToSection('booking')}
                className="bg-celestial-gold hover:bg-celestial-amber text-celestial-midnight font-medium"
              >
                Book Now
              </Button>
            </nav>
            
            <div className="md:hidden">
              <MobileMenu 
                sections={navSections} 
                activeSection={activeSection} 
                scrollToSection={scrollToSection} 
              />
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main>
        <div id="hero">
          <HeroSection />
        </div>
        
        <div id="about">
          <AboutSection />
        </div>
        
        <div id="services">
          <ServicesSection />
        </div>
        
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        
        <div id="booking">
          <BookingSection />
        </div>
      </main>
      
      <Footer />
      
      {/* Back to top button */}
      {isScrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-celestial-gold text-celestial-midnight flex items-center justify-center shadow-lg hover:bg-celestial-amber transition-colors z-40"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Index;
