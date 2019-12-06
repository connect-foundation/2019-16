import React, { useCallback } from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  .hero-body {
    padding-left: 0;
    font-family: "Nanum Gothic", sans-serif;
  }
`;

const Header = ({ groupData }) => {
  const { title, category } = groupData;
  const categoryBtnEvent = useCallback(e => {
    const categoryName = e.target.textContent.trim();
    alert(categoryName); // 카테고리 버튼 눌렀을 때 검색 페이지로 넘어가는 로직 아직 미정
  }, []);

  return (
    <StyledHeader className="hero is-full">
      <div className="hero-body">
        <h2 className="title has-text-danger is-size-2">{title}</h2>
        <div className="buttons">
          <button
            className="button is-primary is-small"
            onClick={categoryBtnEvent}
          >
            {category[0]}
          </button>
          <button
            className="button is-primary is-small"
            onClick={categoryBtnEvent}
          >
            {category[1]}
          </button>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
