import * as http from "node:http";
import { getSummaries } from "./controllers/summaries.controller.js";

const PORT = 8080;

const apiServer = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow these HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow these headers
  if (req.url === "/api/summaries") {
    getSummaries(req, res);
  }
});

apiServer.listen(PORT);
console.log(`Server running at http://127.0.0.1:${PORT}/`);
