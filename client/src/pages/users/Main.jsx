/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useCallback, useState } from "react";
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

const takeCardAmount = 21;

const MainPage = () => {
  const {
    userIndexState,
    userIndexDispatch,
    userInfo,
    getApiAxiosState
  } = useContext(UserContext);
  const { myGroups, searchList } = userIndexState;
  const [scrollState, setScrollState] = useState({
    loading: false,
    curLastIndex: 0,
    isLastItems: false
  });
  const { userEmail, userLocation } = userInfo;

  let { lat, lon } = userLocation;
  let { loading, data, error, request } = getApiAxiosState;

  const infiniteScroll = useCallback(() => {
    if (scrollState.loading) return;
    if (scrollState.isLastItems) return;

    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight + 1 >= scrollHeight) {
      // setScrollState({...scrollState, loading: true});
      // axios
      //   .get(`${REQUEST_URL}/api/search.../${scrollState.curLastIndex}`)
      //   .then(({ data }) => {
      //     const { takenGroups } = data;
      //     const { curLastIndex } = scrollState;
      //     const takenLength = takenGroups.length || 0;
      //     const changedScrollState = {
      //       isLastItems: false,
      //       curLastIndex: curLastIndex + 1,
      //       loading: false
      //     };
      //     if (!takenGroups || !takenLength || takenLength < takeCardAmount)
      //       changedScrollState.isLastItems = true;
      //     dispatch(
      //       set_additional_groups(
      //         takenGroups,
      //         setScrollState,
      //         changedScrollState
      //       )
      //     );
      //     // 다음 15개 가져오기 axios 후, then에서 가져온 데이터 data를
      //     // state 리스트에 합쳐서 dispatch
      //     // setScrollState로 curLastIndex를 +15해서 변경
      //     // 가져온 데이터가 마지막일 경우 isLastItems를 true로 변경
      //   });
    }
  }, [scrollState]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, []);

  useEffect(() => {
    isSetPositionDuringLoading(loading, lat, lon) &&
      request("get", `/search/all/location/${lat}/${lon}/page/0/true`);
  }, [userLocation]);

  useEffect(() => {
    if (!isHaveCardDataWhenLoaded(loading, data)) return;

    userIndexDispatch(set_groups(data));
    if (data.length < takeCardAmount) {
      setScrollState({
        ...scrollState,
        curLastIndex: data.length - 1,
        isLastItems: true
      });
      return;
    }
    setScrollState({
      ...scrollState,
      curLastIndex: scrollState.curLastIndex + 1
    });
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
