import React from "react";
import CustomOverlay from "../components/users/customOverlay/";
import { renderToString } from "react-dom/server";
const { kakao } = window;

const makeOverlay = marker => {
  const content = renderToString(
    <CustomOverlay data={marker.data}></CustomOverlay>
  );

  const overlay = new kakao.maps.CustomOverlay({
    position: marker.getPosition(),
    content,
    yAnchor: 1
  });
  return overlay;
};

const markerImageSrc =
  "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
const markerImageSize = new kakao.maps.Size(24, 35);
const markerImage = new kakao.maps.MarkerImage(markerImageSrc, markerImageSize);
const hoverImage = new kakao.maps.MarkerImage(
  markerImageSrc,
  new kakao.maps.Size(34, 45)
);

export { makeOverlay, markerImage, hoverImage };
