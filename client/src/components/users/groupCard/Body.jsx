import React from "react";
import styled from "styled-components";
import Title from "./Title";
import Subtitle from "./Subtitle";
import TagButtons from "../common/TagButtons";

const StyledBody = styled.div`
  flex: 1;
  min-height: 12rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > *:not(:last-child) {
    margin-bottom: 1.2rem;
  }
`;

const Body = ({ bodyData: { title, subtitle, tags } }) => (
  <StyledBody>
    <Title title={title} />
    <Subtitle subtitle={subtitle} />
    <TagButtons tags={tags} />
  </StyledBody>
);

export default Body;
