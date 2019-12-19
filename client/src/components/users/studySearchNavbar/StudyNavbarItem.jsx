import React, { useCallback, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import infiniteScrollEventHandler from "../../../lib/infiniteScrollEventHandler";
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
  const { userInfo, getApiAxiosState, userIndexDispatch } = useContext(
    UserContext
  );
  const { request } = getApiAxiosState;
  const scrollStateRef = useRef({
    loading: false,
    pageIndex: 1,
    isLastItems: false,
    category: null
  });
  // scrollStateRef.current = {
  //   loading: false,
  //   pageIndex: 1,
  //   isLastItems: false
  // };
  const category = useRef();
  const searchGroups = useCallback(
    e => {
      const categoryName = e.target.textContent.trim();
      scrollStateRef.current.category = categoryName;

      const { lat, lon } = userInfo.userLocation;
      request(
        "get",
        `/search/all/category/${categoryName}/location/${lat}/${lon}/page/0/true`
      );

      console.log(categoryName);
      window.addEventListener(
        "scroll",
        infiniteScrollEventHandler.bind(
          null,
          lat,
          lon,
          userIndexDispatch,
          scrollStateRef,
          category.current
        )
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
