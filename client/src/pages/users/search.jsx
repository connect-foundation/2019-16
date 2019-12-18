import React, { useEffect, useContext } from "react";
import queryString from "query-string";
import styled from "styled-components";

import StudyGroupCard from "../../components/users/groupCard";

import { set_groups } from "../../reducer/users";
import { UserContext } from "./index";

const StyledSearch = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5%;
  padding-right: 5%;

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
      width: 75rem;
      flex-wrap: wrap;
      margin:0 10%;
      .study-group-card{
          margin: 2em;
      }
  }
`;

const isSetPositionDuringLoading = (loading, lat, lon) =>
  loading && lat !== null && lon !== null;

const isHaveCardDataWhenLoaded = (loading, data) =>
  !loading && data && data.length;

const Search = ({ location, match }) => {
  const query = queryString.parse(location.search).query;

  const pathname = location.pathname;
  const {
    userIndexState,
    userIndexDispatch,
    userInfo,
    getApiAxiosState,
  } = useContext(UserContext);
  const { searchList } = userIndexState;
  const { userLocation } = userInfo;

  let { lat, lon } = userLocation;
  let { loading, data, error, request } = getApiAxiosState;

  useEffect(() => {
    if (isSetPositionDuringLoading(loading, lat, lon)) {
    }
  }, [userLocation]);

  useEffect(() => {
    if (!isHaveCardDataWhenLoaded(loading, data)) return;
    userIndexDispatch(set_groups(data));
  }, [data]);
  return (
    <StyledSearch>
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
    </StyledSearch>
  );
};

export default Search;
