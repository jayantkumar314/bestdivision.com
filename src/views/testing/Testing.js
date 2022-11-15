import React from 'react'
// import './Testing.css'

import Modal from 'components/Modal'
import Text from "./Text";

function Testing() {
    const modalProps = {
        triggerText: "Launch the Modal!"
    };
    const modalContent = (
        <React.Fragment>
            <p>
                Press <code>Esc</code> or click Outside the Modal to exit.
      </p>
            <p>
                Pressing Return also exits the Modal if you haven't changed the focus!
      </p>
        </React.Fragment>
    );
    return (
        <div>
            {/* <Modal /> */}
            <Text />
            <Modal modalProps={modalProps} modalContent={modalContent} />
            <Text />

        </div>
    )
}

export default Testing
