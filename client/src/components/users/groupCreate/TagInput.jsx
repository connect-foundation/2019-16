import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { add_tag } from "../../../reducer/users/groupCreate";

const StyledTagInput = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  padding: 0rem;
  height: auto;

  .tag {
    margin: 0.5rem;
  }

  .tagInput {
    flex: 1;
    height: 2.8rem;
    padding: 0 0.5rem;
    box-shadow: none;
    border: none;

    &:focus {
      border: 1px solid blueviolet;
    }
  }
`;

const TagInput = props => {
  const { tags, dispatch } = props;
  const [inputTag, setInputTag] = useState("");

  const tagEvent = useCallback(
    e => {
      const inputData = e.target.value;
      const lastChar = inputData[inputData.length - 1];
      setInputTag(inputData);

      if (lastChar === " ") {
        if (inputData !== " ") dispatch(add_tag([...tags, inputData]));
        setInputTag("");
      }
    },
    [tags]
  );

  const onKeyDown = useCallback(
    e => {
      if (e.keyCode === 8 && inputTag === "" && tags.length) {
        setInputTag(tags[tags.length - 1]);
        dispatch(add_tag(tags.slice(0, tags.length - 1)));
      }
    },
    [tags, inputTag]
  );

  return (
    <StyledTagInput className="input">
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
