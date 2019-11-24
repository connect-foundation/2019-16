import React, { useCallback, useState, useReducer } from "react";
import styled from "styled-components";
import Category from "../../components/groupCreate/Category";
import ImageUploader from "../../components/groupCreate/ImageUploader";
import { groupCreateReducer, initialState } from "../../reducer/groupCreate";

const StyledGroupCreate = styled.div`
  width: 50%;
  margin: 2rem auto;
  .category {
    cursor: pointer;
  }

  & > * {
    margin: 0.6rem;
  }

  .breadcrumb {
    height: 4rem;
  }

  .tagDiv {
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    padding: 0.2rem;
    height: auto;
    overflow: visible;

    button {
      margin: 0.5rem 0.5rem;
    }
    .tagInput {
      flex: 1;
      height: 2.8rem;
      padding: 0 0.5rem;
      box-shadow: none;
      border: none;
    }
  }
`;

const GroupCreate = props => {
  const [state, dispatch] = useReducer(groupCreateReducer, initialState);
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const { primary, secondary, primaryCategories, secondaryCategories } = state;
  const tagEvent = useCallback(
    e => {
      const inputData = e.target.value;
      const lastChar = inputData[inputData.length - 1];
      setInputTag(inputData);

      if (lastChar === " ") {
        if (inputData !== " ") setTags([...tags, inputData]);
        setInputTag("");
      }
    },
    [tags]
  );
  // title subtitle 최소 인원 최대 인원 그룹 소개 썸네일 위치 태그 날짜
  return (
    <StyledGroupCreate>
      <div className="breadcrumb is-centered" aria-label="breadcrumbs">
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

      <ImageUploader />
      <input className="input" placeholder="title" />
      <input className="input" placeholder="subtitle" />
      <textarea className="textarea"> 그룹 소개 </textarea>
      <div className="input tagDiv">
        {tags.map((tag, idx) => (
          <button key={idx} className="tag">
            {tag}
          </button>
        ))}
        <input
          type="text"
          className="tagInput input"
          onChange={tagEvent}
          value={inputTag}
        />
      </div>
      {/*<p> 위치 </p>
      <p> 날짜 </p> */}
    </StyledGroupCreate>
  );
};

export default GroupCreate;
