import React, { useReducer, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { REQUEST_URL } from "../../config.json";
import Header from "../../components/users/groupDetail/Header";
import Main from "../../components/users/groupDetail/Main";
import Intro from "../../components/users/groupDetail/Intro";
import {
  groupDetail as groupDetailReducer,
  initialState,
  set_detail_data
} from "../../reducer/users/groupDetail";

const StyledGroupDetail = styled.div`
  display: flex;
  flex-direction: column;

  width: 54rem;
  margin: 3rem auto;
`;

const GroupDetail = props => {
  const [groupData, dispatch] = useReducer(groupDetailReducer, initialState);
  const groupId = props._id;

  useEffect(() => {
    axios
      .get(`${REQUEST_URL}/api/studygroup/detail/${groupId}`)
      .then(result => {
        const groupData = result.data;
        dispatch(set_detail_data(groupData));
      });
  }, []);

  return (
    <StyledGroupDetail>
      <Header groupData={groupData}></Header>
      <Main groupData={groupData} dispatch={dispatch}></Main>
      <Intro></Intro>
    </StyledGroupDetail>
  );
};

export default GroupDetail;
