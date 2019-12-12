import React, { useState, useEffect, useContext, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";

import { REQUEST_URL } from "../../../config.json";
import useAxios from "../../../lib/useAxios";
import { UserContext } from "../../../pages/users";

const apiAxios = axios.create({ baseURL: `${REQUEST_URL}/api` });

const StyledApplyButtons = styled.div``;

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
  const { userEmail } = userInfo;
  const [memberType, setMemberType] = useState(null); // guest, searcher, joiner, leader
  const [isCanReserve, setIsCanReserve] = useState(false);
  const isSatisfyPersonnel =
    min_personnel <= now_personnel && now_personnel <= max_personnel;

  const onRegister = useCallback(() => {
    // 사용자 DB에 해당 그룹 정보를 넣는다
    // 그룹 DB에 해당 유저 정보를 넣는다.
    setMemberType("joiner");
  }, []);
  const onCancel = useCallback(() => {
    // 사용자 DB에 해당 그룹 정보를 지운다.
    // 그룹 DB에 해당 유저 정보를 지운다.
    setMemberType("searcher");
  }, []);
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
    if (!userEmail) return;
    const isJoiner = members
      .map(m => m.userEmail)
      .some(email => email === userEmail);
    let type;

    if (isJoiner) type = "joiner";
    if (!isJoiner) type = "searcher";
    if (userEmail === leader) {
      type = "leader";
      isSatisfyPersonnel && setIsCanReserve(true);
    }
    setMemberType(type);
  }, [userEmail]);
  return (
    <StyledApplyButtons>
      {(() => {
        switch (memberType) {
          case "searcher":
            return (
              <button className="button" onClick={onRegister}>
                신청하기
              </button>
            );
          case "joiner":
            return (
              <button className="button" onClick={onCancel}>
                취소하기
              </button>
            );
          case "leader":
            return (
              <>
                <button className="button" onClick={onToggleRecruit}>
                  {isRecruiting ? "마감하기" : "모집하기"}
                </button>
                {isCanReserve && (
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
