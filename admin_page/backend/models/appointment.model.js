import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
    default: 'Astrology Reading'  // Default service type
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'done', 'cancelled'],
    default: 'upcoming',
  },
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
    required: true
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Update the updatedAt timestamp before saving
AppointmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const Appointment = mongoose.model("Appointment", AppointmentSchema); 