const express = require("express");
const router = express.Router();

/** GET /api/blogs/ */
router.get("/", (req, res) => {
  res.send("Hello Alex!");
});

/**
 * POST /api/blogs/
 */
router.post("/", (req, res) => {
  console.log(req.body);
  res.send("Hello Alex!");
});

/**
 * PUT /api/blogs/
 */
router.put("/", (req, res) => {
  res.send("Hello Alex!");
});

/**
 * DELETE /api/blogs/
 */
router.delete("/", (req, res) => {
  res.send("Hello Alex!");
});

module.exports = router;
