import React, { useState } from "react";
import styled from "styled-components";
import StudySearchNavbar from "../../components/StudySearchNavbar";
import StudyGroupCard from "../../components/groupCard";

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

const MainPage = ({ props }) => {
  const [cardListData, setCardListData] = useState([]);

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
      <StudySearchNavbar></StudySearchNavbar>
      <div className={`study-group-list`}>
        {cardListData.map(data => {
          return <StudyGroupCard groupData={data}></StudyGroupCard>;
        })}
      </div>
    </Main>
  );
};

export default MainPage;
