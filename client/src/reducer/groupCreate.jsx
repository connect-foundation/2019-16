import React, { useReducer } from "react";

export const CATEGORY_CLICK = "groupCreate/CATEGORY_CLICK";

export const category_click = ({ categoryType, categoryName }) => ({
  type: CATEGORY_CLICK,
  categoryType,
  categoryName
});

export const initialState = {
  primary: null,
  secondary: null
};

export const groupCreateReducer = (state, action) => {
  switch (action.type) {
    case CATEGORY_CLICK:
      const { categoryType, categoryName } = action;
      if (categoryType === "primary")
        return {
          primary: categoryName,
          secondary: null
        };
      if (categoryType === "secondary")
        return {
          secondary: categoryName
        };
      break;

    default:
      return state;
  }
};
