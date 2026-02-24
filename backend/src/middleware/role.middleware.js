import { errorResponse } from "../utils/apiResponse.js";

/**
 * authorizeRoles - Role-based access control middleware factory.
 *
 * Usage:  router.post("/", verifyJWT, authorizeRoles("admin", "librarian"), handler)
 *
 * @param  {...string} roles - Allowed roles (e.g., "admin", "librarian", "member")
 * @returns Express middleware
 */
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return errorResponse(res, "Authentication required.", 401);
        }

        if (!roles.includes(req.user.role)) {
            return errorResponse(
                res,
                `Access denied. This action requires one of: [${roles.join(", ")}].`,
                403
            );
        }

        next();
    };
};
