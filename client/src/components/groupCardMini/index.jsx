import React from "react";
import styled from "styled-components";
import Title from "../groupCard/Title";
const StyledCard = styled.div`
  width: 15em;
  height: 15em;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  .imgbox {
    height: 45%;
    overflow: hidden;
  }
  .title-small {
    font-weight: bold;
    font-size: 1.1em;
    text-align: center;
    margin: 1.3rem 1em;
    color: #1d6de4;
  }
  .progress-box {
    font-weight: bold;
    font-size: 0.8em;
    .highlight {
      color: #e41d60;
      font-weight: bold;
    }
  }
  .group-leader-bedge {
    background-color: #e41d60;
    width: 5em;
    height: 1.5em;
    position: absolute;
    align-self: start;
    text-align: center;
    color: white;
    font-weight: bold;
  }
`;

const StudyGroupCardMini = ({
  cardData: { isLeader, img, title, currentStudyCount, totalStudyCount }
}) => {
  return (
    <StyledCard className={`card study-mini-card`}>
      <div
        className="group-leader-bedge"
        style={{ display: isLeader ? "block" : "none" }}
      >
        그룹장
      </div>
      <div className={`imgbox`}>
        <img src={img}></img>
      </div>
      <div className={`title-small`}>{title}</div>
      <div className={`progress-box`}>
        <span className={`highlight`}>{currentStudyCount}</span>/
        {totalStudyCount}회 진행중
      </div>
    </StyledCard>
  );
};

export default StudyGroupCardMini;
