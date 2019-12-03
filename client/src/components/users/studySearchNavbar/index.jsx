import React, { useContext, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";

import { REQUEST_URL } from "../../../config.json";
import StudyNavbarItem from "./StudyNavbarItem";
import { UserContext } from "../../../pages/users/index";
import { set_groups } from "../../../reducer/users/index";

const Navbar = styled.div`
  padding: 5%;
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
  const { userIndexState, userIndexDispatch } = useContext(UserContext);
  const { primaryCategories, secondaryCategories } = userIndexState;

  const searchAllGroups = useCallback(() => {
    axios.get(`${REQUEST_URL}/search/all/true`).then(result => {
      const { data } = result;

      for (let i = 0; i < data.length; i++) {
        data[i].id = i;
        data[
          i
        ].location = `위도: ${data[i].location.lat}, 경도: ${data[i].location.lon}`;
      }

      userIndexDispatch(set_groups(data));
    });
  }, []);

  return (
    <Navbar>
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="dropdown navigation"
      >
        <div id="navbarExampleTransparentExample" style={{ width: "100%" }}>
          <div className="navbar-start">
            <span className="navbar-item is-size-3" onClick={searchAllGroups}>
              모두 보기
            </span>

            {primaryCategories.map(category => (
              <StudyNavbarItem
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
