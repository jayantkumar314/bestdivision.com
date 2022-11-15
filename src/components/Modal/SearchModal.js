import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import FocusTrap from 'focus-trap-react'
// import './Modal.css'

function SearchModal({ modalClassName, setModalOpen, children, modalContainer_className, closeMobileSearchBar, blogsSearch }) {
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
        openModal();
    }, [])
    // useEffect(() => {
    //     openScrollLock();
    // }, [children])

    const closeModal = () => {
        setIsShown(false);
        //closeButton.current.focus();
        closeScrollLock();
        setModalOpen(false)
        closeMobileSearchBar()
        document.querySelector('html')?.classList?.remove('scroll-lock');
    };
    const openModal = () => {
        setIsShown(true);
        //closeButton.current.focus();
        setModalOpen(true)
        document.querySelector('html').classList.add('scroll-lock');
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

    const closeScrollLock = () => {
        document.querySelector('html')?.classList?.remove('scroll-lock');
    };
    const openScrollLock = () => {
        document.querySelector('html').classList.add('scroll-lock');
    };
    const toggleScrollLock = () => {
        //document.querySelector('html')?.classList?.toggle('scroll-lock');
    };
    return ReactDOM.createPortal(
        <FocusTrap>
            {isShown &&
                <div onClick={onClickOutside} onKeyDown={onKeyDown} id="myModal" className={`modal open ${modalContainer_className}`}>
                    <div ref={modal} className={`${modalClassName}`}>
                        {/* <span ref={closeButton} onClick={closeModal} className="close">&times;</span> */}
                        <div class={modalClassName}>
                            {children}
                        </div>
                    </div>
                </div>
            }
        </FocusTrap>,
        document.body
    )
}

export default SearchModal
