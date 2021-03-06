import React from "react";
import styled from "styled-components";

const Thumbnail = styled.div`
  height: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
  }
`;

const StudyThumbnail = ({ src, alt }) => (
  <Thumbnail>
    <img src={src} alt={alt} />
  </Thumbnail>
);

export default StudyThumbnail;
