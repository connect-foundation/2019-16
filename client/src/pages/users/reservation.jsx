import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { makeOverlay, markerImage, hoverImage } from "../../lib/kakaoMapUtils";
import useWindowSize from "../../lib/useWindowSize";

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
  let studyRoomMap;
  let selectedMarker = null;
  let currentOverlay = null;

  const addMarkerEvent = marker => {
    kakao.maps.event.addListener(marker, "click", function() {
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

        const overlay = makeOverlay(marker);
        overlay.setMap(studyRoomMap);
        currentOverlay = overlay;
        selectedMarker = marker;
        studyRoomMap.panTo(marker.getPosition());
        return;
      }
    });

    kakao.maps.event.addListener(marker, "mouseout", function() {
      if (!selectedMarker || selectedMarker !== marker)
        marker.setImage(markerImage);
    });

    kakao.maps.event.addListener(marker, "mouseover", function() {
      marker.setImage(hoverImage);
    });
  };

  const drawMarker = (studyRoomData, map) => {
    const bounds = new kakao.maps.LatLngBounds();
    
    studyRoomData.forEach(studyRoom => {
      const location = studyRoom.location.coordinates;
      const studyRoomlat = location[1];
      const studyRoomlng = location[0];
      const kakaoPosition = new kakao.maps.LatLng(studyRoomlat, studyRoomlng);

      bounds.extend(kakaoPosition);
      const marker = new kakao.maps.Marker({
        map,
        position: kakaoPosition,
        title: studyRoom.title,
        image: markerImage
      });

      marker.data = studyRoom;

      addMarkerEvent(marker);
    });

    map.setBounds(bounds);
  };

  const [width, height] = useWindowSize();
  // const [studyRooms, setStudyRooms] = useState([]);

  useEffect(() => {
    let el = document.querySelector("#map");
    var options = {
      center: new kakao.maps.LatLng(37.503077, 127.021947),
      level: 3
    };
    studyRoomMap = new kakao.maps.Map(el, options);
    kakao.maps.event.addListener(studyRoomMap, "click", function() {
      console.log(`map click`);
      if (currentOverlay && selectedMarker) {
        currentOverlay.setMap(null);
        selectedMarker.setImage(markerImage);
        currentOverlay = null;
        selectedMarker = null;
      }
    });
    // axios로 스터디룸 데이터 요청
    axios
      .post("http://106.10.41.25:8000/api/studyroom/availableRooms", {
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
        const studyRooms = res.data;
        drawMarker(studyRooms, studyRoomMap);
      })
      .catch(err => {
        console.log("axios err", err);
      });
  }, []);

  return (
    <Fragment>
      <MapSidebar style={{ height: height - 146 }}></MapSidebar>
      <MapView
        id="map"
        style={{ width: width - 408, height: height - 146 }}
      ></MapView>
    </Fragment>
  );
};
export default Reservation;
