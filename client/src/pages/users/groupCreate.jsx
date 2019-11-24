import React, { useCallback, useState, useReducer } from "react";
import styled from "styled-components";
import Category from "../../components/groupCreate/Category";
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
`;

const GroupCreate = props => {
  const [state, dispatch] = useReducer(groupCreateReducer, initialState);
  const { primary, secondary, primaryCategories, secondaryCategories } = state;
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

      <input className="input" placeholder="title" />
      <input className="input" placeholder="subtitle" />
      <textarea className="textarea"> 그룹 소개 </textarea>
      {/*<p> 그룹 사진 </p>
      <p> 위치 </p>
      <p> 태그 </p>
      <p> 날짜 </p> */}
    </StyledGroupCreate>
  );
};

export default GroupCreate;
