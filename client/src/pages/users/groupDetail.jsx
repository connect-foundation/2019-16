/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { REQUEST_URL } from "../../config.json";
import useAxios from "../../lib/useAxios";
import { UserContext } from "../../pages/users";
import Header from "../../components/users/groupDetail/Header";
import Main from "../../components/users/groupDetail/Main";
import Intro from "../../components/users/groupDetail/Intro";
import {
  groupDetail as groupDetailReducer,
  initialState,
  set_detail_data
} from "../../reducer/users/groupDetail";

const apiAxios = axios.create({ baseURL: `${REQUEST_URL}/api` });

const StyledGroupDetail = styled.div`
  display: flex;
  flex-direction: column;

  width: 54rem;
  margin: 3rem auto;

  .modify-buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    .button:not(:first-child) {
      margin-left: 0.5rem;
    }
  }
`;

const GroupDetail = ({ match, history }) => {
  const { userInfo } = useContext(UserContext);
  const [groupData, dispatch] = useReducer(groupDetailReducer, initialState);
  const { loading, error, data, request } = useAxios(apiAxios);
  const { id } = match.params;

  const requestDelete = useCallback(async () => {
    if (!groupData.isRecruiting)
      return alert("마감(예약)상태에서 그룹을 삭제할 수 없습니다.");

    try {
      const { status } = await request("delete", `/studygroup/detail/${id}`);
      if (status === 200) window.location.href = "/";
      else alert("서버 에러");
    } catch (err) {
      alert("요청 오류");
    }
  }, [id, groupData]);

  useEffect(() => {
    id && request("get", `/studygroup/detail/${id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    !loading && data && dispatch(set_detail_data(data.detailInfo));
  }, [data, loading]);

  return (
    <StyledGroupDetail>
      {(() => {
        if (loading) return <h2>로딩 중... </h2>;
        if (error || data.status === 400) return <h2> 에러 발생 </h2>;

        const isHaveGroupData = Object.keys(groupData || {}).length;
        const { intro } = groupData;

        if (isHaveGroupData) {
          const isMyGroup = groupData.leader === userInfo.userId;
          return (
            <>
              <Header groupData={groupData} history={history}></Header>
              <Main
                groupData={groupData}
                dispatch={dispatch}
                history={history}
              ></Main>
              {isMyGroup && (
                <div className="modify-buttons">
                  <Link to={`/group/update/${id}`}>
                    <button className="button"> 수정 </button>
                  </Link>
                  <button className="button" onClick={requestDelete}>
                    삭제
                  </button>
                </div>
              )}
              <Intro intro={intro}></Intro>
            </>
          );
        }
      })()}
    </StyledGroupDetail>
  );
};

export default GroupDetail;
