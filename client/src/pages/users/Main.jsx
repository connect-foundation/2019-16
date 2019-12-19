/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useRef } from "react";

import infiniteScrollEventHandler from "../../lib/infiniteScrollEventHandler";
import useInfiniteScroll from "../../lib/useInfiniteScroll";
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
      min-height: 200px;

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

const takeCardAmount = 6;

const MainPage = () => {
  const {
    userIndexState,
    userIndexDispatch,
    userInfo,
    getApiAxiosState
  } = useContext(UserContext);
  const { myGroups, searchList } = userIndexState;
  const { userEmail, userLocation } = userInfo;
  const scrollStateRef = useRef({
    loading: false,
    pageIndex: 1,
    isLastItems: false
  });
  scrollStateRef.current = {
    loading: false,
    pageIndex: 1,
    isLastItems: false
  };
  const lat = useRef();
  const lon = useRef();
  lat.current = userLocation.lat;
  lon.current = userLocation.lon;
  let { loading, data, error, request } = getApiAxiosState;

  const [isFetching, setIsFetching] = useInfiniteScroll();

  // function fetchMoreListItems() {
  //   let url = `${REQUEST_URL}/api/search/all/location/${lat.current}/${lon.current}/page/${scrollStateRef.current.pageIndex}/true`;
  //   if (category === String)
  //     url = `${REQUEST_URL}/api/search/all/category/${category}location/${lat.current}/${lon.current}/page/${scrollStateRef.current.pageIndex}/true`;

  //   axios.get(url).then(({ data }) => {
  //     const takenGroups = data;

  //     const { pageIndex } = scrollStateRef.current;
  //     const changedScrollState = {
  //       isLastItems: false,
  //       pageIndex: pageIndex + 1,
  //       loading: false
  //     };

  //     if (isLastPagenation(takenGroups)) changedScrollState.isLastItems = true;

  //     userIndexDispatch(set_additional_groups(takenGroups));
  //     scrollStateRef.current = changedScrollState;
  //   });
  // }
  useEffect(() => {
    console.log(`add event`);
    window.addEventListener(
      "scroll",
      infiniteScrollEventHandler.bind(
        null,
        lat,
        lon,
        userIndexDispatch,
        scrollStateRef
      )
    );
    return () => {
      window.removeEventListener("scroll", infiniteScrollEventHandler);
    };
  }, []);

  useEffect(() => {
    isSetPositionDuringLoading(loading, lat.current, lon.current) &&
      request(
        "get",
        `/search/all/location/${lat.current}/${lon.current}/page/0/true`
      );
  }, [userLocation]);

  useEffect(() => {
    console.log("data", data);
    if (!isHaveCardDataWhenLoaded(loading, data)) return;
    userIndexDispatch(set_groups(data));
    if (data.length < takeCardAmount) {
      scrollStateRef.current = {
        ...scrollStateRef,
        pageIndex: data.length - 1,
        isLastItems: true
      };
      return;
    }
    scrollStateRef.current = {
      ...scrollStateRef.current,
      pageIndex: scrollStateRef.current.pageIndex + 1
    };
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
          if (loading)
            return <h3> 근처의 스터디 정보를 열심히 찾고 있어요!🏃‍♀️🏃‍♂️ </h3>;
          if (error)
            return (
              <h3>
                기술적인 문제가 발생하였습니다.
                <br /> 알려주셔서 감사합니다. 곧 정상적으로 복구하겠습니다.
              </h3>
            );
          if (!data.length)
            return (
              <h3>
                주변에 모집중인 스터디 그룹이 없네요!🥺 <br /> 직접 모집해보는건
                어떤가요?😊
              </h3>
            );

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
