import React from "react";
import styled from "styled-components";

const StyledCardDescription = styled.div`
  margin: 1rem 0.5rem;
`;

const CardBody = ({ description }) => (
  <StyledCardDescription>{description}</StyledCardDescription>
);

export default CardBody;
