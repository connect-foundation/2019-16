import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StudyGroupCardMini from "./groupCardMini";
import bulmaCarousel from "bulma-carousel/dist/js/bulma-carousel.min.js";

const Main = styled.div`
// Import Bulma core
@import 'bulma.sass'
@import "bulmaCarousel.sass"

  .carousel-box{
    overflow:hidden;
    width:51em;
    padding: 3rem 1.5rem;
    align-self:center;
    #carousel-demo1{
      width:100%;
      align-self:center;
      min-width: 238px;
    }
    .carousel{
      display:flex;
      justify-content:center;
      .carousel-item{
        padding:0 5%;
      }
    }
    .my-group-title{
      font-weight:bold;
      font-size:1.5em;
      padding 0 0 3%;
    }
    .slider-page{
      box-shadow:0 2px 5px #323232;
    }
  }
 
`;

const MyStudyCarousel = ({ myStudyData }) => {
  useEffect(() => {
    if (myStudyData.length > 3)
      bulmaCarousel.attach(".carousel", {
        slidesToScroll: 1,
        slidesToShow: 3,
        infinite: true
      });
  });

  return (
    <Main>
      <div className="carousel-box" style={{ overflow: "hidden" }}>
        <div className="my-group-title">👨‍👨‍👧‍👦현재 함께하는 그룹이에요</div>
        <div className="carousel">
          {myStudyData.map(study => {
            return (
              <div className="carousel-item">
                <StudyGroupCardMini cardData={study} />
              </div>
            );
          })}
        </div>
      </div>
    </Main>
  );
};

export default MyStudyCarousel;
