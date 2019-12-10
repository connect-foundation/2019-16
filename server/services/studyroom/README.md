# 스터디룸 서비스

스터디룸 서비스는 파트너가 자신의 스터디 룸을 등록할 수 있도록 하고, 사용자가 알맞은 스터디룸을 찾을 수 있도록 필터링 하는 역할을 하는 서비스 입니다.

### 1. /api/studyroom/availableRooms

**request Body**

## 1. Query

| No. | Method |       Url        |                                   When                                    |                                                          What                                                           |
| :-: | :----: | :--------------: | :-----------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: |
|  1  | `GET`  | `availableRooms` | `그룹장이 스터디 그룹 모집을 마감하고 스터디룸 예약하기 버튼을 눌렀을 때` | `스터디그룹의 정보(인원수, 지역, 날짜, 시간 등..)와 일치하고, 예약이 잡혀있지 않은 스터디룸 정보를 필터링하여 반환해줌` |

### 1.1 availableRooms

- Params

|   parm    |    type    |          description          |
| :-------: | :--------: | :---------------------------: |
| latitude  |   Number   |  스터디그룹 개설 위치의 위도  |
| longitude |   Number   |  스터디그룹 개설 위치의 경도  |
| personnel |   Number   |        스터디그룹 인원        |
| startTime |   Number   | 스터디그룹의 스터디 시작 시간 |
|  endTime  |   Number   | 스터디그룹의 스터디 종료 시간 |
|   days    | Date Array |   스터디그룹의 스터디 날짜    |

```json
// 예시
{
  "geoPoint": {
    "latitude": 37.234,
    "longitude": 123.34
  },
  "personnel": 5,
  "startTime": 20,
  "endTime": 23,
  "days": []
}
```

- Req

```
{
    "filteredRooms": [
        {
            "location": {
                "coordinates": [
                    127.02883760326216,
                    37.49935024719527
                ],
                "type": "Point"
            },
            "images": [
                "http://mblogthumb2.phinf.naver.net/20160311_137/bin03160_1457707519895yq9gU_JPEG/20160311_211024.jpg?type=w800",
                "https://moplqfgeemqv2103108.cdn.ntruss.com/pstatic-scloud/20170124_127/14852573966562wet8_JPEG/%2525C0%2525CC%2525C1%2525F6%2525B4%2525EB%2525C7%2525A5.jpg?type=m&w=600&h=600&autorotate=true&quality=70"
            ],
            "_id": "5de8fd5e10e2f841c0c91865",
            "partner_id": "5de7b74cc39a82426cdba288",
            "cafe_name": "이지스터디 강남점",
            "name": "D",
            "price": 2000,
            "min_personnel": 5,
            "max_personnel": 8,
            "description": "이지스터디 강남점입니다. ",
            "open_time": 10,
            "close_time": 23
		},
		{...}
		....
    ]
}

```

### 1.2 getAvailableRooms

- Parmas

```

```

- Req

```

```

## 2. Database Schema

### 2.1 스터디룸 모델

```
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
