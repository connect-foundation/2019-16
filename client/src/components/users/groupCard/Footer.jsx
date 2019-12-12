import React from "react";
import styled from "styled-components";
import Location from "../common/Location";
import TimeInfo from "./Time";
import Personnel from "./Personnel";

const StyledFooter = styled.div`
  height: 6rem;
  margin-top: 0.4rem;
  padding: 0 1rem;
`;

const Footer = ({
  footerData: {
    location,
    startTime,
    endTime,
    days,
    now_personnel,
    max_personnel,
    tags
  }
}) => {
  return (
    <StyledFooter>
      <Location location={location} />
      <TimeInfo days={days} startTime={startTime} endTime={endTime} />
      <Personnel now_personnel={now_personnel} max_personnel={max_personnel} />
    </StyledFooter>
  );
};

export default Footer;
