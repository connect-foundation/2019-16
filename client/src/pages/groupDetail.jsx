import React from "react";
import styled from "styled-components";
import Header from "../components/groupDetailHeader";
import Main from "../components/groupDetailMain";
import Intro from "../components/groupDetailIntro";

const StyledGroupDetail = styled.div`
  display: flex;
  flex-direction: column;

  width: 54rem;
  margin: auto auto;
`;

const GroupDetail = () => {
  return (
    <StyledGroupDetail>
      <Header></Header>
      <Main></Main>
      <Intro></Intro>
    </StyledGroupDetail>
  );
};

export default GroupDetail;
