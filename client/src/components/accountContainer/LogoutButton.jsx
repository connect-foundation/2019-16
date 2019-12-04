import React, { useContext } from "react";
import { AppContext } from "../../App";
import { logout_button_click } from "../../reducer/App";

const LogoutButton = () => {
  const { appDispatch } = useContext(AppContext);
  const clickHandler = e => {
    appDispatch(logout_button_click());
  };
  return (
    <button className="button is-rounded is-warning" onClick={clickHandler}>
      로그아웃
    </button>
  );
};

export default LogoutButton;
