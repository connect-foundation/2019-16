import React from "react";
import "./overlay.scss";

const CustomOverlay = ({ data }) => {
  const { cafe_name, name, images, price, min_personnel, max_personnel } = data;
  return (
    <div className="overlay">
      <div className="body">
        <div className="is-size-5 has-text-weight-bold cafe-name">
          {cafe_name}
        </div>
        <div>
          <span className="has-text-info has-text-weight-bold">Room </span>
          {name}
        </div>
        <div className="is-size-7">
          <ul>
            <li>{`인원 ${min_personnel} ~ ${max_personnel}명`}</li>
            <li>{`요금 ${price}/1인`}</li>
          </ul>
        </div>
      </div>
      <div className="bottom"></div>
    </div>
  );
};
export default CustomOverlay;
