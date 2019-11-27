import React from "react";
import styled from "styled-components";
import Location from "../common/Location";
import TimeInfo from "./Time";
import Personnel from "./Personnel";

const StyledFooter = styled.div`
  margin-top: 1rem;
  padding: 0 1rem;
`;

const days_char = ["일", "월", "화", "수", "목", "금", "토"];

const Footer = ({
  footerData: {
    location,
    startTime,
    during,
    days,
    now_personnel,
    max_personnel
  }
}) => {
  const time = `${days
    .map(dayNumber => days_char[dayNumber])
    .join(", ")} | ${startTime}:00 시작 | ${during}시간 }`;

  return (
    <StyledFooter>
      <Location location={location} />
      <TimeInfo time={time} />
      <Personnel now_personnel={now_personnel} max_personnel={max_personnel} />
    </StyledFooter>
  );
};

export default Footer;
