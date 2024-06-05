const express = require("express");
const cors = require("cors");
require("dotenv").config();

const blogsRoutes = require("./routes/Blogs");
const categoryRoutes = require("./routes/Categories");
const authRoutes = require("./routes/Auth");

const connectDB = require("./database/db");

connectDB();

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/blogs", blogsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
