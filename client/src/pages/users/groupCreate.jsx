import React, { useCallback, useState, useReducer } from "react";
import styled from "styled-components";
import Category from "../../components/groupCreate/Category";
import { groupCreateReducer, initialState } from "../../reducer/groupCreate";

const StyledGroupCreate = styled.div`
  margin: 2rem 0;
  .category {
    cursor: pointer;
  }
`;

const primaryCategories = ["프로그래밍", "자격증", "외국어", "면접", "지역"];
const secondaryCategories = {
  프로그래밍: ["C++", "Java", "JavaScript"],
  자격증: ["IT", "운전", "보건", "식품"],
  외국어: ["영어", "중국어", "불어", "스페인어"],
  면접: ["공채", "상시채용", "특채", "기술면접", "임원면접"],
  지역: ["경기도", "서울", "울산", "인천", "광주", "부산"]
};

const GroupCreate = props => {
  const [state, dispatch] = useReducer(groupCreateReducer, initialState);
  const { primary, secondary } = state;
  return (
    <StyledGroupCreate>
      <div className="breadcrumb is-centered" aria-label="breadcrumbs">
        <Category
          categories={primaryCategories}
          type="primary"
          dispatch={dispatch}
        />

        {state.primary && (
          <Category
            categories={secondaryCategories[primary]}
            type="secondary"
            dispatch={dispatch}
          />
        )}
      </div>
    </StyledGroupCreate>
  );
};

export default GroupCreate;
