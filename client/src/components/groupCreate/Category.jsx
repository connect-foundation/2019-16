import React, { useCallback } from "react";
import styled from "styled-components";
import classnames from "classnames";
import { category_click } from "../../reducer/groupCreate";

const StyledCategory = styled.ul``;

const Category = props => {
  const { categories, dispatch, type } = props;
  const categoryColor = classnames({
    "has-text-primary": type === "primary",
    "has-text-info": type === "secondary"
  });
  const categoryEvent = useCallback(e => {
    const categoryName = e.target.textContent.trim();

    dispatch(category_click({ categoryType: type, categoryName }));
  }, []);

  return (
    <StyledCategory>
      {categories.map(category => (
        <li
          key={category}
          onClick={categoryEvent}
          className={`is-size-4 ${categoryColor}`}
        >
          {category}
        </li>
      ))}
    </StyledCategory>
  );
};

export default Category;
