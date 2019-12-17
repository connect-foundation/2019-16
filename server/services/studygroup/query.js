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

exports.toggleRegistration = async params => {
  const { userId, groupId } = params;
  const groupInfo = await StudyGroups.findById(groupId);
  const members = groupInfo.members;
  const isJoiner = members.some(m => m.id === userId);

  if (isJoiner) {
    groupInfo.members = members.filter(m => m.id !== userId);
    groupInfo.now_personnel--;
  }
  if (!isJoiner) {
    groupInfo.members.push({ id: userId });
    groupInfo.now_personnel++;
  }

  const changedMemberType = await groupInfo
    .save()
    .then(() => (isJoiner ? "searcher" : "joiner"))
    .catch(err => {
      throw new Error(err);
    });

  return {
    status: 200,
    changedMemberType,
    changedNowPersonnel: groupInfo.now_personnel
  };
};

exports.toggleRecruitment = async params => {
  const { groupId } = params;
  const groupInfo = await StudyGroups.findById(groupId);

  groupInfo.isRecruiting = !groupInfo.isRecruiting;
  return groupInfo
    .save()
    .then(() => ({
      status: 200
    }))
    .catch(err => {
      throw new Error(err);
    });
};
