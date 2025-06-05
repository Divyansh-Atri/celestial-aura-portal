import express from "express";
import { login, signup, verifyEmail, forgotPassword, resetPassword, checkAuth } from '../controllers/auth.controller.js';
import { verifyToken } from "../middleware/auth.js";
import { Slot } from "../models/slot.model.js";
import { Appointment } from "../models/appointment.model.js";

const router = express.Router();

// Auth routes
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

// Slot routes
router.get('/slots', async (req, res) => {
	const slots = await Slot.find();
	res.json(slots);
});

router.post('/slots/book/:id', async (req, res) => {
	const { phone, email } = req.body;
	const updatedSlot = await Slot.findByIdAndUpdate(
		req.params.id,
		{ isBooked: true, phone, email },
		{ new: true }
	);
	res.json(updatedSlot);
});

router.post('/slots/create-defaults', async (req, res) => {
	const defaultSlots = [
		"09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
		"12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
		"04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
	];

	const slots = await Slot.insertMany(
		defaultSlots.map(time => ({ time }))
	);
	res.json(slots);
});

// Appointment routes
// Get appointments (requires auth for admin)
router.get("/appointments", verifyToken, async (req, res) => {
	try {
		const appointments = await Appointment.find().populate('slotId');
		res.json(appointments);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Create appointment (no auth required for client booking)
router.post("/appointments", async (req, res) => {
	try {
		const { patientName, email, phone, appointmentDate, appointmentTime, status } = req.body;

		// Validate required fields
		if (!patientName || !email || !phone || !appointmentDate || !appointmentTime) {
			return res.status(400).json({ 
				message: "All fields are required: patientName, email, phone, appointmentDate, appointmentTime" 
			});
		}

		// Check if the date is valid (not in the past)
		const selectedDate = new Date(appointmentDate);
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		
		if (selectedDate < today) {
			return res.status(400).json({ 
				message: "Cannot book appointments for past dates" 
			});
		}

		// Find an available slot for the given time
		let slot = await Slot.findOne({
			time: appointmentTime,
			isBooked: false
		});

		if (!slot) {
			// Check if there's already an appointment for this time slot
			const existingAppointment = await Appointment.findOne({
				appointmentDate,
				appointmentTime,
				status: { $ne: 'cancelled' }
			});

			if (existingAppointment) {
				return res.status(400).json({ 
					message: "This time slot is already booked. Please select another time." 
				});
			}

			// Create a new slot if none exists
			slot = await Slot.create({
				time: appointmentTime,
				isBooked: true,
				phone,
				email
			});
		} else {
			// Update existing slot
			slot.isBooked = true;
			slot.phone = phone;
			slot.email = email;
			await slot.save();
		}

		const appointment = new Appointment({
			patientName,
			email,
			phone,
			appointmentDate,
			appointmentTime,
			status: status || 'upcoming',
			slotId: slot._id
		});

		const savedAppointment = await appointment.save();
		res.status(201).json(savedAppointment);
	} catch (error) {
		console.error('Appointment creation error:', error);
		res.status(400).json({ 
			message: error.message || "Failed to create appointment. Please try again." 
		});
	}
});

// Update appointment (requires auth for admin)
router.put("/appointments/:id", verifyToken, async (req, res) => {
	try {
		const appointment = await Appointment.findById(req.params.id);
		if (!appointment) {
			return res.status(404).json({ message: "Appointment not found" });
		}

		const { appointmentTime, status } = req.body;

		// If the time is being changed, handle slot management
		if (appointmentTime && appointmentTime !== appointment.appointmentTime) {
			// Release the old slot
			const oldSlot = await Slot.findById(appointment.slotId);
			if (oldSlot) {
				oldSlot.isBooked = false;
				oldSlot.phone = null;
				oldSlot.email = null;
				await oldSlot.save();
			}

			// Find or create a new slot
			let newSlot = await Slot.findOne({
				time: appointmentTime,
				isBooked: false
			});

			if (!newSlot) {
				newSlot = await Slot.create({
					time: appointmentTime,
					isBooked: true,
					phone: appointment.phone,
					email: appointment.email
				});
			} else {
				newSlot.isBooked = true;
				newSlot.phone = appointment.phone;
				newSlot.email = appointment.email;
				await newSlot.save();
			}

			req.body.slotId = newSlot._id;
		}

		// If status is being changed to cancelled, release the slot
		if (status === 'cancelled') {
			const slot = await Slot.findById(appointment.slotId);
			if (slot) {
				slot.isBooked = false;
				slot.phone = null;
				slot.email = null;
				await slot.save();
			}
		}

		const updatedAppointment = await Appointment.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		).populate('slotId');

		res.json(updatedAppointment);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Delete appointment (requires auth for admin)
router.delete("/appointments/:id", verifyToken, async (req, res) => {
	try {
		const appointment = await Appointment.findById(req.params.id);
		if (!appointment) {
			return res.status(404).json({ message: "Appointment not found" });
		}

		// Release the slot
		const slot = await Slot.findById(appointment.slotId);
		if (slot) {
			slot.isBooked = false;
			slot.phone = null;
			slot.email = null;
			await slot.save();
		}

		await Appointment.findByIdAndDelete(req.params.id);
		res.json({ message: "Appointment deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default router;
