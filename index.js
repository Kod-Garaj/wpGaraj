const amqp = require("amqplib");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
var cors = require("cors");

var corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json()); // for parsing application/json

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/calistir", async (req, res) => {
  const { url } = req.body;
  connectToRabbitMQ(url);

  return res.json({
    status: true,
    message: "İşleminiz Sıraya Alınmıştır",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function connectToRabbitMQ(url) {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("wpgaraj", { durable: true });

    await channel.sendToQueue(
      "wpgaraj",
      Buffer.from(JSON.stringify({ url: url }))
    );
    console.log(` [√] ${url} için mobil uygulama oluşturma sıraya eklendi.`);
  } catch (error) {
    console.error(error);
  }
}
