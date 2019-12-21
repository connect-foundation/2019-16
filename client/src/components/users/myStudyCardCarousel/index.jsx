import React, { useEffect, useContext, useCallback } from "react";
import styled from "styled-components";
import StudyGroupCardMini from "./Card";
import { UserContext } from "../../../pages/users/index";
import bulmaCarousel from "bulma-carousel/dist/js/bulma-carousel.min.js";

const StyledMyStudyCarousel = styled.div`
width: ${props => props.carouselWidth}; 
    overflow:hidden;

    .carousel{
      height: 23rem;
      display:flex;
      justify-content:center;

      .carousel-item{
        padding:0 5%;
      }
    }

    & *:focus {
      outline: none;
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
  const { userInfo } = useContext(UserContext);
  const { ownGroups, joiningGroups } = userInfo;
  const userGroups = ownGroups.concat(joiningGroups);
  const carouselWidth = userGroups.length ? "55rem" : "100%";

  useEffect(() => {
    if (userGroups.length > 3) {
      bulmaCarousel.attach(".carousel", {
        slidesToScroll: 1,
        slidesToShow: 3,
        infinite: true
      });
    }
  }, []);

  return (
    <StyledMyStudyCarousel carouselWidth={carouselWidth}>
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
