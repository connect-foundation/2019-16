import React, { useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import StudyNavbarItem from "./StudyNavbarItem";
import { UserContext } from "../../../pages/users/index";

const Navbar = styled.div`
  width: 100%;
  .navbar-start {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  a {
    font-family: "Nanum Gothic", sans-serif;
    font-weight: bold;
    font-size: 1.7em;
  }

  .navbar-item {
    cursor: pointer;
  }
`;

const StudySearchNavbar = () => {
  const { userIndexState, userInfo, getApiAxiosState } = useContext(
    UserContext
  );
  const { primaryCategories, secondaryCategories } = userIndexState;
  const { request } = getApiAxiosState;
  const searchAllGroups = useCallback(() => {
    // const { lat, lon } = userInfo.userLocation;
    const { lat, lon } = { lat: 41.12, lon: -50.34 };
    request("get", `search/all/location/${lat}/${lon}/true`);
  }, [userInfo]);

  return (
    <Navbar>
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="dropdown navigation"
      >
        <div
          id="navbarExampleTransparentExample"
          className="navbar-menu"
          style={{ width: "100%" }}
        >
          <div className="navbar-start">
            <Link to="/">
              <span className="navbar-item is-size-3" onClick={searchAllGroups}>
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
