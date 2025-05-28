
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const BookingForm = () => {
  const [slots, setSlots] = useState([]);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const { toast } = useToast();

  useEffect(() => {
    fetchSlots();
  }, []);

  const validateEmail = (email) => {
    return email.includes('@') && email.includes('.');
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchSlots = () => {
    axios.get('http://localhost:4999/api/auth').then(res => {
      setSlots(res.data);
    }).catch(error => {
      console.error('Error fetching slots:', error);
      toast({
        title: "Error",
        description: "Failed to fetch available slots.",
        variant: "destructive",
      });
    });
  };

  const bookSlot = (id) => {
    if (!validateForm()) {
      return;
    }

    axios.post(`http://localhost:4999/api/auth/book/${id}`, { phone, email })
      .then(() => {
        fetchSlots();
        toast({
          title: "Booking Successful!",
          description: "Your slot has been booked successfully.",
        });
      })
      .catch(error => {
        console.error('Error booking slot:', error);
        toast({
          title: "Booking Failed",
          description: "Failed to book the slot. Please try again.",
          variant: "destructive",
        });
      });
  };

  const handleInputChange = (field, value) => {
    if (field === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setPhone(numericValue);
      }
    } else {
      setEmail(value);
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="max-w-4xl mx-auto bg-black/20 backdrop-blur-md border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-center text-white text-2xl">
          Book Your Cosmic Reading
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-purple-200">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="bg-black/20 border-purple-400/50 text-white placeholder:text-purple-300"
              placeholder="1234567890"
              maxLength={10}
            />
            {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-purple-200">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-black/20 border-purple-400/50 text-white placeholder:text-purple-300"
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Available Time Slots</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {slots.map(slot => (
              <Card key={slot._id} className="bg-black/40 border-purple-400/30">
                <CardContent className="p-4">
                  <h4 className="text-lg font-medium text-white mb-2">{slot.time}</h4>
                  <p className="text-purple-200 mb-3">
                    Status: <span className={slot.isBooked ? 'text-red-400' : 'text-green-400'}>
                      {slot.isBooked ? 'Booked' : 'Available'}
                    </span>
                  </p>
                  {!slot.isBooked && (
                    <Button
                      onClick={() => bookSlot(slot._id)}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      Book This Slot
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
