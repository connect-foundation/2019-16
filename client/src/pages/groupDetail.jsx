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

const GroupDetail = ({ data }) => {
  const {
    title,
    category,
    studyThumbnail,
    location,
    time,
    minCnt,
    nowCnt,
    maxCnt,
    tags
  } = data;

  return (
    <StyledGroupDetail>
      <Header data={{ title, category }}></Header>
      <Main
        data={{ studyThumbnail, location, time, minCnt, nowCnt, maxCnt, tags }}
      ></Main>
      <Intro></Intro>
    </StyledGroupDetail>
  );
};

export default GroupDetail;
