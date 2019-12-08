import React from "react";
import styled from "styled-components";

const StyledIntro = styled.div`
  margin: 0.3rem 0;
  font-family: "Nanum Gothic", sans-serif;

  h3 {
    margin: 2rem 0;
    font-size: 1.5rem;
    font-weight: bold;
  }
  .description {
    font-size: 1.3rem;
    line-height: 1.5rem;
    padding: 3rem;
    width: 100%;
    background-color: whitesmoke;
  }
`;

const Intro = ({ intro }) => {
  return (
    <StyledIntro>
      <h3> 스터디 소개 </h3>
      <div className="description">{intro}</div>
    </StyledIntro>
  );
};

export default Intro;
