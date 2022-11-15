import React, { useState, useEffect } from "react";

function GalleryModal(props) {
  const initialState = {
    rotation: 0,
  };
  const [state, setstate] = useState(initialState);
  function rotate() {
    let newRotation = state.rotation + 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }
    setstate({
      rotation: newRotation,
    });
  }

  function fullScreen() {
    let elem = document?.getElementById("image_container");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
    // const [rotation, setRotation] = useState(0)
    // rotate = rotate.bind(this);
    // fullScreen = this.fullScreen.bind(this);

    // const { rotation } = this.state;
    if (props.isOpen === false) {
      return null;
    }
  }

  return (
    <div className="modal-overlay" name={props.name}>
      <div className="modal-body" id="image_container">
        <img
          className="center_image"
          id="image"
          src={props.src}
          style={{ transform: `rotate(${state.rotation}deg)` }}
        />
        <a href="#" className="fullscreen button" onClick={fullScreen}>
          FullScreen
        </a>
        <a href="#" className="button" onClick={() => rotate()}>
          Rotate
        </a>
        <a href="#" className="button" onClick={props.onPrev}>
          Prev
        </a>
        <a href="#" className="button" onClick={props.onNext}>
          Next
        </a>
        <a className="modal-close" href="#" onClick={props.onClick}>
          <span className="fa fa-times">Close</span>
        </a>
      </div>
    </div>
  );
}

export default GalleryModal;
