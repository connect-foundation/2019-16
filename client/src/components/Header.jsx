import React from "react";
import styled from "styled-components";

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 3%;
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

const Header = ({ uri }) => (
  <header>
    <HeaderBox>
      <a href={uri}>
        <img src="/image/logo-mini.png" className={["logo"]}></img>
      </a>
      <div className={`account-box`}>
        <div className={`signin-btn accountbox-btn `}>
          <span>로그인</span>
        </div>
        <div className={`signout-btn accountbox-btn`}>
          <span>회원가입</span>
        </div>
        <div className={`user-account-btn accountbox-btn`}>
          <span>{"Soob"} 님</span>
        </div>
      </div>
    </HeaderBox>
  </header>
);

export default Header;
