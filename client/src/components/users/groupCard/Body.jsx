import React from "react";
import styled from "styled-components";
import Title from "./Title";
import Subtitle from "./Subtitle";

const StyledBody = styled.div`
  flex: 1;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
`;

const Body = ({ bodyData: { title, subtitle } }) => (
  <StyledBody>
    <Title title={title} />
    <Subtitle subtitle={subtitle} />
  </StyledBody>
);

export default Body;
