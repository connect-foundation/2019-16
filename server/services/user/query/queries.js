const Users = require("../model/user");

exports.updateJoiningGroups = async ({ userId, joiningGroups }) => {
  return Users.findOneAndUpdate(
    { userId: userId },
    { joiningGroups: joiningGroups },
    {
      new: true
    }
  );
};

exports.updateOwnGroups = async ({ userId, ownGroups }) => {
  return Users.findOneAndUpdate(
    { userId: userId },
    { ownGroups: ownGroups },
    {
      new: true
    }
  );
};
