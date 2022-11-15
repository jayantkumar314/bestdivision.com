import React from 'react'
// import './FullScreen.css'

// Cache gallery container
// const galleryContainer = document?.querySelector("#root");

// Component for gallery modal
export class GalleryModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rotation: 0
    };
    this.rotate = this.rotate.bind(this);
    this.fullScreen = this.fullScreen.bind(this);
  }

  render() {
    const { rotation } = this.state;
    if (this.props.isOpen === false) {
      return null;
    }

    return (
      <div className="modal-overlay" name={this.props.name}>
        <div className="modal-body" id="image_container">
          <img
            className="center_image"
            id="image"
            src={this.props.src}
            style={{ transform: `rotate(${rotation}deg)` }}
          />
          <a href="#" className="fullscreen button" onClick={this.fullScreen}>
              FullScreen
              {/* <i className="fas fa-compress-arrows-alt">hello</i> */}
          </a>
          <a href="#" className="button" onClick={() => this.rotate()}>
              Rotate
            {/* <i className="fas fa-sync-alt" /> */}
          </a>
          <a href="#" className="button" onClick={this.props.onPrev}>
              Prev
            {/* <i className="fas fa-angle-left" /> */}
          </a>
          <a href="#" className="button" onClick={this.props.onNext}>
              Next
            {/* <i className="fas fa-angle-right" /> */}
          </a>
          <a
            className="modal-close"
            href="#"
            onClick={this.props.onClick}
          >
            <span className="fa fa-times">Close</span>
          </a>
          
        </div>
      </div>
    );
  }
  rotate() {
    let newRotation = this.state.rotation + 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }
    this.setState({
      rotation: newRotation
    });
  }

  fullScreen() {
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
  }
}

// Component for gallery
class FullScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      pointer: null
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.prevClick = this.prevClick.bind(this);
  }

  render() {
    
  }

  // Function for opening modal dialog
  openModal(index) {
    this.setState({
      showModal: true,
      rotation:0,
      pointer: index
    });
  }

  // Function for closing modal dialog
  closeModal() {
    this.setState({
      showModal: false,
      pointer: null
    });
  }
  nextClick() {
    const { pointer } = this.state;
    const imgLength = imgUrls.length;
    const newPointer = pointer === imgLength - 1 ? 0 : pointer + 1;
    this.setState({ pointer: newPointer });
  }
  prevClick() {
    const { pointer } = this.state;
    const imgLength = imgUrls.length;
    const newPointer = pointer === 0 ? imgLength - 1 : pointer - 1;
    this.setState({ pointer: newPointer });
  }
}
export default FullScreen
// Let's render the whole thing
// ReactDOM.render(<Gallery imgUrls={imgUrls} />, galleryContainer);