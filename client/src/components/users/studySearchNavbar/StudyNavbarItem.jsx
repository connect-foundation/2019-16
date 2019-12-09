import React, { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { REQUEST_URL } from "../../../config.json";
import { UserContext } from "../../../pages/users/index";
import { set_groups } from "../../../reducer/users/index";

const Category = styled.div`
  a {
    font-family: "Nanum Gothic", sans-serif;
    font-weight: bold;
    font-size: 1em;
  }

  .navbar-item {
    cursor: pointer;
  }
`;

const StudyNavbarItem = ({ primaryCategory, secondaryCategories }) => {
  const { userIndexDispatch, userInfo } = useContext(UserContext);

  const searchGroups = useCallback(
    e => {
      const categoryName = e.target.textContent.trim();
      const { lat, lon } = userInfo.userLocation;

      axios
        .get(
          `${REQUEST_URL}/api/search/all/category/${categoryName}/location/${lat}/${lon}/true`
        )
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
    },
    [userInfo]
  );

  const itemList = secondaryCategories.map((category, idx) => (
    <Link to="/">
      <span key={idx} className="navbar-item" onClick={searchGroups}>
        {category}
      </span>
    </Link>
  ));

  return (
    <Category>
      <div className="navbar-item has-dropdown is-hoverable">
        <span className="navbar-link is-arrowless" onClick={searchGroups}>
          {primaryCategory}
        </span>
        <div className="navbar-dropdown is-boxed">{itemList}</div>
      </div>
    </Category>
  );
};

export default StudyNavbarItem;
