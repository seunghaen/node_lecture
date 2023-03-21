const express = require("express");
const passport = require("passport");
const router = express.Router();
const { join, login, logout } = require("../controllers/auth");
const { isNotLoggedIn, isLoggedIn } = require("../middlewares");

router.post("/join", isNotLoggedIn, join);
router.post("/login", isNotLoggedIn, login);
router.get("/logout", isLoggedIn, logout);
router.get("/kakao", passport.authenticate("kakao"));
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/?loginError=카카오로그인실패",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
