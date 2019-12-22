const SET_GROUPS = "userIndex/SET_GROUPS";
const SET_ADDTIONAL_GROUPS = "userIndex/SET_ADDTIONAL_GROUPS";
const SET_MY_GROUPS = "userIndex/SET_MY_GROUPS";
const SET_JOIN_GROUPS = "userIndex/SET_JOIN_GROUPS";

export const set_groups = searchList => ({
  type: SET_GROUPS,
  searchList
});

export const set_additional_groups = searchList => ({
  type: SET_ADDTIONAL_GROUPS,
  searchList
});

export const set_my_group = myGroups => ({ type: SET_MY_GROUPS, myGroups });

export const set_join_group = joinedGroups => ({
  type: SET_JOIN_GROUPS,
  joinedGroups
});

export const initalState = {
  searchList: [
    // {
    //   id: 0,
    //   days: [],
    //   startTime: 0,
    //   during: 0,
    //   //location: { lat: 0, lon: 0 },
    //   max_personnel: 0,
    //   now_personnel: 0,
    //   // min_personnel: 0,
    //   title: "",
    //   subtitle: "",
    //   thumbnail: "",
    //   tags: []
    // }
  ],
  // primaryCategories: ["프로그래밍", "자격증", "외국어", "면접"],
  // secondaryCategories: {
  //   프로그래밍: ["C++", "Java", "JavaScript"],
  //   자격증: ["IT", "운전", "보건", "식품"],
  //   외국어: ["영어", "중국어", "불어", "스페인어"],
  //   면접: ["공채", "상시채용", "특채", "기술면접", "임원면접"]
  // }
  primaryCategories: ["프로그래밍", "자격증", "외국어", "취업", "기타"],
  secondaryCategories: {
    프로그래밍: ["C++", "Java", "JavaScript", "Python", "Swift", "Ruby"],
    자격증: ["강사", "병원", "아동", "IT", "인문", "산업"],
    외국어: ["영어", "중국어", "일본어", "불어", "스페인어"],
    취업: ["자소서", "면접", "인적성"],
    기타: ["기타"]
  }
};

export const userIndexReducer = (state, action) => {
  const { searchList, myGroups, joinedGroups } = action;
  switch (action.type) {
    case SET_GROUPS:
      return {
        ...state,
        searchList
      };
    case SET_ADDTIONAL_GROUPS:
      return {
        ...state,
        searchList: [...state.searchList, ...searchList]
      };
    case SET_MY_GROUPS:
      return {
        ...state,
        myGroups: [...state.myGroups, ...myGroups]
      };
    case SET_JOIN_GROUPS:
      return {
        ...state,
        joinedGroups: [...state.joinedGroups, ...joinedGroups]
      };
    default:
      return state;
  }
};
