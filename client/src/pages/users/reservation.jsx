import React, { useEffect } from "react";
import styled from "styled-components";

const { kakao } = window;
var bounds = new kakao.maps.LatLngBounds();

const MapView = styled.div`
  position: absolute;
  left: 408px;
`;

const MapSidebar = styled.div`
  width: 408px;
  position: absolute;
  background-color: black;
`;

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
    <Fragment>
      <MapSidebar style={{ height }}></MapSidebar>
      <MapView id="map" style={{ width, height }}></MapView>
    </Fragment>
  );
};
export default Reservation;
