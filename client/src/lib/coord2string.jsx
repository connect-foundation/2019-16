import { useState, useLayoutEffect, useEffect } from "react";

function useCoord2String(kakao, lat, lon) {
  const geocoder = new kakao.maps.services.Geocoder();
  const [locationString, setString] = useState("");

  useEffect(() => {
    const coords = new kakao.maps.LatLng(lat, lon);
    geocoder.coord2RegionCode(
      coords.getLng(),
      coords.getLat(),
      displayCenterInfo
    );
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            setString(result[i].address_name);
            break;
          }
        }
      }
    }
  }, [lat, lon]);

  return [locationString];
}

export default useCoord2String;
