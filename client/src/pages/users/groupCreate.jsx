import React, { useCallback, useState, useReducer, useRef } from "react";
import styled from "styled-components";
import classnames from "classnames";
import Category from "../../components/groupCreate/Category";
import ImageUploader from "../../components/groupCreate/ImageUploader";
import TagInput from "../../components/groupCreate/TagInput";
import { groupCreateReducer, initialState } from "../../reducer/groupCreate";

const StyledGroupCreate = styled.div`
  width: 60%;
  margin: 2rem auto;

  .categories {
    height: 5rem;
  }

  .category {
    cursor: pointer;
  }

  & > * {
    margin: 0.9rem 0.6rem;
  }

  .introduction {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 1.8rem;

    .textarea {
      flex: 1;
      min-width: 0rem;
      margin-left: 2rem;
      height: auto;
    }
  }

  .button:focus {
    background-color: white;
  }

  .schedule {
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
  }
`;

const days = ["일", "월", "화", "수", "목", "금", "토"];
const conditions = [];
for (let i = 0; i < 7; i++) {
  conditions[i] = {
    isSelected: false,
    class: classnames({ "is-focused": false })
  };
}

const GroupCreate = props => {
  const [state, dispatch] = useReducer(groupCreateReducer, initialState);
  const { primaryCategories, secondaryCategories } = state;
  const { category, tags } = state.data;
  const [dayCondition, setDayCondition] = useState(conditions);
  const [time, setTime] = useState(null);
  const timezone = useRef();

  const onClickDay = i => {
    return e => {
      e.target.blur();
      const copyConditions = [...dayCondition];
      copyConditions[i] = {
        isSelected: !copyConditions[i].isSelected,
        class: classnames({
          "is-focused": !copyConditions[i].isSelected
        })
      };
      setDayCondition(copyConditions);
    };
  };

  const onTimeChange = useCallback(e => {
    const timezoneValue = timezone.current.value;
    let timeValue = Number.parseInt(e.target.value, 10);
    if (timezoneValue === "pm") timeValue += 12;

    setTime(timeValue);
  }, []);

  return (
    <StyledGroupCreate>
      <div className="is-centered categories">
        <Category
          categories={primaryCategories}
          type="primary"
          dispatch={dispatch}
        />

        {category[0] && (
          <Category
            categories={secondaryCategories[category[0]]}
            type="secondary"
            dispatch={dispatch}
          />
        )}
      </div>

      <input className="input" placeholder="title" />
      <input className="input" placeholder="subtitle" />
      <div className="introduction">
        <ImageUploader />
        <textarea className="textarea"> 그룹 소개 </textarea>
      </div>
      <TagInput tags={tags} dispatch={dispatch} />

      <div className="schedule">
        <div className="field has-addons day-buttons">
          {days.map((day, idx) => {
            return (
              <p className="control" key={idx}>
                <button
                  className={`button is-info is-outlined ${dayCondition[idx] &&
                    dayCondition[idx].class}`}
                  onClick={onClickDay(idx)}
                >
                  {day}
                </button>
              </p>
            );
          })}
        </div>

        <div className="time-select">
          <select className="select" ref={timezone}>
            <option value="am">오전</option>
            <option value="pm">오후</option>
          </select>

          <select className="select" onChange={onTimeChange}>
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

          <button type="submit" className="button">
            {" "}
            등록하기{" "}
          </button>
        </div>
      </div>
    </StyledGroupCreate>
  );
};

export default GroupCreate;
