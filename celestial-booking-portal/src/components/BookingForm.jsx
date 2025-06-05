import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, User, Mail, Phone, Star } from 'lucide-react';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    appointmentDate: '',
    appointmentTime: '',
    service: 'Astrology Reading',
    status: 'upcoming'
  });
  const [errors, setErrors] = useState({});
  const { toast } = useToast();

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Appointment date is required';
    }

    if (!formData.appointmentTime) {
      newErrors.appointmentTime = 'Appointment time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Create appointment directly without authentication
      const response = await axios.post('http://localhost:4999/api/appointments', formData);
      
      toast({
        title: "Booking Successful!",
        description: "Your cosmic consultation has been scheduled successfully.",
      });

      // Reset form
      setFormData({
        patientName: '',
        email: '',
        phone: '',
        appointmentDate: '',
        appointmentTime: '',
        service: 'Astrology Reading',
        status: 'upcoming'
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      const errorMessage = error.response?.data?.message || "Failed to schedule your cosmic consultation. Please try again.";
      
      toast({
        title: "Booking Failed",
        description: errorMessage,
        variant: "destructive",
      });

      // If the error is about an already booked slot, clear the time selection
      if (errorMessage.includes("already booked")) {
        setFormData(prev => ({ ...prev, appointmentTime: '' }));
      }
    }
  };

  const handleInputChange = (field, value) => {
    if (field === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setFormData(prev => ({ ...prev, phone: numericValue }));
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="max-w-4xl mx-auto bg-black/20 backdrop-blur-md border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-center text-white text-2xl flex items-center justify-center gap-2">
          <Star className="w-6 h-6 text-yellow-400" />
          Book Your Cosmic Reading
          <Star className="w-6 h-6 text-yellow-400" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="patientName" className="text-purple-200 flex items-center gap-2">
                <User className="w-4 h-4" />
                Your Name *
              </Label>
              <Input
                id="patientName"
                value={formData.patientName}
                onChange={(e) => handleInputChange('patientName', e.target.value)}
                className="bg-black/20 border-purple-400/50 text-white placeholder:text-purple-300"
                placeholder="Enter your full name"
              />
              {errors.patientName && <p className="text-red-400 text-sm">{errors.patientName}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-200 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-black/20 border-purple-400/50 text-white placeholder:text-purple-300"
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-purple-200 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="bg-black/20 border-purple-400/50 text-white placeholder:text-purple-300"
                placeholder="1234567890"
                maxLength={10}
              />
              {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
            </div>

            {/* Appointment Date */}
            <div className="space-y-2">
              <Label htmlFor="appointmentDate" className="text-purple-200 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Reading Date *
              </Label>
              <Input
                id="appointmentDate"
                type="date"
                value={formData.appointmentDate}
                onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                className="bg-black/20 border-purple-400/50 text-white placeholder:text-purple-300"
              />
              {errors.appointmentDate && <p className="text-red-400 text-sm">{errors.appointmentDate}</p>}
            </div>

            {/* Appointment Time */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="appointmentTime" className="text-purple-200 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Reading Time *
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    onClick={() => handleInputChange('appointmentTime', time)}
                    variant={formData.appointmentTime === time ? "default" : "outline"}
                    className={`${
                      formData.appointmentTime === time
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-black/20 border-purple-400/50 text-white hover:bg-purple-600/20'
                    }`}
                  >
                    {time}
                  </Button>
                ))}
              </div>
              {errors.appointmentTime && <p className="text-red-400 text-sm">{errors.appointmentTime}</p>}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-lg"
            >
              Book Your Reading
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
