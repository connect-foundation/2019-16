import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { UserContext } from "../../../pages/users";

const StyledHeader = styled.div`
  .hero-body {
    padding-left: 0;
    font-family: "Nanum Gothic", sans-serif;
  }
`;

const Header = ({ groupData }) => {
  const { title, category } = groupData;
  const {
    userInfo,
    getApiAxiosState,
    pageNationState,
    setPageNationState
  } = useContext(UserContext);
  const { request } = getApiAxiosState;

  const categoryBtnEvent = useCallback(e => {
    const categoryName = e.target.textContent.trim().replace(/(\s*)/g, "");
    const { lat, lon } = userInfo.userLocation;
    const changedPageNationState = {
      ...pageNationState,
      page_idx: 1,
      category: categoryName
    };
    setPageNationState(changedPageNationState);

    request(
      "get",
      `/search/all/category/${categoryName}/location/${lat}/${lon}/page/0/true`
    );
  }, []);

  return (
    <StyledHeader className="hero is-full">
      <div className="hero-body">
        <h2 className="title has-text-danger is-size-2">{title}</h2>
        <div className="buttons">
          <Link
            to={`/category?query=${category[0]}`}
            className="button is-primary is-small"
            onClick={categoryBtnEvent}
          >
            {category[0]}
          </Link>
          <Link
            to={`/category?query=${category[1]}`}
            className="button is-primary is-small"
            onClick={categoryBtnEvent}
          >
            {category[1]}
          </Link>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
