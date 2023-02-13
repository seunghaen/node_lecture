const http = require("http");
const fs = require("fs").promises;

const server = http.createServer(async (req, res) => {
  try {
    res.writeHead(200, { "Content-Type": "text/html; char=utf-8" });
    const data = await fs.readFile("./server2.html");
    res.end(data);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain; char=utf-8" });
    res.end(error.message);
  }
});

server.listen(8080);
server.on("listening", () => {
  console.log("server2, 8080포트 서버 대기");
});
server.on("error", (err) => {
  console.log(err);
});
