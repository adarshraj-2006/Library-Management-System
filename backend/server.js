dotenv.config();
import dotenv from "dotenv";



import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js";
import fs from "fs";
import bookRoutes from "./src/routes/book.routes.js";


const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
app.use("/api/books", bookRoutes);

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