import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../../pages/users";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  .profile-image {
    border-radius: 50%;
    height: 2.5rem;
    margin-right: 1rem;
  }

  .right-block {
    display: flex;
    flex-direction: column;
  }
`;

const UserInfo = () => {
  const { userInfo } = useContext(UserContext);

  return (
    <StyledUserInfo>
      {userInfo.userEmail ? (
        <>
          <img
            src={userInfo.profileImage}
            alt="profile"
            className="profile-image"
          />
          <div className="right-block">
            {/* <span>{userInfo.userName}님 반갑습니다.</span> */}
            <LogoutButton />
          </div>
        </>
      ) : (
        <LoginButton />
      )}
    </StyledUserInfo>
  );
};

export default UserInfo;
