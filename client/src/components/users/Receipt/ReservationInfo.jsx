import React from "react";
import styled from "styled-components";
import { reservationDays } from "./util";

const ReservationInfoWrapper = styled.div`
  width: 50%;
  padding: 1.5rem;
`;

const ReservationInfo = ({ info }) => {
  return (
    <ReservationInfoWrapper>
      <h3 class="subtitle is-3">예약 정보</h3>
      <h6 class="subtitle is-6">장소: {info.location}</h6>
      <h6 class="subtitle is-6">인원수: {info.now_personnel}</h6>
      <div class="table-container">
        <table class="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>No.</th>
              <th>날짜</th>
              <th>시작하는 시간</th>
              <th>끝나는 시간</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>No.</th>
              <th>날짜</th>
              <th>시작하는 시간</th>
              <th>끝나는 시간</th>
            </tr>
          </tfoot>
          <tbody>
            {reservationDays(info).map((date, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{date.date.split("T")[0]}</td>
                <td>{date.start}시</td>
                <td>{date.end}시</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReservationInfoWrapper>
  );
};

export default ReservationInfo;
