import React, { useState, useContext, useCallback } from "react";

import styled from "styled-components";

const StyledSuggestDropDown = styled.header`
  .navbar-dropdown {
    position: absolute;
    display: block;
    width: 100%;
    left: inherit;
  }
`;

const SuggestDropDown = ({ suggestions }) => {
  const navItems = suggestions.map(suggestion => (
    <a className="navbar-item">{suggestion}</a>
  ));
  return navItems.length ? (
    <StyledSuggestDropDown>
      <div className="navbar-dropdown">{navItems}</div>
    </StyledSuggestDropDown>
  ) : (
    <></>
  );
};

export default SuggestDropDown;
