import jwt from "jsonwebtoken";

/**
 * Generate a JWT token (default 7 days for simpler auth).
 */
export const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRY || "7d",
    });
};

/**
 * Verify an access token and return the decoded payload.
 * Throws if invalid or expired.
 */
export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};
