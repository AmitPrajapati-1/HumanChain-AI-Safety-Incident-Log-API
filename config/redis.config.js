// config/redis.config.js
const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`, // Redis URL
  password: process.env.REDIS_PASSWORD,  // Include the password from the dashboard
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Immediate connect
(async () => {
  try {
    await redisClient.connect();
    console.log('Redis connected successfully!');
  } catch (err) {
    console.error('Unable to connect to Redis:', err);
  }
})();

module.exports = redisClient;
