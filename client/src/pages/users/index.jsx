/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useState,
  useReducer,
  createContext,
  useRef
} from "react";
import { Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";

import useAxios from "../../lib/useAxios";
import { REQUEST_URL } from "../../config.json";

import MainPage from "./Main";
import GroupCreatePage from "./groupCreate";
import GroupUpdatePage from "./groupUpdate";
import GroupDetailPage from "./groupDetail";
import { Header } from "../../components/users/Header";
import ReservationHeader from "../../components/users/ReservationHeader";
import Footer from "../../components/Footer";
import { initalState, userIndexReducer } from "../../reducer/users";
import Reservation from "./reservation";
import Search from "./search";
import Payment from "./payment";

const apiAxios = axios.create({ baseURL: `${REQUEST_URL}/api` });

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
    userId: "",
    userEmail: "",
    userName: "",
    userAgeRange: null,
    userGender: "",
    profileImage: "",
    userLocation: { lat: null, lon: null }
  });
  const [pageNationState, setPageNationState] = useState({
    page_idx: 1,
    category: null,
    isLastItem: false
  });
  const getApiAxiosState = useAxios(apiAxios);
  const [userIndexState, userIndexDispatch] = useReducer(
    userIndexReducer,
    initalState
  );
  const [groupInBooking, setgroupInBooking] = useState({
    title: null,
    personnel: null,
    dates: []
  });
  const map = useRef();

  useEffect(() => {
    const parsedUserInfo = jwtParser();

    if (parsedUserInfo) {
      const url = `${REQUEST_URL}/auth/users/accounts/${parsedUserInfo.id}`;
      const options = { method: "GET", mode: "cors", credentials: "include" };

      fetch(url, options)
        .then(r => {
          if (r.ok) return r.json();

          alert("로그인 오류 입니다");
          window.location.href = "/";
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
        getApiAxiosState,
        pageNationState,
        setPageNationState,
        groupInBooking,
        setgroupInBooking,
        map
      }}
    >
      <div className="app-wrapper">
        <Switch>
          <Route path="/reservation" component={ReservationHeader} />
          <Route path="/" component={Header} />
        </Switch>
        <Switch>
          <Route exact path={["/", "/category"]} component={MainPage} />
          <Route exact path="/group/create" component={GroupCreatePage} />
          <Route exact path="/group/update/:id" component={GroupUpdatePage} />
          <Route path="/group/detail/:id" component={GroupDetailPage} />
          <Route path="/reservation/:id" component={Reservation} />
          <Route path="/search/tags" component={Search} />
          <Route path="/search" component={Search} />
          <Route path="/payment" component={Payment} />
        </Switch>
      </div>
      <Switch>
        <Route path="/reservation" component={() => null} />
        <Route path="/" component={Footer} />
      </Switch>
    </UserContext.Provider>
  );
};

function jwtParser() {
  const jwt = Cookies.get("access_token");

  return jwt && jwt_decode(jwt);
}

export default UserPage;
