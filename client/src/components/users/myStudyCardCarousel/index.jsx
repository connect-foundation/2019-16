import React, { useEffect, useContext, useCallback } from "react";
import styled from "styled-components";
import StudyGroupCardMini from "./Card";
import { UserContext } from "../../../pages/users/index";
import bulmaCarousel from "bulma-carousel/dist/js/bulma-carousel.min.js";

const StyledMyStudyCarousel = styled.div`
overflow: hidden;
width: ${props => props.carouselWidth}; 
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
      text-align: center;
      font-weight:bold;
      font-size: 1.3em;
      padding 0 0 3%;
    }
    .slider-page{
      box-shadow:0 2px 5px #323232;
    }
 
`;

const MyStudyCarousel = () => {
  const { userIndexState } = useContext(UserContext);
  const { myGroups, joinedGroups } = userIndexState;
  const carouselWidth = myGroups.length ? myGroups.length * 15 + "em" : "100%";
  const userGroups = myGroups.concat(joinedGroups);

  useEffect(() => {
    if (myGroups.length > 3)
      bulmaCarousel.attach(".carousel", {
        slidesToScroll: 1,
        slidesToShow: 3,
        infinite: true
      });
  });

  return (
    <StyledMyStudyCarousel>
      <div>
        <div className="my-group-title">👨‍👨‍👧‍👦현재 함께하는 그룹이에요</div>
        <div className="carousel">
          {userGroups.map(groupData => {
            return (
              <div className="carousel-item">
                <StudyGroupCardMini groupData={groupData} />
              </div>
            );
          })}
        </div>
      </div>
    </StyledMyStudyCarousel>
  );
};

export default MyStudyCarousel;
