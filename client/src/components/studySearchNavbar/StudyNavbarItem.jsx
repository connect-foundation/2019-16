import React from "react";
import styled from "styled-components";

const Category = styled.div`
  a {
    font-family: "Nanum Gothic", sans-serif;
    font-weight: bold;
    font-size: 1.7em;
  }
`;

const StudyNavbarItem = ({ primaryCategory, secondaryCategories }) => {
  const itemList = secondaryCategories.map(category => {
    return (
      <a class="navbar-item" href="www.naver.com">
        {category}
      </a>
    );
  });

  return (
    <Category>
      <div class="navbar-item has-dropdown is-hoverable">
        <a
          class="navbar-link is-arrowless"
          href="https://bulma.io/documentation/overview/start/"
        >
          {primaryCategory}
        </a>
        <div class="navbar-dropdown is-boxed">{itemList}</div>
      </div>
    </Category>
  );
};

export default StudyNavbarItem;
