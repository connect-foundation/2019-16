import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Thumbnail from "./Thumbnail";
import Body from "./Body";
import Footer from "./Footer";

const StyledCard = styled.div`
  display: flex;
  margin: 3em 2em;
  flex-direction: column;
  font-family: "Nanum Gothic", sans-serif;
  font-weight: bold;

  width: 19rem;
  height: 32rem;
  background-color: whitesmoke;
  border-radius: 0.2rem;
  padding-bottom: 1.3rem;
  box-shadow: 0 17px 30px 0 rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: none;
  }
`;

const StudyGroupCard = ({ groupData }) => (
  <Link to={`/group/detail/${groupData.id}`}>
    <StyledCard>
      <Thumbnail src={groupData.src} alt={groupData.alt} />
      <Body bodyData={{ ...groupData }} />
      <Footer footerData={{ ...groupData }} />
    </StyledCard>
  </Link>
);

export default StudyGroupCard;
