import express from "express";
import {
    register,
    verifyEmail,
    login,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword,
    getProfile,
    updateProfile,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { validate, registerValidators, loginValidators } from "../middleware/validate.middleware.js";

const router = express.Router();

// ── Public Routes ─────────────────────────────────────────────────────────────
router.post("/register", registerValidators, validate, register);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", loginValidators, validate, login);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// ── Protected Routes ──────────────────────────────────────────────────────────
router.post("/logout", verifyJWT, logout);
router.get("/profile", verifyJWT, getProfile);
router.put("/profile", verifyJWT, updateProfile);

export default router;
