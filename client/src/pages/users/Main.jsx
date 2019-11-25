import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StudySearchNavbar from "../../components/studySearchNavbar/StudySearchNavbar";
import StudyGroupCard from "../../components/groupCard";
import MyStudyCarousel from "../../components/MyStudyCarousel";
import {
  studyGroupData,
  categoryData,
  myStudyData
} from "../../__test__/mainPage.dummy";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5%;
  padding-right: 5%;

  .main-jumbotron{
    padding: 2% 7% 1%;
    display:flex;
    flex-direction:column;
  }

  .main-page-title{
    font-family: 'Black Han Sans', sans-serif;
    color: #000000;
    padding: 5%;
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
  const [cardListData, setCardListData] = useState([
    studyGroupData,
    studyGroupData,
    studyGroupData,
    studyGroupData,
    studyGroupData
  ]);

  useEffect(() => {
    /**
     * TODO: data 요청로직 필요
     * cardListData
     * myStudyData
     */
  }, []);

  return (
    <Main>
      <div className="main-jumbotron">
        <MyStudyCarousel myStudyData={myStudyData}></MyStudyCarousel>
        <div className="main-page-title">
          <div className={`main-title`}>스터디,</div>
          <div className={`main-subtitle`}>
            <span className={`highlight`}>모집</span>부터{" "}
            <span className={`highlight`}>예약</span>까지 한번에-
          </div>
        </div>
      </div>
      <StudySearchNavbar categoryData={categoryData}></StudySearchNavbar>
      <div className={`study-group-list`}>
        {cardListData.map(data => {
          return <StudyGroupCard groupData={data}></StudyGroupCard>;
        })}
      </div>
    </Main>
  );
};

export default MainPage;
