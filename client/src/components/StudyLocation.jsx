import React from "react";
import styled from "styled-components";

const Location = styled.div`
  img {
    width: 100%;
  }
`;

const StudyLocation = ({ location }) => (
  <Location>
    <img src="/image/location-icon.png" alt="location-icon" />
    <span>&nbsp;{location}</span>
  </Location>
);

export default StudyLocation;
