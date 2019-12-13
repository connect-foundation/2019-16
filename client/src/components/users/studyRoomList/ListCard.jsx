import React from "react";
import styled from "styled-components";
import TextInfo from "./TextInfo";

const Card = styled.div`
  width: 373px;
  height: 165px;
  padding: 18px 20px 20px;
  border-top: 1px solid #dfdfdf;

  .item-index {
    color: #00d1b2;
    font-weight: bold;
    display: inline-block;
    padding: 0 10px 0 0;
  }
  .studycafe-title {
    font-weight: bold;
  }
  .text-info-wrapper {
    .room-name {
    }
    .room-info,
    .cafe-info {
      font-size: 12px;
    }
  }
  .bold {
    font-weight: bold;
  }
  .img-wrapper {
    width: 86px;
    height: 86px;
    overflow: hidden;
    img {
    }
  }
`;

const ListCard = ({ data, index }) => {
  const {
    cafe_name,
    name,
    price,
    min_personnel,
    max_personnel,
    description,
    open_time,
    close_time,
    images
  } = data;

  return (
    <Card>
      <div>
        <span className="item-index ">{String.fromCharCode(index)}</span>
        <span
          className="studycafe-title"
          dangerouslySetInnerHTML={{ __html: cafe_name }}
        ></span>
      </div>
      <div className="text-info-wrapper">
        <div className="room-name">{name}</div>
        <div className="room-info">
          <ul>
            <li>
              <span className="bold">{"가격 "}</span>
              {`${price}/1인`}
            </li>
            <li>
              <span className="bold">{"인원 "}</span>
              {`${min_personnel} ~ ${max_personnel} 명`}
            </li>
          </ul>
          {/* <span>{`가격 ${price}/1인`}</span>
        <span>{`인원 ${min_personnel} ~ ${max_personnel} 명`}</span> */}
        </div>
        <div className="cafe-info">
          <ul>
            <li>{`매일 ${open_time}:00 ~ ${close_time}:00`}</li>
            <li></li>
          </ul>
        </div>
      </div>

      <div className="img-wrapper">
        <img src={images.length > 0 ? images[0] : ""}></img>
      </div>
    </Card>
  );
};
export default ListCard;
