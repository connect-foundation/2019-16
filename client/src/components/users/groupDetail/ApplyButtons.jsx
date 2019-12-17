import React, { useState, useEffect, useContext, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";

import { REQUEST_URL } from "../../../config.json";
import useAxios from "../../../lib/useAxios";
import { UserContext } from "../../../pages/users";

const apiAxios = axios.create({ baseURL: `${REQUEST_URL}/api` });

const StyledApplyButtons = styled.div`
  .button:not(:last-child) {
    margin-right: 0.4rem;
  }
`;

const ApplyButtons = ({ groupData, onToggleReservation }) => {
  const {
    _id,
    members,
    isRecruiting,
    leader,
    now_personnel,
    max_personnel,
    min_personnel
  } = groupData;

  const { userInfo } = useContext(UserContext);
  const { request } = useAxios(apiAxios);
  const { userId } = userInfo;
  const [memberType, setMemberType] = useState(null); // guest, searcher, joiner, leader
  const [isCanReserve, setIsCanReserve] = useState(false);
  const isSatisfyPersonnel =
    min_personnel <= now_personnel && now_personnel <= max_personnel;

  const onToggleRegister = useCallback(async () => {
    // 사용자 DB에 해당 그룹 정보를 넣는다
    const { status, changedMemberType, error } = await request(
      "post",
      "/studygroup/toggleRegister",
      {
        data: { userId: userInfo.userId, groupId: groupData._id }
      }
    );

    if (status === 200) setMemberType(changedMemberType);
    if (status === 400) {
      console.error(error);
      alert("소속 상태 변경 중, 에러발생");
    }
  }, [userInfo.userId]);

  const onToggleRecruit = useCallback(async () => {
    // 그룹 DB에 isRecruiting을 true로 만든다.
    // now가 min max에 충족하면 예약하기 버튼을 활성화한다.
    // const { status } = await request("patch", "/studygroup/recruit", {
    //   data: { isRecruiting, id: _id }
    // });
    // if (status !== 200) return alert("서버 에러 발생");
    onToggleReservation(isRecruiting);
    isSatisfyPersonnel && setIsCanReserve(true);
  }, [isRecruiting, isSatisfyPersonnel]);
  const onReservate = useCallback(() => {
    // 에헤잉
  }, []);

  useEffect(() => {
    if (!userId) return;
    const isJoiner = members.map(m => m.userId).some(email => email === userId);
    let type;

    if (isJoiner) type = "joiner";
    if (!isJoiner) type = "searcher";
    if (userId === leader) {
      type = "leader";
      isSatisfyPersonnel && setIsCanReserve(true);
    }
    setMemberType(type);
  }, [userId]);
  return (
    <StyledApplyButtons>
      {(() => {
        switch (memberType) {
          case "searcher":
            return (
              <button className="button" onClick={onToggleRegister}>
                신청하기
              </button>
            );
          case "joiner":
            return (
              <button className="button" onClick={onToggleRegister}>
                취소하기
              </button>
            );
          case "leader":
            return (
              <>
                <button className="button" onClick={onToggleRecruit}>
                  {isRecruiting ? "마감하기" : "모집하기"}
                </button>
                {isCanReserve && !isRecruiting && (
                  <button className="button" onClick={onReservate}>
                    예약하기
                  </button>
                )}
              </>
            );
          default:
            return;
        }
      })()}
    </StyledApplyButtons>
  );
};

export default ApplyButtons;
