import React, { useState } from "react";
import styled from "styled-components";
import StudySearchNavbar from "../../components/StudySearchNavbar";
import StudyGroupCard from "../../components/StudyGroupCard";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  padding-left: 5%;
  padding-right: 5%;

  .main-jumbotron{
    padding-top: 7%;
    padding-bottom: 7%;
    padding-left:5%;
  }

  .main-page-title{
    font-family: 'Black Han Sans', sans-serif;
    color: #000000;

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
      background-color: #f8f0ee;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 5em 3em;
      justify-content: space-between;
      .study-group-card{
          margin: 2em;
      }
  }
`;

const MainPage = ({ props }) => {
  const [cardListData, setCardListData] = useState([]);

  const cardList = cardListData.map(data => {
    return <StudyGroupCard props={data}></StudyGroupCard>;
  });
  return (
    <Main>
      <div className={`main-jumbotron`}>
        <div className={`main-page-title`}>
          <div className={`main-title`}>스터디,</div>
          <div className={`main-subtitle`}>
            <span className={`highlight`}>모집</span>부터{" "}
            <span className={`highlight`}>예약</span>까지 한번에-
          </div>
        </div>
      </div>
      <StudySearchNavbar></StudySearchNavbar>
      <div className={`study-group-list`}>{cardList}</div>
    </Main>
  );
};

export default MainPage;
