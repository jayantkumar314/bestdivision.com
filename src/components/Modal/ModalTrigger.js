import React, { Component } from 'react';
function ModalTrigger(props) {
    return (
        <button
            ref={props.buttonRef}
            onClick={props.showModal}
            className="modal-button"
        >
            {props.triggerText}
        </button>
    );
    
}

export default ModalTrigger;
