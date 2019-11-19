import React from "react";
import styled from "styled-components";

const StyledCardSubtitle = styled.div`
  font-family: "Nanum Gothic", sans-serif;
  line-height: 1.4rem;
  color: gray;
`;

const CardSubtitle = ({ subtitle }) => (
  <StyledCardSubtitle>{subtitle}</StyledCardSubtitle>
);

export default CardSubtitle;
