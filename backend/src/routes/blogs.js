const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogs.js");

/** GET /api/blogs/ */
router.get("/", (req, res) => {
  blogController.getBlogs(req, res);
});

/**
 * POST /api/blogs/
 */
router.post("/", (req, res) => {
  blogController.createBlog(req, res);
});

/**
 * PUT /api/blogs/
 */
router.put("/", (req, res) => {
  blogController.updateBlog(req, res);
});

/**
 * DELETE /api/blogs/
 */
router.delete("/", (req, res) => {
  blogController.deleteBlog(req, res);
});

/**
 * GET /api/blogs/:id
 */
router.get("/:id", (req, res) => {
  blogController.getBlogsById(req, res);
});

/**
 * POST /api/blogs/:id
 */
router.post("/:id", (req, res) => {
  blogController.createBlogByID(req, res);
});

/**
 * PUT /api/blogs/:id
 */
router.put("/:id", (req, res) => {
  blogController.updateBlogByID(req, res);
});

/**
 * DELETE /api/blogs/:id
 */
router.delete("/:id", (req, res) => {
  blogController.deleteBlogByID(req, res);
});

module.exports = router;
