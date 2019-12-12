const StudyRooms = require("./models/studyrooms");

const convertKntoMile = km => {
  return km / 6378.1;
};

async function searchNearbyRooms(params) {
  const { geopoint, personnel, startTime, endTime } = params;

  const res = await StudyRooms.find({
    max_personnel: {
      $gte: personnel
    },
    min_personnel: {
      $lte: personnel
    },
    location: {
      $geoWithin: {
        $centerSphere: [
          [geopoint.longitude, geopoint.latitude],
          convertKntoMile(1)
        ]
      }
    },
    open_time: {
      $lte: startTime
    },
    close_time: {
      $gte: endTime
    }
  });

  return res;
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

  throw Error(
    `Query is not matched with studyRoom query resolver. Your query is ${query}`
  );
}

module.exports = { searchNearbyRooms, queryResolver };
