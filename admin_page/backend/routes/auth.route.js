import express from "express";
import { login, signup, verifyEmail } from '../controllers/auth.controller.js';
const router = express.Router();
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/logout", async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
});

export default router;
