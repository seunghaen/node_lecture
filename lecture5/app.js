const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();
app.use(morgan("dev"));
app.set("port", 3001);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("./category/:letter", (req, res) => {
  res.send(`${req.params.letter}`);
});
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트 대기");
});
