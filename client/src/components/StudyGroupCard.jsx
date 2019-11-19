import React from "react";
import styled from "styled-components";
import Thumbnail from "./StudyThumbnail";
import Title from "./CardTitle";
import Location from "./StudyLocation";
import TimeInfo from "./StudyTime";
import Personnel from "./StudyPersonnel";

const StyledCard = styled.div`
  width: 15rem;
  height: 20rem;
  background-color: whitesmoke;
  border-radius: 0.5rem;
`;

const StudyGroupCard = ({ props }) => (
  <StyledCard>
    <Thumbnail src={props.src} alt={props.alt} />
    <Title title={props.title} />
    <Location location={props.location} />
    <TimeInfo time={props.time} />
    <Personnel now={props.nowCnt} max={props.maxCnt} />
  </StyledCard>
);

export default StudyGroupCard;
