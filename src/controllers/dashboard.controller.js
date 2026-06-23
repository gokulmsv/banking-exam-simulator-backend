import { pool } from "../db.js";

export const getAnalytics = async (req, res) => {
  const result = await pool.query(
    "SELECT COUNT(*) as attempts, AVG(score) as avg_score FROM results"
  );

  res.json(result.rows[0]);
};