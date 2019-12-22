# 예약 서비스

사용자들의 스터디룸 예약 정보를 저장/관리하는 서비스입니다.

## Query

| No. |   From    |       Query        |    To     |         Description         |
| :-: | :-------: | :----------------: | :-------: | :-------------------------: |
|  1  | `gateway` | `filterStudyGroup` | `gateway` | 예약 가능한 스터디룸 필터링 |
|  2  | `payment` |  `addReservation`  | `payment` |      예약 정보를 저장       |

### 1. filterStudyGroup

지도에 예약 가능한 스터디룸을 보여주기 위한 필터링 요청

- Parmas

```
{
	studyGroup,
	studyRooms
}
```

### 2. addReservation

결제 승인 완료 후 예약 정보를 저장하고 응답

- Params

## Database Schema

### 예약 정보 모델

```js
const ReservationsSchema = new Schema({
  studyGroup: StudyGroupSchema,
  studyRoom: StudyRoomSchema,
  dates: [
    {
      reservedDate: Date,
      start: Number,
      end: Number
    }
  ]
});
```

### 스터디 그룹 모델

```js
const StudyGroupSchema = new Schema({
  title: String,
  subtitle: String,
  leader: String,
  members: [UserSchema],
  min_personnel: Number,
  now_personnel: Number,
  max_personnel: Number,
  isRecruiting: Boolean,
  intro: String,
  thumbnail: String,
  location: {
    lat: Number,
    lon: Number }
 ,
  category: [String],
  tags: [String],
  days: [Number],
  startTime: Number,
  endTime: Number }
});

const UserSchema = new Schema({
  email: String,
  name: String
});
```

### 스터디 룸 모델

```js
const StudyRoomSchema = new Schema(
  {
    partner_id: String,
    cafe_name: String,
    name: String,
    location: {
      type: {
        type: String,
        enum: ["Point"]
      },
      coordinates: {
        type: [Number]
      }
    },
    images: [String],
    price: Number,
    min_personnel: Number,
    max_personnel: Number,
    description: String,
    open_time: Number,
    close_time: Number
  },
  {
    collection: "studyrooms"
  }
);
```
