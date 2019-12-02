import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../App";
import { login_button_click } from "../../reducer/App";

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
  const { appState, appDispatch } = useContext(AppContext);

  return (
    <>
      {appState.userEmail && (
        <Button className="button is-warning is-rounded">
          <img src="/image/kakao-talk.png" alt="kakao-talk" />
          <span>&nbsp; 카카오톡으로 로그인하기</span>
        </Button>
      )}
    </>
  );
};

export default LoginButton;
