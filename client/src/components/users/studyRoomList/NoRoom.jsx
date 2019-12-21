import React, { useCallback, Fragment } from "react";
import styled from "styled-components";
import { Card } from "./ListCard";

const Error = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  .error-title {
    font-size: 1.3em;
    padding: 0 0 1em 0;
    .highlight {
      background-color: #ff3860;
      font-weight: bold;
      color: white;
    }
  }
  .error-msg {
    font-size: 1.2em;
  }
`;

const ListCard = () => {
  return (
    <Card>
      <Error>
        <div className="error-title">
          😥<span className="highlight"> SORRY </span>😢
        </div>
        <div className="error-msg">
          {" "}
          죄송합니다. 현재 예약 가능한 스터디룸이 없습니다.🙏{" "}
        </div>
      </Error>
    </Card>
  );
};
export default ListCard;
