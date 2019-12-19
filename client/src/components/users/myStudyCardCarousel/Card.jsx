import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "../../../pages/users";

const StyledCard = styled.div`
  width: 16rem;
  margin: 1rem 0;
  margin-left: 1rem;
  height: 14em;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding-bottom: 0.5rem;

  .imgbox {
    max-height: 12rem;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .title-small {
    font-weight: bold;
    font-size: 1.1em;
    text-align: center;
    margin: auto 0.7em;
    max-height: 7rem;
    color: #1d6de4;
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

const StudyGroupCardMini = ({ groupData }) => {
  const { userInfo } = useContext(UserContext);
  const { userId } = userInfo;
  const {
    leader,
    title,
    thumbnail,
    group_id,
    location,
    now_personnel
  } = groupData;

  return (
    <Link to={`/group/detail/${group_id}`}>
      <StyledCard className={`card study-mini-card`}>
        <div
          className="group-leader-bedge"
          style={{ display: leader === userId ? "block" : "none" }}
        >
          그룹장
        </div>
        <div className={`imgbox`}>
          <img src={thumbnail}></img>
        </div>
        <div className={`title-small`}>{title}</div>
      </StyledCard>
    </Link>
  );
};

export default StudyGroupCardMini;
