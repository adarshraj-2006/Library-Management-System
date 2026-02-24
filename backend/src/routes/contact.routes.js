import express from "express";
import { submitContact, getAllContacts } from "../controllers/contact.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", submitContact);
router.get("/", verifyJWT, authorizeRoles("admin"), getAllContacts);

export default router;
