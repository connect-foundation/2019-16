require("dotenv").config({ path: ".env" });
const { REDIS_URL, REDIS_PORT } = process.env;

const redis = require("redis");
const client = redis.createClient(REDIS_PORT, REDIS_URL);
const multi = client.multi();

module.exports = { client, multi };
