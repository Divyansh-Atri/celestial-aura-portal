
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

const AppointmentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Sample time slots - in a real app, these would be dynamically loaded based on availability
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '10:00 AM', available: true },
    { id: '2', time: '11:30 AM', available: true },
    { id: '3', time: '1:00 PM', available: false },
    { id: '4', time: '2:30 PM', available: true },
    { id: '5', time: '4:00 PM', available: true },
    { id: '6', time: '5:30 PM', available: false },
  ];
  
  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !service || !selectedDate || !selectedTimeSlot) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // In a real app, this would send the booking to a server
    toast.success("Your appointment request has been received!", {
      description: "We'll confirm your booking via email shortly."
    });
    
    // Reset form
    setName('');
    setEmail('');
    setService('');
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setMessage('');
  };
  
  // Generate calendar days for current month view
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Generate calendar grid
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  
  const days = [];
  // Add empty cells for days before the first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  // Add days of month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  // Next and previous month navigation
  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };
  
  // Check if date is in the past
  const isPastDate = (day: number) => {
    const today = new Date();
    const checkDate = new Date(year, month, day);
    return checkDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };
  
  // Check if date is selectable (not in past, not a Sunday)
  const isDateSelectable = (day: number) => {
    if (!day) return false;
    if (isPastDate(day)) return false;
    
    const checkDate = new Date(year, month, day);
    return checkDate.getDay() !== 0; // Sunday = 0
  };

  return (
    <div className="glass-effect rounded-lg p-6">
      <form onSubmit={handleBookAppointment}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="name" className="text-celestial-stardust mb-2 block">Your Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-celestial-dark-blue/50 border-celestial-stardust/20 text-celestial-stardust"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-celestial-stardust mb-2 block">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-celestial-dark-blue/50 border-celestial-stardust/20 text-celestial-stardust"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <Label htmlFor="service" className="text-celestial-stardust mb-2 block">Select Service</Label>
          <Select
            value={service}
            onValueChange={setService}
          >
            <SelectTrigger className="bg-celestial-dark-blue/50 border-celestial-stardust/20 text-celestial-stardust">
              <SelectValue placeholder="Choose a reading type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="birth-chart">Birth Chart Reading</SelectItem>
              <SelectItem value="compatibility">Relationship Compatibility</SelectItem>
              <SelectItem value="career">Career Path Reading</SelectItem>
              <SelectItem value="transit">Transit Forecast</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="mb-6">
          <Label className="text-celestial-stardust mb-2 block">Select Date</Label>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <Button 
                type="button"
                variant="ghost" 
                onClick={prevMonth}
                className="text-celestial-stardust hover:text-celestial-gold"
              >
                ← Prev
              </Button>
              <h3 className="text-celestial-gold font-serif">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <Button 
                type="button"
                variant="ghost" 
                onClick={nextMonth}
                className="text-celestial-stardust hover:text-celestial-gold"
              >
                Next →
              </Button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, i) => (
                <div key={i} className="text-xs text-celestial-stardust/70 py-1">{day}</div>
              ))}
              
              {days.map((day, i) => (
                <div key={i} className="aspect-square">
                  {day ? (
                    <button
                      type="button"
                      onClick={() => isDateSelectable(day) ? setSelectedDate(new Date(year, month, day)) : null}
                      disabled={!isDateSelectable(day)}
                      className={`w-full h-full flex items-center justify-center text-sm rounded-full
                        ${isPastDate(day) ? 'text-celestial-stardust/30 cursor-not-allowed' : 
                          selectedDate && 
                          selectedDate.getDate() === day && 
                          selectedDate.getMonth() === month &&
                          selectedDate.getFullYear() === year ? 
                            'bg-celestial-gold text-celestial-midnight' : 
                            'text-celestial-stardust hover:bg-celestial-gold/20'}
                      `}
                    >
                      {day}
                    </button>
                  ) : (
                    <span className="w-full h-full flex items-center justify-center text-sm"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {selectedDate && (
            <div className="mb-6">
              <Label className="text-celestial-stardust mb-2 block">
                Available Times for {formatDate(selectedDate)}
              </Label>
              <div className="appointment-grid">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setSelectedTimeSlot(slot.id)}
                    className={`time-slot p-2 text-sm text-center border rounded-md
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
          )}
        </div>
        
        <div className="mb-6">
          <Label htmlFor="message" className="text-celestial-stardust mb-2 block">Additional Information (Optional)</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share any specific questions or areas you'd like the reading to focus on..."
            className="bg-celestial-dark-blue/50 border-celestial-stardust/20 text-celestial-stardust h-32"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-celestial-gold hover:bg-celestial-amber text-celestial-midnight font-bold py-3"
        >
          Book Your Reading
        </Button>
      </form>
    </div>
  );
};

export default AppointmentForm;
