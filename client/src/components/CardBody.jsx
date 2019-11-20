import React from "react";
import styled from "styled-components";
import Title from "./CardTitle";
import Subtitle from "./CardSubtitle";

const StyledCardBody = styled.div`
  flex: 1;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
`;

const CardBody = ({ bodyData: { title, subtitle } }) => (
  <StyledCardBody>
    <Title title={title} />
    <Subtitle subtitle={subtitle} />
  </StyledCardBody>
);

export default CardBody;
