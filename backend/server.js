require("dotenv").config();
const express = require("express");
const cors = require("cors");
const workflowRoutes = require("./routes/workflowRoutes");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middlewares/authMiddleware");

const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/workflows", protect, workflowRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("AI Workflow Engine Running");
});

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

