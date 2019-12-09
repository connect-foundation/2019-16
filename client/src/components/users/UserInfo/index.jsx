import React, { useContext } from "react";
import { UserContext } from "../../../pages/users";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const UserInfo = () => {
  const { userInfo } = useContext(UserContext);

  return (
    <div>
      {userInfo.userEmail ? (
        <>
          <img
            src={userInfo.profileImage}
            alt="profile"
            style={{
              borderRadius: "50%",
              height: "2.5rem",
              marginRight: "1rem"
            }}
          />
          {/* <span>{userInfo.userName}님 반갑습니다.</span> */}
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default UserInfo;
