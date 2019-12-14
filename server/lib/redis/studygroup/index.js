const { returnRedisPromise } = require("../index");

exports.pushStudyGroups = studyGroup => {
    return returnRedisPromise("rpush", "studygroup:add", JSON.stringify(studyGroup));
};

exports.removeStudyGroup = (studyGroup) => {
    return returnRedisPromise("rpush", "studygroup:remove", studyGroup);
};

exports.updateStudyGroup = (studyGroup) => {
    return returnRedisPromise("rpush", "studygroup:update", JSON.stringify(studyGroup));
};

exports.popStudyGroups = async (command, count) => {
    const groups = await returnRedisPromise("lrange", `studygroup:${command}`, 0, count - 1);

    if (groups.length === 0) {
        return new Promise(res => {
            res([]);
        });
    }

    returnRedisPromise("ltrim", `studygroup:${command}`, count - 1, -1);
    return new Promise(res => {
        res(groups);
    });
};

exports.getStudyGroupsLength = async (command) => {
    return returnRedisPromise("llen", `studygroup:${command}`);
};