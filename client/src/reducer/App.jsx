export const LOGIN = "app/LOGIN";
export const LOGOUT = "app/LOGOUT";

/**
 * @param {Object} data userEmail, userName, userAgeRange, userGender, profileImage
 */
export const login_button_click = data => ({ type: LOGIN, data });
export const logout_button_click = () => ({ type: LOGOUT, initalState });

export const initalState = {
  userEmail: "",
  userName: "",
  userAgeRange: 0,
  userGender: "",
  profileImage: ""
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return action.data;
    case LOGOUT:
      return action.initalState;
    default:
      return state;
  }
};
