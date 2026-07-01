import XLSX from "xlsx";
import { pool } from "../db.js";

const workbook = XLSX.readFile("src/imports/Reasoning_Questions_Table.xlsx");

const sheet = workbook.Sheets[workbook.SheetNames[0]];
const questions = XLSX.utils.sheet_to_json(sheet);

async function importQuestions() {
  try {
    console.log("Connected to PostgreSQL...");
    console.log(`Found ${questions.length} questions`);

    for (const q of questions) {
      await pool.query(
        `
        INSERT INTO questions
        (
          subject,
          topic,
          question_no,
          question,
          option_a,
          option_b,
          option_c,
          option_d,
          option_e,
          correct_answer,
          explanation,
          difficulty
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
        `,
        [
          q.subject,
          q.topic,
          q.question_no,
          q.question,
          q.option_a,
          q.option_b,
          q.option_c,
          q.option_d,
          q.option_e,
          q.correct_answer,
          q.explanation,
          q.difficulty,
        ]
      );

      console.log(`Imported Question ${q.question_no}`);
    }

    console.log("✅ All questions imported successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

importQuestions();