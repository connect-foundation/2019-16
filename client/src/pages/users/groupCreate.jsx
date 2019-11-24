import React, { useCallback, useState, useReducer, useEffect } from "react";
import styled from "styled-components";
import classnames from "classnames";
import Category from "../../components/groupCreate/Category";
import ImageUploader from "../../components/groupCreate/ImageUploader";
import TagInput from "../../components/groupCreate/TagInput";
import { groupCreateReducer, initialState } from "../../reducer/groupCreate";

const StyledGroupCreate = styled.div`
  width: 60%;
  margin: 2rem auto;
  .category {
    cursor: pointer;
  }

  & > * {
    margin: 0.9rem 0.6rem;
  }

  .breadcrumb {
    height: 4rem;
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
  const { primary, secondary, primaryCategories, secondaryCategories } = state;
  const [tags, setTags] = useState([]);
  const [dayCondition, setDayCondition] = useState(conditions);

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

  // title subtitle 최소 인원 최대 인원 그룹 소개 썸네일 위치 태그 날짜
  return (
    <StyledGroupCreate>
      <div className="is-centered">
        <Category
          categories={primaryCategories}
          type="primary"
          dispatch={dispatch}
        />

        {primary && (
          <Category
            categories={secondaryCategories[primary]}
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
      <TagInput tags={tags} setTags={setTags} />

      <div className="field has-addons">
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
    </StyledGroupCreate>
  );
};

export default GroupCreate;
