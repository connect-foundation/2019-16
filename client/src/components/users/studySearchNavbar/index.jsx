import React, { useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { REQUEST_URL } from "../../../config.json";
import StudyNavbarItem from "./StudyNavbarItem";
import { UserContext } from "../../../pages/users/index";
import { set_groups } from "../../../reducer/users/index";

const Navbar = styled.div`
  .navbar {
    align-items: center;
  }
  .navbar-start {
    display: flex;
    justify-content: space-around;
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
  const { userIndexState, userIndexDispatch, userInfo } = useContext(
    UserContext
  );
  const { primaryCategories, secondaryCategories } = userIndexState;
  const searchAllGroups = useCallback(() => {
    const { lat, lon } = userInfo.userLocation;

    axios
      .get(`${REQUEST_URL}/api/search/all/location/${lat}/${lon}/true`)
      .then(result => {
        const { data } = result;

        for (let i = 0; i < data.length; i++) {
          data[i].id = i;
          data[
            i
          ].location = `위도: ${data[i].location.lat}, 경도: ${data[i].location.lon}`;
        }

        userIndexDispatch(set_groups(data));
      });
  }, [userInfo]);

  return (
    <Navbar>
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="dropdown navigation"
      >
        <div id="navbarExampleTransparentExample" style={{ width: "100%" }}>
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
