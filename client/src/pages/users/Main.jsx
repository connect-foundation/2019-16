/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import StudyGroupCard from "../../components/users/groupCard";
import MyStudyCarousel from "../../components/users/myStudyCardCarousel";

import { set_groups } from "../../reducer/users";
import { UserContext } from "./index";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5%;
  padding-right: 5%;

  .main-jumbotron{
    padding: 2% 7% 1%;
    display:flex;
    flex-direction:column;
    align-items:center;

    .group-create-button {
      margin-top: 2rem;
    }
  }
  .group-create-button {
    margin-top: 2rem;
    display:flex;
    justify-content:center;
  }
  .main-page-title{
    font-family: 'Black Han Sans', sans-serif;
    color: #000000;
    padding: 5%;
    align-self:start;
    .main-title {
        font-size: 6em;
      }
    .main-subtitle{
        font-size: 4em;
        .highlight{
            color:#e41d60
        }
      }
    }
  }

  .study-group-list{
      align-self:center;

      display: flex;
      flex-direction: row;
      justify-content: space-evenly;

      background-color: #f8f0ee;
      width: 68rem;
      flex-wrap: wrap;
      padding: 0 1rem;
      margin:0 10%;
      .study-group-card{
          margin: 2em;
      }
  }
`;

const MainPage = () => {
  const {
    userIndexState,
    userIndexDispatch,
    userInfo,
    getApiAxiosState
  } = useContext(UserContext);
  const { myGroups, searchList } = userIndexState;
  const { userEmail, userLocation } = userInfo;

  let { lat, lon } = userLocation;
  let { loading, data, error, request } = getApiAxiosState;

  useEffect(() => {
    isSetPositionDuringLoading(loading, lat, lon) &&
      request("get", `/search/all/location/${lat}/${lon}/true`);
  }, [userLocation]);

  useEffect(() => {
    isHaveCardDataWhenLoaded(loading, data) &&
      userIndexDispatch(set_groups(data));
  }, [data]);

  return (
    <Main>
      <div className="main-jumbotron">
        {userEmail ? (
          <>
            {myGroups.length ? (
              <MyStudyCarousel></MyStudyCarousel>
            ) : (
              "현재 소속된 스터디 그룹이 없습니다."
            )}
            <Link to="/group/create" className="group-create-button">
              {" "}
              <button className="button"> 그룹 생성 </button>
            </Link>
          </>
        ) : (
          <div className="main-page-title">
            <div className="main-title">스터디,</div>
            <div className="main-subtitle">
              <span className="highlight">모집</span>부터{" "}
              <span className="highlight">예약</span>까지 한번에-
            </div>
          </div>
        )}
      </div>

      <div className="study-group-list">
        {(() => {
          if (loading) return <h3> 로딩 중... </h3>;
          if (error) return <h3> 에러 발생 </h3>;
          if (!data.length) return <h3> 데이터가 업소용 </h3>;

          return searchList.map(groupData => {
            return (
              <StudyGroupCard
                key={groupData.id}
                groupData={groupData}
              ></StudyGroupCard>
            );
          });
        })()}
      </div>
    </Main>
  );
};

const isSetPositionDuringLoading = (loading, lat, lon) =>
  loading && lat !== null && lon !== null;

const isHaveCardDataWhenLoaded = (loading, data) =>
  !loading && data && data.length;

export default MainPage;
