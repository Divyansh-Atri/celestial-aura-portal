
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

const AppointmentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Sample time slots - in a real app, these would be dynamically loaded based on availability
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '10:00 AM', available: true },
    { id: '2', time: '11:30 AM', available: true },
    { id: '3', time: '1:00 PM', available: false },
    { id: '4', time: '2:30 PM', available: true },
    { id: '5', time: '4:00 PM', available: true },
    { id: '6', time: '5:30 PM', available: false },
  ];

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !service || !selectedDate || !selectedTimeSlot || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Get the selected time slot text
      const timeSlot = timeSlots.find(slot => slot.id === selectedTimeSlot);
      
      // Create the appointment data object
      const appointmentData = {
        name,
        email,
        phone,
        service,
        date: format(selectedDate, 'MMMM dd, yyyy'),
        time: timeSlot?.time,
        message,
        submittedAt: new Date().toISOString()
      };
      
      // In a real application, you would send this data to a server
      // For this example, we'll simulate a network request with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Appointment booked:', appointmentData);
      
      // Show success message
      toast.success("Appointment Booked Successfully!", {
        description: `Your appointment on ${format(selectedDate, 'MMMM dd, yyyy')} at ${timeSlot?.time} has been sent to the astrologer. You'll receive a confirmation email shortly.`,
        duration: 6000
      });
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setService('');
      setSelectedDate(null);
      setSelectedTimeSlot(null);
      setMessage('');
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Check if date is in the past
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  
  return (
    <div className="glass-effect rounded-lg p-6">
      <form onSubmit={handleBookAppointment}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="name" className="text-celestial-stardust mb-2 block">Your Name *</Label>
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
            <Label htmlFor="email" className="text-celestial-stardust mb-2 block">Email Address *</Label>
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
          <Label htmlFor="phone" className="text-celestial-stardust mb-2 block">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-celestial-dark-blue/50 border-celestial-stardust/20 text-celestial-stardust"
            placeholder="Your phone number"
            required
          />
        </div>
        
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
                onSelect={setSelectedDate}
                disabled={(date) => isPastDate(date) || date.getDay() === 0}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          
          {selectedDate && (
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
                    onClick={() => setSelectedTimeSlot(slot.id)}
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
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              Processing...
            </>
          ) : (
            'Book Your Reading'
          )}
        </Button>
      </form>
    </div>
  );
};

export default AppointmentForm;
