/**
 * Wraps an async express route handler and forwards any thrown errors
 * to the next() error-handling middleware, eliminating repetitive try/catch.
 *
 * Usage:  router.get("/route", asyncHandler(async (req, res) => { ... }));
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
