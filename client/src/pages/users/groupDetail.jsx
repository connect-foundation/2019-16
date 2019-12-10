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

  .modify-buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    .button {
      margin-left: 1.7rem;
    }
  }
`;

const GroupDetail = ({ match }) => {
  const [groupData, dispatch] = useReducer(groupDetailReducer, initialState);
  const { id } = match.params;

  useEffect(() => {
    axios.get(`${REQUEST_URL}/api/studygroup/detail/${id}`).then(result => {
      const groupData = result.data;
      dispatch(set_detail_data(groupData));
    });
  }, [id]);

  const isHaveGroupData = Object.keys(groupData).length;
  const { intro } = groupData;
  return (
    <StyledGroupDetail>
      {isHaveGroupData && (
        <>
          <Header groupData={groupData}></Header>
          <Main groupData={groupData} dispatch={dispatch}></Main>
          <div className="modify-buttons">
            <button className="button"> 수정 </button>
            <button className="button"> 삭제 </button>
          </div>
          <Intro intro={intro}></Intro>
        </>
      )}
    </StyledGroupDetail>
  );
};

export default GroupDetail;
