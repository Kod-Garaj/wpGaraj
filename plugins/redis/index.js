const { createClient } = require('redis');

const client = createClient();

// createClient({
//     url: 'redis://alice:foobared@awesome.redis.server:6380'
//   });

client.on("error", (err) => console.log("Redis Client Error", err));

client.connect();

console.log("Redis bağlantısı kuruldu.");

module.exports = {
  redisClient: client,
};