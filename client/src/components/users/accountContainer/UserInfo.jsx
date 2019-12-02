import React, { useContext } from "react";
import { AppContext } from "../../App";
import LogoutButton from "./LogoutButton";

const UserInfo = () => {
  const { appState } = useContext(AppContext);
  return (
    <>
      {appState.email && (
        <div>
          <img src={appState.profileImage} alt="profile" />
          <span>{appState.userName}님 반갑습니다.</span>
          <LogoutButton />
        </div>
      )}
    </>
  );
};

export default UserInfo;
