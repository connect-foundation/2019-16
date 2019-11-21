import React from "react";
import styled from "styled-components";

const StyledTagButtons = styled.div``;

const TagButtons = props => {
  const { tags } = props;
  return (
    <StyledTagButtons className="buttons">
      {tags.map(tag => (
        <button className="button is-info is-small"> # {tag} </button>
      ))}
    </StyledTagButtons>
  );
};

export default TagButtons;
