import React, { useState, useCallback, useContext } from "react";
import styled from "styled-components";
const StyledFooter = styled.footer`
  border-top: 1.5px solid #dfdfdf;
  margin: 1em 0;
  padding: 1em 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .footer-title {
    padding: 0 0 1em;
    font-weight: bold;
    color: #e41d60b0;
  }
  hr {
    border: 0.5px solid #eae9e982;
    width: 80%;
    margin: 0.5em 0;
  }
  img {
    width: 64px;
    margin: 0 0.5em;
  }
  .sitemap-wrapper {
    .sitemap {
      width: 32px;
    }
  }
  .copyright {
    font-size: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Footer = ({ history }) => {
  return (
    <StyledFooter>
      <div className="footer-title">Study Combined</div>
      <div className="sitemap-wrapper">
        <a href="https://github.com/connect-foundation/2019-16">
          <img className="sitemap" src="/image/github-logo.png"></img>
        </a>
        <a href="https://www.notion.so/9f5925bc47884bf7ad0bb258a2566c9e">
          <img className="sitemap" src="/image/notion-gray.png"></img>
        </a>
      </div>
      <hr />
      <div className="copyright">김세진 | 이수배 | 이아람 | 임태현</div>
      <div className="copyright">
        <div>Copyright ©StudyCombined</div>
        <div>arame@kakao.com</div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
