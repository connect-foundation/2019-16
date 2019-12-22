import React, { useCallback, Fragment } from "react";
import styled from "styled-components";
import TextInfo from "./TextInfo";
import { UserContext } from "../../../pages/users/index";
import { useContext } from "react";
import { hoverImage } from "../../../lib/kakaoMapUtils";
const { kakao } = window;

const CardBackground = styled.div`
  :hover {
    background-color: #f5f5f5;
  }
  padding: 0 20px;
`;
const Card = styled.div`
  
  height: 165px;
  padding: 18px 0 20px;
  border-top: 1px solid #dfdfdf;
  justify-content: space-between;
  $box-radius:: 0px;
  
  .card-head {
    .item-index {
      color: #00d1b2;
      font-weight: bold;
      display: inline-block;
      padding: 0 5px 0 0;
    }
    .studycafe-title {
      font-weight: bold;
    }
  }
  .card-body {
    display: flex;
    justify-content: space-between;

    .img-wrapper {
      width: 110px;
      height: 86px;
      overflow: hidden;
      display: flex;
      .img {
        max-height: 100%;
      }
    }
  }
`;

const ListCard = ({ data, index, error }) => {
  const { map } = useContext(UserContext);
  const { images, cafe_name, marker } = data;
  const openInfowindow = useCallback(() => {
    data.marker.infowindow_over.call();
  }, [marker, data]);
  const closeInfowindow = useCallback(() => {
    data.marker.infowindow_out.call();
  }, [marker, data]);

  const clickMarker = useCallback(() => {
    map.current.setLevel(3);
    map.current.panTo(data.marker.getPosition());
  }, [map]);

  return (
    <CardBackground className="card-background">
      <Card
        className="card-item"
        onMouseOver={openInfowindow}
        onMouseOut={closeInfowindow}
        onClick={clickMarker}
      >
        <div className="card-head">
          <span className="item-index ">{String.fromCharCode(index)}</span>
          <span
            className="studycafe-title"
            dangerouslySetInnerHTML={{ __html: cafe_name }}
          ></span>
        </div>
        <div className="card-body">
          <TextInfo data={data} index={index}></TextInfo>
          <div className="img-wrapper">
            <img src={images.length > 0 ? images[0] : ""}></img>
          </div>
        </div>
      </Card>
    </CardBackground>
  );
};
export { ListCard, Card };
