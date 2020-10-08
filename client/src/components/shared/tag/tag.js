import React from 'react'

import './tag.css'

function Tag(props) {
    const tagName = props.tagName;

    if (!tagName) {
        throw new Error("tagName prop must be supplied!")
    }
    
    return (
        <button className={"tag__btn " + props.className}>
            { tagName }
        </button>
    )
}

export default Tag;