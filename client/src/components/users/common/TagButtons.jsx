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
  const { tags, history } = props;
  const tagBtnEvent = useCallback(e => {
    e.preventDefault();
    const tagName = e.target.textContent.trim();

    history.push(
      `/search/tags?query=${tagName.replace(/(\s*)/g, "").slice(1)}`
    );
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
