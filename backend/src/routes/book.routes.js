import express from "express";
import {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
} from "../controllers/book.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { validate, bookValidators } from "../middleware/validate.middleware.js";

const router = express.Router();


router.get("/", getAllBooks);
router.get("/:id", getBookById);


router.post(
    "/",
    verifyJWT,
    authorizeRoles("admin", "librarian"),
    bookValidators,
    validate,
    addBook
);

router.put(
    "/:id",
    verifyJWT,
    authorizeRoles("admin", "librarian"),
    updateBook
);

router.delete(
    "/:id",
    verifyJWT,
    authorizeRoles("admin"),
    deleteBook
);

export default router;
