import React, { useEffect, useContext, useReducer } from "react";
import styled from "styled-components";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import StudySearchNavbar from "../../components/studySearchNavbar/StudySearchNavbar";
import StudyGroupCard from "../../components/groupCard";
import MyStudyCarousel from "../../components/MyStudyCarousel";
import { AppContext } from "../../App";
import { initalState, mainReducer } from "../../reducer/Main";

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
      background-color: #f8f0ee;
      display: flex;
      width: 70rem;
      flex-wrap: wrap;
      padding: 4em;
      margin:0 10%;
      justify-content: center;
      .study-group-card{
          margin: 2em;
      }
  }
`;

/**
 * TODO: 로그인 여부에 따라서 main jumbotron에서 표시되는 정보가 다르다
 * 미로그인시main-page-title 출력
 * 로그인시 MyStudyCarousel 출력
 */
const MainPage = () => {
  const [mainState, mainDispatch] = useReducer(mainReducer, initalState);
  const {
    myGroups,
    cardList,
    primaryCategories,
    secondaryCategories
  } = mainState;

  const {
    appState: { user_email }
  } = useContext(AppContext);

  useEffect(() => {
    // /api/search/all
    /**
     * TODO: data 요청로직 필요
     * cardListData
     * myStudyData
     */
  }, []);

  return (
    <Main>
      <div className="main-jumbotron">
        {user_email ? (
          <>
            <MyStudyCarousel
              myGroups={myGroups}
              user_email={user_email}
            ></MyStudyCarousel>
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

      <Router>
        <StudySearchNavbar
          primaryCategories={primaryCategories}
          secondaryCategories={secondaryCategories}
        ></StudySearchNavbar>
        <Route
          path={["/category/:categoryName", "/"]}
          render={({ match }) => {
            const selectedCategory = match.params.categoryName;
            const pathName = match.path;
            const groupsData =
              pathName === "/"
                ? cardList
                : cardList.filter(
                    card => card.category[1] === selectedCategory
                  );

            return (
              <div className="study-group-list">
                {groupsData.map(groupData => {
                  return (
                    <StudyGroupCard groupData={groupData}></StudyGroupCard>
                  );
                })}
              </div>
            );
          }}
        />
      </Router>
    </Main>
  );
};

export default MainPage;