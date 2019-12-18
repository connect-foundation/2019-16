/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useContext,
  useCallback,
  useState,
  useRef
} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { REQUEST_URL } from "../../config.json";
import axios from "axios";

import StudyGroupCard from "../../components/users/groupCard";
import MyStudyCarousel from "../../components/users/myStudyCardCarousel";

import { set_groups, set_additional_groups } from "../../reducer/users";
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

const takeCardAmount = 6;

function isLastPagenation(takenGroups) {
  const takenLength = takenGroups.length || 0;
  if (!takenGroups || !takenLength || takenLength < takeCardAmount) return true;
  return false;
}

const MainPage = () => {
  const {
    userIndexState,
    userIndexDispatch,
    userInfo,
    getApiAxiosState
  } = useContext(UserContext);
  const { myGroups, searchList } = userIndexState;
  const { userEmail, userLocation } = userInfo;
  const [scrollState, setScrollState] = useState({
    loading: false,
    pageIndex: 1,
    isLastItems: false
  });
  const scrollStateRef = useRef(scrollState);
  const lat = useRef();
  const lon = useRef();
  lat.current = userLocation.lat;
  lon.current = userLocation.lon;
  let { loading, data, error, request } = getApiAxiosState;

  function updateScrollState(newState) {
    setScrollState(scrollState => {
      return { ...scrollState, ...newState };
    });
  }

  const infiniteScroll = useCallback(() => {
    if (scrollStateRef.current.loading) return;
    if (scrollStateRef.current.isLastItems) return;

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
      updateScrollState({ ...scrollState, loading: true });
      axios
        .get(
          `${REQUEST_URL}/api/search/all/location/${lat.current}/${lon.current}/page/${scrollStateRef.current.pageIndex}/true`
        )
        .then(({ data }) => {
          const takenGroups = data;

          const { pageIndex } = scrollState;
          const changedScrollState = {
            isLastItems: false,
            pageIndex: pageIndex + 1,
            loading: false
          };

          if (isLastPagenation(takenGroups))
            changedScrollState.isLastItems = true;

          userIndexDispatch(set_additional_groups(takenGroups));
          updateScrollState(changedScrollState);
        });
    }
  }, [scrollState]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
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
    if (!isHaveCardDataWhenLoaded(loading, data)) return;
    userIndexDispatch(set_groups(data));
    if (data.length < takeCardAmount) {
      setScrollState({
        ...scrollState,
        pageIndex: data.length - 1,
        isLastItems: true
      });
      return;
    }
    setScrollState({
      ...scrollState,
      pageIndex: scrollState.pageIndex + 1
    });
  }, [data]);

  useEffect(() => {
    scrollStateRef.current = scrollState;
  }, [scrollState]);

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
