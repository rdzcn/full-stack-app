const http = require("http");
const fs = require("fs");
const path = require("path");
const directory = "__dirname";

const doOnRequest = (req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    const indexPath = path.resolve(directory, "../index.html");
    fs.readFile(indexPath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/src/style.css") {
    const stylePath = path.resolve(directory, "../src/style.css");
    fs.readFile(stylePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      }
    });
  } else if (req.url === "/src/main.js") {
    const scriptPath = path.resolve(directory, "../src/main.js");
    fs.readFile(scriptPath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(data);
      }
    });
  } else if (req.url === "/src/counter.js") {
    const scriptPath = path.resolve(directory, "../src/counter.js");
    fs.readFile(scriptPath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
};

const server = http.createServer(doOnRequest);

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Server is running on port ${port}`));
