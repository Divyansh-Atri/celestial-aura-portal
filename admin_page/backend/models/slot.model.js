import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
  time: String,
  isBooked: { type: Boolean, default: false },
  phone: String,
  email: String
});

export const Slot = mongoose.model("Slot", SlotSchema);