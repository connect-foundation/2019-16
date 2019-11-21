import React from "react";
import styled from "styled-components";
import Header from "../components/groupDetailHeader";
import Main from "../components/groupDetailMain";
import Intro from "../components/groupDetailIntro";

const StyledGroupDetail = styled.div`
  display: flex;
  flex-direction: column;

  width: 54rem;
  margin: 3rem auto;
`;

const GroupDetail = ({ state, dispatch }) => {
  return (
    <StyledGroupDetail>
      <Header state={state}></Header>
      <Main state={state} dispatch={dispatch}></Main>
      <Intro></Intro>
    </StyledGroupDetail>
  );
};

export default GroupDetail;
