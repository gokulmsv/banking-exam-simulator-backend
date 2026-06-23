import express from "express";
import { getQuestions, submitExam } from "../controllers/exam.controller.js";

const router = express.Router();

router.get("/questions", getQuestions);
router.post("/submit", submitExam);

export default router;