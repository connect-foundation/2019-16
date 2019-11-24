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

  const onKeyDown = useCallback(
    e => {
      if (e.keyCode === 8 && inputTag === "" && tags.length) {
        setInputTag(tags[tags.length - 1]);
        setTags(tags.slice(0, tags.length - 1));
        console.log(tags);
      }
    },
    [tags, inputTag]
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
        onKeyDown={onKeyDown}
        value={inputTag}
        placeholder="tag"
      />
    </StyledTagInput>
  );
};

export default TagInput;
