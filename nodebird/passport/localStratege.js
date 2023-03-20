const passport = require("passport");
const { Strategy: LocalStratege } = require("passport-local");
const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = () => {
  passport.use(
    new LocalStratege(
      {
        usernameField: "email", //'email' input의 form을 통해 건너온 req.body.email
        passwordField: "password", //'password' input의 form을 통해 건너온 req.body.password
        passReqToCallback: false,
      },
      async (email, password, done) => {
        //done은 (서버실패,성공유저,로직실패)순서를 인수로 받는다.
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 틀렸습니다." });
            }
          } else {
            done(null, false, { message: "사용자가 존재하지 않습니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};

//결국 done에 넣은 함수는 pass.authenticate 함수의 두번째 인자로 받은 콜백함수를 실행한다고 생각하면 된다.
