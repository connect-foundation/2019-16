import React, { useContext } from "react";
import { UserContext } from "../../../pages/users/index";

const LogoutButton = () => {
  const { setUserInfo } = useContext(UserContext);
  const clickHandler = e => {};
  return (
    <button className="button is-rounded is-warning" onClick={clickHandler}>
      로그아웃
    </button>
  );
};

export default LogoutButton;
