import React, { useEffect, useState, useReducer, createContext } from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";

import useAxios from "../../lib/useAxios";
import { REQUEST_URL } from "../../config.json";

import MainPage from "./Main";
import GroupDetailPage from "./groupDetail";
import GroupCreatePage from "./groupCreate";
import Header from "../../components/users/Header";
import { initalState, userIndexReducer } from "../../reducer/users";

const apiAxios = axios.create({ baseURL: `${REQUEST_URL}/api` });

const StyledUserPage = styled.div``;

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
    accessToken: "",
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
    parsedUserInfo ||
      getCurrentPosition
        .then(pos => {
          // const lat = pos.lat;
          // const lon = pos.lon;
          const lat = 41.12;
          const lon = -50.34;
          setUserInfo({ ...userInfo, userLocation: { lat, lon } });
        })
        .catch(console.error);
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
      <StyledUserPage>
        <Header />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/group/create" component={GroupCreatePage} />
          <Route path="/group/detail/:id" component={GroupDetailPage} />
        </Switch>
      </StyledUserPage>
    </UserContext.Provider>
  );
};

function jwtParser() {
  const jwt = Cookies.get("access_token");
  return jwt && jwt_decode(jwt);
}

export default UserPage;
