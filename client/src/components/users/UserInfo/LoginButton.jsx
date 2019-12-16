import React, { useContext, useCallback } from "react";
import styled from "styled-components";
import KakaoLogin from "react-kakao-login";
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
  const onSuccess = async ({ response, profile }) => {
    // 카카오 로그인 성공 후
    const { daum, kakao } = window;
    const geocoder = new kakao.maps.services.Geocoder();
    const userId = profile.id;
    const url = `${REQUEST_URL}/auth/users/accounts/${userId}`;
    const options = { method: "GET" };

    fetch(url, options)
      .then(getRes => getRes.json())
      .then(result => {
        if (result === null) {
          let address;
          const oncomplete = data => {
            address = data.address;
          };
          const onclose = state => {
            if (state === "FORCE_CLOSE") {
              alert("필수 입력 사항입니다. 다시 로그인 해주세요");
              window.location.reload();
            } else if (state === "COMPLETE_CLOSE") {
              geocoder.addressSearch(
                address,
                (locationResult, locationStatus) => {
                  const userLocation = {
                    lat: +locationResult[0].x,
                    lon: +locationResult[0].y
                  };
                  const url = `${REQUEST_URL}/auth/users/accounts`;
                  const data = {
                    kakaoAccessToken: response.access_token,
                    userId: profile.id,
                    userEmail: profile.kakao_account.email || "",
                    userName: profile.properties.nickname,
                    userGender: profile.kakao_account.gender || "",
                    userAgeRange: +profile.kakao_account.age_range[0] || null,
                    profileImage:
                      profile.properties.profile_image || DEFAULT_PROFILE_IMAGE,
                    userLocation: userLocation
                  };
                  const options = {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json;charset=utf-8"
                    },
                    mode: "no-cors",
                    body: data
                  };

                  fetch(url, options).then(postRes => {
                    console.log(postRes);
                    if (postRes.ok) {
                      setUserInfo(data);
                    }
                  });
                }
              );
            }
          };

          new daum.Postcode({ oncomplete, onclose }).open();
        } else {
          const url = `${REQUEST_URL}/auth/users/accounts/${userId}`;
          const options = {
            method: "PATCH",
            headers: { "Content-Type": "application/json;charset:utf-8" },
            body: { kakaoAccessToken: response.access_token }
          };

          fetch(url, options).then(() => {
            setUserInfo({
              ...result
            });
          });
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
