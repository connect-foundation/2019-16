const Users = require("../model/user");

exports.updateJoiningGroups = async ({ userId, joiningGroup, addmode }) => {
  if (addmode) {
    Users.updateOne(
      { userId: userId },
      { $push: { joiningGroups: joiningGroup } },
      err => {
        if (err) throw new Error(err);
      }
    );
  } else {
    Users.updateOne(
      { userId: userId },
      { $pull: { joiningGroups: joiningGroup } },
      err => {
        if (err) throw new Error(err);
      }
    );
  }
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
