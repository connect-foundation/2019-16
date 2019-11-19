import React from "react";
import styled from "styled-components";

const Location = styled.div`
  width: 100%;
  height: 2rem;

  display: flex;
  flex-direction: row;
  align-items: center;

  .imageWrapper {
    width: 1.4rem;
    height: 1.4rem;
  }

  img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }

  locationName {
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
`;

const StudyLocation = ({ location }) => (
  <Location>
    <div className="imageWrapper">
      <img src="/image/location-icon.png" alt="location-icon" />
    </div>
    <div className="locationName">&nbsp;{location}</div>
  </Location>
);

export default StudyLocation;
