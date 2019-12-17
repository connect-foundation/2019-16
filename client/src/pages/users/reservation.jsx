import React, { useEffect, useState, Fragment, useRef, useMemo } from "react";
import styled from "styled-components";
import axios from "axios";
import useWindowSize from "../../lib/useWindowSize";
import {
  markerImage,
  hoverImage,
  mapOptions,
  setHoverImage,
  makeOverlay
} from "../../lib/kakaoMapUtils";
import StudyRoomList from "../../components/users/studyRoomList";
import { REQUEST_URL } from "../../config.json";

const { kakao } = window;
let studyRoomMap;

const MapView = styled.div`
  position: absolute;
  left: 408px;
`;

const MapSidebar = styled.div`
  width: 408px;
  position: absolute;
  overflow-y: scroll;
`;

function makeOverListener(map, marker, infowindow) {
  return function() {
    infowindow.open(map, marker);
  };
}
function makeOutListener(infowindow) {
  return function() {
    infowindow.close();
  };
}

const Reservation = () => {
  const mapElement = useRef();
  let selectedMarker = null;
  let currentOverlay = null;

  const [width, height] = useWindowSize();
  const [studyRooms, setStudyRooms] = useState([]);

  const addMarkerEvent = (marker, data) => {
    const infowindow = new kakao.maps.InfoWindow({
      content: data["cafe_name"]
    });

    marker.infowindow_over = makeOverListener(studyRoomMap, marker, infowindow);
    marker.infowindow_out = makeOutListener(infowindow);
    kakao.maps.event.addListener(marker, "click", function() {
      // setHoverImage(marker, data, selectedMarker, currentOverlay, studyRoomMap);

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
        overlay.setMap(studyRoomMap);
        currentOverlay = overlay;
        selectedMarker = marker;
        studyRoomMap.panTo(marker.getPosition());
        return;
      }
    });

    kakao.maps.event.addListener(marker, "mouseout", function() {
      if (!selectedMarker || selectedMarker !== marker) {
        marker.setImage(markerImage);
      }
      infowindow.close();
    });

    kakao.maps.event.addListener(marker, "mouseover", function() {
      infowindow.open(studyRoomMap, marker);
      marker.setImage(hoverImage);
    });
  };

  const drawMarker = (studyRoomData, map) => {
    const bounds = new kakao.maps.LatLngBounds();

    studyRoomData.forEach(room => {
      const location = room.location.coordinates;
      const studyRoomlat = location[1];
      const studyRoomlng = location[0];
      const kakaoPosition = new kakao.maps.LatLng(studyRoomlat, studyRoomlng);

      bounds.extend(kakaoPosition);
      const marker = new kakao.maps.Marker({
        map,
        position: kakaoPosition,
        title: room.title,
        image: markerImage
      });

      room.marker = marker;
      addMarkerEvent(marker, room);
    });

    map.setBounds(bounds);
  };

  useEffect(() => {
    studyRoomMap = new kakao.maps.Map(mapElement.current, mapOptions);
    kakao.maps.event.addListener(studyRoomMap, "click", function() {
      if (currentOverlay && selectedMarker) {
        currentOverlay.setMap(null);
        selectedMarker.setImage(markerImage);
        currentOverlay = null;
        selectedMarker = null;
      }
    });

    axios
      .post(`${REQUEST_URL}/api/studyroom/availableRooms`, {
        geopoint: { longitude: 127.021947, latitude: 37.503077 },
        personnel: 5,
        startTime: 20,
        endTime: 23,
        dates: [
          {
            date: "2019-12-17T00:00:00.000Z",
            start: 15,
            end: 16
          }
        ]
      })
      .then(res => {
        setStudyRooms(res.data);
      })
      .catch(err => {
        console.log("axios err", err);
      });
  }, []);

  useEffect(() => {
    if (!studyRoomMap) return;

    drawMarker(studyRooms, studyRoomMap);
  }, [studyRooms]);

  return (
    <Fragment>
      <MapSidebar style={{ height: height - 146 }}>
        <StudyRoomList data={studyRooms}></StudyRoomList>
      </MapSidebar>
      <MapView
        id="map"
        ref={mapElement}
        style={{ width: width - 408, height: height - 146 }}
      ></MapView>
    </Fragment>
  );
};
export default Reservation;
