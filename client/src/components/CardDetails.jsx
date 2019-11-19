import React from "react";
import styled from "styled-components";
import Location from "./StudyLocation";
import TimeInfo from "./StudyTime";
import Personnel from "./StudyPersonnel";

const StyledCardBody = styled.div`
  margin-top: 1.5rem;
`;

const CardDetails = ({ detailInfo: { location, time, nowCnt, maxCnt } }) => (
  <StyledCardBody>
    <Location location={location} />
    <TimeInfo time={time} />
    <Personnel nowCnt={nowCnt} maxCnt={maxCnt} />
  </StyledCardBody>
);

export default CardDetails;
