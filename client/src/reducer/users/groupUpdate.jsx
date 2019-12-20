import classnames from "classnames";

const CATEGORY_CLICK = "groupUpdate/CATEGORY_CLICK";
const ADD_TAG = "groupUpdate/ADD_TAG";
const CLICK_DAY = "groupUpdate/CLICK_DAY";
const CHANGE_HOUR = "groupUpdate/CHANGE_HOUR";
const CHANGE_DURING = "groupUpdate/CHANGE_DURING";
const INPUT_CONTENT = "groupUpdate/INPUT_CONTENT";
const ATTACH_IMAGE = "groupUpdate/ATTACH_IMAGE";
const CHANGE_PERSONNEL = "groupUpdate/CHANGE_PERSONNEL";
const SET_INITIAL_DATA = "groupUpdate/SET_INITIAL_DATA";
const SET_LOCATION = "groupUpdate/SET_LOCATION";

export const category_click = (categoryType, categoryName) => ({
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

export const change_during = during => ({
  type: CHANGE_DURING,
  during
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

export const change_personnel = (min_personnel, max_personnel) => ({
  type: CHANGE_PERSONNEL,
  min_personnel,
  max_personnel
});

export const set_initial_data = groupData => ({
  type: SET_INITIAL_DATA,
  groupData
});

export const set_location = (lat, lon) => ({
  type: SET_LOCATION,
  lat,
  lon
});

const daysStr = ["일", "월", "화", "수", "목", "금", "토"];
const daysInfo = daysStr.map(str => ({
  isSelected: false,
  class: classnames({ "is-focused": false }),
  str
}));

export const initialState = {
  primaryCategories: ["프로그래밍", "자격증", "외국어", "취업", "기타"],
  secondaryCategories: {
    프로그래밍: [
      "C++",
      "Java",
      "JavaScript",
      "Python",
      "Swift",
      "Ruby",
      "기타"
    ],
    자격증: ["강사", "병원", "아동", "IT", "인문", "산업", "기타"],
    외국어: ["영어", "중국어", "일본어", "불어", "스페인어", "기타"],
    취업: ["자소서", "면접", "인적성", "자격증", "기타"],
    기타: ["기타"]
  },
  daysInfo,
  data: {
    category: [],
    leader: "",
    tags: [],
    title: "",
    subtitle: "",
    intro: "",
    days: [],
    startTime: 1,
    during: 1,
    isRecruiting: true,
    thumbnail: null,
    min_personnel: 1,
    now_personnel: 1,
    max_personnel: 10,
    location: { lat: null, lon: null }
  }
};

export const groupUpdateReducer = (state, action) => {
  let data = state.data;
  switch (action.type) {
    case SET_INITIAL_DATA:
      const { groupData } = action;
      const initialDays = [...groupData.days];

      data = groupData;

      data.during = groupData.endTime - groupData.startTime;
      delete data.endTime;

      initialDays.forEach(day => {
        state.daysInfo[day].isSelected = true;
        state.daysInfo[day].class = classnames({ "is-focused": true });
      });

      return { ...state, data };

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

      if (isSelected) data.days = data.days.filter(day => day !== idx);
      else data.days.push(idx);
      return { ...state, daysInfo, data };

    case CHANGE_HOUR:
      const { startTime } = action;
      data.startTime = startTime;
      return { ...state, data };

    case CHANGE_DURING:
      const { during } = action;
      data.during = during;
      return { ...state, data };

    case INPUT_CONTENT:
      const { contentType, description } = action;
      data[contentType] = description;

      return { ...state, data };

    case ATTACH_IMAGE:
      data.thumbnail = action.file;

      return { ...state, data };

    case CHANGE_PERSONNEL:
      const { min_personnel, max_personnel } = action;
      data = { ...data, min_personnel, max_personnel };
      return { ...state, data };

    case SET_LOCATION:
      const { lat, lon } = action;
      const location = { lat, lon };
      data = { ...data, location };
      return { ...state, data };

    default:
      return state;
  }
};
