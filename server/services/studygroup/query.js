const StudyGroups = require("./models/StudyGroups");
const {
  pushStudyGroups,
  removeStudyGroup,
  updateStudyGroup
} = require("../../lib/redis/studygroup");

exports.addGroup = async params => {
  const groupInfo = params;
  const resultAfterStore = await StudyGroups.create(groupInfo);

  groupInfo.group_id = resultAfterStore.id;

  await pushStudyGroups(resultAfterStore);
  return {
    id: resultAfterStore._id,
    status: 200,
    userId: groupInfo.leader,
    ownGroup: groupInfo
  };
};

exports.getGroupDetail = async params => {
  const { id } = params;
  const findResult = await StudyGroups.findById(id);

  if (findResult) return { detailInfo: findResult, status: 200 };
  if (!findResult) return { status: 400 };
};

exports.removeGroup = async params => {
  const { id } = params;
  const deletedGroupInfo = await StudyGroups.findByIdAndDelete(id);

  await removeStudyGroup(deletedGroupInfo);

  return { status: 200, group: deletedGroupInfo };
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
    const { now_personnel, max_personnel, isRecruiting } = groupInfo;
    let failReason = null;

    if (now_personnel > max_personnel) failReason = "인원이 꽉 찼습니다.";
    if (!isRecruiting) failReason = "모집 중이 아닙니다.";

    if (failReason) return { status: 400, failReason };

    groupInfo.members.push({ id: userId });
    groupInfo.now_personnel++;
  }

  const changedMemberType = await groupInfo
    .save()
    .then(() => (isJoiner ? "searcher" : "joiner"))
    .catch(err => {
      throw new Error(err);
    });

  updateStudyGroup(groupInfo);

  return {
    status: 200,
    changedMemberType,
    changedNowPersonnel: groupInfo.now_personnel,
    userId,
    joiningGroup: groupInfo,
    isJoiner
  };
};

exports.toggleRecruitment = async params => {
  const { groupId } = params;
  const groupInfo = await StudyGroups.findById(groupId);
  const {
    now_personnel,
    max_personnel,
    min_personnel,
    isRecruiting
  } = groupInfo;
  const isNotProperPersonnelWhenClosing =
    isRecruiting &&
    !(min_personnel <= now_personnel && now_personnel <= max_personnel);

  if (isNotProperPersonnelWhenClosing)
    return { status: 400, failReason: "인원이 충족되지 않았습니다." };

  groupInfo.isRecruiting = !groupInfo.isRecruiting;
  return groupInfo
    .save()
    .then(async () => {
      await updateStudyGroup(groupInfo);

      return { status: 200 };
    })
    .catch(err => {
      throw new Error(err);
    });
};
