import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "../../../pages/users";

const StyledCard = styled.div`
  width: 16rem;
  margin: 1rem 0;
  height: 20.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding-bottom: 0.5rem;

  .imgbox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 272px;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
    }
  }
  .title-small {
    font-weight: bold;
    font-size: 1.1em;
    text-align: center;
    max-height: 7rem;
    color: #1d6de4;
  }
  .info-block {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .personnel {
      font-size: 0.85em;
      text-align: center;

      .now-personnel {
        color: #00d1b2;
        font-weight: bold;
      }
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
      <StyledCard className="card study-mini-card">
        <div
          className="group-leader-bedge"
          style={{ display: leader === userId ? "block" : "none" }}
        >
          그룹장
        </div>
        <div className="imgbox">
          <img src={thumbnail}></img>
        </div>
        <div className="info-block">
          <div className="title-small">{title}</div>
          <div className="personnel">
            <span className="now-personnel">{now_personnel}</span>명과
            함께하는중
          </div>
        </div>
      </StyledCard>
    </Link>
  );
};

export default StudyGroupCardMini;
