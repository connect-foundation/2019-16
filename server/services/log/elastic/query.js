const elasticClient = require("./client");

module.exports = function indexLog(data, timestamp) {
  elasticClient.index({
    index: "logs",
    body: data,
    id: timestamp
  });
};
