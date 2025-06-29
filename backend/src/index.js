const express = require("express");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const blogsRoutes = require("./routes/Blogs");
const categoryRoutes = require("./routes/Categories");
const authRoutes = require("./routes/Auth");
const path = require("path");

const connectDB = require("./database/db");
connectDB();

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());

app.use(express.json());

// Create upload directories if they don't exist
const uploadDirs = ["uploads", "uploads/blogs", "uploads/users"];
uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

app.use("/api/blogs", blogsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "..", "..", "frontend", "build", "index.html")
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//path: backend/src/index.js
