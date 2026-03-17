
import dotenv from "dotenv";
dotenv.config();



import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js";
import fs from "fs";
import bookRoutes from "./src/routes/book.routes.js";
import issueRoutes from "./src/routes/issue.routes.js";


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

// 3. JSON Parser
app.use(express.json());

// 4. Debugging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  // If the request starts with /api/api, we can redirect or rewrite it
  if (req.url.startsWith('/api/api/')) {
    console.warn(`Double /api detected. Rewriting ${req.url} to ${req.url.replace('/api/api/', '/api/')}`);
    req.url = req.url.replace('/api/api/', '/api/');
  }
  next();
});

// 4. Routes
app.get("/", (req, res) => {
  res.json({ message: "Library Management System API is running", status: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/issues", issueRoutes);

// 4.5 404 Handler
app.use((req, res) => {
  console.log(`[404] ${req.method} ${req.url} - Not Found`);
  res.status(404).json({ 
    message: `Route ${req.method} ${req.url} not found`, 
    error: "Not Found" 
  });
});

// 5. DB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => {
    console.error("DB Connection Error:", err);
    // Don't exit here, let the server start so we can at least see the health check
  });

// 6. Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check available at /`);
  fs.writeFileSync("server_heartbeat.txt", `Server started at ${new Date().toISOString()}`);
});