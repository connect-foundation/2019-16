const studyGroupData = {
  src:
    "https://nicholashowlett.com.au/wp-content/uploads/2016/05/coding-cat-768x512.jpg",
  alt: "img",
  title: "필수 표현으로 마스터하는 비즈니스 영어",
  subtitle:
    "10여 년의 해외 근무 경험으로 쌓은 실전 비즈니스 영어 노하우를 배울 수 있는 스터디입니다.",
  location: "강남",
  time: "월수 | 20:00 ~ | 2시간",
  nowCnt: 8,
  maxCnt: 10
};

const category = {
  link: "프로그래밍",
  items: [
    { name: "C", href: "www.naver.com" },
    { name: "C++", href: "www.naver.com" }
  ]
};

const miniCard1 = {
  leader: "dlatns0201@gmail.com",
  img: "http://images.christiantoday.co.kr/data/images/full/323947/2.jpg?w=654",
  title: "영화보면서 영어공부 같이해요~",
  isRecruiting: true
};
const miniCard2 = {
  leader: "dlatns0202@gmail.com",
  img: "http://images.christiantoday.co.kr/data/images/full/323947/2.jpg?w=654",
  title: "HTML은 프로그래밍 언어가 아니다~",
  isRecruiting: false
};

const miniCard3 = {
  leader: "dlatns0202@gmail.com",
  img: "http://images.christiantoday.co.kr/data/images/full/323947/2.jpg?w=654",
  title: "김세진도 좋아하는 Java 프로그래밍 교실",
  isRecruiting: false
};

const miniCard4 = {
  leader: "dlatns0201@gmail.com",
  img: "http://images.christiantoday.co.kr/data/images/full/323947/2.jpg?w=654",
  title: "30대의 뚝심을 버리는 법",
  isRecruiting: true
};
const myStudyData = [miniCard1, miniCard2, miniCard3, miniCard4];
const categoryData = [category, category, category, category, category];

export { myStudyData, categoryData, studyGroupData };
