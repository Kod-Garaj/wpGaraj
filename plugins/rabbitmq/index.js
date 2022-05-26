const amqp = require("amqplib");

module.exports = async function sirayaEkle(data) {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("wpgaraj", { durable: true });

    await channel.sendToQueue(
      "wpgaraj",
      Buffer.from(JSON.stringify(data))
    );
    console.log(`RMQ: [√] ${data.url} için mobil uygulama oluşturma sıraya eklendi.`);
    console.log(`RMQ: Objenin tamamı: ${JSON.stringify(data)} `);
  } catch (error) {
    console.error(error);
  }
}
