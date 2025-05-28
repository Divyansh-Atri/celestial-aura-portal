import express from "express";
import { login, signup, verifyEmail , forgotPassword, resetPassword, checkAuth} from '../controllers/auth.controller.js';
import { verifyToken } from "../middleware/verifyToken.js";
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
export default router;
