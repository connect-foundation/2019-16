import React from "react";
import styled from "styled-components";
import QRCode from "qrcode.react";

const StudyroomInfoWrapper = styled.div`
  width: 50%;
  padding: 1.5rem;
`;

const StudyroomInfo = ({ info }) => {
  return (
    <StudyroomInfoWrapper>
      <h3 className="subtitle is-3">스터디룸 정보</h3>
      <QRCode value="https://place.map.kakao.com/54166561" />
    </StudyroomInfoWrapper>
  );
};

export default StudyroomInfo;
