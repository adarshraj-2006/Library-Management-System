import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import bookRoutes from "./src/routes/book.routes.js";
import issueRoutes from "./src/routes/issue.routes.js";
import contactRoutes from "./src/routes/contact.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Security Middleware ───────────────────────────────────────────────────────
app.use(helmet());               // Secure HTTP headers
app.use(cookieParser());         // Parse httpOnly cookies

// CORS
const allowedOrigins = process.env.CLIENT_URL 
    ? process.env.CLIENT_URL.split(',').map(url => url.trim())
    : ["http://localhost:5173", "https://frontend-one-murex-54.vercel.app"];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            
            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Global rate limiter — More lenient in development, stricter in production
const isDevelopment = process.env.NODE_ENV !== 'production';
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: isDevelopment ? 1000 : 100, // 1000 requests in dev, 100 in production
    standardHeaders: true,
    legacyHeaders: false,
    message: { 
        success: false, 
        message: "Too many requests. Please try again later.",
        retryAfter: Math.ceil(15 * 60) // seconds until retry
    },
    // Skip rate limiting for localhost in development
    skip: (req) => isDevelopment && (req.ip === '127.0.0.1' || req.ip === '::1' || req.ip === '::ffff:127.0.0.1'),
});
app.use(globalLimiter);

// Stricter limiter for auth endpoints (prevent brute-force)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: isDevelopment ? 100 : 20, // More lenient in dev
    standardHeaders: true,
    legacyHeaders: false,
    message: { 
        success: false, 
        message: "Too many authentication attempts. Please wait 15 minutes.",
        retryAfter: Math.ceil(15 * 60)
    },
    // Skip rate limiting for localhost in development
    skip: (req) => isDevelopment && (req.ip === '127.0.0.1' || req.ip === '::1' || req.ip === '::ffff:127.0.0.1'),
});

// ── Body Parsers ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ── Database ──────────────────────────────────────────────────────────────────
connectDB();

// ── Routes ────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "📚 Library Management System API is running 🚀",
        version: "1.0.0",
        endpoints: {
            auth: "/api/auth",
            books: "/api/books",
            issues: "/api/issues",
        },
    });
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/contacts", contactRoutes);

// ── 404 Fallback ──────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found.` });
});

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error("❌ Unhandled Error:", err.stack);

    // CORS error
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({ 
            success: false, 
            message: "CORS: Request origin not allowed." 
        });
    }

    // Rate limit error (handled by express-rate-limit middleware, but just in case)
    if (err.status === 429) {
        return res.status(429).json({
            success: false,
            message: "Too many requests. Please try again later.",
            retryAfter: 15 * 60 // seconds
        });
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(422).json({ success: false, message: "Validation failed", errors: messages });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(409).json({ success: false, message: `${field} already exists.` });
    }

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📚 Environment: ${process.env.NODE_ENV || "development"}`);
});
