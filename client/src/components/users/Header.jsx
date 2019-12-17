import React, { useState, useCallback, useContext } from "react";
import styled from "styled-components";

import UserInfo from "./UserInfo";
import StudySearchNavbar from "./studySearchNavbar";

import { UserContext } from "../../pages/users/index";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: 1.5px solid #dfdfdf;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;

  .header-info {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0.7% 0 0% 0;
    width: 80%;

    .logo {
      width: 85px;
      height: 68px;
    }
    .search-box {
      .input {
        border-color: #53d0ec;
      }
    }
    .account-box {
      display: flex;
      font-family: NanumGothic;
      font-weight: bold;
      font-size: 1.3em;
      color: #000000;
      .accountbox-btn {
        padding: 0 0.4em;
      }
      .user-account-btn {
        color: #55f4c4;
      }
    }
  }
`;

const LeftHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  & > * {
    margin-right: 2rem;
  }
`;

const Header = ({ history }) => {
  const { userInfo, getApiAxiosState } = useContext(UserContext);
  const [keyword, setKeyword] = useState("");

  const { lat, lon } = userInfo.userLocation;

  const { request } = getApiAxiosState;

  const onChange = useCallback(e => {
    setKeyword(e.target.value);
  });

  const onKeyDown = useCallback(
    e => {
      if (e.key !== "Enter") return;
      if (!isProperInput(keyword)) return alert("올바른 검색어를 입력해주세요");

      isTagSearch(keyword)
        ? history.push(`/search/tags?query=${keyword.slice(1)}`)
        : history.push(`/search?query=${keyword}`);
    },
    [lat, lon, request, keyword]
  );

  return (
    <StyledHeader>
      <div className="header-info">
        <LeftHeader>
          <a href="/">
            <img
              src="/image/new-logo-mini.png"
              alt="study combined"
              className="logo"
            />
          </a>

          <div className={`search-box`}>
            <input
              className="input is-rounded"
              type="text"
              placeholder="스터디그룹 검색"
              value={keyword}
              onChange={onChange}
              onKeyDown={onKeyDown}
            />
          </div>
          <StudySearchNavbar />
        </LeftHeader>
        <UserInfo />
      </div>
    </StyledHeader>
  );
};

const isTagSearch = keyword => keyword[0] === "#";
const isProperInput = keyword =>
  typeof keyword === "string" &&
  keyword &&
  (keyword[0] !== "#" ? true : keyword.length > 1);

export default Header;
