import _ from "fxjs/Strict";

const dataURItoBlob = dataURI => {
  const bytes =
    dataURI.split(",")[0].indexOf("base64") >= 0
      ? atob(dataURI.split(",")[1])
      : unescape(dataURI.split(",")[1]);

  const mime = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];

  const max = bytes.length;
  let ia = new Uint8Array(max);
  for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);

  return new Blob([ia], { type: mime });
};

const getSizeAtMaxWidth = _.curryN(1, (maxWidth, image) => {
  let width = image.width;
  let height = image.height;

  height *= maxWidth / width;
  width = maxWidth;

  return [width, height, image];
});

const resizedDataUrl = _.curryN(2, (width, height, image) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(image, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg");
});

const InputArrayAndGetresizedDataUrl = _.reduce.bind(
  null,
  (f, x) => f(x),
  resizedDataUrl
);

const readImage = originalImage => {
  const reader = new FileReader();
  const image = new Image();

  return new Promise((resolve, reject) => {
    if (!originalImage.type.match(/image.*/)) reject(new Error("Not an image"));

    reader.onload = readerEvent => {
      image.onload = () => resolve(image);
      image.src = readerEvent.target.result;
    };

    reader.readAsDataURL(originalImage);
  });
};

export default (image, maxWidth) =>
  _.go(
    image,
    readImage,
    getSizeAtMaxWidth(maxWidth), // [width, height, image]
    InputArrayAndGetresizedDataUrl,
    dataURItoBlob
  );
