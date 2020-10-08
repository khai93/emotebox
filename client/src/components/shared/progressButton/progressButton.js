import React from 'react';
import ReactProgressButton from 'react-progress-button';

import "./progressButton.css"

function ProgressButton(props) {
    const handleClick = props.handleClick;

    return (
        <ReactProgressButton onClick={handleClick} >
            {props.children}
        </ReactProgressButton>
    )
}

export default ProgressButton;