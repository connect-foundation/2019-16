import React from "react";
import { REQUEST_URL } from "../../../config.json";

const LogoutButton = () => {
  return (
    <button
      className="button is-rounded is-warning"
      onClick={async () => {
        const url = `${REQUEST_URL}/auth/users/logout`;
        const options = { method: "GET", credentials: "include" };
        const result = await fetch(url, options);

        if (result.ok) window.location.href = "https://studycombined.shop";
      }}
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
