# 스터디 그룹 서비스

## 1. Query

| No. |  From   |      Query       |   To    |                    Description                     |
| :-: | :-----: | :--------------: | :-----: | :------------------------------------------------: |
|  1  | gateway |    `addGroup`    | gateway | 스터디 개설 요청으로, DB에 스터디 그룹 정보를 추가 |
|  2  | gateway | `getGroupDetail` | gateway |    상세페이지에 필요한 데이터 요청에 대한 응답     |

### 1.1 addGroup

- Params

```
{
  "category": [ String, String ], // 제목, 부제목
  "leader": String, // 사용자 이메일 형태
  "tags": [ String... ], // 0개 이상의 String 요소 배열
  "title": String, // 그룹의 타이틀
  "subtitle": String, // 그룹 타이틀을 꾸미는 텍스트
  "intro": String, // 그룹 소개를 다루는 본문 내용
  "days": [ Number ], // 요소의 도메인은 0~6으로 각 숫자는 일요일~ 토요일을 뜻한다. 스터디가 주기적으로 진행되는 요일
  "startTime": Number, // 스터디가 시작하는 시간, 정각만을 가리킬 수 있으며, 1~24의 도메인을 갖는다.
  "endTime": Number, // 스터디가 끝나는 시간
  "isRecruiting": Boolean, // 현재 스터디원을 모집 중인지 상태를 나타내는 속성
  "min_personnel": Number, // 최소로 요구하는 스터디 인원 수
  "now_personnel": Number, // 현재 참여하고 있는 스터디 인원 수
  "max_personnel": Number, // 그룹에서 정한 최대 수용 인원 수
  "location": {
      lat: Number, // 경도
      lon: Number // 위도
  },
  "thumbnail": String // Object Storage의 url 경로를 나타냄
}
```

- Response

```
{
  "id": String // ObjectId 형태로, 그룹 상세페이지로 redirect하기 위해 응답하는 데이터
}
```

### 1.2 getGroupDetail

- Params

```
{
  "id": String // ObjectId 형태로, findById로 접근하기 위한 식별자
}
```

- Response

```
{
 "location": { lat: Number, lon: Number },
  "isRecruiting": Boolean,
  "category": [ String, String ],
  "tags": [ String... ], // 0개 이상의 요소
  "days": [ Number... ], // required, 1개 이상의 요소, 0~6의 도메인
  "_id": String, // ObjectId 형식
  "leader": String, // 사용자 이메일 형식
  "title": String,
  "subtitle": String,
  "intro": String,
  "startTime": Number,
  "endTime": Number,
  "min_personnel": Number,
  "now_personnel": Number,
  "max_personnel": Number,
  "thumbnail": String,
  "members": [User], // { email, name }
}
```

## 2. Database Schema

### 1. 스터디 그룹 모델

```
{
  "title": { "type": String, "required": true },
  "subtitle": { "type": String, "required": true },
  "leader": { "type": String, "required": true },
  "members": { "type": [User] },
  "min_personnel": { "type": Number, "required": true },
  "now_personnel": { "type": Number },
  "max_personnel": { "type": Number, "required": true },
  "isRecruiting": { "type": Boolean, "default": true },
  "intro": { "type": String },
  "thumbnail": { "type": String },
  "location": {
    "lat": { "type": Number },
    "lon": { "type": Number }
  },
  "category": { "type": [String] }, // [주 카테고리, 부 카테고리]
  "tags": { "type": [String] }, // 0개 이상의 요소를 가진 배열
  "days": { "type": [Number] },
  "startTime": { "type": Number },
  "endTime": { "type": Number }
}
```

### 2. 사용자 모델

- 스터디 그룹 모델 스키마에 적용하기 위해 정의된 스키마

```
{
  "email": { "type": String, "required": true },
  "name": { "type": String, "required": true }
}
```
