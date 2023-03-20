const express = require("express");
const router = express.Router();
const passport = require("passport");
const { join, login, logout } = require("../controllers/auth");
const { isNotLoggedIn, isLoggedIn } = require("../middlewares");

router.post("/join", isNotLoggedIn, join);
router.post("/login", isNotLoggedIn, login);
router.get("/logout", isLoggedIn, logout);

module.exports = router;
