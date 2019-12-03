import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import StudyNavbarItem from "./StudyNavbarItem";
import { UserContext } from "../../../pages/users/index";

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
`;

const StudySearchNavbar = () => {
  const { userIndexState } = useContext(UserContext);
  const { primaryCategories, secondaryCategories } = userIndexState;

  return (
    <Navbar>
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="dropdown navigation"
      >
        <div id="navbarExampleTransparentExample" style={{ width: "100%" }}>
          <div className="navbar-start">
            <Link className="navbar-item" to="/">
              모두 보기
            </Link>

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
