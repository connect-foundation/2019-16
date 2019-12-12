import React, { useState, useCallback, useContext } from "react";
import { createBrowserHistory } from "history";
import styled from "styled-components";

import UserInfo from "./UserInfo";
import StudySearchNavbar from "./studySearchNavbar";

import { UserContext } from "../../pages/users/index";

const StyledHeader = styled.header`
  .header-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1.5px solid #dfdfdf;
    padding: 1% 10%;
    margin-bottom: 2.3rem;

    .logo {
      width: 64px;
      height: 64px;
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
  width: 50%;
  justify-content: space-around;
`;

const Header = ({ history }) => {
  const { userInfo, getApiAxiosState } = useContext(UserContext);
  const [keyword, setKeyword] = useState("");

  // const { lat, lon} = userInfo.userLocation;
  const { lat, lon } = { lat: 41.24, lon: -50.34 };
  const { request } = getApiAxiosState;

  const onChange = useCallback(e => {
    setKeyword(e.target.value);
  });

  const onKeyDown = useCallback(
    e => {
      if (e.key !== "Enter") return;
      if (!isProperInput(keyword)) return alert("올바른 검색어를 입력해주세요");

      isTagSearch(keyword)
        ? createBrowserHistory.push(`/search/tags`)
        : createBrowserHistory.push(`/search?query=${keyword}`);

      // isTagSearch(keyword)
      //   ? request("post", "/search/tags", {
      //       data: { tags: [keyword.slice(1)], isRecruit: true, lat, lon }
      //     })
      //   : request(
      //       "get",
      //       `/search/query/${keyword}/location/${lat}/${lon}/true`
      //     );
    },
    [lat, lon, request, keyword]
  );

  return (
    <StyledHeader>
      <div className="header-info">
        <LeftHeader>
          <a href="/">
            <img
              src="/image/logo-mini.png"
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
