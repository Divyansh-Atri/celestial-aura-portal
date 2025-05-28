import express from "express";
import { login, signup, verifyEmail , forgotPassword, resetPassword, checkAuth} from '../controllers/auth.controller.js';
import { verifyToken } from "../middleware/verifyToken.js";
import {Slot} from "../models/slot.model.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/logout", async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
});
router.post("/reset-password/:token", resetPassword);
router.get("/check-auth", verifyToken, checkAuth);
// Get all slots
router.get('/', async (req, res) => {
	const slots = await Slot.find();
	res.json(slots);
  });
  
  // Book a slot
  router.post('/book/:id', async (req, res) => {
	const { phone, email } = req.body;
	const updatedSlot = await Slot.findByIdAndUpdate(
	  req.params.id,
	  { isBooked: true, phone, email },
	  { new: true }
	);
	res.json(updatedSlot);
  });
  
  // Create default slots (optional)
  router.post('/create-defaults', async (req, res) => {
	const defaultSlots = [
	  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
	  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
	];
  
	const slots = await Slot.insertMany(
	  defaultSlots.map(time => ({ time }))
	);
	res.json(slots);
  });
  
export default router;
