# 결제 서비스

사용자들의 중복 결제를 방지하고, 결제 내역을 저장하는 서비스 입니다.

## Query

| No. |     From      |         Query          |      To       |     Description      |
| :-: | :-----------: | :--------------------: | :-----------: | :------------------: |
|  1  |   `gateway`   |     `inspectQueue`     |   `gateway`   |    결제 큐를 확인    |
|  2  |   `gateway`   |    `approvePayment`    | `reservation` |    결제 승인 요청    |
|  3  | `reservation` | `removePaymentInQueue` |   `gateway`   | 예약 추가 후 결제 큐 |

### 1. payRead

사용자가 결제를 시작하기 전에 예약하려는 스터디룸이 예약 가능한지 확인

- Parmas

```
{
	userInfo: {
		kakaoAccessToken, // String 카카오 access_token
		userId // 사용자 id
	},
	paymentInfo: {
		cid, //	String 가맹점 코드. 10자
		partner_order_id, // String	가맹점 주문번호. 최대 100자
		partner_user_id, //	String	가맹점 회원 id. 최대 100자
		item_name, //	String	상품명. 최대 100자
		quantity, // Number	상품 수량
		total_amount, // Number	상품 총액
		tax_free_amount, //	Number	상품 비과세 금액
		approval_url, // String	결제 성공시 redirect url. 최대 255자
		cancel_url, // String	결제 취소시 redirect url. 최대 255자
		fail_url // String	결제 실패시 redirect url. 최대 255자
	},
	reservationInfo: {
		day, //	Number[]	예약 요일
		startTime, //	Number[] 요일별 시작 시간을 저장
		endTime, //	Number[] 요일별 끝나는 시간을 저장
		roomId, // ObjectId	결제하려는 스터디룸의 id
	}
}
```

### 2. approvePayment

사용자의 결제 행동 후 결제 승인 요청

- Params

```
{
	pg_token, // 결제 승인 인증 토큰
	userId, // 사용자 id
	roomId // 스터디룸 id
}
```

### 3. removePaymentInQueue

결제 큐에서 결제 정보를 삭제

- Parmas

```
{
	userId, // 사용자 id
	roomId // 스터디룸 id
}
```

## Database Schema

### 결제 큐 (in memory)

결제 큐는 동시에 같은 스터디 룸에 예약하는 것을 방지하는 구조체입니다. 자세한 내용은 [여기]()에 있습니다.

### 결제 내역 모델 (MongoDB)

```js
const PaymentSchema = new Schema({
  aid: String, // Request 고유 번호
  amount: {
    discount: Number, // 할인 금액
    point: Number, //	사용한 포인트 금액
    tax_free: Number, // 비과세 금액
    total: Number, // 전체 결제 금액
    vat: Number // 사용한 포인트 금액
  },
  approved_at: Date, // 결제 승인 시각
  cid: String, // 가맹점 코드
  created_at: Date, // 결제 준비 요청 시각
  item_name: String, // 상품 이름. 최대 100자
  partner_order_id: String, // 가맹점 주문번호
  partner_user_id: String, // 가맹점 회원 id
  payment_method_type: String, // 결제 수단. CARD, MONEY 중 하나
  quantity: Number, // 상품 수량
  tid: String, // 결제 고유 번호
  userId: String // 사용자 id
});
```
