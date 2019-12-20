const { cacheClient } = require("../../../lib/redis/client");

exports.saveCache = ({ lat, lon }, data) => {
  const key = JSON.stringify({ lat, lon });

  cacheClient.set(key, JSON.stringify(data));
};

exports.getCache = async ({ lat, lon }) => {
  const key = JSON.stringify({ lat, lon });

  return new Promise((res, rej) => {
    cacheClient.get(key, (err, reply) => {
      if (err) rej(err);
      res(reply);
    });
  });
};
// const lat = 123;
// const lon = 12;

// (async function() {
//   const a = await this.getCache({ lat, lon });

//   console.log(a);
// }.bind(this)(this));
