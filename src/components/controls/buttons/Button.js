import React from 'react';

const Button = ({children}) => {
    return (
        <>
            <button className="primary-button">{ children }</button>
        </>
    );
}

export default Button;