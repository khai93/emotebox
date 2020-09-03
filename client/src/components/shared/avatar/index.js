import React from 'react'

import './avatar.css'

function Avatar(props) {
    const userAvatar = props.userAvatar;

    return (
        <img className="avatar__circle" src={userAvatar} alt="avatar"></img>
    )
}

export {Avatar as default}