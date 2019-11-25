import React, { useCallback, useReducer, useRef } from "react";
import styled from "styled-components";
import Category from "../../components/groupCreate/Category";
import ImageUploader from "../../components/groupCreate/ImageUploader";
import TagInput from "../../components/groupCreate/TagInput";
import ScheduleInput from "../../components/groupCreate/ScheduleInput";
import {
  groupCreateReducer,
  initialState,
  input_content
} from "../../reducer/groupCreate";

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
`;

const GroupCreate = props => {
  const [state, dispatch] = useReducer(groupCreateReducer, initialState);
  const { primaryCategories, secondaryCategories, daysInfo } = state;
  const { category, tags, title, subtitle, intro } = state.data;

  const onChangeContent = useCallback(e => {
    const contentType = e.target.name;
    const description = e.target.value;

    dispatch(input_content(contentType, description));
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

      <input
        className="input"
        name="title"
        placeholder="title"
        onChange={onChangeContent}
        value={title}
      />

      <input
        className="input"
        name="subtitle"
        placeholder="subtitle"
        onChange={onChangeContent}
        value={subtitle}
      />

      <div className="introduction">
        <ImageUploader dispatch={dispatch} />
        <textarea
          className="textarea"
          name="intro"
          onChange={onChangeContent}
          value={intro}
        >
          그룹 소개
        </textarea>
      </div>

      <TagInput tags={tags} dispatch={dispatch} />

      <ScheduleInput daysInfo={daysInfo} dispatch={dispatch} />

      <button type="submit" className="button">
        {" "}
        등록하기{" "}
      </button>
    </StyledGroupCreate>
  );
};

export default GroupCreate;
