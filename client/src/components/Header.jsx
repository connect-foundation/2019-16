import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

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

const Header = () => {
  const {
    appState: { userName }
  } = useContext(AppContext);

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
        <div className={`account-box`}>
          <div className={`user-account-btn accountbox-btn`}>
            <span> {userName}님 환영합니다. </span>
          </div>
        </div>
      </HeaderBox>
    </header>
  );
};

export default Header;
