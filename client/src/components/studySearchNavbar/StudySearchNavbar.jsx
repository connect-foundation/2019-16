import React from "react";
import styled from "styled-components";
import StudyNavbarItem from "./StudyNavbarItem";
const Navbar = styled.div`
  padding: 5%;
  width: 100%;
  .navbar-start {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
`;

const StudySearchNavbar = ({ categoryData }) => (
  <Navbar>
    <nav
      class="navbar is-transparent"
      role="navigation"
      aria-label="dropdown navigation"
    >
      <div id="navbarExampleTransparentExample" style={{ width: "100%" }}>
        <div class="navbar-start">
          {categoryData.map(data => (
            <StudyNavbarItem data={data}></StudyNavbarItem>
          ))}
        </div>
      </div>
    </nav>
  </Navbar>
);

export default StudySearchNavbar;
