const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categories.js");

/**
 * GET /api/categories
 */
router.post("/", (req, res) => {
  categoryController.createCategory(req, res);
});

/**
 * POST /api/categories
 */
router.get("/", (req, res) => {
  categoryController.getCategories(req, res);
});

/**
 * PUT /api/categories
 */
router.put("/", (req, res) => {
  categoryController.updateCategory(req, res);
});

/**
 * DELETE /api/categories/:id
 */
router.delete("/:id", (req, res) => {
  categoryController.deleteCategoryById(req, res);
});

module.exports = router;
