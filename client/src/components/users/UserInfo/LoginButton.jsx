import React, { useContext, useCallback } from "react";
import styled from "styled-components";
import KakaoLogin from "react-kakao-login";
import axios from "axios";
import Cookies from "js-cookie";
import { UserContext } from "../../../pages/users";
import { REQUEST_URL, KAKAO_JS_KEY } from "../../../config.json";

const DEFAULT_PROFILE_IMAGE = "/image/logo-mini/png";

const KakaoLoginButton = styled(KakaoLogin)`
  img {
    height: 24px;
    width: 24px;
  }
  span {
    font-weight: bold;
  }
`;

const LoginButton = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const userInfoParser = useCallback(({ profile, response }) => {
    const { kakao_account, properties } = profile;
    debugger;

    return {
      userAgeRange: +kakao_account.age_range[0] || null,
      userName: properties.nickname,
      userEmail: kakao_account.email || "blank",
      userGender: kakao_account.gender || "",
      profileImage: properties.profile_image || DEFAULT_PROFILE_IMAGE,
      userLocation: { lat: null, lon: null }
    };
  }, []);

  const onSuccess = async ({ response, profile }) => {
    const email = profile.kakao_account.email || "blank";
    const url = `${REQUEST_URL}/auth/users/accounts?email=${email}`;
    const options = { method: "GET" };

    fetch(url, options)
      .then(r => r.json())
      .then(res => {
        if (res) {
          setUserInfo({
            ...userInfo,
            ...userInfoParser({ response, profile })
          });
        } else {
          const inputLocation = prompt("사는 지역을 말씀해 주세요");
        }
      })
      .catch(e => {
        alert("데이터 요청을 할 수 없습니다.");
        console.error(e);
      });
  };

  return (
    <KakaoLoginButton
      className="button is-warning is-rounded"
      jsKey={KAKAO_JS_KEY}
      onSuccess={onSuccess}
      onFailure={console.error}
      getProfile="true"
    >
      <img src="/image/kakao-talk.png" alt="kakao-talk" />
      <span>&nbsp; 카카오톡으로 로그인하기</span>
    </KakaoLoginButton>
  );
};

export default LoginButton;
