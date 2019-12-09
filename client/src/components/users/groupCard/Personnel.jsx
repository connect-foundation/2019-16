import React from "react";
import styled from "styled-components";

const Personnel = styled.div`
  margin: 0.2em 0 0;
  .now-count {
    color: #e41d60;
  }
`;

const StudyPersonnel = ({ now_personnel, max_personnel }) => (
  <Personnel>
    <span className={`now-count`}>{now_personnel}</span>/{max_personnel}명
  </Personnel>
);

export default StudyPersonnel;
