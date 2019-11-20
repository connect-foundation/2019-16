import React from "react";
import styled from "styled-components";
import Header from "../components/groupDetailHeader";
import Main from "../components/groupDetailMain";
import Intro from "../components/groupDetailIntro";

const StyledGroupDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
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
