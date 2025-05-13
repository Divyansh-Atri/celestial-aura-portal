
import { TimeSlot } from './TimeSlotPicker';

// Check if date is in the past
export const isPastDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

// Sample time slots - in a real app, these would be dynamically loaded based on availability
export const getDefaultTimeSlots = (): TimeSlot[] => [
  { id: '1', time: '10:00 AM', available: true },
  { id: '2', time: '11:30 AM', available: true },
  { id: '3', time: '1:00 PM', available: false },
  { id: '4', time: '2:30 PM', available: true },
  { id: '5', time: '4:00 PM', available: true },
  { id: '6', time: '5:30 PM', available: false },
];

export interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string | undefined;
  message: string;
  submittedAt: string;
}

export const createAppointmentData = (
  name: string,
  email: string,
  phone: string,
  service: string,
  selectedDate: Date,
  timeSlot: TimeSlot | undefined,
  message: string
): AppointmentData => {
  return {
    name,
    email,
    phone,
    service,
    date: format(selectedDate, 'MMMM dd, yyyy'),
    time: timeSlot?.time,
    message,
    submittedAt: new Date().toISOString()
  };
};

// Import format here to avoid duplicate imports in consuming components
import { format } from 'date-fns';
