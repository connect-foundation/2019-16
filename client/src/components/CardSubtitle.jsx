import React from "react";
import styled from "styled-components";

const StyledCardSubtitle = styled.div`
  @import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);
  @import url(http://fonts.googleapis.com/earlyaccess/nanumgothiccoding.css);
  @import url(http://fonts.googleapis.com/earlyaccess/nanummyeongjo.css);
  @import url(http://fonts.googleapis.com/earlyaccess/nanumbrushscript.css);
  @import url(http://fonts.googleapis.com/earlyaccess/nanumpenscript.css);
  @import url(http://cdn.jsdelivr.net/font-nanum/1.0/nanumbarungothic/nanumbarungothic.css);

  font-family: "Nanum Gothic", sans-serif;
  line-height: 1.4rem;
  color: gray;
`;

const CardSubtitle = ({ subtitle }) => (
  <StyledCardSubtitle>{subtitle}</StyledCardSubtitle>
);

export default CardSubtitle;
