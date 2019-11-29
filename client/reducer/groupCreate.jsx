import classnames from "classnames";

const CATEGORY_CLICK = "groupCreate/CATEGORY_CLICK";
const ADD_TAG = "groupCreate/ADD_TAG";
const CLICK_DAY = "groupCreate/CLICK_DAY";
const CHANGE_HOUR = "groupCreate/CHANGE_HOUR";
const INPUT_CONTENT = "groupCreate/INPUT_CONTENT";
const ATTACH_IMAGE = "groupCreate/ATTACH_IMAGE";

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

export const change_hour = (timeType, hour) => ({
  type: CHANGE_HOUR,
  timeType,
  hour
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
  primaryCategories: [],
  secondaryCategories: {},
  daysInfo,
  data: {
    category: [null, null],
    leader: "",
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
      const { timeType, hour } = action;
      data[timeType] = hour;
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
