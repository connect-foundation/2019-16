import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { REQUEST_URL } from "../../config.json";
import StudySearchNavbar from "./studySearchNavbar";
import AccountContainer from "./accountContainer";
import { set_groups } from "../../reducer/users/index";
import { UserContext } from "../../pages/users/index";

const StyledHeader = styled.header`
  .header-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 3%;
    margin-bottom: 2.3rem;

    .logo {
      width: 64px;
      height: 64px;
    }
    .search-box {
      width: 70%;
      .input {
        border-color: #53d0ec;
        width: 50%;
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

const Header = () => {
  const { userInfo, userIndexDispatch } = useContext(UserContext);
  const { userName } = { userInfo };

  const onKeyUp = useCallback(e => {
    if (e.key === "Enter") {
      const keyword = e.target.value;

      e.preventDefault();
      if (keyword[0] === "#") {
        //tag검색
        const tag = keyword.slice(1);

        axios
          .post(`${REQUEST_URL}/search/tags`, {
            tags: [tag],
            isRecruit: true
          })
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
      } else {
        axios
          .get(`${REQUEST_URL}/search/query/${keyword}/true`)
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
      }
    }
  }, []);

  return (
    <StyledHeader>
      <div className="header-info">
        <img
          src="/image/logo-mini.png"
          alt="study combined"
          className={["logo"]}
        />{" "}
        <div className={`search-box`}>
          <input
            class="input is-rounded"
            type="text"
            placeholder="스터디그룹 검색"
            onKeyUp={onKeyUp}
          />
        </div>
        <div className={`account-box`}>
          <div className={`user-account-btn accountbox-btn`}>
            <span> {userName}님 환영합니다. </span>
          </div>
        </div>
        <AccountContainer />
      </div>
      <StudySearchNavbar />
    </StyledHeader>
  );
};

export default Header;
