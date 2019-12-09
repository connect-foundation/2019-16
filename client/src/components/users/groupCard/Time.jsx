import React, { memo } from "react";
import styled from "styled-components";

const StyledStudyTime = styled.div`
  font-size: 1.1em;
`;

const days_char = ["일", "월", "화", "수", "목", "금", "토"];

const StudyTime = ({ startTime, endTime, days }) => {
  const time = `${days &&
    days
      .map(dayNumber => days_char[dayNumber])
      .join(", ")} | ${startTime}:00 시작 | ${endTime}시간 `;
  return <StyledStudyTime>{time}</StyledStudyTime>;
};

export default memo(StudyTime);
