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
    <a class="navbar-item">{suggestion}</a>
  ));
  return navItems.length ? (
    <div class="navbar-dropdown">{navItems}</div>
  ) : (
    <></>
  );
};

export default SuggestDropDown;
