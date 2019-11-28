import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Category = styled.div`
  a {
    font-family: "Nanum Gothic", sans-serif;
    font-weight: bold;
    font-size: 1.7em;
  }
`;

const StudyNavbarItem = ({ primaryCategory, secondaryCategories }) => {
  const itemList = secondaryCategories.map(category => (
    <Link className="navbar-item" to={`/category/${category}`}>
      {category}
    </Link>
  ));

  return (
    <Category>
      <div className="navbar-item has-dropdown is-hoverable">
        <span className="navbar-link is-arrowless is-size-3">
          {primaryCategory}
        </span>
        <div className="navbar-dropdown is-boxed">{itemList}</div>
      </div>
    </Category>
  );
};

export default StudyNavbarItem;
