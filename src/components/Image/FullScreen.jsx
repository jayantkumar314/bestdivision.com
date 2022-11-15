import React, { useState, useEffect } from "react";
import GalleryImage from "./GalleryImage";
import GalleryModal from "./GalleryModal";
// import './FullScreen.css';

function FullScreen(props) {
    const initialState = {
        showModal: false,
        pointer: null
      };
  const [state, setstate] = useState(initialState);
//   const [pointer, setpointer] = useState(null);

//   openModal = openModal.bind(this);
//   closeModal = closeModal.bind(this);
//   nextClick = nextClick.bind(this);
//   prevClick = prevClick.bind(this);

  function openModal(index) {
    setstate({
      showModal: true,
      rotation: 0,
      pointer: index,
    });
  }

  // Function for closing modal dialog
  function closeModal() {
    setstate({
      showModal: false,
      pointer: null,
    });
  }
  function nextClick() {
    const imgLength = props.imgUrls.length;
    const newPointer = state.pointer === imgLength - 1 ? 0 : state.pointer + 1;
    setstate({ pointer: newPointer });
  }
  function prevClick() {
    const imgLength = props.imgUrls.length;
    const newPointer = state.pointer === 0 ? imgLength - 1 : state.pointer - 1;
    setstate({ pointer: newPointer });
  }
  return (
    <div refs="gallery-container" className="container-fluid gallery-container">
      <div className="row">
        {props.imgUrls.map((url, index) => {
          return (
            <div key={index} className="col-sm-6 col-md-3 col-xl-2">
              <div className="gallery-card">
                <GalleryImage
                  key={index}
                  className="gallery-thumbnail"
                  src={url}
                  alt={"Image number " + (index + 1)}
                  // onClick={() => openModal(index)}
                />

                <span
                  className="card-icon-open fa fa-expand"
                  value={url}
                  onClick={() => openModal(index)}
                >
                  FullScreen{" "}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <GalleryModal
        isOpen={state.showModal}
        onClick={closeModal}
        onNext={nextClick}
        onPrev={prevClick}
        src={props.imgUrls[state.pointer]}
      />
    </div>
  );
}

export default FullScreen;
