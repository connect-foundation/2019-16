import React, { useState, useEffect, useContext } from "react";
import queryString from "query-string";
import styled from "styled-components";

import StudyGroupCard from "../../components/users/groupCard";
import useInfiniteScroll from "../../lib/useInfiniteScroll";

import { REQUEST_URL } from "../../config.json";
import { set_groups } from "../../reducer/users";
import { UserContext } from "./index";
import axios from "axios";

const StyledSearch = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5%;
  padding-right: 5%;

  .main-page-title {
    font-family: "Black Han Sans", sans-serif;
    color: #000000;
    padding-left: 5%;
    padding: 5%;
    align-self: start;
    display: flex;

    .search-result {
      .main-title {
        font-size: 6em;
        .highlight {
          color: #e41d60;
        }
      }
      .main-subtitle {
        font-size: 4em;
      }
    }
  }

  .study-group-list {
    align-self: center;
    min-height: 200px;

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    background-color: #f8f0ee;
    width: 68rem;
    flex-wrap: wrap;
    padding: 0 1rem;
    margin: 0 10%;
    .study-group-card {
      margin: 2em;
    }
  }
`;

const isSetPositionDuringLoading = (loading, lat, lon) =>
  loading && lat !== null && lon !== null;

const isHaveCardDataWhenLoaded = (loading, data) =>
  !loading && data && data.length;

function isLastPagenation(takenGroups) {
  const takenLength = takenGroups.length || 0;
  if (!takenGroups || !takenLength || takenLength < 6) return true;
  return false;
}

const Search = ({ location, match, history }) => {
  const query = queryString.parse(location.search).query;

  const pathname = location.pathname;

  const {
    userIndexState,
    userIndexDispatch,
    userInfo,
    getApiAxiosState
  } = useContext(UserContext);
  const { searchList } = userIndexState;
  const { userLocation } = userInfo;

  let { lat, lon } = userLocation;
  let { loading, data, error, request } = getApiAxiosState;

  const [searchState, setSearchState] = useState({
    isLoading: true,
    searchData: []
  });

  const [isFetching, setIsFetching] = useInfiniteScroll(loadAdditionalItems);

  const [pageState, setpageState] = useState({
    page_idx: 1,
    isLastItem: false
  });

  function loadAdditionalItems() {
    const { page_idx, isLastItem } = pageState;
    if (isLastItem) return;

    if (pathname === "/search") {
      let url = `${REQUEST_URL}/api/search/query/${query}/location/${lat}/${lon}/page/${page_idx}/true`;
      axios.get(url).then(({ data }) => {
        const additionalGroups = data;
        const changedPageNationState = {
          ...pageState,
          page_idx: page_idx + 1
        };

        if (isLastPagenation(additionalGroups))
          changedPageNationState.isLastItems = true;

        const newData = [...searchState.searchData, ...additionalGroups];
        const newSearchData = {
          isLoading: false,
          searchData: newData
        };
        setSearchState(newSearchData);
        //userIndexDispatch(set_additional_groups(additionalGroups));
        setpageState(changedPageNationState);
      });
    }
    if (pathname === "/search/tags") {
      let url = `${REQUEST_URL}/api/search/tags/page/${page_idx}`;
      const data = {
        tags: [query],
        lat,
        lon,
        isRecruit: true
      };
      axios.post(url, data).then(({ data }) => {
        const additionalGroups = data;
        const changedPageNationState = {
          ...pageState,
          page_idx: page_idx + 1
        };

        if (isLastPagenation(additionalGroups))
          changedPageNationState.isLastItems = true;

        const newData = [...searchState.searchData, ...additionalGroups];
        const newSearchData = {
          isLoading: false,
          searchData: newData
        };
        setSearchState(newSearchData);
        //userIndexDispatch(set_additional_groups(additionalGroups));
        setpageState(changedPageNationState);
      });
    }

    setIsFetching(false);
  }

  useEffect(() => {
    let url;
    if (pathname === "/search") {
      url = `${REQUEST_URL}/api/search/query/${query}/location/${lat}/${lon}/page/0/true`;

      axios.get(url).then(({ data }) => {
        const initData = {
          searchData: data,
          isLoading: 0
        };
        setSearchState(initData);
      });
    }

    if (pathname === "/search/tags") {
      const data = {
        tags: [query],
        lat,
        lon,
        isRecruit: true
      };
      url = `${REQUEST_URL}/api/search/tags/page/0`;
      axios.post(url, data).then(({ data }) => {
        const initData = {
          searchData: data,
          isLoading: 0
        };
        setSearchState(initData);
      });
    }
  }, [query]);

  return (
    <StyledSearch>
      <div className="main-jumbotron">
        <div className="main-page-title">
          <div className="search-result">
            <div className="main-title">
              <span className="highlight">
                {pathname === "/search" ? query : `#${query}`}
              </span>
            </div>
            <div className="main-subtitle">
              {pathname === "/search" ? "스터디" : `태그검색 결과`}
            </div>
          </div>
        </div>
      </div>
      <div className="study-group-list">
        {(() => {
          if (searchState.isLoading) return <h3> 로딩 중... </h3>;
          // if (error) return <h3> 에러 발생 </h3>;
          if (!searchState.searchData.length) return <h3> 데이터가 업소용 </h3>;
          return searchState.searchData.map(groupData => {
            return (
              <StudyGroupCard
                key={groupData.id}
                groupData={groupData}
                history={history}
              ></StudyGroupCard>
            );
          });
        })()}
      </div>
    </StyledSearch>
  );
};

export default Search;
