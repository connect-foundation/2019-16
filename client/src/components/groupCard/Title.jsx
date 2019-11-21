import React from "react";
import styled from "styled-components";

const Title = styled.h3`
  font-family: "Nanum Gothic", sans-serif;
  font-weight: bold;
  line-height: 1.5rem;
  font-size: 1rem;

  margin: 1rem 0;
  color: #1d6de4;
`;

const CardTitle = ({ title }) => <Title>{title}</Title>;

export default CardTitle;
