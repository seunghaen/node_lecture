const passport = require("passport");
const { Strategy: KaKaoStrategy } = require("passport-kakao");
const User = require("../models/user");

module.exports = () => {
  passport.use(
    new KaKaoStrategy(
      { clientID: process.env.KAKAO_ID, callbackURL: "/auth/kakao/callback" },
      async (accessToken, refreshToken, profile, done) => {
        try {
          exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = User.create({
              email: profile._json?.kakao_account?.email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(eroor);
          done(error);
        }
      }
    )
  );
};
