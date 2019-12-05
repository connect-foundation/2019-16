import React, { useCallback } from "react";
import styled from "styled-components";
import { category_click } from "../../../reducer/users/groupCreate";

const StyledCategory = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;

  li {
    cursor: pointer;
    font-weight: bold;
    font-size: 1.4rem;
    margin: 0.2rem 1rem;
  }
`;

const Category = props => {
  const { categories, dispatch, type } = props;

  const categoryEvent = useCallback(e => {
    const categoryName = e.target.textContent.trim();
    dispatch(category_click({ categoryType: type, categoryName }));
  }, []);

  return (
    <StyledCategory>
      {categories.map(category => (
        <li key={category} onClick={categoryEvent}>
          {category}
        </li>
      ))}
    </StyledCategory>
  );
};

export default Category;
