import React from "react";
import styled from "styled-components";

const Thumbnail = styled.div`
  width: 304px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 50%; */
  overflow: hidden;
  img {
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
