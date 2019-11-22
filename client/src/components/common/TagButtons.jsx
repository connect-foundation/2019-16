import React, { memo } from "react";
import styled from "styled-components";

const StyledTagButtons = styled.div`
  .button {
    font-family: "Nanum Gothic", sans-serif;
  }
`;

const TagButtons = props => {
  const { tags } = props;

  return (
    <StyledTagButtons className="buttons">
      {tags.map(tag => (
        <button key={tag} className="button is-info is-small">
          # {tag}
        </button>
      ))}
    </StyledTagButtons>
  );
};

export default memo(TagButtons);
