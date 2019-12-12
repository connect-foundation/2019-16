import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import classnames from "classnames";
import Subtitle from "../groupCard/Subtitle";
import Location from "../common/Location";
import Time from "../groupCard/Time";
import TagButtons from "../common/TagButtons";
import {} from "../../../reducer/users/groupDetail";
import { UserContext } from "../../../pages/users/index";

const StyledMain = styled.div`
  width: 100%;
  height: 23rem;
  background-color: whitesmoke;

  * {
    font-family: "Nanum Gothic", sans-serif;
    font-size: 1rem;
  }

  .imageDiv {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    img {
      width: 19rem;
      height: 14rem;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    font-weight: bold;

    button {
      font-weight: bold;

      &.disable {
        cursor: default;
        opacity: 0.3;
      }
    }

    p {
      margin: 0;
    }
  }

  margin: 0;
  padding: 1.2rem;
`;

const Main = ({ groupData, dispatch }) => {
  const { userInfo } = useContext(UserContext);
  const { userEmail } = userInfo;
  const {
    thumbnail,
    location,
    startTime,
    days,
    endTime,
    tags,
    subtitle,
    min_personnel,
    now_personnel,
    max_personnel,
    leader
  } = groupData;

  return (
    <StyledMain className="columns">
      <div className="column imageDiv is-half">
        <img src={thumbnail} alt="img" />
      </div>

      <div className="column content">
        <Subtitle subtitle={subtitle} />
        <Location location={location} />

        <h4>
          <Time startTime={startTime} endTime={endTime} days={days} />
        </h4>

        <p> 최소 인원: {min_personnel} </p>
        <p> 현재 인원: {now_personnel} </p>
        <p> 최대 인원: {max_personnel} </p>

        <TagButtons tags={tags} />
      </div>
    </StyledMain>
  );
};

export default Main;
