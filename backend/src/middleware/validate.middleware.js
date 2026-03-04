import { validationResult } from "express-validator";
import { errorResponse } from "../utils/apiResponse.js";

/**
 * validate - Reads express-validator results and responds with 422 on failure.
 * Place AFTER express-validator chain rules, BEFORE the controller.
 */
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.array().map((e) => e.msg);
        console.log("Validation errors:", messages); // Added for debugging
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: messages,
        });
    }
    next();
};

// ── Common validator chains (to be spread into route definitions) ────────────
import { body, param } from "express-validator";

export const registerValidators = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 2, max: 50 }).withMessage("Name must be 2-50 characters"),
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Provide a valid email"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("phone")
        .notEmpty().withMessage("Phone number is required")
        .matches(/^\d{10}$/).withMessage("Phone must be a 10-digit number"),
];

export const loginValidators = [
    body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
];

export const bookValidators = [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("author").trim().notEmpty().withMessage("Author is required"),
    body("isbn").trim().notEmpty().withMessage("ISBN is required"),
    body("genre").trim().notEmpty().withMessage("Genre is required"),
    body("totalCopies")
        .notEmpty().withMessage("Total copies is required")
        .isInt({ min: 1 }).withMessage("Total copies must be at least 1"),
];

export const issueValidators = [
    body("bookId").notEmpty().withMessage("Book ID is required").isMongoId().withMessage("Invalid Book ID"),
    body("memberId").notEmpty().withMessage("Member ID is required").isMongoId().withMessage("Invalid Member ID"),
    body("dueDate")
        .optional()
        .isISO8601().withMessage("Invalid date format (use ISO 8601)"),
];

export const returnValidators = [
    body("issueId").notEmpty().withMessage("Issue ID is required").isMongoId().withMessage("Invalid Issue ID"),
];
