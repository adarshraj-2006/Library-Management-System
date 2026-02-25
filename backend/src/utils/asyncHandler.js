/**
 * Wraps an async express route handler and forwards any thrown errors
 * to the next() error-handling middleware, eliminating repetitive try/catch.
 *
 * Usage:  router.get("/route", asyncHandler(async (req, res) => { ... }));
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        if (typeof next === "function") {
            next(err);
        } else {
            console.error("❌ asyncHandler caught an error but 'next' is not a function:", err);
            res.status(500).json({ success: false, message: "Internal Server Error (next missing)" });
        }
    });
};

export default asyncHandler;
