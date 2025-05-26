import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

app.get("/", (req,res) =>{
    res.send("kdv");
});
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.listen(4999, () => {
    connectDB();
    console.log("server is running");
});

//7bW1NcqQ052xpWTB