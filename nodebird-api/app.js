const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const dotenv = require("dotenv");
const nunjucks = require("nunjucks");
const path = require("path");
const cookieParser = require("cookie-parser");
const AuthRouter = require("./routes/auth");
const { sequelize } = require("./models");
const passport = require("passport");

dotenv.config(); // process.env안에 .env 넣기
const passportConfig = require("./passport");

const app = express();
passportConfig();
app.set("port", process.env.PORT || 8001);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public"))); //lecture/public폴더를 브라우저에서 접근가능하도록 만들어줌
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json()); //JSON 요청 받아주는 parser req.body를 ajax요청
app.use(express.urlencoded({ extended: false })); //form 요청 받아주는 parser, req.body를 폼에서
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", AuthRouter);
app.use((req, res, next) => {
  const error = new Error(`${req.method}:${req.path}가 존재하지 않습니다`);
  error.status = 404;
  next(error);
}); //404 처리
app.use((error, req, res, next) => {
  res.locals.message = error.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? error : {};
  res.status = error.status || 500;
  res.render("error"); // 넌적스에 의해 error.html을 렌더링한다.
}); //error 핸들러

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 서버 연결");
});
