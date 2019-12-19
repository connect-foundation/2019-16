import React, { memo } from "react";
import styled from "styled-components";
import { useState } from "react";
import useCoord2String from "../../../lib/coord2string";

const { kakao } = window;
const StyledLocation = styled.div`
  width: 100%;
  height: 2rem;

  display: flex;
  flex-direction: row;
  align-items: center;

  position: relative;
  right: 0.3rem;

  font-size: 0.8rem;

  .imageWrapper {
    width: 1.6rem;
    height: 1.6rem;
    padding: 0.3em 0 0.2em 0;
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
const Location = ({ location }) => {
  const { lat, lon } = location;
  const [locationString] = useCoord2String(kakao, lat, lon);

  return (
    <StyledLocation>
      <div className="imageWrapper">
        <img src="/image/location-icon.png" alt="location-icon" />
      </div>
      <div className="locationName">{locationString}</div>
    </StyledLocation>
  );
};

export default memo(Location);
