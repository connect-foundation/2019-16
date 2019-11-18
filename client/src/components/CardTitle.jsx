import React from "react";
import styled from "styled-components";

const Title = styled.h3`
  margin: 0.5rem;
`;

const CardTitle = ({ title }) => <Title>{title}</Title>;

export default CardTitle;
