
import React from 'react';
import { Card } from '@/components/ui/card';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah J.",
      location: "New York",
      quote: "The birth chart reading was incredibly accurate and gave me profound insights about myself that I had never realized. It's like someone finally understood me on a soul level.",
      image: "/placeholder.svg", // Placeholder image
      stars: 5
    },
    {
      name: "Michael T.",
      location: "Los Angeles",
      quote: "The transit forecast helped me navigate a particularly challenging time in my career. The guidance was practical, insightful, and ultimately led to a positive outcome.",
      image: "/placeholder.svg", // Placeholder image
      stars: 5
    },
    {
      name: "Elena R.",
      location: "Chicago",
      quote: "Our compatibility reading helped us understand our relationship dynamics in a whole new light. We now have tools to better communicate and appreciate our differences.",
      image: "/placeholder.svg", // Placeholder image
      stars: 4
    }
  ];

  return (
    <section id="testimonials" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-celestial-stardust to-celestial-gold bg-clip-text text-transparent">
            Client Experiences
          </h2>
          <p className="text-celestial-stardust max-w-2xl mx-auto text-lg">
            Hear from those who have found clarity and guidance through astrological insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-effect p-8 relative overflow-hidden group">
              {/* Decorative element */}
              <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-celestial-gold/10 group-hover:bg-celestial-gold/20 transition-all duration-500"></div>
              
              {/* Quote symbol */}
              <div className="text-4xl text-celestial-gold/30 mb-4">"</div>
              
              <p className="text-celestial-stardust mb-6 italic">{testimonial.quote}</p>
              
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-celestial-deep-purple">
                  {/* Client image would go here */}
                  <div className="w-full h-full flex items-center justify-center text-lg font-bold text-celestial-gold">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <p className="font-serif font-bold text-celestial-gold">{testimonial.name}</p>
                  <p className="text-celestial-stardust text-sm">{testimonial.location}</p>
                </div>
              </div>
              
              {/* Star rating */}
              <div className="absolute bottom-4 right-4 flex">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <span key={i} className="text-celestial-gold">★</span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
