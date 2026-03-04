import express from "express";
import {
    issueBook,
    returnBook,
    getMyIssuedBooks,
    getAllIssuedBooks,
    getOverdueBooks,
} from "../controllers/issue.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { validate, issueValidators, returnValidators } from "../middleware/validate.middleware.js";

const router = express.Router();

// All routes require authentication
router.use(verifyJWT);

// ── Member Routes ─────────────────────────────────────────────────────────────
router.get("/my", getMyIssuedBooks);

// ── Member / Librarian / Admin Routes ──────────────────────────────────────────
router.post("/issue", authorizeRoles("admin", "librarian", "member"), issueValidators, validate, issueBook);
router.post("/return", authorizeRoles("admin", "librarian", "member"), returnValidators, validate, returnBook);
router.get("/all", authorizeRoles("admin", "librarian"), getAllIssuedBooks);
router.get("/overdue", authorizeRoles("admin", "librarian"), getOverdueBooks);

export default router;
