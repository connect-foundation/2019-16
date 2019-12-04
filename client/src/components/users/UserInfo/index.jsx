import React from "react";
import { UserContext } from "../../../App";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const UserInfo = () => {
  return (
    <UserContext.Consumer>
      {(userEmail, profileImage, userName) =>
        userEmail ? (
          <>
            <img src={profileImage} alt="profile" />
            <span>{userName}님 반갑습니다.</span>
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )
      }
    </UserContext.Consumer>
  );
};

export default UserInfo;
