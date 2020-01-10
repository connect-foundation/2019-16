const { CACHE_HOST } = process.env;

let Redis = require("ioredis");

const redis = require("redis");

const cacheClient = redis.createClient(6379, CACHE_HOST);

const client = new Redis({
    sentinels: [
        { host: "106.10.41.25", port: 16379 },
        { host: "106.10.41.25", port: 16378 }
    ],
    name: "mymaster"
});

module.exports = { client, cacheClient };
