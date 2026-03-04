import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js";
import fs from "fs";

dotenv.config();

const app = express();

// 1. CORS Configuration (Handles Preflight automatically)
app.use(cors({
  origin: ["http://localhost:5173" || "https://frontend-one-murex-54.vercel.app"],
  credentials: true,
  optionsSuccessStatus: 200
}));

// 2. Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} from ${req.headers.origin}`);
  next();
});

// 3. JSON Parser
app.use(express.json());

// 4. Routes
app.use("/api/auth", authRoutes);

// 5. DB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// 6. Listen
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  console.log(`CORS allowed from: http://localhost:5173`);
  fs.writeFileSync("server_heartbeat.txt", `Server started at ${new Date().toISOString()}`);
});