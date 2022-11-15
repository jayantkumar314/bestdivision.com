import React, { Component, useState, useEffect } from 'react';
import ModalContent from './ModalContent';
import ModalTrigger from './ModalTrigger';
function Modal(props) {
    const [isShown, setIsShown] = useState(false);
    let closeButton;
    let TriggerButton;
    let modal;
    // let closeButton;
    // let closeButton;
    const showModal = () => {
        setIsShown({ isShown: true }, () => {
            closeButton.focus();
        });
        toggleScrollLock();
    };
    const closeModal = () => {
        setIsShown(false);
        TriggerButton.focus();
        toggleScrollLock();
    };
    const onKeyDown = event => {
        if (event.keyCode === 27) {
            closeModal();
        }
    };
    const onClickOutside = event => {
        if (modal && modal.contains(event.target)) return;
        closeModal();
    };

    const toggleScrollLock = () => {
        document.querySelector('html')?.classList?.toggle('scroll-lock');
    };
    return (
        <React.Fragment>
            <ModalTrigger
                showModal={showModal}
                buttonRef={n => (TriggerButton = n)}
                triggerText={props.modalProps.triggerText}
            />
            {isShown ? (
                <ModalContent
                    modalRef={n => (modal = n)}
                    buttonRef={n => (closeButton = n)}
                    closeModal={closeModal}
                    content={props.modalContent}
                    onKeyDown={onKeyDown}
                    onClickOutside={onClickOutside}
                />
            ) : (
                    <React.Fragment />
                )}
        </React.Fragment>
    );
}

export default Modal;














// import React from 'react'
// import './Modal.css'

// function Modal({ isOpen, setModalOpen, modalClassName, children }) {
//     return (
//         <div id="myModal" className={isOpen ? 'modal open' : 'modal'}>
//             <div className={`modal-content ${modalClassName}`}>
//                 <span onClick={() => setModalOpen(false)} className="close">&times;</span>
//                 <div class={`card-body ${modalClassName}`}>
//                     {children}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Modal
