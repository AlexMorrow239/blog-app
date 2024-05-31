const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/Categories");

/**
 * POST /api/categories
 */
router.post("/", (req, res) => {
  categoryController.createCategory(req, res);
});

/**
 * GET /api/categories
 */
router.get("/", (req, res) => {
  categoryController.getCategories(req, res);
});

/**
 * GET api/categories/:id
 */
router.get("/:id", (req, res) => {
  categoryController.getCategoryById(req, res);
});

/**
 * PUT /api/categories/:id
 */
router.put("/:id", (req, res) => {
  categoryController.updateCategoryByID(req, res);
});

router.get("/:id", (req, res) => {
  categoryController.getCategoryById(req, res);
});

/**
 * DELETE /api/categories/:id
 */
router.delete("/:id", (req, res) => {
  categoryController.deleteCategoryByID(req, res);
});

module.exports = router;
