
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ServiceSelectProps {
  service: string;
  setService: (value: string) => void;
}

const ServiceSelect: React.FC<ServiceSelectProps> = ({ service, setService }) => {
  return (
    <div className="mb-6">
      <Label htmlFor="service" className="text-celestial-stardust mb-2 block">Select Service *</Label>
      <Select
        value={service}
        onValueChange={setService}
        required
      >
        <SelectTrigger className="bg-celestial-dark-blue/50 border-celestial-stardust/20 text-celestial-stardust">
          <SelectValue placeholder="Choose a reading type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="birth-chart">Birth Chart Reading</SelectItem>
          <SelectItem value="compatibility">Relationship Compatibility</SelectItem>
          <SelectItem value="career">Career Path Reading</SelectItem>
          <SelectItem value="transit">Transit Forecast</SelectItem>
          <SelectItem value="custom">Custom Consultation</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ServiceSelect;
