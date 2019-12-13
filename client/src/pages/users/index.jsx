/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useReducer, createContext } from "react";
import { Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";

import useAxios from "../../lib/useAxios";
import { REQUEST_URL } from "../../config.json";

import MainPage from "./Main";
import GroupCreatePage from "./groupCreate";
import Notice from "../../components/users/Notice";
import GroupUpdatePage from "./groupUpdate";
import GroupDetailPage from "./groupDetail";
import Header from "../../components/users/Header";
import { initalState, userIndexReducer } from "../../reducer/users";
import Reservation from "./reservation";
import Search from "./search";

const apiAxios = axios.create({ baseURL: `${REQUEST_URL}/api` });
const DEFAULT_PROFILE_IMAGE = "/image/logo-mini/png";

export const UserContext = createContext();

const getCurrentPosition = new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      resolve({ lat, lon });
    },
    err => reject(err)
  );
});

const UserPage = () => {
  const [userInfo, setUserInfo] = useState({
    kakaoAccessToken: "",
    userEmail: "",
    userName: "",
    userAgeRange: null,
    userGender: "",
    profileImage: "",
    userLocation: { lat: null, lon: null }
  });

  const getApiAxiosState = useAxios(apiAxios);

  const [userIndexState, userIndexDispatch] = useReducer(
    userIndexReducer,
    initalState
  );

  useEffect(() => {
    const parsedUserInfo = jwtParser();
    if (parsedUserInfo) {
      const url = `${REQUEST_URL}/auth/users/accounts/${parsedUserInfo.email}`;
      const options = { method: "GET" };

      fetch(url, options)
        .then(r => {
          if (r.ok) return r.json();
          throw new Error("fetch error");
        })
        .then(result => {
          setUserInfo(result);
        })
        .catch(console.error);
    } else {
      getCurrentPosition
        .then(pos => {
          const { lat, lon } = pos;
          setUserInfo({ ...userInfo, userLocation: { lat, lon } });
        })
        .catch(console.error);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        userIndexState,
        userIndexDispatch,
        getApiAxiosState
      }}
    >
      <div>
        <Notice />
        <Route path="/" component={Header} />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/group/create" component={GroupCreatePage} />
          <Route exact path="/group/update/:id" component={GroupUpdatePage} />
          <Route path="/group/detail/:id" component={GroupDetailPage} />
          <Route path="/reservation" component={Reservation} />
          <Route path="/search/tags" component={Search} />
          <Route path="/search" component={Search} />
        </Switch>
      </div>
    </UserContext.Provider>
  );
};

function jwtParser() {
  const jwt = Cookies.get("access_token");

  return jwt && jwt_decode(jwt);
}

export default UserPage;
