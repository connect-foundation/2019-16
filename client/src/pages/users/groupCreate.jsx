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

const GroupCreate = props => {
  const [state, dispatch] = useReducer(groupCreateReducer, initialState);
  const { primary, secondary, primaryCategories, secondaryCategories } = state;
  console.log(secondaryCategories, primary);
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
    </StyledGroupCreate>
  );
};

export default GroupCreate;
