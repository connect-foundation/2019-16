import React from "react";
import styled from "styled-components";
import Title from "./CardTitle";
import Subtitle from "./CardSubtitle";
import Details from "./CardDetails";

const StyledDetails = styled.div`
  margin: 1rem 0.5rem;
  padding: 0 0.5rem;
  padding: 0 0.5rem 1rem 0.5rem;
`;

const CardBody = ({
  bodyData: { title, location, time, nowCnt, maxCnt, subtitle }
}) => (
  <StyledDetails>
    <Title title={title} />
    <Subtitle subtitle={subtitle} />
    <Details detailInfo={{ location, time, nowCnt, maxCnt }} />
  </StyledDetails>
);

export default CardBody;
