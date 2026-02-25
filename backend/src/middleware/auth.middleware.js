import { verifyAccessToken } from "../utils/jwt.utils.js";
import { errorResponse } from "../utils/apiResponse.js";
import User from "../models/user.model.js";

/**
 * verifyJWT - Validates the Bearer access token in the Authorization header.
 * Attaches the full user document to req.user on success.
 */
export const verifyJWT = async (req, res, next) => {
    try {
        // Support both Authorization header and httpOnly cookie
        const authHeader = req.headers.authorization;
        const token =
            (authHeader && authHeader.startsWith("Bearer ") && authHeader.split(" ")[1]) ||
            req.cookies?.accessToken;

        if (!token) {
            return errorResponse(res, "Access denied. No token provided.", 401);
        }

        // Verify and decode
        const decoded = verifyAccessToken(token);

        // Fetch fresh user from DB (so blocked/deleted accounts are rejected)
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return errorResponse(res, "User not found. Token invalid.", 401);
        }

        if (user.isBlocked) {
            return errorResponse(res, "Your account has been blocked. Contact support.", 403);
        }

        if (!user.isActive) {
            return errorResponse(res, "Your account is inactive.", 403);
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return errorResponse(res, "Access token expired. Please refresh.", 401);
        }
        if (error.name === "JsonWebTokenError") {
            return errorResponse(res, "Invalid access token.", 401);
        }
        return errorResponse(res, "Authentication failed.", 401);
    }
};

/**
 * optionalAuth - Same as verifyJWT but does not block the request if no token.
 * Useful for routes that behave differently for logged-in vs guest users.
 */
export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token =
            (authHeader && authHeader.startsWith("Bearer ") && authHeader.split(" ")[1]) ||
            req.cookies?.accessToken;

        if (!token) return next(); // No token → proceed as guest

        const decoded = verifyAccessToken(token);
        const user = await User.findById(decoded.id).select("-password");
        if (user && !user.isBlocked && user.isActive) {
            req.user = user;
        }
    } catch {
        // Ignore token errors for optional auth
    }
    next();
};
