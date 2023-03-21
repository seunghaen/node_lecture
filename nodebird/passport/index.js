const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); //user.id만 가지고 session으로 전송
  });
  passport.deserializeUser((id, done) => {
    //브라우저 요청에서 들어온 세션쿠키의 정보를 통해 얻어낸 id로 유저를 찾아내 req.user에 User 정보를 넣는 역할
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followers",
        },
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followings",
        },
      ],
    })
      .then((user) => {
        done(null, user);
      })
      .catch((err) => done(err));
  });
  local();
  kakao();
};
