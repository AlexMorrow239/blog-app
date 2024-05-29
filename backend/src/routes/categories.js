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
 * DELETE /api/categories
 */
router.delete("/", (req, res) => {
  categoryController.deleteCategory(req, res);
});

/**
 * GET /api/categories/:id
 */
router.get("/:id", (req, res) => {
  categoryController.getCategoryById(req, res);
});

/**
 * POST /api/categories/:id
 */
router.post("/:id", (req, res) => {
  categoryController.createCategoryById(req, res);
});

/**
 * PUT /api/categories/:id
 */
router.put("/:id", (req, res) => {
  categoryController.updateCategoryById(req, res);
});

/**
 * DELETE /api/categories/:id
 */
router.delete("/:id", (req, res) => {
  categoryController.deleteCategoryById(req, res);
});

module.exports = router;
