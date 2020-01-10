const { CACHE_HOST } = process.env;
const redis = require("redis");
const client = redis.createClient();
const multi = client.multi();
const cacheClient = redis.createClient(6379, CACHE_HOST);

module.exports = { client, multi, cacheClient };
