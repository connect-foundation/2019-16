import React from "react";
import styled from "styled-components";

const Time = styled.div`
  margin: 0.5rem;
`;

const StudyTime = ({ time }) => <Time>{time}</Time>;

export default StudyTime;
