const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categories");

/**
 * GET /api/categories
 */
router.get("/", (req, res) => {
  categoryController.getCategories(req, res);
});

/**
 * POST /api/categories
 */
router.post("/", (req, res) => {
  categoryController.createCategory(req, res);
});

/**
 * PUT /api/categories
 */
router.put("/:id", (req, res) => {
  categoryController.updateCategory(req, res);
});

router.get("/:id", (req, res) => {
  categoryController.getCategoryById(req, res);
});

/**
 * DELETE /api/categories/:id
 */
router.delete("/:id", (req, res) => {
  categoryController.deleteCategoryById(req, res);
});

module.exports = router;
