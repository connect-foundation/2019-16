import React from "react";
import styled from "styled-components";
import Thumbnail from "./StudyThumbnail";
import CardBody from "./CardBody";

const StyledCard = styled.div`
  width: 17rem;
  height: 30rem;
  background-color: whitesmoke;
  border-radius: 0.2rem;
  padding-bottom: 1rem;
`;

const StudyGroupCard = ({ groupData }) => (
  <StyledCard>
    <Thumbnail src={groupData.src} alt={groupData.alt} />
    <CardBody bodyData={{ ...groupData }} />
  </StyledCard>
);

export default StudyGroupCard;
