import React from "react";
import styled from "styled-components";

const Personnel = styled.div`
  margin: 0.2em 0 0;
  .now-count {
    color: #e41d60;
  }
`;

const StudyPersonnel = ({ nowCnt, maxCnt }) => (
  <Personnel>
    <span className={`now-count`}>{nowCnt}</span>/{maxCnt}명
  </Personnel>
);

export default StudyPersonnel;
