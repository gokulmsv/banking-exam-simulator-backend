import XLSX from "xlsx";
import { pool } from "../db.js";

export const uploadQuestions = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Read Excel from buffer
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json(sheet);

    console.log("Total rows:", rows.length);

    for (const q of rows) {
      const options = [
        q.option_a,
        q.option_b,
        q.option_c,
        q.option_d,
        q.option_e,
      ].filter(Boolean);

      await pool.query(
        `
        INSERT INTO questions (question, options, answer)
        VALUES ($1, $2, $3)
        `,
        [q.question, JSON.stringify(options), q.correct_answer]
      );
    }

    res.json({
      message: "Questions uploaded successfully",
      count: rows.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};