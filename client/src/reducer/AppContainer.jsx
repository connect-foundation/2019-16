const GET_ALL_GROUPS = "main/GET_ALL_GROUPS";
const GET_SEARCHED_GROUPS_WITHOUT_CATEGORY =
  "main/GET_SEARCHED_GROUPS_WITHOUT_CATEGORY";

export const get_all_groups = cardList => ({
  type: GET_ALL_GROUPS,
  cardList
});

export const get_searched_groups_without_category = cardList => ({
  type: GET_SEARCHED_GROUPS_WITHOUT_CATEGORY,
  cardList
});

export const initalState = {
  myGroups: [
    {
      id: 1,
      leader: "dlatns0201@gmail.com",
      img:
        "http://images.christiantoday.co.kr/data/images/full/323947/2.jpg?w=654",
      title: "영화보면서 영어공부 같이해요~",
      isRecruiting: true
    },
    {
      id: 2,
      leader: "dlatns0202@gmail.com",
      img:
        "http://images.christiantoday.co.kr/data/images/full/323947/2.jpg?w=654",
      title:
        "HTML은 프로그래밍 언어가 아니다~HTML은 프로그래밍 언어가 아니다~HTML은 프로그래밍 언어가 아니다~",
      isRecruiting: false
    },
    {
      id: 3,
      leader: "dlatns0202@gmail.com",
      img:
        "http://images.christiantoday.co.kr/data/images/full/323947/2.jpg?w=654",
      title: "김세진도 좋아하는 Java 프로그래밍 교실",
      isRecruiting: false
    },
    {
      id: 4,
      leader: "dlatns0201@gmail.com",
      img:
        "http://images.christiantoday.co.kr/data/images/full/323947/2.jpg?w=654",
      title: "30대의 뚝심을 버리는 법",
      isRecruiting: true
    }
  ],
  cardList: [],
  primaryCategories: ["프로그래밍", "자격증", "외국어", "면접"],
  secondaryCategories: {
    프로그래밍: ["C++", "Java", "JavaScript"],
    자격증: ["IT", "운전", "보건", "식품"],
    외국어: ["영어", "중국어", "불어", "스페인어"],
    면접: ["공채", "상시채용", "특채", "기술면접", "임원면접"]
  }
};

export const appContainerReducer = (state, action) => {
  const { cardList } = action;
  switch (action.type) {
    case GET_ALL_GROUPS:
      return {
        ...state,
        cardList
      };
    case GET_SEARCHED_GROUPS_WITHOUT_CATEGORY:
      return {
        ...state,
        cardList
      };
    default:
      return state;
  }
};
