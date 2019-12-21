import React from "react";
import styled from "styled-components";
import Title from "./Title";
import TagButtons from "../common/TagButtons";

const StyledBody = styled.div`
  flex: 1;
  min-height: 11rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const Body = ({ bodyData: { title, tags }, history }) => (
  <StyledBody>
    <Title title={title} />
    <TagButtons tags={tags} history={history} />
  </StyledBody>
);

export default Body;
