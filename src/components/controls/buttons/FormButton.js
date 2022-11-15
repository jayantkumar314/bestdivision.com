import React from 'react';

const FormButton = ({children, disabled}) => {
    return (
        <>
            <button 
                type="submit" 
                className="primary-button"
                disabled={disabled}>{ children }</button>
        </>
    );
}

export default FormButton;