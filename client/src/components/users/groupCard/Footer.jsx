import React from "react";
import styled from "styled-components";
import TagButtons from "../common/TagButtons";
import Location from "../common/Location";
import TimeInfo from "./Time";
import Personnel from "./Personnel";

const StyledFooter = styled.div`
  margin-top: 1rem;
  padding: 0 1rem;
`;

const Footer = ({
  footerData: {
    location,
    startTime,
    during,
    days,
    now_personnel,
    max_personnel,
    tags
  }
}) => {
  return (
    <StyledFooter>
      <TagButtons tags={tags} />
      <Location location={location} />
      <TimeInfo days={days} startTime={startTime} during={during} />
      <Personnel now_personnel={now_personnel} max_personnel={max_personnel} />
    </StyledFooter>
  );
};

export default Footer;
