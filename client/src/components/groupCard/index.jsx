import React from "react";
import styled from "styled-components";
import Thumbnail from "./Thumbnail";
import Body from "./Body";
import Footer from "./Footer";

const StyledCard = styled.div`
  display: flex;
  margin: 4em 0 0;
  flex-direction: column;
  font-family: "Nanum Gothic", sans-serif;
  font-weight: bold;

  width: 19rem;
  height: 32rem;
  background-color: whitesmoke;
  border-radius: 0.2rem;
  padding-bottom: 1.3rem;
`;

const StudyGroupCard = ({ groupData }) => (
  <StyledCard>
    <Thumbnail src={groupData.src} alt={groupData.alt} />
    <Body bodyData={{ ...groupData }} />
    <Footer footerData={{ ...groupData }} />
  </StyledCard>
);

export default StudyGroupCard;
