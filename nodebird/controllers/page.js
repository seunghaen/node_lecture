exports.renderProfile = (req, res) => {
  res.render("profile", { title: "내 정보 - NodeBird" });
}; //res.render를 통해 nunjucks로 html파일 표시할때 두번째 인수 객체도 프론트로 넘어간다.

exports.renderJoin = (req, res) => {
  res.render("join", { title: "회원가입 - NodeBird" });
};

exports.renderMain = (req, res, next) => {
  const twits = [];
  res.render("main", {
    title: "NodeBird",
    twits,
  });
};
