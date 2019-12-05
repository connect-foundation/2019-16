export const REGISTER = "groupDetail/REGISTER";

export const register = () => ({ type: REGISTER });

export const initialState = {
  title: "자바스크립트 기초 공부해요",
  subtitle: "자바스크립트 기초없이 할려고 했어?",
  category: ["프로그래밍", "JavaScript"],
  thumbnail:
    "https://secure.meetupstatic.com/photos/event/c/6/d/c/600_482150908.jpeg",
  location: { lat: 50, lon: 40 },
  startTime: 5,
  endTime: 7,
  days: [1, 3],
  min_personnel: 1,
  now_personnel: 2,
  max_personnel: 4,
  tags: ["Java", "C++", "Python"],
  members: [],
  isRecruiting: true
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
