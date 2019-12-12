import React, { memo, useCallback } from "react";
import styled from "styled-components";

const StyledTagButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  .button {
    font-family: "Nanum Gothic", sans-serif;
  }
`;

const TagButtons = props => {
  const { tags } = props;
  const tagBtnEvent = useCallback(e => {
    const tagName = e.target.textContent.trim();
    tagName.replace("# ", "");
    alert(tagName.replace("# ", ""));
  }, []);

  return (
    <StyledTagButtons className="buttons">
      {tags.map(tag => (
        <button
          key={tag}
          className="button is-info is-small"
          onClick={tagBtnEvent}
        >
          # {tag}
        </button>
      ))}
    </StyledTagButtons>
  );
};

export default memo(TagButtons);
