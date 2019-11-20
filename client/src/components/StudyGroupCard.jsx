import React from "react";
import styled from "styled-components";
import Thumbnail from "./StudyThumbnail";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;

  width: 16rem;
  height: 29rem;
  background-color: whitesmoke;
  border-radius: 0.2rem;
  padding-bottom: 1.3rem;
`;

const StudyGroupCard = ({ groupData }) => (
  <StyledCard>
    <Thumbnail src={groupData.src} alt={groupData.alt} />
    <CardBody bodyData={{ ...groupData }} />
    <CardFooter footerData={{ ...groupData }} />
  </StyledCard>
);

export default StudyGroupCard;
