require("dotenv").config();
const { REDIS_PORT, REDIS_URL } = process.env;
const redis = require("redis");
const client = redis.createClient(REDIS_PORT, REDIS_URL);
// const client = redis.createClient();
const multi = client.multi();

module.exports = { client, multi };
