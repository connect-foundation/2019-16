import React from "react";
import { REQUEST_URL } from "../../../config.json";

const LogoutButton = () => {
  return (
    <button
      className="button is-rounded is-warning"
      onClick={() => {
        window.location.href = `${REQUEST_URL}/auth/users/logout`;
      }}
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
