const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

exports.join = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      //서버실패시
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      //로직실패시, 비밀번호 일치하지 않거나, 사용자 존재하지 않을 시
      return res.redirect(`/?loginError=${info.message}`);
    }
    req.login(user, (err) => {
      // 로그인성공, 이때 passport의 serialize함수 호출
      if (err) {
        console.error(err);
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout(() => {
    res.redirect("/");
  });
};
