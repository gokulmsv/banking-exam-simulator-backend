import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import examRoutes from "./routes/exam.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

app.use(cors({
  origin: "*",
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;