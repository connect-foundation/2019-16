import moment, { Moment as MomentTypes } from "moment";

export function reservationDays(info) {
  const { startTime, endTime, days } = info;

  return days.reduce((dates, day) => {
    const suffix = "T00:00:00.000Z";
    const dateFormat = {
      start: startTime,
      end: endTime
    };
    const week1 =
      moment()
        .add(1, "weeks")
        .startOf("isoWeek")
        .add(day - 1, "days")
        .format("YYYY-MM-DD") + suffix;
    const week2 =
      moment()
        .add(1, "weeks")
        .startOf("isoWeek")
        .add(day - 1, "days")
        .format("YYYY-MM-DD") + suffix;

    return dates.concat([
      { ...dateFormat, date: week1 },
      { ...dateFormat, date: week2 }
    ]);
  }, []);
}
