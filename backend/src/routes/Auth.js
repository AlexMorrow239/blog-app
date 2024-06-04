const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/Auth");

/**
 * @route POST api/auth/login
 * @description Login User
 */
router.post("/login", (req, res) => {
  login(req, res);
});

/**
 * @route POST api/auth/register
 * @description Register User
 */
router.post("/register", (req, res) => {
  register(req, res);
});

module.exports = router;
