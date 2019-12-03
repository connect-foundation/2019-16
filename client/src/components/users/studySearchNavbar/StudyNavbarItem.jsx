import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { REQUEST_URL } from "../../../config.json";
import { UserContext } from "../../../pages/users/index";
import { set_groups } from "../../../reducer/users/index";

const Category = styled.div`
  a {
    font-family: "Nanum Gothic", sans-serif;
    font-weight: bold;
    font-size: 1.7em;
  }

  .navbar-item {
    cursor: pointer;
  }
`;

const StudyNavbarItem = ({ primaryCategory, secondaryCategories }) => {
  const { userIndexDispatch } = useContext(UserContext);

  const searchGroups = useCallback(e => {
    const categoryName = e.target.textContent.trim();

    axios.get(`${REQUEST_URL}/search/all/${categoryName}/true`).then(result => {
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

  const itemList = secondaryCategories.map(category => (
    <span className="navbar-item is-size-3" onClick={searchGroups}>
      {category}
    </span>
  ));

  return (
    <Category>
      <div className="navbar-item has-dropdown is-hoverable">
        <span
          className="navbar-link is-arrowless is-size-3"
          onClick={searchGroups}
        >
          {primaryCategory}
        </span>
        <div className="navbar-dropdown is-boxed">{itemList}</div>
      </div>
    </Category>
  );
};

export default StudyNavbarItem;