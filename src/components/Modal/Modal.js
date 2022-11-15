import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import FocusTrap from 'focus-trap-react'
// import './Modal.css'

function Modal({ modalClassName, setModalOpen, children, modalContainer_className }) {
    const [isShown, setIsShown] = useState(false);
    const closeButton = useRef(null);
    const modal = useRef(null);

    // useEffect(() => {
    //     setIsShown({ isShown: true }, () => {
    //         closeButton.current.focus();
    //     });
    //     toggleScrollLock();
    // }, [])
    useEffect(() => {
        // if (isShown) {
        //     setIsShown(false);
        // } else {
            setIsShown({ isShown: true }, () => {
                closeButton.current.focus();
            });
        // }
        toggleScrollLock();
    }, [children])

    const closeModal = () => {
        setIsShown(false);
        closeButton.current.focus();
        toggleScrollLock();
        setModalOpen(false)
    };
    const onKeyDown = event => {
        if (event.keyCode === 27) {
            closeModal();
            setModalOpen(false)
        }
    };
    const onClickOutside = event => {
        if (modal && modal.current.contains(event.target)) return;
        closeModal();
    };

    const toggleScrollLock = () => {
        document.querySelector('html')?.classList?.toggle('scroll-lock');
    };
    return ReactDOM.createPortal(
        <FocusTrap>
            {isShown &&
                <div onClick={onClickOutside} onKeyDown={onKeyDown} id="myModal" className={`modal open ${modalContainer_className}`}>
                <div ref={modal}  className={`modal-content ${modalClassName}`}>
                        <span ref={closeButton} onClick={closeModal} className="close">&times;</span>
                        <div class={`card-body ${modalClassName}`}>
                            {children}
                        </div>
                    </div>
                </div>
            }
        </FocusTrap>,
        document.body
    )
}

export default Modal
