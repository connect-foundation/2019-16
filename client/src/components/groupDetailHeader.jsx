import React from "react";
import styled from "styled-components";

const StyledGroupDetailHeader = styled.div``;

const groupDetailHeader = () => {
  return (
    <StyledGroupDetailHeader className="container hero">
      <div className="hero-body">
        <h2 className="title has-text-danger"> 자바스크립트 기초 공부해요 </h2>
        <div className="buttons">
          <button className="button is-primary is-small"> 프로그래밍 </button>{" "}
          <button className="button is-primary is-small"> 교육 </button>
        </div>
      </div>
    </StyledGroupDetailHeader>
  );
};

export default groupDetailHeader;
