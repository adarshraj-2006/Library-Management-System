import jwt from "jsonwebtoken";

/**
 * Generate a short-lived access token (default 15 minutes).
 */
export const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRY || "15m",
    });
};

/**
 * Generate a long-lived refresh token (default 7 days).
 */
export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRY || "7d",
    });
};

/**
 * Verify an access token and return the decoded payload.
 * Throws if invalid or expired.
 */
export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

/**
 * Verify a refresh token and return the decoded payload.
 * Throws if invalid or expired.
 */
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
