const Post = require("../models/post");
const HashTag = require("../models/hashtag");
const User = require("../models/user");

exports.renderProfile = (req, res) => {
  res.render("profile", { title: "내 정보 - NodeBird" });
}; //res.render를 통해 nunjucks로 html파일 표시할때 두번째 인수 객체도 프론트로 넘어간다.

exports.renderJoin = (req, res) => {
  res.render("join", { title: "회원가입 - NodeBird" });
};

exports.renderMain = async (req, res, next) => {
  const posts = await Post.findAll({
    include: {
      model: User,
      attributes: ["id", "nick"],
    },
    order: [["createdAt", "DESC"]],
  });
  res.render("main", {
    title: "NodeBird",
    twits: posts,
  });
};

exports.searchHashtag = async (req, res, next) => {
  try {
    const query = req.query.hashtag;
    if (!query) {
      return res.redirect("/");
    }
    const hashtag = await HashTag.findOne({ where: { title: query } });
    console.log("여기여기", hashtag);
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({
        order: [["createdAt", "DESC"]],
        include: [{ model: User, attributes: ["id", "nick"] }],
      });
    }
    res.render("main", {
      title: `${query}` || nodebird,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
