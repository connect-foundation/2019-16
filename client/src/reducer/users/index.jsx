const SET_GROUPS = "userIndex/SET_GROUPS";

export const set_groups = searchList => ({
  type: SET_GROUPS,
  searchList
});

export const initalState = {
  myGroups: [],
  searchList: [],
  primaryCategories: ["프로그래밍", "자격증", "외국어", "면접"],
  secondaryCategories: {
    프로그래밍: ["C++", "Java", "JavaScript"],
    자격증: ["IT", "운전", "보건", "식품"],
    외국어: ["영어", "중국어", "불어", "스페인어"],
    면접: ["공채", "상시채용", "특채", "기술면접", "임원면접"]
  }
};

export const userIndexReducer = (state, action) => {
  const { searchList } = action;
  switch (action.type) {
    case SET_GROUPS:
      return {
        ...state,
        searchList
      };

    default:
      return state;
  }
};
