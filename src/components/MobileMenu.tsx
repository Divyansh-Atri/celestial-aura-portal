
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Star } from 'lucide-react';

type MobileMenuProps = {
  sections: { id: string; label: string }[];
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ sections, activeSection, scrollToSection }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="text-celestial-stardust hover:text-celestial-gold">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-celestial-midnight/95 backdrop-blur-md border-celestial-deep-purple">
        <nav className="mt-12">
          <div className="flex items-center mb-8">
            <Star className="w-6 h-6 text-celestial-gold mr-2" />
            <span className="text-xl font-serif font-bold text-celestial-gold">Celestial Guidance</span>
          </div>
          <div className="flex flex-col space-y-4">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                }}
                className={`flex items-center space-x-2 px-3 py-2 text-left rounded-md transition-colors ${
                  activeSection === item.id
                    ? 'text-celestial-gold bg-celestial-deep-purple/30'
                    : 'text-celestial-stardust hover:bg-celestial-deep-purple/20'
                }`}
              >
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
