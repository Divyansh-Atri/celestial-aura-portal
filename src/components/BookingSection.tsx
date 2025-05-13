
import React from 'react';
import AppointmentForm from './AppointmentForm';

const BookingSection: React.FC = () => {
  return (
    <section id="booking" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-celestial-stardust to-celestial-gold bg-clip-text text-transparent">
            Book Your Reading
          </h2>
          <p className="text-celestial-stardust max-w-2xl mx-auto text-lg">
            Take the first step towards clarity and cosmic guidance. Schedule your personalized astrological reading today.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-celestial-deep-purple/30 celestial-blur"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/20 celestial-blur"></div>
          
          <AppointmentForm />
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
