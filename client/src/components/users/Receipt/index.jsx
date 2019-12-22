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
      <section className="hero is-danger">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">예약이 완료되었습니다.</h1>
          </div>
        </div>
      </section>
      <Body>
        <ReservationInfo info={reservationInfo} />
        <StudyroomInfo info={reservationInfo.location} />
      </Body>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="button is-large is-danger"
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
