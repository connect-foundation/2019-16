import React from "react";
import styled from "styled-components";
import Location from "../common/Location";
import TimeInfo from "./Time";
import Personnel from "./Personnel";

const StyledFooter = styled.div`
  margin-top: 1rem;
  padding: 0 1rem;
`;

const Footer = ({ footerData: { location, time, nowCnt, maxCnt } }) => (
  <StyledFooter>
    <Location location={location} />
    <TimeInfo time={time} />
    <Personnel nowCnt={nowCnt} maxCnt={maxCnt} />
  </StyledFooter>
);

export default Footer;
