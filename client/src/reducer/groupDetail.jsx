export const REGISTER = "groupDetail/REGISTER";

export const register = () => ({ type: REGISTER });

export const initialState = {
  groupInfo: {
    title: "자바스크립트 기초 공부해요",
    category: "프로그래밍",
    studyThumbnail:
      "https://secure.meetupstatic.com/photos/event/c/6/d/c/600_482150908.jpeg",
    location: "서울시 서초구 서초1동",
    time: "월,수 | 20:00~ | 2시간",
    minCnt: 1,
    nowCnt: 2,
    maxCnt: 4,
    tags: ["Java", "C++", "Python"],
    isMaster: false,
    isMember: false,
    isRecruiting: true
  }
};

export const groupDetail = (state, action) => {
  switch (action.type) {
    case REGISTER:
      const groupInfo = { ...state.groupInfo };
      groupInfo.isMember = groupInfo.isMember ? false : true;

      return {
        ...state,
        groupInfo
      };

    default:
      return state;
  }
};
