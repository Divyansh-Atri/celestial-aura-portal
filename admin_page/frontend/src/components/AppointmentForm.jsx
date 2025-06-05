import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Calendar, Clock, User, Mail, Phone } from 'lucide-react';

const AppointmentForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode
}) => {
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    appointmentDate: '',
    appointmentTime: '',
    status: 'upcoming',
    service: 'Astrology Reading'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        patientName: '',
        email: '',
        phone: '',
        appointmentDate: '',
        appointmentTime: '',
        status: 'upcoming',
        service: 'Astrology Reading'
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Create New Appointment' : 'Edit Appointment'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Name */}
            <div className="space-y-2">
              <Label htmlFor="patientName" className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Patient Name *
              </Label>
              <Input
                id="patientName"
                value={formData.patientName}
                onChange={(e) => handleInputChange('patientName', e.target.value)}
                placeholder="Enter patient's full name"
                className={`${errors.patientName ? 'border-red-500' : 'border-gray-200'} focus:border-indigo-500 focus:ring-indigo-500`}
              />
              {errors.patientName && (
                <p className="text-sm text-red-600">{errors.patientName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="patient@email.com"
                className={`${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-indigo-500 focus:ring-indigo-500`}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className={`${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-indigo-500 focus:ring-indigo-500`}
              />
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Appointment Date */}
            <div className="space-y-2">
              <Label htmlFor="appointmentDate" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Appointment Date *
              </Label>
              <Input
                id="appointmentDate"
                type="date"
                value={formData.appointmentDate}
                onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                className={`${errors.appointmentDate ? 'border-red-500' : 'border-gray-200'} focus:border-indigo-500 focus:ring-indigo-500`}
              />
              {errors.appointmentDate && (
                <p className="text-sm text-red-600">{errors.appointmentDate}</p>
              )}
            </div>

            {/* Appointment Time */}
            <div className="space-y-2">
              <Label htmlFor="appointmentTime" className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Appointment Time *
              </Label>
              <select
                id="appointmentTime"
                value={formData.appointmentTime}
                onChange={(e) => handleInputChange('appointmentTime', e.target.value)}
                className={`w-full px-3 py-2 rounded-md border ${
                  errors.appointmentTime ? 'border-red-500' : 'border-gray-200'
                } focus:border-indigo-500 focus:ring-indigo-500`}
              >
                <option value="">Select a time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.appointmentTime && (
                <p className="text-sm text-red-600">{errors.appointmentTime}</p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="done">Done</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {mode === 'create' ? 'Create Appointment' : 'Update Appointment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentForm; 