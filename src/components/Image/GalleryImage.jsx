import React from "react";

function GalleryImage(props) {
  return (
    <>
      <img
        className={props.className}
        style={props.rotate}
        src={props.src}
        alt={props.alt}
      />
    </>
  );
}

export default GalleryImage;
