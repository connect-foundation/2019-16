import React from "react";
import styled from "styled-components";
import Location from "../common/Location";
import TimeInfo from "./Time";
import Personnel from "./Personnel";

const StyledFooter = styled.div`
  margin-top: 1rem;
  padding: 0 1rem;
`;

const Footer = ({
  footerData: { location, time, now_personnel, max_personnel }
}) => (
  <StyledFooter>
    <Location location={location} />
    <TimeInfo time={time} />
    <Personnel now_personnel={now_personnel} max_personnel={max_personnel} />
  </StyledFooter>
);

export default Footer;
