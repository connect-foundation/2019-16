import React from "react";
import styled from "styled-components";

const Thumbnail = styled.div`
  width: 272px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  img {
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
  }
`;

const StudyThumbnail = ({ src }) => (
  <Thumbnail>
    <img src={src} alt="groupThumbnail" />
  </Thumbnail>
);

export default StudyThumbnail;
