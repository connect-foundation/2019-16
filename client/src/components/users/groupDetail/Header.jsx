import React, { useCallback } from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  .hero-body {
    padding-left: 0;
    font-family: "Nanum Gothic", sans-serif;
  }
`;

const Header = ({ state }) => {
  const { groupInfo } = state;
  const { title, category } = groupInfo;
  const categoryBtnEvent = useCallback(e => {
    const categoryName = e.target.textContent.trim();
    alert(categoryName);
  }, []);

  return (
    <StyledHeader className="hero is-full">
      <div className="hero-body">
        <h2 className="title has-text-danger is-size-2">{title}</h2>
        <div className="buttons">
          <button
            className="button is-primary is-small"
            onClick={categoryBtnEvent}
          >
            {" "}
            {category}{" "}
          </button>{" "}
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
