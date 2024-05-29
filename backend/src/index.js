// Imports
const express = require("express");
const cors = require("cors");
const blogRoutes = require("./routes/blogs");
const categoryRoutes = require("./routes/categories");
const connectDb = require("./database/db");
require("dotenv").config();

connectDb();

// Instantiate Express and define the port
const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
