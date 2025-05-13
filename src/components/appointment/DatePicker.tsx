
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  disabledDatesFn?: (date: Date) => boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ 
  selectedDate, 
  onDateSelect,
  disabledDatesFn
}) => {
  return (
    <div className="mb-6">
      <Label className="text-celestial-stardust mb-2 block">Select Date *</Label>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal bg-celestial-dark-blue/50 border-celestial-stardust/20",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            disabled={disabledDatesFn}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
