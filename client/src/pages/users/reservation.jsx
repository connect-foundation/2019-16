import React, { useEffect } from "react";
import styled from "styled-components";

const StyledGroupCreate = styled.div``;

const Reservation = () => {
  const { kakao } = window;
  useEffect(() => {
    let el = document.querySelector("#map");
    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
    let map = new kakao.maps.Map(el, options);
  }, []);

  return (
    <div
      id="map"
      className="map"
      style={{ width: "75%", height: "40em" }}
    ></div>
  );
};
export default Reservation;
