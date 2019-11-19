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
  line-height: 2rem;
  font-size: 1.5rem;

  padding: 0 0.4rem;
  height: 3.5rem;
`;

const CardTitle = ({ title }) => <Title>{title}</Title>;

export default CardTitle;
