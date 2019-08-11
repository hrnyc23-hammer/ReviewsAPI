const redis = require("redis");
// const { promisify } = require("util");

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: 6379
});

client.on("error", function(err) {
  console.log("Error " + err);
});

module.exports = client;

// const client = redis.createClient(process.env.REDIS_URL);

// module.exports = {
//   ...client,
//   getAsync: promisify(client.get).bind(client),
//   setAsync: promisify(client.set).bind(client),
//   keysAsync: promisify(client.keys).bind(client)
// };
