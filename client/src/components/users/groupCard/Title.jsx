import React from "react";
import styled from "styled-components";

const Title = styled.h3`
  font-family: "Nanum Gothic", sans-serif;
  font-weight: bold;
  line-height: 1.3rem;
  font-size: 1.3rem;
  color: #1d6de4;
`;

const CardTitle = ({ title }) => <Title>{title}</Title>;

export default CardTitle;
