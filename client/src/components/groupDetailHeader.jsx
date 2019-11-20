import React from "react";
import styled from "styled-components";

const StyledGroupDetailHeader = styled.div`
  .hero-body {
    padding-left: 0;
  }
`;

const groupDetailHeader = ({ data }) => {
  const { title, category } = data;
  return (
    <StyledGroupDetailHeader className="hero is-full">
      <div className="hero-body">
        <h2 className="title has-text-danger is-size-2">{title}</h2>
        <div className="buttons">
          <button className="button is-primary is-small"> {category} </button>{" "}
        </div>
      </div>
    </StyledGroupDetailHeader>
  );
};

export default groupDetailHeader;
