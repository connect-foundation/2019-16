import React from "react";
import styled from "styled-components";

const StyledGroupDetailMain = styled.div`
  width: 100%;
  height: 18rem;
  background-color: whitesmoke;

  imageWrapper {
  }

  img {
    width: 3rem;
    height: 3rem;
  }
  margin-left: 0;
`;

const groupDetailMain = props => {
  const { studyThumbnail, location, time, no } = props;
  return (
    <StyledGroupDetailMain className="columns">
      <div className="imgWrapper"></div>
      <div></div>
    </StyledGroupDetailMain>
  );
};

export default groupDetailMain;
