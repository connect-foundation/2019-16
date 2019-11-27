export const GET_ALL_GROUPS = "main/GET_ALL_GROUPS";

export const get_all_groups = cardList => ({
  type: GET_ALL_GROUPS,
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
  cardList: [
    {
      id: 5,
      src:
        "https://cdn.searchenginejournal.com/wp-content/uploads/2018/07/SEO-and-JavaScript-6-Things-You-Need-to-Know.webp",
      alt: "img",
      title: "숙련된 프로그래머",
      subtitle: "자바스크립트의 풀 스택을 익히는 고오급 과정",
      category: ["프로그래밍", "JavaScript"],
      location: "강남",
      time: "월수 | 20:00 ~ | 2시간",
      now_personnel: 8,
      max_personnel: 10
    },
    {
      id: 6,
      src: "https://gaussian37.github.io/assets/img/cpp/cpp.png",
      alt: "img",
      title: "초보자도 하는 코딩",
      subtitle: "프로그래밍 언어의 기본인 C부터 근래에 핫한 Python 까지!",
      category: ["프로그래밍", "C++"],
      location: "강남",
      time: "월수 | 20:00 ~ | 2시간",
      now_personnel: 8,
      max_personnel: 10
    },
    {
      id: 7,
      src:
        "https://www.tippingkorea.co.kr/data/plupload/o_1ceqams87pgg1mf99v917r1r8ua.jpg",
      alt: "img",
      title: "컴퓨터활용능력 1급",
      subtitle: "1달만에 습득하는 컴퓨터 활용 능력!",
      category: ["자격증", "IT"],
      location: "강남",
      time: "월수 | 20:00 ~ | 2시간",
      now_personnel: 8,
      max_personnel: 10
    },
    {
      id: 8,
      src:
        "http://static.news.zumst.com/images/68/2018/01/30/b74910f08a4f46bd81c3faf04a022424.jpg",
      alt: "img",
      title: "필수 표현으로 마스터하는 비즈니스 영어",
      subtitle:
        "10여 년의 해외 근무 경험으로 쌓은 실전 비즈니스 영어 노하우를 배울 수 있는 스터디입니다.",
      category: ["외국어", "영어"],
      location: "강남",
      time: "월수 | 20:00 ~ | 2시간",
      now_personnel: 8,
      max_personnel: 10
    }
  ],
  primaryCategories: ["프로그래밍", "자격증", "외국어", "면접"],
  secondaryCategories: {
    프로그래밍: ["C++", "Java", "JavaScript"],
    자격증: ["IT", "운전", "보건", "식품"],
    외국어: ["영어", "중국어", "불어", "스페인어"],
    면접: ["공채", "상시채용", "특채", "기술면접", "임원면접"]
  }
};

export const mainReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_GROUPS:
      const { cardList } = action;
      return {
        ...state,
        cardList
      };

    default:
      return state;
  }
};
