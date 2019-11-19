import React from "react";
import styled from "styled-components";

const Title = styled.h3`
  @font-face {
    font-family: "NanumBarunGothic";
    font-style: normal;
    font-weight: 400;
    src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot");
    src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot?#iefix")
        format("embedded-opentype"),
      url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.woff")
        format("woff"),
      url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.ttf")
        format("truetype");
  }
  font-family: "NanumBarunGothic", sans-serif;
  font-weight: bold;
  line-height: 2.2rem;
  font-size: 1.6rem;

  margin: 1rem 0rem;
`;

const CardTitle = ({ title }) => <Title>{title}</Title>;

export default CardTitle;
