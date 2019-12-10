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

|       Fields       |   Type   |              Description               |
| :----------------: | :------: | :------------------------------------: |
|    `accessToken`    | `String` |         `사용자 access_token`          |
|       `paymentInfo.cid`       | `String` |          `가맹점 코드. 10자`           |
| `paymentInfo.partner_order_id` | `String` |     `가맹점 주문번호. 최대 100자`      |
| `paymentInfo.partner_user_id` | `String` |      `가맹점 회원 id. 최대 100자`      |
| `paymentInfo.item_name` | `String` |          `상품명. 최대 100자`          |
|     `paymentInfo.quantity`     | `Number` |              `상품 수량`               |
|   `paymentInfo.total_amount`   | `Number` |              `상품 총액`               |
| `paymentInfo.tax_free_amount` | `Number` |           `상품 비과세 금액`           |
|   `paymentInfo.approval_url`   | `String` | `결제 성공시 redirect url. 최대 255자` |
|    `paymentInfo.cancel_url`    | `String` | `결제 취소시 redirect url. 최대 255자` |
|     `paymentInfo.fail_url`     | `String` | `결제 실패시 redirect url. 최대 255자` |
| `reservationInfo.day` | `Number[]` | 예약 요일 |
| `reservationInfo.startTime` | `Number[]` | 요일별 시작 시간을 저장 |
| `reservationInfo.endTime` | `Number[]` | 요일별 끝나는 시간을 저장 |
| `reservationInfo.roomId` | `ObjectId` | 결제하려는 스터디룸의 id |
| `reservationInfo.buyerEmail` | `String` | 결제하는 사용자의 이메일 |

- Request Example
- Res

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
  "gender": String,
  "ageRange": String,
  "history": [mongoose.Types.ObjectId],
  "ownGroups": [mongoose.Types.ObjectId],
  "partipatedGroups": [mongoose.Types.ObjectId]
}
```
### 2. Search

사용자 location 주변의 studygroup을 검색할 때 호출

| No. | Method |     Url      |        Body        |                                 What                                     |
| :-: | :----: | :----------: | :----------------: | :----------------------------------------------------------------------: |
|  1  | `GET` |`api/query/:searchWord/location/:lat/:lon/:isRecruit`|| `검색어로 필터링한 스터디그룹 조회` |
|  2  | `GET`  |`/api/query/:searchWord/category/:category/location/:lat/:lon/:isRecruit`|| `검색어와 카테고리로 필터링한 스터디그룹 조회`|
|  3  | `GET`  |`/api/all/location/:lat/:lon/:isRecruit` ||`모든 스터디그룹 조회`|
|  4  | `GET`  |`/api/all/category/:category/location/:lat/:lon/:isRecruit`||`카테고리로 필터링 한 모든 스터디 그룹 조회`|
|  5  | `POST` |`/api/tags`| `{tags, category, lat, lon, isRecruit}`|`태그 검색`|
