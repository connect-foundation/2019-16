import React, { useCallback } from "react";
import styled from "styled-components";
import classnames from "classnames";
import Location from "../common/Location";
import Time from "../groupCard/Time";
import TagButtons from "../common/TagButtons";
import { REGISTER } from "../../reducer/users/groupDetail";

const StyledMain = styled.div`
  width: 100%;
  height: 23rem;
  background-color: whitesmoke;
  font-family: "Nanum Gothic", sans-serif;

  .imageDiv {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    img {
      width: 19rem;
      height: 14rem;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    font-weight: bold;

    button {
      font-weight: bold;

      &.disable {
        cursor: default;
        opacity: 0.3;
      }
    }

    p {
      margin: 0;
    }
  }

  margin: 0;
  padding: 1.2rem;
`;

const Main = ({ state, dispatch }) => {
  const { groupInfo } = state;
  const {
    studyThumbnail,
    location,
    time,
    tags,
    minCnt,
    nowCnt,
    maxCnt,
    isMember,
    isMaster,
    isRecruiting
  } = groupInfo;

  const isMemberClass = classnames("button", {
    "is-primary": !isMember,
    "is-success": isMember
  });
  const isMemberText = isMember ? "취소하기" : "신청하기";

  const isRecruitingClass = classnames({
    disable: isRecruiting || nowCnt > maxCnt || nowCnt < minCnt
  });
  const isRecruitingText = isRecruiting ? "마감하기" : "모집 재개";

  const registerEvent = useCallback(() => {
    dispatch({ type: REGISTER });
  }, [dispatch]);

  return (
    <StyledMain className="columns">
      <div className="column imageDiv is-half">
        <img src={studyThumbnail} alt="img" />
      </div>

      <div className="column content">
        <Location location={location} />

        <h4>
          <Time time={time} />
        </h4>

        <p> 최소 인원: {minCnt} </p>
        <p> 현재 인원: {nowCnt} </p>
        <p> 최대 인원: {maxCnt} </p>

        <TagButtons tags={tags} />

        <div className="buttons">
          {isMaster || (
            <button className={isMemberClass} onClick={registerEvent}>
              {" "}
              {isMemberText}{" "}
            </button>
          )}

          {isMaster && isMember && (
            <>
              <button className={`button is-danger ${!isRecruitingClass}`}>
                {isRecruitingText}
              </button>

              <button className={`button is-warning ${isRecruitingClass}`}>
                {" "}
                예약하기{" "}
              </button>
            </>
          )}
        </div>
      </div>
    </StyledMain>
  );
};

export default Main;
