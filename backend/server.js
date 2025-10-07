import connectDB from "./config/db.js";
import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import bodyParser from "body-parser";
import path from "path";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Routes
app.use("/api/v1/auth", userRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
