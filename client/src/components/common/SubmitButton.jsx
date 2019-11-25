import React from "react";

const SubmitButton = ({ isLoading, content }) => {
  return (
    <>
      {isLoading ? (
        <button className="button is-danger is-rounded is-fullwidth is-medium is-loading">
          {content}
        </button>
      ) : (
        <button className="button is-danger is-rounded is-fullwidth is-medium">
          {content}
        </button>
      )}
    </>
  );
};

export default SubmitButton;
