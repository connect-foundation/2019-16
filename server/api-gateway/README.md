# API Gateway

## API

### 1. Payment

결제 서비스에 사용되는 API

| No. | Method |           Url           |                 When                 |                                 What                                 |
| :-: | :----: | :---------------------: | :----------------------------------: | :------------------------------------------------------------------: |
|  1  | `POST` |  `/api/payment/ready`   | `사용자가 결제하기 버튼을 눌렀을 때` | `결제 가능한 스터디룸인지 확인하고 카카오 페이 API의 결제 승인 요청` |
|  2  | `GET`  | `/api/payment/approval` |    `결제가 성공적으로 끝났을 때`     |                                                                      |
|  3  | `GET`  |  `/api/payment/cancel`  |     `결제를 중간에 취소했을 때`      |
|  4  | `GET`  |   `/api/payment/fail`   |         `결제를 실패했을 때`         |

#### 1.1 `POST /api/payment/ready`

- Content-type : `application/json`
- Body

|       Fields       |   Type   |              Description               |                      Example                      |
| :----------------: | :------: | :------------------------------------: | :-----------------------------------------------: |
|    `accssToken`    | `String` |         `사용자 access_token`          | `SztNydsasdd3tt4h_dY_tus9D68CJudskajfdsasdftV7Aw` |
|       `cid`        | `String` |          `가맹점 코드. 10자`           |                   `TC0ONETIME`                    |
| `partner_order_id` | `String` |     `가맹점 주문번호. 최대 100자`      |                                                   |
| `partner_user_id`  | `String` |      `가맹점 회원 id. 최대 100자`      |                                                   |
|    `item_name`     | `String` |          `상품명. 최대 100자`          |      `20191205-20200120 201호 월수 8시-10시`      |
|     `quantity`     | `Number` |              `상품 수량`               |                        `1`                        |
|   `total_amount`   | `Number` |              `상품 총액`               |                      `50000`                      |
| `tax_free_amount`  | `Number` |           `상품 비과세 금액`           |                        `0`                        |
|   `approval_url`   | `String` | `결제 성공시 redirect url. 최대 255자` | `https://studycombined:8000/api/payment/approval` |
|    `cancel_url`    | `String` | `결제 취소시 redirect url. 최대 255자` |  `https://studycombined:8000/api/payment/cancel`  |
|     `fail_url`     | `String` | `결제 실패시 redirect url. 최대 255자` |   `https://studycombined:8000/api/payment/fail`   |

- Res

<<<<<<< HEAD
=======
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

|      Field       |  Type  |       Description       |
| :--------------: | :----: | :---------------------: |
|      email       | String |         이메일          |
|       name       | String |          이름           |
|      gender      | String |     male or female      |
|     ageRange     | Number |       n (n0 ~ n9)       |
|   location.lat   | Number |    사는 지역의 위도     |
|   location.lon   | Number |    사는 지역의 경도     |
| kakaoAccessToken | String | 카카오 API access token |

- Res
  - 성공 : `res.sendStatus(200)`
  - 실패 : `res.sendStatus(500)`

#### 2.3 `Patch /auth/users/accounts/:email`

사용자의 카카오 API access token을 업데이트

- Content-type: `application/json`
- Body

|      Field       |  Type  |       Description       |
| :--------------: | :----: | :---------------------: |
| kakaoAccessToken | String | 카카오 API access token |

- Res
  - 성공 : `res.sendStatus(200)`
  - 실패 : `res.sendStatus(500)`
  - 권한 없음 : `res.redirect("http://studycombined.shop/unauthorized")`



---

>>>>>>> 92cbd32... docs(auth): 인증 관련 api 문서 작성
## Database Schema

### 파트너 모델

```json
{
  "_id": ObjectId,
  "name": String,
  "email": String,
  "password": String, // hashed
  "cid": String // 10자
}
```

### 일반 사용자 모델

```json
{
  "_id": ObjectId,
  "email": String,
  "gender": String,
  "ageRange": String,
  "history": [mongoose.Types.ObjectId],
  "ownGroups": [mongoose.Types.ObjectId],
  "partipatedGroups": [mongoose.Types.ObjectId]
}
```
