import React, { memo, useReducer } from "react";
import styled from "styled-components";
import Header from "./components/groupDetail/Header";
import Main from "./components/groupDetail/Main";
import Intro from "./components/groupDetail/Intro";
import {
  groupDetail as groupDetailReducer,
  initialState
} from "./reducer/groupDetail";

const StyledGroupDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 54rem;
  margin: 3rem auto;
`;

const GroupDetail = () => {
  const [state, dispatch] = useReducer(groupDetailReducer, initialState);

  return (
    <StyledGroupDetail>
      <Header state={state}></Header>
      <Main state={state} dispatch={dispatch}></Main>
      <Intro></Intro>
    </StyledGroupDetail>
  );
};

export default GroupDetail;
