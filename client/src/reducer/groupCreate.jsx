import classnames from "classnames";

export const CATEGORY_CLICK = "groupCreate/CATEGORY_CLICK";
export const ADD_TAG = "groupCreate/ADD_TAG";
export const CLICK_DAY = "groupCreate/CLICK_DAY";
export const CHANGE_HOUR = "groupCreate/CHANGE_HOUR";
export const INPUT_CONTENT = "groupCreate/INPUT_CONTENT";
export const ATTACH_IMAGE = "groupCreate/ATTACH_IMAGE";

export const category_click = ({ categoryType, categoryName }) => ({
  type: CATEGORY_CLICK,
  categoryType,
  categoryName
});

export const add_tag = tags => ({
  type: ADD_TAG,
  tags
});

export const click_day = changedIndex => ({
  type: CLICK_DAY,
  changedIndex
});

export const change_hour = startTime => ({
  type: CHANGE_HOUR,
  startTime
});

export const input_content = (contentType, description) => ({
  type: INPUT_CONTENT,
  contentType,
  description
});

export const attach_image = file => ({
  type: ATTACH_IMAGE,
  file
});

const daysStr = ["일", "월", "화", "수", "목", "금", "토"];
const daysInfo = daysStr.map(str => ({
  isSelected: false,
  class: classnames({ "is-focused": false }),
  str
}));

export const initialState = {
  primaryCategories: ["프로그래밍", "자격증", "외국어", "면접", "지역"],
  secondaryCategories: {
    프로그래밍: ["C++", "Java", "JavaScript"],
    자격증: ["IT", "운전", "보건", "식품"],
    외국어: ["영어", "중국어", "불어", "스페인어"],
    면접: ["공채", "상시채용", "특채", "기술면접", "임원면접"],
    지역: ["경기도", "서울", "울산", "인천", "광주", "부산"]
  },
  daysInfo,
  data: {
    category: [null, null],
    tags: [],
    title: "",
    subtitle: "",
    intro: "",
    selectedDays: [],
    startTime: 0,
    during: 0,
    isRecruiting: true,
    thumbnail: null,
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

    case CLICK_DAY:
      const idx = action.changedIndex;
      const daysInfo = [...state.daysInfo];
      const isSelected = daysInfo[idx].isSelected;

      daysInfo[idx] = {
        str: daysInfo[idx].str,
        isSelected: !isSelected,
        class: classnames({
          "is-focused": !isSelected
        })
      };

      if (isSelected)
        data.selectedDays = data.selectedDays.filter(day => day !== idx);
      else data.selectedDays.push(idx);
      return { ...state, daysInfo: daysInfo, data };

    case CHANGE_HOUR:
      const { startTime } = action;
      data.startTime = startTime;
      return { ...state, data };

    case INPUT_CONTENT:
      const { contentType, description } = action;
      data[contentType] = description;

      return { ...state, data };

    case ATTACH_IMAGE:
      data.thumbnail = action.file;

      return { ...state, data };

    default:
      return state;
  }
};
