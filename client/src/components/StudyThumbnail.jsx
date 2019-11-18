import React from "react";
import styled from "styled-components";

const Thumbnail = styled.div`
  img {
    width: 100%;
  }
`;

const StudyThumbnail = ({ src, alt }) => (
  <Thumbnail>
    <img src={src} alt={alt} />
  </Thumbnail>
);

export default StudyThumbnail;
