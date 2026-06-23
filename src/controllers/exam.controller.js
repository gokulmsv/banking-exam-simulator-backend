import { pool } from "../db.js";

export const getQuestions = async (req, res) => {
  const result = await pool.query("SELECT * FROM questions");
  res.json(result.rows);
};

export const submitExam = async (req, res) => {
  const { userId, answers } = req.body;

  let score = 0;

  for (let a of answers) {
    const q = await pool.query(
      "SELECT answer FROM questions WHERE id=$1",
      [a.questionId]
    );

    if (q.rows[0].answer === a.answer) {
      score++;
    }
  }

  await pool.query(
    "INSERT INTO results (user_id, score) VALUES ($1, $2)",
    [userId, score]
  );

  res.json({ score });
};