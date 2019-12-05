# API Gateway

## API

### 1. Payment

결제 서비스에 사용되는 API

| Method |         Url          |                 When                 |                                 What                                 |
| :----: | :------------------: | :----------------------------------: | :------------------------------------------------------------------: |
| `POST` | `/api/payment/ready` | `사용자가 결제하기 버튼을 눌렀을 때` | `결제 가능한 스터디룸인지 확인하고 카카오 페이 API의 결제 승인 요청` |

#### 1.1 `POST /api/payment/ready`

- Content-type : `application/json`
- Body
  | Fields | `accssToken` | `cid` | `partner_order_id` | `partner_user_id` | `item_name` | `quantity` | `total_amount` | `tax_free_amount` | `approval_url` | `cancel_url` | `fail_url` |
  | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
  | **Type** | `String` | `String` | `String` | `String` | `String` | `Number` | `Number` | `Number` | `String` | `String` | `String` |
  | **Description** | `사용자 access_token` |`가맹점 코드. 10자` | `가맹점 주문번호. 최대 100자` | `가맹점 회원 id. 최대 100자` | `상품명. 최대 100자` | `상품 수량` |`상품 총액`| `상품 비과세 금액` | `결제 성공시 redirect url. 최대 255자` | `결제 취소시 redirect url. 최대 255자` | `결제 실패시 redirect url. 최대 255자` |

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
