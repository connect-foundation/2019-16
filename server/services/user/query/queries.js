const Users = require("../model/user");

exports.updateJoiningGroups = async ({ userId, joiningGroup }) => {
  Users.updateOne(
    { userId: userId },
    { $push: { joiningGroups: joiningGroup } },
    err => {
      if (err) throw new Error(err);
    }
  );
};

exports.updateOwnGroups = async ({ userId, ownGroup }) => {
  Users.updateOne(
    { userId: userId },
    { $push: { ownGroups: ownGroup } },
    err => {
      if (err) throw new Error(err);
    }
  );
};
