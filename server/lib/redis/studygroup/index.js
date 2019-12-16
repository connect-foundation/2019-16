const { client, multi } = require("../client");

function returnRedisPromise(command, ...params) {
  return new Promise((res, rej) => {
    client[command](...params, (err, reply) => {
      if (err) rej(err);
      res(reply);
    });
  });
}

exports.pushStudyGroups = studyGroup => {
  return returnRedisPromise(
    "rpush",
    "studygroup:add",
    JSON.stringify(studyGroup)
  );
};

exports.removeStudyGroup = studyGroup => {
  return returnRedisPromise(
    "rpush",
    "studygroup:remove",
    JSON.stringify(studyGroup)
  );
};

exports.updateStudyGroup = studyGroup => {
  return returnRedisPromise(
    "rpush",
    "studygroup:update",
    JSON.stringify(studyGroup)
  );
};

exports.popStudyGroups = async (command, count) => {
  const groups = await returnRedisPromise(
    "lrange",
    `studygroup:${command}`,
    0,
    count - 1
  );

  if (groups.length === 0) {
    return new Promise(res => {
      res([]);
    });
  }
  return new Promise(res => {
    res(groups);
  });
};

exports.emptyStudyGroups = async (command, count) => {
  return returnRedisPromise("ltrim", `studygroup:${command}`, count - 1, -1);
};

exports.getStudyGroupsLength = async command => {
  return returnRedisPromise("llen", `studygroup:${command}`);
};
