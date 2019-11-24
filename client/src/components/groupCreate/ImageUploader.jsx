import React, { useCallback, useState } from "react";
import styled from "styled-components";

const StyledImageUploader = styled.div`
  .image {
    width: 16rem;
    height: 12rem;
    border: 1px solid gray;
    margin-bottom: 1rem;
  }
`;

const ImageUploader = () => {
  const [imageInfo, setImageInfo] = useState({
    file: null,
    imagePreviewUrl: null
  });

  const onChange = useCallback(e => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setImageInfo({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }, []);

  const { imagePreviewUrl } = imageInfo;
  return (
    <StyledImageUploader>
      {(imageInfo.file && <img src={imagePreviewUrl} className="image" />) || (
        <img className="image" />
      )}
      <input type="file" onChange={onChange} />
    </StyledImageUploader>
  );
};

export default ImageUploader;
