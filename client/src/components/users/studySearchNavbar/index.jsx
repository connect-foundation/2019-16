import React, { useContext, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import StudyNavbarItem from "./StudyNavbarItem";
import { UserContext } from "../../../pages/users/index";
import infiniteScrollEventHandler from "../../../lib/infiniteScrollEventHandler";
import { useEffect } from "react";
const Navbar = styled.div`
  .navbar {
    align-items: center;
  }
  .navbar-start {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
  }

  a {
    font-weight: bold;
  }

  .navbar-item {
    cursor: pointer;
  }
`;

const StudySearchNavbar = () => {
  const scrollStateRef = useRef({
    loading: false,
    pageIndex: 1,
    isLastItems: false,
    imheader: true
  });
  // scrollStateRef.current = {
  //   loading: false,
  //   pageIndex: 1,
  //   isLastItems: false
  // };

  const {
    userIndexState,
    userInfo,
    getApiAxiosState,
    userIndexDispatch
  } = useContext(UserContext);
  const { primaryCategories, secondaryCategories } = userIndexState;
  const { request } = getApiAxiosState;
  const { lat, lon } = userInfo.userLocation;

  const searchAllGroups = () => {
    const { lat, lon } = userInfo.userLocation;
    request("get", `search/all/location/${lat}/${lon}/page/0/true`);
    window.addEventListener(
      "scroll",
      infiniteScrollEventHandler.bind(
        null,
        lat,
        lon,
        userIndexDispatch,
        scrollStateRef
      )
    );
  };

  return (
    <Navbar>
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="dropdown navigation"
      >
        <div id="navbarExampleTransparentExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/">
              <span className="navbar-item" onClick={searchAllGroups}>
                모두 보기
              </span>{" "}
            </Link>

            {primaryCategories.map((category, idx) => (
              <StudyNavbarItem
                key={idx}
                primaryCategory={category}
                secondaryCategories={secondaryCategories[category]}
              ></StudyNavbarItem>
            ))}
          </div>
        </div>
      </nav>
    </Navbar>
  );
};

export default StudySearchNavbar;
