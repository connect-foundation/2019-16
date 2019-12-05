import React, { useContext } from "react";
import { UserContext } from "../../../pages/users";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const UserInfo = () => {
  const { userEmail, profileImage, userName } = useContext(UserContext);
  return (
    <div>
      {userEmail ? (
        <>
          <img src={profileImage} alt="profile" />
          <span>{userName}님 반갑습니다.</span>
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default UserInfo;
