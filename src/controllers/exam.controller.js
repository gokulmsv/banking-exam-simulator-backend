import { pool } from "../db.js";

export const getQuestions = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM questions");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("GET QUESTIONS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
};

export const submitExam = async (req, res) => {
  try {
    const { userId, answers } = req.body;

    let score = 0;

    for (let a of answers) {
      const q = await pool.query(
        "SELECT answer FROM questions WHERE id = $1",
        [a.questionId]
      );

      if (q.rows.length && q.rows[0].answer === a.answer) {
        score++;
      }
    }

    await pool.query(
      "INSERT INTO results (user_id, score) VALUES ($1, $2)",
      [userId, score]
    );

    res.status(200).json({ score });
  } catch (error) {
    console.error("SUBMIT EXAM ERROR:", error);
    res.status(500).json({ message: "Failed to submit exam" });
  }
};