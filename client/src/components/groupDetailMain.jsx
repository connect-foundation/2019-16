import React from "react";
import styled from "styled-components";
import Location from "./StudyLocation";
import Time from "./StudyTime";

const StyledGroupDetailMain = styled.div`
  width: 100%;
  height: 23rem;
  background-color: whitesmoke;

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

const groupDetailMain = ({ data }) => {
  const {
    studyThumbnail,
    location,
    time,
    tags,
    minCnt,
    nowCnt,
    maxCnt,
    isMember,
    isMaster
  } = data;

  return (
    <StyledGroupDetailMain className="columns">
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
        <div className="buttons">
          {tags.map(tag => (
            <button className="button is-info is-small"> # {tag} </button>
          ))}
        </div>
        <div className="buttons">
          {isMaster ||
            (!isMember && (
              <butto className="button is-primary"> 신청하기 </butto>
            )) || <butto className="button is-success"> 취소하기 </butto>}

          {isMaster && (
            <>
              <button className="button is-danger"> 마감하기 </button>
              <button className="button is-warning disable"> 예약하기 </button>
            </>
          )}
        </div>
      </div>
    </StyledGroupDetailMain>
  );
};

export default groupDetailMain;
