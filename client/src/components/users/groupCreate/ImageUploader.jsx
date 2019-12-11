import React, { useCallback, useState, useRef, useEffect } from "react";
import styled from "styled-components";

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
  const { thumbnail, onAttachImage } = props;
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
      if (!file) return;
      setImagePreviewUrl(reader.result);
      onAttachImage(file);
    };

    file && reader.readAsDataURL(file);
  }, []);

  useEffect(() => {
    isURL(thumbnail) && setImagePreviewUrl(thumbnail);
  }, [thumbnail]);

  return (
    <StyledImageUploader>
      <img src={imagePreviewUrl} className="image" onClick={onClick} />
      <input type="file" onChange={onChange} ref={uploaderBtn} />
    </StyledImageUploader>
  );
};

function isURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return str && pattern.test(str);
}

export default ImageUploader;
