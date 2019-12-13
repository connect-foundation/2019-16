import React, { Fragment } from "react";
import styled from "styled-components";

const StyledInfoDiv = styled.div`
  .bold {
    font-weight: bold;
    color: black;
  }
  .room-name {
    padding: 0 0 7px 0;
  }
  .room-info,
  .cafe-info {
    font-size: 12px;
    color: #8f8e8e;
    .price {
      color: #ff3860;
    }
  }
`;

const TextInfo = ({ data, index }) => {
  const {
    name,
    price,
    min_personnel,
    max_personnel,
    description,
    open_time,
    close_time
  } = data;

  return (
    <StyledInfoDiv className="text-info-wrapper">
      <div className="room-name">{name}</div>
      <div className="room-info">
        <ul>
          <li>
            <span className="bold">{"가격 "}</span>
            <span className="price bold">{price}</span>
            {`원/1인`}
          </li>
          <li>
            <span className="bold">{"인원 "}</span>
            {`${min_personnel} ~ ${max_personnel} 명`}
          </li>
        </ul>
        <div className="cafe-info">
          <ul>
            <li>{`매일 ${open_time}:00 ~ ${close_time}:00`}</li>
            <li></li>
          </ul>
        </div>
      </div>
    </StyledInfoDiv>
  );
};
export default TextInfo;
