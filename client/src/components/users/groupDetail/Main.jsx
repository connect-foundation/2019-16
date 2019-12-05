import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import classnames from "classnames";
import Location from "../common/Location";
import Time from "../groupCard/Time";
import TagButtons from "../common/TagButtons";
import {} from "../../../reducer/users/groupDetail";
import { UserContext } from "../../../pages/users/index";

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

const Main = ({ groupData, dispatch }) => {
  const { userInfo } = useContext(UserContext);
  const { userEmail } = userInfo;
  const {
    thumbnail,
    location,
    startTime,
    days,
    during,
    tags,
    min_personnel,
    now_personnel,
    max_personnel,
    leader,
    isRecruiting,
    members
  } = groupData;

  const isMember = members.some(memberId => memberId === userEmail);
  const isLeader = leader === userEmail;

  const isMemberClass = classnames("button", {
    "is-primary": !isMember,
    "is-success": isMember
  });
  const isMemberText = isMember ? "취소하기" : "신청하기";

  const isRecruitingClass = classnames({
    disable:
      isRecruiting ||
      now_personnel > max_personnel ||
      now_personnel < min_personnel
  });
  const isRecruitingText = isRecruiting ? "마감하기" : "모집 재개";

  const registerEvent = useCallback(() => {}, [dispatch]);

  return (
    <StyledMain className="columns">
      <div className="column imageDiv is-half">
        <img src={thumbnail} alt="img" />
      </div>

      <div className="column content">
        <Location location={location} />

        <h4>
          <Time startTime={startTime} during={during} days={days} />
        </h4>

        <p> 최소 인원: {min_personnel} </p>
        <p> 현재 인원: {now_personnel} </p>
        <p> 최대 인원: {max_personnel} </p>

        <TagButtons tags={tags} />

        <div className="buttons">
          {userEmail &&
            (isLeader || (
              <button className={isMemberClass} onClick={registerEvent}>
                {" "}
                {isMemberText}{" "}
              </button>
            ))}

          {isLeader && isMember && (
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
