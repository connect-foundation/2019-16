import React, { memo } from "react";
import styled from "styled-components";

const StyledStudyTime = styled.div`
  font-size: 0.86rem;
  font-weight: bold;
`;

const days_char = ["일", "월", "화", "수", "목", "금", "토"];

const StudyTime = ({ startTime, endTime, days }) => {
  const dayList = days.map(dayNumber => days_char[dayNumber]).join(", ");
  const time = `${dayList} | ${startTime}:00 ~ ${endTime}:00`;

  return <StyledStudyTime>{time}</StyledStudyTime>;
};

export default memo(StudyTime);
