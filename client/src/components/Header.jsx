import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AccountContainer from "../components/accountContainer";

const HeaderContainer = styled.header`
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

const Header = () => (
  <HeaderContainer>
    <Link to="/">
      <img
        src="/image/logo-mini.png"
        alt="study combined"
        className={["logo"]}
      />{" "}
    </Link>
    <AccountContainer />
  </HeaderContainer>
);

export default Header;
