import React from "react";
import styled from "styled-components";
import { REQUEST_URL } from "../../../config.json";

const Button = styled.button`
  img {
    height: 24px;
    width: 24px;
  }
  span {
    font-weight: bold;
  }
`;

const LoginButton = () => {
  return (
    <Button
      className="button is-warning is-rounded"
      onClick={() => {
        window.location.href = `${REQUEST_URL}/auth/users/login`;
      }}
    >
      <img src="/image/kakao-talk.png" alt="kakao-talk" />
      <span>&nbsp; 카카오톡으로 로그인하기</span>
    </Button>
  );
};

export default LoginButton;
