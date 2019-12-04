const SET_USER_INFO = "userIndex/SET_USER_INFO";

export const set_user_info = info => ({
  type: SET_USER_INFO,
  info
});

export const initialState = {
  userEmail: "",
  userName: "",
  profileImage: "",
  ageRange: -1,
  gender: ""
};

export const userInfoReducer = (state, action) => {
  const { info } = action;
  switch (action.type) {
    case SET_USER_INFO:
      return info;
    default:
      return state;
  }
};
