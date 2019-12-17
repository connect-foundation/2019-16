import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

const StyledCategory = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;

  li {
    cursor: pointer;
    font-weight: bold;
    font-size: 1.4rem;
    margin: 0.2rem 1rem;

    &.selected {
      color: red;
    }
  }
`;

const Category = props => {
  const { categories, onCategoryClick, categoryType } = props;
  const [categoryIdx, setCategoryIdx] = useState(-1);
  const isSelectedIdx = useCallback(idx => categoryIdx === idx, [categoryIdx]);

  const categoryEvent = useCallback(
    idx => e => {
      const categoryName = e.target.textContent.trim();
      onCategoryClick(categoryType, categoryName);
      setCategoryIdx(idx);
    },
    [categoryType, onCategoryClick]
  );

  useEffect(() => {
    if (categoryType !== "secondary") return;
    setCategoryIdx(-1);
  }, [categories]);

  return (
    <StyledCategory>
      {categories.map((category, idx) => (
        <li
          key={category}
          className={isSelectedIdx(idx) ? "selected" : ""}
          onClick={categoryEvent(idx)}
        >
          {category}
        </li>
      ))}
    </StyledCategory>
  );
};

export default Category;
