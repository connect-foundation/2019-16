import React, { useCallback, useState, useReducer } from "react";
import styled from "styled-components";
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
`;

const GroupCreate = props => {
  const [state, dispatch] = useReducer(groupCreateReducer, initialState);
  const { primary, secondary, primaryCategories, secondaryCategories } = state;
  const [tags, setTags] = useState([]);

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
      {/*<p> 위치 </p>
      <p> 날짜 </p> */}
    </StyledGroupCreate>
  );
};

export default GroupCreate;
