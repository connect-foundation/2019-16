import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
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

const ApplyButtons = ({
  groupData,
  onToggleReservation,
  onChangedNowPersonnel
}) => {
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
  const isSatisfyPersonnelAtReservation =
    min_personnel <= now_personnel && now_personnel <= max_personnel;
  const isPersonnelHigherThanMax = now_personnel >= max_personnel;

  const onToggleRegister = useCallback(async () => {
    if (isPersonnelHigherThanMax) return alert("인원이 꽉 찼습니다");
    if (memberType !== "joiner" && !isRecruiting)
      return alert("모집 중이 아닙니다.");
    // 사용자 DB에 해당 그룹 정보를 넣는다
    const {
      status,
      changedMemberType,
      changedNowPersonnel,
      failReason
    } = await request("post", "/studygroup/toggleRegistration", {
      data: { userId, groupId: _id }
    });

    if (status === 200) {
      setMemberType(changedMemberType);
      onChangedNowPersonnel(changedNowPersonnel);
    }

    if (status === 400) {
      alert(failReason);
    }
  }, [userInfo.userId, memberType, isRecruiting]);

  const onToggleRecruit = useCallback(async () => {
    const { status, failReason } = await request(
      "patch",
      "/studygroup/recruit",
      {
        data: { isRecruiting, groupId: _id }
      }
    );

    if (status === 400) return alert(failReason);

    onToggleReservation(isRecruiting);
    isSatisfyPersonnelAtReservation && setIsCanReserve(true);
  }, [isRecruiting, isSatisfyPersonnelAtReservation]);

  useEffect(() => {
    if (!userId) return;
    const isJoiner = members.map(m => m.id).some(id => id === userId);
    let type;

    if (isJoiner) type = "joiner";
    if (!isJoiner) type = "searcher";
    if (userId === leader) {
      type = "leader";
      isSatisfyPersonnelAtReservation && setIsCanReserve(true);
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
                  <Link to={`/reservation/${_id}`}>
                    <button className="button"> 예약하기 </button>
                  </Link>
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
