import React from 'react'
// import './Modal.css'

function Modal({ isOpen, setModalOpen, modalClassName, children }) {
    return (
        <div id="myModal" className={isOpen ? 'modal open' : 'modal'}>
            <div className={`modal-content ${modalClassName}`}>
                <span onClick={() => setModalOpen(false)} className="close">&times;</span>
                <div class={`card-body ${modalClassName}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal
