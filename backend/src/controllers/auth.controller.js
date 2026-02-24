import crypto from "crypto";
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.utils.js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../utils/email.utils.js";

// ── Helpers ──────────────────────────────────────────────────────────────────

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
};

const generateAndSaveTokens = async (user) => {
    const payload = { id: user._id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
};

// ── Controllers ──────────────────────────────────────────────────────────────

/**
 * POST /api/auth/register
 * Public — Register a new member account and send verification email.
 */
export const register = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
        return errorResponse(
            res,
            existingUser.email === email ? "Email is already registered." : "Phone number is already registered.",
            409
        );
    }

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

    const user = await User.create({
        name,
        email,
        password,
        phone,
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    // Send verification email (non-blocking — don't fail registration if email fails)
    try {
        await sendVerificationEmail(email, verificationToken);
    } catch (emailErr) {
        console.error("Email send failed:", emailErr.message);
    }

    return successResponse(
        res,
        { userId: user._id, email: user.email },
        "Registration successful! Please check your email to verify your account.",
        201
    );
});

/**
 * GET /api/auth/verify-email/:token
 * Public — Verify email using the token sent to the user's inbox.
 */
export const verifyEmail = asyncHandler(async (req, res) => {
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: { $gt: Date.now() },
    });

    if (!user) {
        return errorResponse(res, "Verification link is invalid or has expired.", 400);
    }

    user.isVerified = true;
    user.emailVerifiedAt = new Date();
    user.emailVerificationToken = null;
    user.emailVerificationExpiry = null;
    await user.save({ validateBeforeSave: false });

    return successResponse(res, null, "Email verified successfully! You can now log in.");
});

/**
 * POST /api/auth/login
 * Public — Authenticate user and return access + refresh tokens.
 */
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Select password explicitly (it's excluded by default)
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
        return errorResponse(res, "Invalid email or password.", 401);
    }

    if (!user.isVerified) {
        return errorResponse(res, "Please verify your email before logging in.", 403);
    }

    if (user.isBlocked) {
        return errorResponse(res, "Your account has been blocked. Contact support.", 403);
    }

    const { accessToken, refreshToken } = await generateAndSaveTokens(user);

    res.cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });

    return successResponse(
        res,
        {
            accessToken,
            user: user.toSafeObject(),
        },
        "Login successful."
    );
});

/**
 * POST /api/auth/logout
 * Protected — Invalidate refresh token and clear cookies.
 */
export const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: null } });

    res.clearCookie("refreshToken", cookieOptions);
    res.clearCookie("accessToken", cookieOptions);

    return successResponse(res, null, "Logged out successfully.");
});

/**
 * POST /api/auth/refresh-token
 * Public — Issue a new access token using the stored refresh token.
 */
export const refreshToken = asyncHandler(async (req, res) => {
    const token = req.cookies?.refreshToken || req.body.refreshToken;

    if (!token) {
        return errorResponse(res, "Refresh token not provided.", 401);
    }

    let decoded;
    try {
        decoded = verifyRefreshToken(token);
    } catch {
        return errorResponse(res, "Invalid or expired refresh token. Please log in again.", 401);
    }

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
        return errorResponse(res, "Refresh token mismatch. Please log in again.", 401);
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateAndSaveTokens(user);

    res.cookie("refreshToken", newRefreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });

    return successResponse(res, { accessToken }, "Token refreshed successfully.");
});

/**
 * POST /api/auth/forgot-password
 * Public — Send a password reset link to the user's email.
 */
export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    // Return same response regardless to prevent enumeration
    const safeMessage = "If that email is registered, a reset link has been sent.";

    if (!user) return successResponse(res, null, safeMessage);

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.passwordResetToken = hashedToken;
    user.passwordResetExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save({ validateBeforeSave: false });

    try {
        await sendPasswordResetEmail(user.email, resetToken);
    } catch (emailErr) {
        user.passwordResetToken = null;
        user.passwordResetExpiry = null;
        await user.save({ validateBeforeSave: false });
        return errorResponse(res, "Failed to send reset email. Please try again.", 500);
    }

    return successResponse(res, null, safeMessage);
});

/**
 * POST /api/auth/reset-password/:token
 * Public — Reset the user's password using the token from the email.
 */
export const resetPassword = asyncHandler(async (req, res) => {
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpiry: { $gt: Date.now() },
    });

    if (!user) {
        return errorResponse(res, "Reset link is invalid or has expired.", 400);
    }

    const { password } = req.body;
    if (!password || password.length < 6) {
        return errorResponse(res, "Password must be at least 6 characters.", 400);
    }

    user.password = password;
    user.passwordResetToken = null;
    user.passwordResetExpiry = null;
    user.refreshToken = null; // Force re-login on all devices
    await user.save();

    return successResponse(res, null, "Password reset successfully. Please log in with your new password.");
});

/**
 * GET /api/auth/profile
 * Protected — Get the authenticated user's profile.
 */
export const getProfile = asyncHandler(async (req, res) => {
    return successResponse(res, req.user.toSafeObject(), "Profile fetched successfully.");
});

/**
 * PUT /api/auth/profile
 * Protected — Update name, phone, or avatar.
 */
export const updateProfile = asyncHandler(async (req, res) => {
    const allowedFields = ["name", "phone", "avatar"];
    const updates = {};

    for (const field of allowedFields) {
        if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    const user = await User.findByIdAndUpdate(req.user._id, { $set: updates }, { new: true, runValidators: true });

    return successResponse(res, user.toSafeObject(), "Profile updated successfully.");
});
