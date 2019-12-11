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
  let studyRoomMap;
  let selectedMarker = null;
  let currentOverlay = null;

  const addMarkerEvent = marker => {
    kakao.maps.event.addListener(marker, "click", function() {
      marker.setImage(hoverImage);

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
      }
      selectedMarker = marker;
      studyRoomMap.panTo(marker.getPosition());
    });

    kakao.maps.event.addListener(marker, "mouseout", function() {
      if (!selectedMarker || selectedMarker !== marker)
        marker.setImage(markerImage);
    });

    kakao.maps.event.addListener(marker, "mouseover", function() {
      marker.setImage(hoverImage);
    });
  };

  const [width, height] = useWindowSize();
  const [studyRooms, setStudyRooms] = useState([
    {
      partner_id: "5de7b74cc39a82426cdba281",
      cafe_name: "비포럼",
      name: "으쌰",
      location: {
        type: "Point",
        coordinates: [127.031994679386, 37.498509696507035]
      },
      images: [
        "http://m.bee-forum.co.kr/images/main/img_195_1.png",
        "http://blog.vq42.com/wp-content/uploads/2017/01/20170112_191551.jpg",
        "http://m.bee-forum.co.kr/images/inc/favicon.png"
      ],
      price: 3000,
      min_personnel: 1,
      max_personnel: 4,
      description: "서울 강남구 테헤란로10길 6 녹명빌딩 7층",
      open_time: 11,
      close_time: 20,
      latlng: new kakao.maps.LatLng(37.498509696507035, 127.031994679386)
    },
    {
      partner_id: "5de7b74cc39a82426cdba280",
      cafe_name: "강남역 스터디룸",
      name: "1호",
      location: {
        type: "Point",
        coordinates: [127.02510622872565, 37.500994534216495]
      },
      images: [
        "http://mblogthumb3.phinf.naver.net/MjAxNzAyMDlfMjY4/MDAxNDg2NTgwODI1MDIy.DChd558JLJd_LYPN6NUfxijEoI3LzAIAzhvuTGMvTh4g.3DRNaR_BgpxK7JRKsmUi6qugJWw9Ht9cEkJ5UhD86H8g.JPEG.moonbooks/tbvjtmxkxm.jpg?type=w2",
        "http://www.cozymoim.com/uploads/sw1611003/201805/e493666ed1975a18210f4c381c6d275c_crop.jpg?t=163726ef755"
      ],
      price: 1500,
      min_personnel: 2,
      max_personnel: 4,
      description:
        "주소: 서울 서초구 서초대로77길 37\n편의시설: 빔프로젝트, 스피커",
      open_time: 11,
      close_time: 23,
      latlng: new kakao.maps.LatLng(37.500994534216495, 127.02510622872565)
    },
    {
      partner_id: "5de7b74cc39a82426cdba288",
      cafe_name: "이지스터디 강남점",
      name: "1호실",
      location: {
        type: "Point",
        coordinates: [127.02883760326216, 37.49935024719527]
      },
      images: [
        "http://mblogthumb2.phinf.naver.net/20160311_137/bin03160_1457707519895yq9gU_JPEG/20160311_211024.jpg?type=w800",
        "https://moplqfgeemqv2103108.cdn.ntruss.com/pstatic-scloud/20170124_127/14852573966562wet8_JPEG/%2525C0%2525CC%2525C1%2525F6%2525B4%2525EB%2525C7%2525A5.jpg?type=m&w=600&h=600&autorotate=true&quality=70"
      ],
      price: 1500,
      min_personnel: 2,
      max_personnel: 4,
      description: "이지스터디 강남점입니다. ",
      open_time: 10,
      close_time: 23,
      latlng: new kakao.maps.LatLng(37.49935024719527, 127.02883760326216)
    }
  ]);

  useEffect(() => {
    let el = document.querySelector("#map");
    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
    let map = new kakao.maps.Map(el, options);
  }, []);

  useEffect(() => {
    bounds = new kakao.maps.LatLngBounds();
    let lat = 0;
    let lon = 0;

    studyRooms.forEach(studyRoom => {
      // bounds.extend(position.latlng);
      const location = studyRoom.location.coordinates;
      const studyRoomlat = location[1];
      const studyRoomlng = location[0];
      const kakaoPosition = new kakao.maps.LatLng(studyRoomlat, studyRoomlng);

      lat += kakaoPosition.getLat();
      lon += kakaoPosition.getLng();
      const marker = new kakao.maps.Marker({
        map: studyRoomMap,
        position: kakaoPosition,
        title: studyRoom.title,
        image: markerImage
      });

      marker.data = studyRoom;

      addMarkerEvent(marker);
    });

    lat /= studyRooms.length;
    lon /= studyRooms.length;
    // studyRoomMap.setBounds(bounds);
    studyRoomMap.setCenter(new kakao.maps.LatLng(lat, lon));
  }, [studyRooms]);

  return (
    <Fragment>
      <MapSidebar style={{ height }}></MapSidebar>
      <MapView id="map" style={{ width, height }}></MapView>
    </Fragment>
  );
};
export default Reservation;
