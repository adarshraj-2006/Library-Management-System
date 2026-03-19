import express from "express";
import { createIssue, returnBook } from "../controllers/issue.controller.js";

const router = express.Router();

router.get("/my", (req, res) => {
  // Empty issues payload designed to resolve the dashboard's 404 console error
  // Replace with actual database fetch when the Issue model is developed
  res.json({
    success: true,
    data: {
      issues: []
    }
  });
});

router.post("/", createIssue);
router.post("/return", returnBook);

export default router;
