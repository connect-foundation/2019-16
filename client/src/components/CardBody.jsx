import React from "react";
import styled from "styled-components";
import Title from "./CardTitle";
import Location from "./StudyLocation";
import TimeInfo from "./StudyTime";
import Personnel from "./StudyPersonnel";

const StyledCardBody = styled.div``;

const CardBody = ({ bodyData: { title, location, time, nowCnt, maxCnt } }) => (
  <StyledCardBody>
    <Title title={title} />
    <Location location={location} />
    <TimeInfo time={time} />
    <Personnel now={nowCnt} max={maxCnt} />
  </StyledCardBody>
);

export default CardBody;
