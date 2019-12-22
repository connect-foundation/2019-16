import React from "react";
import CustomOverlay from "../components/users/customOverlay/";
import { renderToString } from "react-dom/server";
const { kakao } = window;

const mapOptions = {
  center: new kakao.maps.LatLng(37.503077, 127.021947),
  level: 3
};

const makeOverlay = (marker, data) => {
  let content = renderToString(<CustomOverlay marker={marker} data={data} />);
  content = content.replace("data-info", `onclick="paymentReady()" data-info`);

  const overlay = new kakao.maps.CustomOverlay({
    clickable: true,
    position: marker.getPosition(),
    content,
    yAnchor: 1
  });
  marker.overlay = overlay;
  return overlay;
};

const markerImageSrc =
  "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
const markerImageSize = new kakao.maps.Size(24, 35);
const markerImage = new kakao.maps.MarkerImage(markerImageSrc, markerImageSize);
const hoverImage = new kakao.maps.MarkerImage(
  markerImageSrc,
  new kakao.maps.Size(34, 45)
);

function setHoverImage(marker, data, selectedMarker, currentOverlay, map) {
  marker.setImage(hoverImage);
  if (selectedMarker === marker) {
    marker.setImage(markerImage);
    currentOverlay.setMap(null);
    currentOverlay = null;
    selectedMarker = null;
    return;
  }
  if (selectedMarker !== marker) {
    // selectedMarker가 null이 아닌 경우
    if (!!selectedMarker) {
      selectedMarker.setImage(markerImage);
      !!currentOverlay && currentOverlay.setMap(null);
    }
    marker.setImage(hoverImage);
    const overlay = makeOverlay(marker, data);
    overlay.setMap(map);
    currentOverlay = overlay;
    selectedMarker = marker;
    map.panTo(marker.getPosition());
    return;
  }
}

export { makeOverlay, markerImage, hoverImage, mapOptions, setHoverImage };
