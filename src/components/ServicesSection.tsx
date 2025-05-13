
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ServicesSection: React.FC = () => {
  const services = [
    {
      title: "Birth Chart Reading",
      description: "Discover your cosmic blueprint with a comprehensive analysis of your natal chart, revealing your strengths, challenges, and life purpose.",
      duration: "90 minutes",
      price: "$150",
      icon: "🌟"
    },
    {
      title: "Relationship Compatibility",
      description: "Explore the astrological dynamics between you and your partner to better understand your connection and navigate your journey together.",
      duration: "75 minutes",
      price: "$185",
      icon: "❤️"
    },
    {
      title: "Career Path Reading",
      description: "Uncover your professional potential and ideal career paths by analyzing the vocational indicators in your birth chart.",
      duration: "60 minutes",
      price: "$120",
      icon: "💼"
    },
    {
      title: "Transit Forecast",
      description: "Prepare for upcoming energetic shifts with a detailed forecast of how planetary movements will influence your life in the months ahead.",
      duration: "60 minutes",
      price: "$120",
      icon: "🔮"
    }
  ];

  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-celestial-stardust to-celestial-gold bg-clip-text text-transparent">
            Astrological Services
          </h2>
          <p className="text-celestial-stardust max-w-2xl mx-auto text-lg">
            Each reading is personalized to provide insights specific to your unique celestial blueprint.
            Discover guidance that resonates with your soul's journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="glass-effect overflow-hidden group hover:border-celestial-gold/30 transition-all duration-300">
              <div className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-serif font-bold mb-3 text-celestial-gold">{service.title}</h3>
                <p className="text-celestial-stardust mb-6 text-sm min-h-[80px]">{service.description}</p>
                
                <div className="flex justify-between items-center mb-6 text-sm">
                  <span className="text-celestial-stardust">{service.duration}</span>
                  <span className="text-celestial-gold font-bold">{service.price}</span>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full border-celestial-stardust hover:bg-celestial-gold hover:text-celestial-midnight transition-all duration-300"
                >
                  Book Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-celestial-stardust mb-6">
            Looking for something more specific? Custom readings are available upon request.
          </p>
          <Button className="bg-celestial-gold hover:bg-celestial-amber text-black">
            Request Custom Reading
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
