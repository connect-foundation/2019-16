import React, { useEffect } from "react";
import styled from "styled-components";
import ReservationInfo from "./ReservationInfo";
import StudyroomInfo from "./StudyroomInfo";

const Body = styled.div`
  display: flex;
`;

const Receipt = ({ reservationInfo }) => {
  return (
    <div>
      <section class="hero is-danger">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">예약이 완료되었습니다.</h1>
          </div>
        </div>
      </section>
      <Body>
        <ReservationInfo info={reservationInfo} />
        <StudyroomInfo info={reservationInfo.location} />
      </Body>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          class="button is-large is-danger"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          메인으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default Receipt;
