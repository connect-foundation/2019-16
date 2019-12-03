import React, { useContext } from "react";
import { UserContext } from "../../../pages/users/index";
import LogoutButton from "./LogoutButton";

const UserInfo = () => {
  const { userInfo } = useContext(UserContext);
  const { profileImage, userName, userEmail } = userInfo;
  return (
    <>
      {userEmail && (
        <div>
          <img src={profileImage} alt="profile" />
          <span>{userName}님 반갑습니다.</span>
          <LogoutButton />
        </div>
      )}
    </>
  );
};

export default UserInfo;
