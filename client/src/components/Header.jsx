import React, { useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { get_searched_groups_without_category } from "../reducer/AppContainer";

const HeaderBox = styled.div`
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
`;

const Header = ({ appContainerDispatch }) => {
  const handleKeyUp = useCallback(e => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value[0] === "#") {
        //tag검색
        console.log("tag");
        const tag = e.target.value.substr(1);
        const url = `http://127.0.0.1:8000/api/search/tags`;
        axios
          .post(url, {
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
            appContainerDispatch(get_searched_groups_without_category(data));
          });
      } else {
        const url = `http://127.0.0.1:8000/api/search/query/${e.target.value}/true`;
        axios.get(url).then(result => {
          const { data } = result;
          for (let i = 0; i < data.length; i++) {
            data[i].id = i;
            data[
              i
            ].location = `위도: ${data[i].location.lat}, 경도: ${data[i].location.lon}`;
          }
          appContainerDispatch(get_searched_groups_without_category(data));
        });
      }
    }

    console.log(e.target.value);
  }, []);

  return (
    <header>
      <HeaderBox>
        <Link to="/">
          <img
            src="/image/logo-mini.png"
            alt="study combined"
            className={["logo"]}
          />{" "}
        </Link>
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
            <span> 태현님 환영합니다. </span>
          </div>
        </div>
      </HeaderBox>
    </header>
  );
};

export default Header;
