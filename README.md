<h1 align="center">📝 Study Combined 📝</h1>
<p align="center">
  <a href="https://github.com/connect-foundation/2019-16/wiki" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/connect-foundation/2019-16/wiki" target="_blank">
    <img alt="node" src="https://img.shields.io/node/v/3" />
  </a>
  <a href="https://github.com/connect-foundation/2019-16/wiki" target="_blank">
    <img alt="node" src="https://github.com/connect-foundation/2019-16/workflows/PR Test [Service]/badge.svg" />
  </a>
</p>

> ✏ 스터디원을 모집하고 원하는 지역에 이용 가능한 스터디룸을 예약할 수 있도록 검색해주는 플랫폼입니다.

### [🏠 Homepage](http://studycombined.shop)

### [📖 Wiki](https://github.com/connect-foundation/2019-16/wiki)

### [💾 더 많은 정보](https://www.notion.so/9f5925bc47884bf7ad0bb258a2566c9e)

### [🎥 데모 영상](https://www.youtube.com/playlist?list=PLgN7SPXzVFBCx30q9n8s5Y3DbCJBRTFfX)

## 프로젝트 소개

### 주제 선정 이유

프로젝트 주제를 정하기 위해 강남역에서 만나기로 한 16조. 스터디룸을 예약하기 위해서 전화를 돌려보기 시작한다. 하지만 남아있는 스터디룸을 찾다가 지쳐버리는데... 두-둥

이렇게 된거 스터디룸 사용을 편하게 하는 서비스를 우리가 만들어 보자!👊

### 기술 스택

| Front-End        | Back-End  | DevOps       | Etc      |
| ---------------- | --------- | ------------ | -------- |
| `React`          | `Express` | `Git Action` | `jest`   |
| `Bulma`          | `mongoDB` |              | `socket` |
| `Kakao Maps API` | `elasticsearch`|              | `OAuth`  |

### 특징

- 마이크로서비스 아키텍쳐
- 소켓 통신 프로토콜 구현
- 결제 서비스
- 엘라스틱 서치 검색
- 내 지역 기반 스터디 그룹/스터디룸 검색

## 마이크로서비스 아키텍쳐
![서비스구성도2](https://user-images.githubusercontent.com/39212304/71319744-a1ddcd80-24e5-11ea-8305-981c3fb6f070.png)


## 화면 구성
<table>
  <tr>
    <th><img width="1067" alt="스크린샷 2019-12-23 오후 2 10 00" src="https://user-images.githubusercontent.com/42646264/71337283-49aed600-258e-11ea-8d12-6aa81e0d3f04.png"></th>
    <th><img width="1067" alt="스크린샷 2019-12-23 오후 2 10 00" src="https://user-images.githubusercontent.com/42646264/71337331-85e23680-258e-11ea-98e5-715d3feacf28.png"></th>
  </tr>
  <tr>
    <td>메인 페이지</td>
    <td>검색 페이지</td>
  </tr>
  <tr>
    <td><img width="1067" alt="스크린샷 2019-12-23 오후 2 10 00" src="https://user-images.githubusercontent.com/42646264/71337389-e07b9280-258e-11ea-8047-78846a8fa988.png"></td>
    <td><img width="1067" alt="스크린샷 2019-12-23 오후 2 10 00" src="https://user-images.githubusercontent.com/42646264/71337423-03a64200-258f-11ea-93c2-8b0065d4531e.png"></td>
  </tr>
  <tr>
    <td>스터디 그룹 생성 페이지</td>
    <td>스터디룸 예약 페이지</td>
  </tr> 
  <tr>
    <td><img width="1067" alt="스크린샷 2019-12-23 오후 2 10 00" src="https://user-images.githubusercontent.com/42646264/71337467-2c2e3c00-258f-11ea-95d7-12393bc9fbbf.png"></td>
    <td><img width="1067" alt="스크린샷 2019-12-23 오후 2 10 00" src="https://user-images.githubusercontent.com/42646264/71337505-5d0e7100-258f-11ea-8c45-35deb8a38ac1.png"></td>
  </tr>
   <tr>
    <td>카카오페이 결제 페이지</td>
    <td>결제 완료 페이지</td>
  </tr> 
</table>


## 팀원 소개

👤 **이아람**

- 언제나 즐겁게 코딩하는 것이 꿈이자 목표입니다. 맏은 일은 끝까지 책임지고 진행하려 노력합니다.
- log 서비스, group 서비스, CI/CD 담당
- '나'에게 '이아람'이란..?
  - 김세진: 아람이가 없으면 3형제가 집을 난장판으로 만들어 놓는 느낌??
  - 임태현: 작지만 연비 좋은 슈퍼카, 식사도 그렇고 공부도 그렇다.
  - 이수배: 빠른 결단. 빠르게 적용하는 능력. 걸음속도 마저 빠른 그..

👤 **김세진**

- 팀원들에게 문서화에 대한 중요성을 끊임없이 강조하는 잔소리꾼입니다. 사용자와 동료를 위한 코드를 짜기 위해 항상 생각하고 프로젝트의 큰 그림을 보는 것을 좋아합니다.
- reservation 서비스, analytics 서비스 담당
- '나'에게 '김세진'이란..?
  - 임태현: 수염이 우리나라에서 몇 안되게 어울리는 영국 신사, 덩치 값 less, 하지만 인생은 "세진킴"처럼...
  - 이아람: 꼼꼼대마왕이다. 항상 코드에 대한 걱정이 한가득이다🤣
  - 이수배: 필기란 이렇게 하는 것.. 정리의 중요함이랄까. 항상 나에게 강조한다. 왜 나일까..

👤 **이수배**

- 주체적으로 일하는것을 좋아하고, 코드의 품질은 팀의 으쌰으쌰 하는 분위기가 중요하다고 생각합니다. 팀원 모두가 하고싶은 것을 담당해서 했으면 하는 마음입니다. 
- 마이크로아키텍처 설계 및 서비스간 통신을 위한 구조 및 클래스, 모듈
- 서비스 : search, group
- '나'에게 '이수배'란..?
  - 임태현: 결혼 준비해야하는데 술 먹는데 돈을 왜 이렇게 많이 쓸까... 우리의 총무, 우리의 돈과 프로젝트를 책임지는 맏형
  - 김세진: 30대의 뚝심!!! 가능성이 보이면 만들어낸다. (feat. 인디언 기우제)
  - 이아람: 자유로운 막내. 여러가지 상황에 대한 고민을 많이 한다.

👤 **임태현**

- 한 곳에 이목이 가면 끝까지 파고 드는 개발자 입니다. 함수형 프로그래밍을 좋아하고, 팀내 비동기 제어 디버거로 사용됩니다.
- 아키텍처 공동 설계, group 서비스 및 전체적인 클라이언트 담당, analytics 공동 담당
- '나'에게 '임태현'이란..?
  - 김세진: 16조의 메인 딜러. 개발 속도가 가장 빠른 플레이어. 손이 빠른건가?
  - 이아람: 우리조 열정마왕😈 코드리뷰를 열심히 해준다.
  - 이수배: 그래.. 한창 이것저것 관심 많을 때지..
