# 스터디룸 서비스

스터디룸 서비스는 파트너가 자신의 스터디 룸을 등록할 수 있도록 하고, 사용자가 알맞은 스터디룸을 찾을 수 있도록 필터링 하는 역할을 하는 서비스 입니다.

## Query

| No. |   From    |        Query        |    To     |           Description            |
| :-: | :-------: | :-----------------: | :-------: | :------------------------------: |
|  1  | `gateway` |    `insertRooms`    | `gateway` |      파트너의 스터디룸 등록      |
|  2  | `gateway` | `getAvailableRooms` | `gateway` | 예약 가능한 스터디룸 목록을 반환 |

### 1. insertRooms

- Params

```json

```

- Req

```json

```

### 2. getAvailableRooms

- Parmas

```json

```

- Req

```json

```

## Database Schema

### 스터디룸 모델

```json
{
	"_id": ObjectId,
	"partner_id": ObjectId, // Partners _id
	"cafe_name": String,
	"name": String, // 방 이름 (ex. 201호)
	"location": String, // 공식 주소
	"images": String [],
	"price": Int,
	"min_personnel": Int,
	"max_personnel": Int,
	"description": String,
	"open_time": Integer, //시간 (ex. 10)
	"close_time": Integer //시간 (ex. 22)
}
```
