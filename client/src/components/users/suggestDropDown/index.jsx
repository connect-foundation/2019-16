import React, { useState, useContext, useCallback } from "react";
import styled from "styled-components";
import { UserContext } from "../../../pages/users/index";

const StyledSuggestDropDown = styled.header`
  .navbar-dropdown {
    position: absolute;
    display: block;
    width: 100%;
    left: inherit;
  }
  .navbar-item {
    cursor: pointer;
  }
  .navbar-item:hover {
    background: #53d0ec;
  }
`;

const SuggestDropDown = ({ suggestions, setSuggestion, history }) => {
  const { userInfo, getApiAxiosState } = useContext(UserContext);
  const { lat, lon } = userInfo.userLocation;
  const { request } = getApiAxiosState;

  const onClick = useCallback(e => {
    request(
      "get",
      `/search/query/${e.target.innerText}/location/${lat}/${lon}/page/0/true`
    );
    setSuggestion([]);
    history.push(`/search?query=${e.target.innerText}`);
  });

  const navItems = suggestions.map(suggestion => (
    <div className="navbar-item" onClick={onClick}>
      {suggestion}
    </div>
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
