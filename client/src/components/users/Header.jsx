import React, { useState, useCallback, useContext } from "react";
import styled from "styled-components";

import UserInfo from "./UserInfo";
import StudySearchNavbar from "./studySearchNavbar";
import SuggestDropDown from "./suggestDropDown";

import { UserContext } from "../../pages/users/index";
import { REQUEST_URL } from "../../config.json";

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
      display: block;
      position: relative;
      top: auto;
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
  const [suggestions, setSuggestion] = useState([]);
  const { lat, lon } = userInfo.userLocation;
  const { request } = getApiAxiosState;

  let onChangeTimer;

  const onChange = useCallback(async e => {
    const query = e.target.value;
    setKeyword(query);
    const url = `${REQUEST_URL}/api/search/suggest/${query}`;
    if (onChangeTimer) {
      clearTimeout(onChangeTimer);
    }
    onChangeTimer = setTimeout(async () => {
      const response = await fetch(url);
      const jsonRes = await response.json();
      const suggestions = jsonRes.map(jsonRes => jsonRes.query);
      setSuggestion(suggestions);
    }, 200);
  });

  const onKeyDown = useCallback(
    e => {
      if (e.key !== "Enter") return;
      if (!isProperInput(keyword)) return alert("올바른 검색어를 입력해주세요");

      if (isTagSearch(keyword)) {
        request("post", "/search/tags/page/0", {
          data: { tags: [keyword.slice(1)], isRecruit: true, lat, lon },
        });
        history.push(`/search/tags?query=${keyword.slice(1)}`);
      } else {
        request(
          "get",
          `/search/query/${keyword}/location/${lat}/${lon}/page/0/true`,
        );
        history.push(`/search?query=${keyword}`);
      }
    },
    [keyword],
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
            <div>
              <input
                className="input is-rounded"
                type="text"
                placeholder="스터디그룹 검색"
                value={keyword}
                onChange={onChange}
                onKeyDown={onKeyDown}
              />
              <SuggestDropDown suggestions={suggestions} history={history} />
            </div>
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
