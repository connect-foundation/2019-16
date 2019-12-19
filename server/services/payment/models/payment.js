const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  userId: String
});

const Payment = mongoose.model("payment", PaymentSchema, "payments");

module.exports = Payment;
