import React from 'react';
import CelestialBackground from '@/components/CelestialBackground';
import BookingForm from '@/components/BookingForm';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Moon, Sun, Sparkles, Clock } from 'lucide-react';

const Index = () => {
  const services = [
    {
      icon: Star,
      title: "Birth Chart Reading",
      description: "Discover your cosmic blueprint and understand your life's purpose through detailed natal chart analysis."
    },
    {
      icon: Moon,
      title: "Tarot Guidance",
      description: "Receive divine insights and clarity about your path through ancient tarot wisdom."
    },
    {
      icon: Sun,
      title: "Numerology Analysis",
      description: "Unlock the mystical power of numbers and their influence on your destiny."
    }
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <CelestialBackground />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-fade-in">
              Celestial Wisdom
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto animate-fade-in">
              Unlock the mysteries of the universe and discover your cosmic destiny through ancient astrological wisdom
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 animate-pulse">
              <Sparkles size={24} />
              <span className="text-lg font-semibold">Connect with the cosmos today</span>
              <Sparkles size={24} />
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="bg-black/20 backdrop-blur-md border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <IconComponent size={32} className="text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-purple-200 leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Booking Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Begin Your Cosmic Journey
              </h2>
              <p className="text-lg text-purple-200 max-w-2xl mx-auto">
                Schedule a personalized consultation with our expert astrologer and let the stars illuminate your path forward
              </p>
            </div>
            <BookingForm />
          </section>

          {/* About Section */}
          <section className="text-center">
            <Card className="bg-black/20 backdrop-blur-md border-purple-500/30 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white mb-6">Meet Your Cosmic Guide</h2>
                <p className="text-purple-200 text-lg leading-relaxed mb-6">
                  With over 15 years of experience in astrological practice, I combine ancient wisdom with modern insights 
                  to help you navigate life's challenges and opportunities. My readings blend traditional techniques with 
                  intuitive guidance to provide you with the clarity and direction you seek.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
                    <div className="text-purple-200">Happy Clients</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">15+</div>
                    <div className="text-purple-200">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">98%</div>
                    <div className="text-purple-200">Satisfaction Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 text-center border-t border-purple-500/30">
          <p className="text-purple-300">
            © 2024 Celestial Wisdom. May the stars guide your journey.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
