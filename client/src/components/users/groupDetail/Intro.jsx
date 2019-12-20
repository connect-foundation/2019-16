import React from "react";
import styled from "styled-components";

const StyledIntro = styled.div`
  margin: 0.3rem 0;

  h3 {
    margin: 2rem 0;
    font-size: 1.5rem;
    font-weight: bold;
  }
  .description {
    font-family: "Nanum Gothic", sans-serif;
    font-size: 1.2rem;
    line-height: 2.7rem;
    padding: 3rem;
    width: 100%;
    background-color: whitesmoke;
    white-space: pre-wrap;
  }
`;

const Intro = ({ intro }) => {
  return (
    <StyledIntro>
      <h3> 스터디 소개 </h3>
      <pre className="description">{intro}</pre>
    </StyledIntro>
  );
};

export default Intro;
