# API Gateway

## API

### 1. Payment

결제 서비스에 사용되는 API

|  No.  | Method |                       Url                        |
| :---: | :----: | :----------------------------------------------: |
|   1   | `POST` | [`/api/payment/ready`](#11-post-apipaymentready) |
|   2   | `GET`  |     `/api/payment/approval/:roomId/:userId`      |
|   3   | `GET`  |              `/api/payment/cancel`               |
|   4   | `GET`  |               `/api/payment/fail`                |

#### 1.1 `POST /api/payment/ready`

결제 준비 요청

- Content-type : `application/json`
- Body

|             Field              |    Type    |          Description           |
| :----------------------------: | :--------: | :----------------------------: |
|            `userId`            |  `String`  |            `사용자 id`            |
|       `paymentInfo.cid`        |  `String`  |         `가맹점 코드. 10자`          |
| `paymentInfo.partner_order_id` |  `String`  |      `가맹점 주문번호. 최대 100자`       |
| `paymentInfo.partner_user_id`  |  `String`  |      `가맹점 회원 id. 최대 100자`      |
|    `paymentInfo.item_name`     |  `String`  |         `상품명. 최대 100자`         |
|     `paymentInfo.quantity`     |  `Number`  |            `상품 수량`             |
|   `paymentInfo.total_amount`   |  `Number`  |            `상품 총액`             |
| `paymentInfo.tax_free_amount`  |  `Number`  |          `상품 비과세 금액`           |
|   `paymentInfo.approval_url`   |  `String`  | `결제 성공시 redirect url. 최대 255자` |
|    `paymentInfo.cancel_url`    |  `String`  | `결제 취소시 redirect url. 최대 255자` |
|     `paymentInfo.fail_url`     |  `String`  | `결제 실패시 redirect url. 최대 255자` |
|     `reservationInfo.day`      | `Number[]` |            `예약 요일`             |
|  `reservationInfo.startTime`   | `Number[]` |        `요일별 시작 시간을 저장`         |
|   `reservationInfo.endTime`    | `Number[]` |        `요일별 끝나는 시간을 저장`        |
|    `reservationInfo.roomId`    | `ObjectId` |        `결제하려는 스터디룸의 id`        |


- Request Example
- Res



---

### 2. Auth

인증에 사용되는 API

|  No.  | Method |                            Url                             |
| :---: | :----: | :--------------------------------------------------------: |
|   1   | `GET`  |     [`/auth/users/accounts/:email`](#21-get-authusers)     |
|   2   | `POST` |    [`/auth/users/accounts`](#22-post-authusersaccounts)    |
|   3   | `PUT`  | [`/auth/users/accounts/:email`](#23-put-authusersaccounts) |

#### 2.1 `GET /auth/users/accounts/:email`

사용자 정보 조회

- Res

```json
// 사용자가 존재할 때
{
  userEmail: user.email,
  userName: user.name,
  userGender: user.gender,
  userAgeRange: user.ageRange,
  userLocation: user.location,
  profileImage: user.profileImage
}

// 사용자가 없을 때
null

// 에러
res.sendStatus(500);
```

#### 2.2 `POST /auth/users/accounts`

처음 방문한 사용자 등록

- Content-type : `application/json`
- Body

|      Field       |  Type  |     Description      |
| :--------------: | :----: | :------------------: |
|      email       | String |         이메일          |
|       name       | String |          이름          |
|      gender      | String |    male or female    |
|     ageRange     | Number |     n (n0 ~ n9)      |
|   location.lat   | Number |      사는 지역의 위도       |
|   location.lon   | Number |      사는 지역의 경도       |
| kakaoAccessToken | String | 카카오 API access token |

- Res
  - 성공 : `res.sendStatus(200)`
  - 실패 : `res.sendStatus(500)`

#### 2.3 `Patch /auth/users/accounts/:email`

사용자의 카카오 API access token을 업데이트

- Content-type: `application/json`
- Body

|      Field       |  Type  |     Description      |
| :--------------: | :----: | :------------------: |
| kakaoAccessToken | String | 카카오 API access token |

- Res
  - 성공 : `res.sendStatus(200)`
  - 실패 : `res.sendStatus(500)`
  - 권한 없음 : `res.redirect("http://studycombined.shop/unauthorized")`



---

## Database Schema

### 파트너 모델

```
{
  "_id": ObjectId,
  "name": String,
  "email": String,
  "password": String, // hashed
  "cid": String // 10자
}
```

### 일반 사용자 모델

```
{
  "_id": ObjectId,
  "email": String,
  "name": String,
  "gender": String,
  "ageRange": Number,
	"location": {
		"lat": Number,
		"lon": Number
	},
	"kakaoAccessToken": String,
  "history": [mongoose.Types.ObjectId],
  "ownGroups": [mongoose.Types.ObjectId],
  "partipatedGroups": [mongoose.Types.ObjectId]
}
```

### 2. Search

사용자 location 주변의 studygroup을 검색할 때 호출

|  No.  | Method |                                    Url                                    |                  Body                   |            What            |
| :---: | :----: | :-----------------------------------------------------------------------: | :-------------------------------------: | :------------------------: |
|   1   | `GET`  |           `api/query/:searchWord/location/:lat/:lon/:isRecruit`           |                                         |    `검색어로 필터링한 스터디그룹 조회`    |
|   2   | `GET`  | `/api/query/:searchWord/category/:category/location/:lat/:lon/:isRecruit` |                                         | `검색어와 카테고리로 필터링한 스터디그룹 조회` |
|   3   | `GET`  |                 `/api/all/location/:lat/:lon/:isRecruit`                  |                                         |       `모든 스터디그룹 조회`        |
|   4   | `GET`  |        `/api/all/category/:category/location/:lat/:lon/:isRecruit`        |                                         | `카테고리로 필터링 한 모든 스터디 그룹 조회` |
|   5   | `POST` |                                `/api/tags`                                | `{tags, category, lat, lon, isRecruit}` |          `태그 검색`           |
