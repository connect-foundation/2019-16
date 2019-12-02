import React, { memo } from "react";
import styled from "styled-components";

const StyledStudyTime = styled.div`
  font-size: 1.1em;
`;

const StudyTime = ({ time }) => <StyledStudyTime>{time}</StyledStudyTime>;

export default memo(StudyTime);
