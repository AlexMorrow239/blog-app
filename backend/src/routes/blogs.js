const express = require("express");
const router = express.Router();

const blogController = require("../controllers/Blogs");

/**
 * POST /api/blogs
 */
router.post("/", (req, res) => {
  blogController.createBlogs(req, res);
});

/**
 * GET /api/blogs
 */
router.get("/", (req, res) => {
  blogController.getBlogs(req, res);
});

/**
 * Get blogs by blogID
 * GET /api/blogs/:id
 */
router.get("/:id", (req, res) => {
  blogController.getBlogById(req, res);
});

/**
 * Get blogs by categoryID
 * GET /api/blogs/categories/:id
 */
router.get("/categories/:id", (req, res) => {
  blogController.getBlogsByCategoryID(req, res);
});

/**
 * Put /api/blogs/
 */
router.put("/:id", (req, res) => {
  blogController.updateBlogByID(req, res);
});

/**
 * DELETE /api/blogs/
 */
router.delete("/:id", (req, res) => {
  blogController.deleteBlogByID(req, res);
});

module.exports = router;
