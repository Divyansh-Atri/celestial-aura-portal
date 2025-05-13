
import React from 'react';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';

export type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

interface TimeSlotPickerProps {
  selectedDate: Date | null;
  timeSlots: TimeSlot[];
  selectedTimeSlot: string | null;
  onTimeSlotSelect: (slotId: string) => void;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  selectedDate,
  timeSlots,
  selectedTimeSlot,
  onTimeSlotSelect,
}) => {
  if (!selectedDate) return null;

  return (
    <div className="mt-6">
      <Label className="text-celestial-stardust mb-2 block">
        Available Times for {format(selectedDate, 'MMMM dd, yyyy')} *
      </Label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {timeSlots.map((slot) => (
          <button
            key={slot.id}
            type="button"
            disabled={!slot.available}
            onClick={() => onTimeSlotSelect(slot.id)}
            className={`p-2 text-sm text-center border rounded-md transition
              ${!slot.available ? 'border-celestial-stardust/10 text-celestial-stardust/30 cursor-not-allowed' : 
                selectedTimeSlot === slot.id ? 'bg-celestial-gold/20 border-celestial-gold text-celestial-gold' : 
                  'border-celestial-stardust/20 text-celestial-stardust hover:bg-celestial-gold/10'}
            `}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotPicker;
