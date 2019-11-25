export const CATEGORY_CLICK = "groupCreate/CATEGORY_CLICK";
export const ADD_TAG = "groupCreate/ADD_TAG";

export const category_click = ({ categoryType, categoryName }) => ({
  type: CATEGORY_CLICK,
  categoryType,
  categoryName
});

export const add_tag = tags => ({
  type: ADD_TAG,
  tags
});

export const initialState = {
  primaryCategories: ["프로그래밍", "자격증", "외국어", "면접", "지역"],
  secondaryCategories: {
    프로그래밍: ["C++", "Java", "JavaScript"],
    자격증: ["IT", "운전", "보건", "식품"],
    외국어: ["영어", "중국어", "불어", "스페인어"],
    면접: ["공채", "상시채용", "특채", "기술면접", "임원면접"],
    지역: ["경기도", "서울", "울산", "인천", "광주", "부산"]
  },
  data: {
    category: [null, null],
    tags: [],
    title: "",
    subtitle: "",
    intro: "",
    days: [],
    startTime: 0,
    during: 0,
    isRecruiting: true,
    thumbnail: "",
    min_personnel: 0,
    max_personnel: 0
  }
};

export const groupCreateReducer = (state, action) => {
  const data = state.data;
  switch (action.type) {
    case CATEGORY_CLICK:
      const { categoryType, categoryName } = action;
      if (categoryType === "primary") {
        data.category = [categoryName, null];
      }

      if (categoryType === "secondary") {
        const category = [...data.category];
        category[1] = categoryName;
        data.category = category;
      }

      return { ...state, data };

    case ADD_TAG:
      data.tags = action.tags;
      return { ...state, data };

    default:
      return state;
  }
};
