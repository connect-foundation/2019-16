import React from "react";
import styled from "styled-components";

const Personnel = styled.div``;

const StudyPersonnel = ({ nowCnt, maxCnt }) => (
  <Personnel>
    {nowCnt}/{maxCnt}명
  </Personnel>
);

export default StudyPersonnel;
