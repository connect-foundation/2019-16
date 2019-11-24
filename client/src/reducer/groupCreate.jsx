export const CATEGORY_CLICK = "groupCreate/CATEGORY_CLICK";

export const category_click = ({ categoryType, categoryName }) => ({
  type: CATEGORY_CLICK,
  categoryType,
  categoryName
});

export const initialState = {
  primary: null,
  secondary: null,
  primaryCategories: ["프로그래밍", "자격증", "외국어", "면접", "지역"],
  secondaryCategories: {
    프로그래밍: ["C++", "Java", "JavaScript"],
    자격증: ["IT", "운전", "보건", "식품"],
    외국어: ["영어", "중국어", "불어", "스페인어"],
    면접: ["공채", "상시채용", "특채", "기술면접", "임원면접"],
    지역: ["경기도", "서울", "울산", "인천", "광주", "부산"]
  }
};

export const groupCreateReducer = (state, action) => {
  switch (action.type) {
    case CATEGORY_CLICK:
      const { categoryType, categoryName } = action;
      if (categoryType === "primary")
        return {
          ...state,
          primary: categoryName,
          secondary: null
        };

      if (categoryType === "secondary")
        return {
          ...state,
          secondary: categoryName
        };
      break;

    default:
      return state;
  }
};