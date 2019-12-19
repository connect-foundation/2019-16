const Users = require("../model/user");

exports.updateJoiningGroups = async ({ userId, joiningGroup }) => {
  Users.findOneAndUpdate(
    { userId: userId },
    { $push: { joiningGroups: joiningGroup } },
    err => {
      throw new Error(err);
    }
  );
};

exports.updateOwnGroups = async ({ userId, ownGroup }) => {
  Users.findOneAndUpdate(
    { userId: userId },
    { $push: { ownGroups: ownGroup } },
    err => {
      throw new Error(err);
    }
  );
};
