import React, { useRef, useCallback } from "react";
import styled from "styled-components";
import { click_day, change_hour } from "../../../reducer/users/groupCreate";

const StyledScheduleInput = styled.div`
  display: flex;
  flex-direction: row;

  .day-buttons {
    margin-right: 1.5rem;
  }

  .time-select > * {
    height: 2.4rem;
    margin: 0 1rem;
    width: 5rem;
    border-radius: 0.3rem;
  }
`;

const ScheduleInput = props => {
  const { daysInfo, dispatch } = props;
  const TimeSlot = useRef();

  const onClickDay = i => {
    return e => {
      e.target.blur();
      dispatch(click_day(i));
    };
  };

  const onTimeChange = useCallback(e => {
    let time = Number.parseInt(e.target.value, 10);
    const timeType = e.target.name;

    if (timeType === "startTime") {
      const timeSlot = TimeSlot.current.value;
      if (timeSlot === "pm") time += 12;
    }

    dispatch(change_hour(timeType, time));
  }, []);

  return (
    <StyledScheduleInput>
      <div className="field has-addons day-buttons">
        {daysInfo.map((day, idx) => {
          return (
            <p className="control" key={idx}>
              <button
                className={`button is-info is-outlined ${day && day.class}`}
                onClick={onClickDay(idx)}
              >
                {day.str}
              </button>
            </p>
          );
        })}
      </div>

      <div className="time-select">
        <select className="select" ref={TimeSlot}>
          <option value="am">오전</option>
          <option value="pm">오후</option>
        </select>

        <select className="select" name="startTime" onChange={onTimeChange}>
          <option value="1">1시</option>
          <option value="2">2시</option>
          <option value="3">3시</option>
          <option value="4">4시</option>
          <option value="5">5시</option>
          <option value="6">6시</option>
          <option value="7">7시</option>
          <option value="8">8시</option>
          <option value="9">9시</option>
          <option value="10">10시</option>
          <option value="11">11시</option>
          <option value="12">12시</option>
        </select>

        <select className="select" name="during" onChange={onTimeChange}>
          <option value="1"> 1시간 </option>
          <option value="2"> 2시간 </option>
          <option value="3"> 3시간 </option>
        </select>
      </div>
    </StyledScheduleInput>
  );
};

export default ScheduleInput;
