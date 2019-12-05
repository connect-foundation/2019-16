import React, { useContext, useCallback } from "react";
import styled from "styled-components";
import KakaoLogin from "react-kakao-login";
import axios from "axios";
import { UserContext } from "../../../pages/users";
import { REQUEST_URL, KAKAO_JS_KEY } from "../../../config.json";

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

    return {
      userAgeRange: +kakao_account.age_range[0],
      userName: properties.nickname,
      userEmail: kakao_account.email,
      userGender: kakao_account.gender,
      profileImage: properties.profile_image,
      accessToken: response.access_token
    };
  }, []);

  const onSuccess = ({ response, profile }) => {
    const email = profile.kakao_account.email;

    // axios
    //   .post(`${REQUEST_URL}/auth/users/checkEmail`, { email })
    //   .then(({ data }) => {
    //     if (!data.exist) {
    //       // 처음 방문한 사용자라면 위치를 입력받아서 데이터베이스에 저장
    //       const location = prompt(
    //         "처음이신가봐요! 거주하고 계신 동네를 말씀해 주세요"
    //       );
    //     }
    //     const tmp = Object.assign(
    //       userInfo,
    //       userInfoParser({ response, profile })
    //     );
    //     setUserInfo(tmp);
    //   })
    //   .catch(e => {
    //     console.error(e);
    //   });
    setUserInfo({ ...userInfo, ...userInfoParser({ response, profile }) });
  };

  return (
    <KakaoLoginButton
      className="button is-warning is-rounded"
      jsKey={KAKAO_JS_KEY}
      onSuccess={onSuccess}
      onFailure={res => {
        // Caution popup
        console.error(res);
      }}
      getProfile="true"
    >
      <img src="/image/kakao-talk.png" alt="kakao-talk" />
      <span>&nbsp; 카카오톡으로 로그인하기</span>
    </KakaoLoginButton>
  );
};

export default LoginButton;
