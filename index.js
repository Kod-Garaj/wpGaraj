const express = require("express");
const app = express();
const http = require('http').createServer(app)
const PORT = process.env.PORT || 3000;

const { redisClient } = require("./plugins/redis");
const { socket } = require("./plugins/socket");

socket(http);

app.use(express.json()); // for parsing application/json

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

http.listen(PORT, () => {
  console.log(`Uygulama ${PORT} numaralı porttan ayağa kalktı.`);
});
