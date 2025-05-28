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
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));


app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.listen(4999, () => {
    connectDB();
    console.log("server is running");
});

//7bW1NcqQ052xpWTB