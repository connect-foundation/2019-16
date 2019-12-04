import React, { useState, useReducer, createContext } from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";

import MainPage from "./Main";
import GroupDetailPage from "./groupDetail";
import GroupCreatePage from "./groupCreate";
import Header from "../../components/users/Header";
import { initalState, userIndexReducer } from "../../reducer/users";

const StyledUserPage = styled.div``;

export const UserContext = createContext();

const UserPage = () => {
  const [userInfo, setUserInfo] = useState({
    userEmail: "",
    userName: "",
    userAgeRange: -1,
    userGender: "",
    profileImage: "",
    userLocation: { lat: 0, lon: 0 }
  });

  const [userIndexState, userIndexDispatch] = useReducer(
    userIndexReducer,
    initalState
  );

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, userIndexState, userIndexDispatch }}
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

export default UserPage;
