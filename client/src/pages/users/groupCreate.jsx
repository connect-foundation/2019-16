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
  지역: [
    "경기도",
    "서울",
    "울산광역시",
    "인천광역시",
    "광주광역시",
    "부산광역시"
  ]
};

const GroupCreate = props => {
  const [primaryCategory, setPrimaryCategory] = useState(null);
  const primaryCategoryEvent = useCallback(e => {
    const categoryName = e.target.getAttribute("name");
    setPrimaryCategory(categoryName);
  }, []);

  return (
    <StyledGroupCreate>
      <div class="breadcrumb is-centered" aria-label="breadcrumbs">
        <ul>
          {primaryCategories.map(category => (
            <li
              key={category}
              name={category}
              className="category has-text-primary is-size-5"
              onClick={primaryCategoryEvent}
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
