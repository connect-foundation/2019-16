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

const dummy = {
  link: "프로그래밍",
  items: [
    { name: "C", href: "www.naver.com" },
    { name: "C++", href: "www.naver.com" }
  ]
};

const StudySearchNavbar = props => (
  <Navbar>
    <nav
      class="navbar is-transparent"
      role="navigation"
      aria-label="dropdown navigation"
    >
      <div
        id="navbarExampleTransparentExample"
        // class="navbar-menu"
        style={{ width: "100%" }}
      >
        <div class="navbar-start">
          <StudyNavbarItem data={dummy}></StudyNavbarItem>
          <StudyNavbarItem data={dummy}></StudyNavbarItem>
          <StudyNavbarItem data={dummy}></StudyNavbarItem>
          <StudyNavbarItem data={dummy}></StudyNavbarItem>
          <StudyNavbarItem data={dummy}></StudyNavbarItem>
        </div>
      </div>
    </nav>
  </Navbar>
);

export default StudySearchNavbar;
