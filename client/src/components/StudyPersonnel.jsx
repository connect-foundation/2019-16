import React from "react";
import styled from "styled-components";

const Personnel = styled.div`
  margin: 0.5rem;
`;

const StudyPersonnel = ({ now, max }) => (
  <Personnel>
    {now}/{max}명
  </Personnel>
);

export default StudyPersonnel;
