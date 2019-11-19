import React from "react";
import styled from "styled-components";

const Thumbnail = styled.div`
  img {
    width: 100%;
    border-top-left-radius: 0.55rem;
    border-top-right-radius: 0.55rem;
    height: 12rem;
  }
`;

const StudyThumbnail = ({ src, alt }) => (
  <Thumbnail>
    <img src={src} alt={alt} />
  </Thumbnail>
);

export default StudyThumbnail;
