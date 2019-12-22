const StudyRooms = require("./models/studyrooms");

const convertKntoMile = km => {
  return km / 6378.1;
};

async function searchNearbyRooms(params) {
  const { geopoint, personnel, startTime, endTime } = params;
  const res = await StudyRooms.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [geopoint.longitude, geopoint.latitude]
        },
        $maxDistance: 20000
      }
    },
    max_personnel: { $gte: personnel },
    min_personnel: { $lte: personnel },
    open_time: { $lte: startTime },
    close_time: { $gte: endTime }
  });

  return res;
}

async function getRoomById(id) {
  try {
    const studyRoom = await StudyRooms.findById(id);

    return studyRoom;
  } catch {
    return "";
  }
}

async function queryResolver(query, params) {
  if (query === "availableRooms") {
    const studyRooms = await searchNearbyRooms(params);

    return {
      method: "GET",
      curQuery: query,
      nextQuery: "filterStudyGroup",
      params: { studyRooms, studyGroup: { ...params } },
      body: {}
    };
  }

  if (query === "getRoomById") {
    const studyRoom = await getRoomById(params.studyRoomId);

    if (studyRoom === "") {
      return {
        method: "ERROR",
        curQuery: query,
        nextQuery: "apigateway",
        params: {},
        body: {}
      };
    }

    return {
      method: "REPLY",
      curQuery: query,
      nextQuery: "apigateway",
      params: {},
      body: { studyRoomInfo: studyRoom }
    };
  }
  throw Error(
    `Query is not matched with studyRoom query resolver. Your query is ${query}`
  );
}

module.exports = { searchNearbyRooms, queryResolver };
