import React from "react";
import styled from "styled-components";
import Title from "./CardTitle";
import Subtitle from "./CardSubtitle";
import Location from "./StudyLocation";
import TimeInfo from "./StudyTime";
import Personnel from "./StudyPersonnel";

const StyledCardBody = styled.div`
  margin: 1rem 0.5rem;
`;

const CardBody = ({
  bodyData: { title, location, time, nowCnt, maxCnt, subtitle }
}) => (
  <StyledCardBody>
    <Title title={title} />
    <Subtitle subtitle={subtitle} />
    <Location location={location} />
    <TimeInfo time={time} />
    <Personnel now={nowCnt} max={maxCnt} />
  </StyledCardBody>
);

export default CardBody;
