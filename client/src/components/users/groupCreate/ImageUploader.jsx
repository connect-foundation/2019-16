import React, { useCallback, useState, useRef } from "react";
import styled from "styled-components";
import { attach_image } from "../../../reducer/users/groupCreate";

const StyledImageUploader = styled.div`
  .image {
    width: 16rem;
    height: 12rem;
    border: 1px solid gray;
  }

  input[type="file"] {
    display: none;
    height: 0;
  }
`;

const ImageUploader = props => {
  const { dispatch } = props;
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const uploaderBtn = useRef();

  const onClick = useCallback(e => {
    uploaderBtn.current.click();
  }, []);

  const onChange = useCallback(e => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
      dispatch(attach_image(file));
    };

    reader.readAsDataURL(file);
  }, []);

  return (
    <StyledImageUploader>
      <img src={imagePreviewUrl} className="image" onClick={onClick} />
      <input type="file" onChange={onChange} ref={uploaderBtn} />
    </StyledImageUploader>
  );
};

export default ImageUploader;
