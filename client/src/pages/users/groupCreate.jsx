import React, { useCallback, useState } from "react";
import styled from "styled-components";

const StyledGroupCreate = styled.div`
  margin: 2rem 0;
  .category {
    cursor: pointer;
  }
`;

const primaryCategories = ["프로그래밍", "자격증", "외국어", "면접", "지역"];
const secondaryCategories = {
  프로그래밍: ["C++", "Java", "JavaScript"],
  자격증: ["IT", "운전", "보건", "식품"],
  외국어: ["영어", "중국어", "불어", "스페인어"],
  면접: ["공채", "상시채용", "특채", "기술면접", "임원면접"],
  지역: ["경기도", "서울", "울산", "인천", "광주", "부산"]
};

const GroupCreate = props => {
  const [primaryCategory, setPrimaryCategory] = useState(null);
  const [secondaryCategory, setSecondaryCategory] = useState(null);

  const categoryEvent = useCallback(e => {
    const categoryName = e.target.textContent.trim();
    const categoryType = e.target.getAttribute("name");

    if (categoryType === "primary") {
      setPrimaryCategory(categoryName);
      setSecondaryCategory(null);
    }
    if (categoryType === "secondary") setSecondaryCategory(categoryName);
  }, []);

  return (
    <StyledGroupCreate>
      <div className="breadcrumb is-centered" aria-label="breadcrumbs">
        <ul>
          {primaryCategories.map(category => (
            <li
              key={category}
              name="primary"
              className="category has-text-primary is-size-4"
              onClick={categoryEvent}
            >
              {category}
            </li>
          ))}
        </ul>

        {primaryCategory && (
          <ul>
            {secondaryCategories[primaryCategory].map(category => (
              <li
                key={category}
                name="secondary"
                className="category has-text-info is-size-4"
                onClick={categoryEvent}
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>
    </StyledGroupCreate>
  );
};

export default GroupCreate;
