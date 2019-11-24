import React, { useState, useCallback } from "react";
import styled from "styled-components";

const StyledTagInput = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  padding: 0.2rem;
  height: auto;

  .tag {
    margin: 0.5rem 0.5rem;
  }

  .tagInput {
    flex: 1;
    height: 2.8rem;
    padding: 0 0.5rem;
    box-shadow: none;
    border: none;
  }
`;

const TagInput = props => {
  const { tags, setTags } = props;
  const [inputTag, setInputTag] = useState("");

  const tagEvent = useCallback(
    e => {
      const inputData = e.target.value;
      const lastChar = inputData[inputData.length - 1];
      setInputTag(inputData);

      if (lastChar === " ") {
        if (inputData !== " ") setTags([...tags, inputData]);
        setInputTag("");
      }
    },
    [tags]
  );

  return (
    <StyledTagInput className="input tagDiv">
      {tags.map((tag, idx) => (
        <button key={idx} className="tag">
          {tag}
        </button>
      ))}
      <input
        type="text"
        className="tagInput input"
        onChange={tagEvent}
        value={inputTag}
      />
    </StyledTagInput>
  );
};

export default TagInput;
