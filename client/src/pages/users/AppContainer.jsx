import React, { useReducer } from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import MainPage from "./Main";
import GroupCreatePage from "./groupCreate";
import Header from "../../components/Header";
import {
  initalState,
  appContainerReducer,
  get_all_groups
} from "../../reducer/AppContainer";

const StyledAppContainer = styled.div``;

const AppContainer = () => {
  const [appContainerState, appContainerDispatch] = useReducer(
    appContainerReducer,
    initalState
  );

  return (
    <StyledAppContainer>
      <Header appContainerDispatch={appContainerDispatch} />
      <Switch>
        <Route path="/group/create" component={GroupCreatePage} />
        <Route
          path="/"
          render={() => <MainPage appContainerState={appContainerState} />}
        />
        <Route
          render={({ location }) => (
            <div>
              <h1>존재하지 않는 페이지입니다.</h1>
              <p>{location.pathname}</p>
            </div>
          )}
        />
      </Switch>
    </StyledAppContainer>
  );
};

export default AppContainer;
