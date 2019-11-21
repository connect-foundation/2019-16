import React, { memo } from "react";
import styled from "styled-components";

const StyledStudyTime = styled.div``;

const StudyTime = ({ time }) => <StyledStudyTime>{time}</StyledStudyTime>;

export default memo(StudyTime);
