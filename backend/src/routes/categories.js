const express = require("express");
const router = express.Router();

/**
 * GET /api/blogs/categories
 */
router.post("/categories", (req, res) => {
  res.send("Hello Alex!");
});

/**
 * POST /api/blogs/categories
 */
router.get("/categories", (req, res) => {
  res.send("Hello Alex!");
});

/**
 * PUT /api/blogs/categories
 */
router.put("/categories", (req, res) => {
  res.send("Hello Alex!");
});

/**
 * DELETE /api/blogs/categories
 */
router.delete("/categories", (req, res) => {
  res.send("Hello Alex!");
});

module.exports = router;
