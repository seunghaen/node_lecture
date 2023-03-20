const passport = require("passport");
const local = require("./localStratege");
const kakao = require("./kakaoStratege");
const User = require("../models/user");

module.exports = () => {
  passport.serializeUser(() => {});
  passport.deserializeUser(() => {});
  local();
  kakao();
};
