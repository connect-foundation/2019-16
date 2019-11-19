import React from "react";
import styled from "styled-components";

const Title = styled.h3`
  @font-face {
    font-family: "Nanum Gothic";
    font-style: normal;
    font-weight: 400;
    src: local("NanumGothic"),
      url(https://fonts.gstatic.com/s/nanumgothic/v17/PN_3Rfi-oW3hYwmKDpxS7F_z-7rJxHVIsPV5MbNO2rV2_va-Nv6p.0.woff2)
        format("woff2");
    unicode-range: U+f9ca-fa0b, U+ff03-ff05, U+ff07, U+ff0a-ff0b, U+ff0d-ff19,
      U+ff1b, U+ff1d, U+ff20-ff5b, U+ff5d, U+ffe0-ffe3, U+ffe5-ffe6;
  }

  font-family: "Nanum Gothic", sans-serif;
  font-weight: bold;
  line-height: 2rem;
  font-size: 1.5rem;

  height: 3.5rem;
  color: #1d6de4;
`;

const CardTitle = ({ title }) => <Title>{title}</Title>;

export default CardTitle;
