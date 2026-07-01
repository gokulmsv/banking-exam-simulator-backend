import express from "express";
import { uploadQuestions } from "../controllers/admin.controller.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Excel upload route
router.post("/upload-questions", upload.single("file"), uploadQuestions);

export default router;