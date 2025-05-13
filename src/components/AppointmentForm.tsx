
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

// Import our new components
import AppointmentFormField from './appointment/AppointmentFormField';
import DatePicker from './appointment/DatePicker';
import ServiceSelect from './appointment/ServiceSelect';
import TimeSlotPicker, { TimeSlot } from './appointment/TimeSlotPicker';
import { 
  isPastDate, 
  getDefaultTimeSlots, 
  createAppointmentData 
} from './appointment/appointmentUtils';

const AppointmentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use our utility to get the time slots
  const timeSlots: TimeSlot[] = getDefaultTimeSlots();

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !service || !selectedDate || !selectedTimeSlot || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Get the selected time slot
      const timeSlot = timeSlots.find(slot => slot.id === selectedTimeSlot);
      
      if (!timeSlot || !selectedDate) {
        throw new Error('Invalid time slot or date selection');
      }
      
      // Create the appointment data
      const appointmentData = {
        name,
        email,
        phone,
        service,
        date: format(selectedDate, 'MMMM dd, yyyy'),
        time: timeSlot.time,
        message,
        submittedAt: new Date().toISOString()
      };
      
      // In a real application, you would send this data to a server
      // For this example, we'll simulate a network request with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Appointment booked:', appointmentData);
      
      // Show success message
      toast.success("Appointment Booked Successfully!", {
        description: `Your appointment on ${format(selectedDate, 'MMMM dd, yyyy')} at ${timeSlot.time} has been sent to the astrologer. You'll receive a confirmation email shortly.`,
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
  
  return (
    <div className="glass-effect rounded-lg p-6">
      <form onSubmit={handleBookAppointment}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <AppointmentFormField
            id="name"
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
          <AppointmentFormField
            id="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="mb-6">
          <AppointmentFormField
            id="phone"
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            placeholder="Your phone number"
            required
          />
        </div>
        
        <ServiceSelect service={service} setService={setService} />
        
        <DatePicker 
          selectedDate={selectedDate} 
          onDateSelect={setSelectedDate}
          disabledDatesFn={(date) => isPastDate(date) || date.getDay() === 0}
        />
        
        {selectedDate && (
          <TimeSlotPicker
            selectedDate={selectedDate}
            timeSlots={timeSlots}
            selectedTimeSlot={selectedTimeSlot}
            onTimeSlotSelect={setSelectedTimeSlot}
          />
        )}
        
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
