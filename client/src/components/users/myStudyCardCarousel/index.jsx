import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StudyGroupCardMini from "./Card";
import bulmaCarousel from "bulma-carousel/dist/js/bulma-carousel.min.js";

const Main = styled.div`
  .carousel-box{
    overflow:hidden;

    .carousel{
      height: 20rem;
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

const MyStudyCarousel = ({ myGroups, user_email }) => {
  useEffect(() => {
    if (myGroups.length > 3)
      bulmaCarousel.attach(".carousel", {
        slidesToScroll: 1,
        slidesToShow: 3,
        infinite: true
      });
  });

  return (
    <Main>
      <div
        className="carousel-box"
        style={{ overflow: "hidden", width: `${myGroups.length * 15}em` }}
      >
        <div className="my-group-title">👨‍👨‍👧‍👦현재 함께하는 그룹이에요</div>
        <div className="carousel">
          {myGroups.map(group => {
            return (
              <div className="carousel-item">
                <StudyGroupCardMini cardData={group} user_email={user_email} />
              </div>
            );
          })}
        </div>
      </div>
    </Main>
  );
};

export default MyStudyCarousel;
