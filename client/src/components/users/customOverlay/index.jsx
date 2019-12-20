import React from "react";
import "./overlay.scss";

const CustomOverlay = ({ data }) => {
  const { cafe_name, name, images, price, min_personnel, max_personnel } = data;
  return (
    <div className="overlay">
      <div className="body">
        <div
          className="is-size-5 has-text-weight-bold cafe-name"
          dangerouslySetInnerHTML={{ __html: `${cafe_name}` }}
        ></div>
        <div>
          <span className="has-text-info has-text-weight-bold">Room </span>
          {name}
        </div>
        <div className="info-and-btn-wrapper">
          <div className="is-size-7">
            <ul>
              <li>{`인원 ${min_personnel} ~ ${max_personnel}명`}</li>
              <li>{`요금 ${price}/1인`}</li>
            </ul>
          </div>
          <button className="reservation-btn button is-primary is-rounded is-focused">
            예약하기
          </button>
        </div>
      </div>
      <div className="bottom"></div>
    </div>
  );
};
export default CustomOverlay;
