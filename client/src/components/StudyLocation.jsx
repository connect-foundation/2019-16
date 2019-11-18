import React from "react";
import styled from "styled-components";

const Location = styled.div`
  height: 1rem;
  margin: 0.5rem;
  img {
    height: 100%;
  }
`;

const StudyLocation = ({ location }) => (
  <Location>
    <img src="/image/location-icon.png" alt="location-icon" />
    <span>&nbsp;{location}</span>
  </Location>
);

export default StudyLocation;
