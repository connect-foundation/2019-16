import React from "react";
import styled from "styled-components";
import Location from "./StudyLocation";
import TimeInfo from "./StudyTime";
import Personnel from "./StudyPersonnel";

const StyledCardFooter = styled.div`
  margin-top: 1rem;
  padding: 0 1rem;
`;

const CardFooter = ({ footerData: { location, time, nowCnt, maxCnt } }) => (
  <StyledCardFooter>
    <Location location={location} />
    <TimeInfo time={time} />
    <Personnel nowCnt={nowCnt} maxCnt={maxCnt} />
  </StyledCardFooter>
);

export default CardFooter;
