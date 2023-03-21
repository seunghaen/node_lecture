const express = require("express");
const router = express.Router();
const {
  renderJoin,
  renderMain,
  renderProfile,
  searchHashtag,
} = require("../controllers/page");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

router.use((req, res, next) => {
  res.locals.user = req.user; //다같이 사용하는 변수, 이 변수들은 넌적스로도 넘어감
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingIdList = req.user?.Followings?.map((f) => f.id) || [];
  next(); //이거 까먹지 말기
});

router.get("/", renderMain);
router.get("/join", isNotLoggedIn, renderJoin);
router.get("/profile", isLoggedIn, renderProfile);
router.get("/hashtag", isLoggedIn, searchHashtag);

module.exports = router;
//라우터의 마지막 미들웨어 함수를 컨트롤러라고 한다.
//이렇게 분리하는 이유는 테스트를 위해서
