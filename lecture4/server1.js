const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; char=utf-8" });
  res.write("<h1>Hello node</h1>");
  res.end("<p>hello server</p>");
});

server.listen(8080);
server.on("listening", () => {
  console.log("8080포트 서버 대기");
});
server.on("error", (err) => {
  console.log(err);
});
