const Users = require("../model/user");

exports.updateJoiningGroups = async ({ userId, joiningGroup, addMode }) => {
  joiningGroup.group_id = joiningGroup._id;
  if (addMode) {
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
      { $pull: { joiningGroups: { group_id: joiningGroup._id } } },
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
