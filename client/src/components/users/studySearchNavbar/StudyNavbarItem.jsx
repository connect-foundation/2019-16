import React, { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../../../pages/users/index";

const Category = styled.div`
  a {
    font-family: "Nanum Gothic", sans-serif;
    font-weight: bold;
    font-size: 1em;
  }

  .navbar-item {
    cursor: pointer;
  }

  .navbar-item.is-hoverable:hover .navbar-dropdown {
    display: block !important;
  }
  .navbar-item.is-hoverable:focus-within .navbar-dropdown {
    display: none;
  }
`;

const StudyNavbarItem = ({ primaryCategory, secondaryCategories }) => {
  const { userInfo, getApiAxiosState } = useContext(UserContext);
  const { request } = getApiAxiosState;

  const searchGroups = useCallback(
    e => {
      const categoryName = e.target.textContent.trim();
      const { lat, lon } = userInfo.userLocation;
      request(
        "get",
        `/search/all/category/${categoryName}/location/${lat}/${lon}/true`
      );
    },
    [userInfo]
  );

  const itemList = secondaryCategories.map((category, idx) => (
    <Link to="/">
      <span key={idx} className="navbar-item" onClick={searchGroups}>
        {category}
      </span>
    </Link>
  ));

  return (
    <Category>
      <div className="navbar-item has-dropdown is-hoverable">
        <span className="navbar-link is-arrowless" onClick={searchGroups}>
          {primaryCategory}
        </span>
        <div className="navbar-dropdown is-boxed">{itemList}</div>
      </div>
    </Category>
  );
};

export default StudyNavbarItem;
