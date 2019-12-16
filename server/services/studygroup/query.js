const StudyGroups = require("./models/StudyGroups");
const {
  pushStudyGroups,
  removeStudyGroup,
  updateStudyGroup
} = require("../../lib/redis/studygroup");

exports.addGroup = async params => {
  const groupInfo = params;
  const resultAfterStore = await StudyGroups.create(groupInfo);

  await pushStudyGroups(resultAfterStore);
  return { id: resultAfterStore._id, status: 200 };
};

exports.getGroupDetail = async params => {
  const { id } = params;
  const findResult = await StudyGroups.findById(id);

  return { detailInfo: findResult, status: 200 };
};

exports.removeGroup = async params => {
  const { id } = params;
  const deletedGroupInfo = await StudyGroups.findByIdAndDelete(id);

  await removeStudyGroup(deletedGroupInfo);

  return { status: 200 };
};

exports.updateGroup = async params => {
  const groupData = params;
  const id = groupData._id;

  delete groupData._id;
  const updatedGroupInfo = await StudyGroups.findByIdAndUpdate(id, groupData, {
    new: true
  });

  await updateStudyGroup(updatedGroupInfo);

  return { status: 200, id };
};
