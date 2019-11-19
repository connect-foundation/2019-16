import React from "react";
import styled from "styled-components";

const StyledCardSubtitle = styled.div`
  /* margin: 1rem 0.5rem; */
  color: gray;
`;

const CardSubtitle = ({ subtitle }) => (
  <StyledCardSubtitle>{subtitle}</StyledCardSubtitle>
);

export default CardSubtitle;
