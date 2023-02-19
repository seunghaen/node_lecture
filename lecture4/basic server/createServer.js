const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; char=utf-8" });
    res.write("<h1>Hello node</h1>");
    res.end("<p>hello server</p>");
  })
  .listen(8080, () => {
    console.log("8080 포트에서 서버를 연결중");
  });
